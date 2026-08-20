import { Router, Request, Response } from 'express';
import { db, GalleryItem } from '../db.js';
import { authenticateToken, requireRole, AuthenticatedRequest } from '../auth.js';

const router = Router();

// GET /api/gallery - Get gallery photos and videos
router.get('/', (req: Request, res: Response): void => {
  try {
    const { event_id, school } = req.query;
    let items = db.getGallery();
    if (event_id && typeof event_id === 'string') {
      items = items.filter(g => g.event_id === event_id);
    }
    if (school && typeof school === 'string' && school !== 'ALL') {
      items = items.filter(g => g.school_tag?.toLowerCase() === school.toLowerCase());
    }
    res.json({ gallery: items });
  } catch (err: any) {
    res.status(500).json({ error: 'Error al obtener galería de fotos y videos.' });
  }
});

// POST /api/gallery - Staff/Admin upload gallery media (photo or video)
router.post('/', authenticateToken, requireRole('STAFF', 'ADMIN'), (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { title, image_url, media_type, video_url, school_tag, event_id, event_title, date, description } = req.body;

    if (!title || !image_url) {
      res.status(400).json({ error: 'El título y la URL de la imagen o portada son obligatorios.' });
      return;
    }

    const item: GalleryItem = {
      id: `gal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      image_url: image_url.trim(),
      media_type: media_type === 'VIDEO' ? 'VIDEO' : 'IMAGE',
      video_url: video_url ? video_url.trim() : undefined,
      school_tag: school_tag ? school_tag.trim() : 'Des Moines Public Schools',
      event_id: event_id || undefined,
      event_title: event_title || undefined,
      date: date || new Date().toISOString().split('T')[0],
      description: description ? description.trim() : undefined,
      uploaded_by: req.profile ? `${req.profile.first_name} ${req.profile.last_name}` : 'Staff DMPS Connect',
      likes_count: 0,
      liked_by: [],
      comments: [],
      shares_count: 0,
      created_at: new Date().toISOString(),
    };

    const created = db.createGalleryItem(item);
    res.status(201).json({ message: 'Publicación agregada a la galería con éxito.', item: created });
  } catch (err: any) {
    console.error('Error creating gallery post:', err);
    res.status(500).json({ error: 'Error al agregar elemento a la galería.' });
  }
});

// POST /api/gallery/:id/like - Like or Unlike gallery post (Social feature)
router.post('/:id/like', (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const userKey = (req.body.userKey || req.ip || 'guest_user').toString();
    const result = db.likeGalleryItem(id, userKey);
    res.json({ success: true, likes_count: result.likes_count, is_liked: result.is_liked });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error al dar me gusta.' });
  }
});

// POST /api/gallery/:id/comment - Comment on gallery post (Social feature)
router.post('/:id/comment', (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const { author_name, author_avatar, comment } = req.body;
    if (!comment || !comment.trim()) {
      res.status(400).json({ error: 'El comentario no puede estar vacío.' });
      return;
    }

    const createdComment = db.addGalleryComment(id, {
      author_name: author_name || 'Voluntario',
      author_avatar,
      comment,
    });

    res.json({ success: true, comment: createdComment });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error al agregar comentario.' });
  }
});

// POST /api/gallery/:id/share - Increment share count
router.post('/:id/share', (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const shares_count = db.shareGalleryItem(id);
    res.json({ success: true, shares_count });
  } catch (err: any) {
    res.status(500).json({ error: 'Error al registrar compartido.' });
  }
});

// DELETE /api/gallery/:id - Delete gallery photo/video
router.delete('/:id', authenticateToken, requireRole('STAFF', 'ADMIN'), (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { id } = req.params;
    const deleted = db.deleteGalleryItem(id);
    if (!deleted) {
      res.status(404).json({ error: 'Publicación no encontrada.' });
      return;
    }
    res.json({ message: 'Publicación eliminada de la galería exitosamente.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Error al eliminar elemento de la galería.' });
  }
});

export default router;
