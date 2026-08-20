export interface AchievementBadge {
  id: string;
  category: 'milestones' | 'podium' | 'excellence' | 'skills';
  categoryLabel: string;
  name: string;
  description: string;
  iconName: string;
  colorGrade: string; // Tailwind gradient classes
  borderGrade: string;
  textColor: string;
  requirement: string;
  discordEmoji: string;
  unlockedAt: {
    hours?: number;
    reviewsCount?: number;
    ratingMin?: number;
    submissionsCount?: number;
    categoryRequired?: string;
    podiumRank?: number; // 1 = Gold, 2 = Silver, 3 = Bronze
  };
}

export const ACHIEVEMENTS_CATALOG: AchievementBadge[] = [
  // ==========================================
  // 1. HITOS DE HORAS OFICIALES (Essential Milestones)
  // ==========================================
  {
    id: 'badge_hrs_1',
    category: 'milestones',
    categoryLabel: 'Hitos Oficiales',
    name: 'Primer Paso Cívico',
    description: 'Completaste tu primera hora de servicio voluntario acreditada por el distrito.',
    iconName: 'Sparkles',
    colorGrade: 'from-blue-500 to-indigo-600',
    borderGrade: 'border-blue-500/50',
    textColor: 'text-blue-400',
    requirement: '1 Hora Aprobada',
    discordEmoji: '🌱',
    unlockedAt: { hours: 1 },
  },
  {
    id: 'badge_hrs_10',
    category: 'milestones',
    categoryLabel: 'Hitos Oficiales',
    name: 'Escudo de Bronce (10h)',
    description: 'Alcanzaste las primeras 10 horas oficiales de servicio voluntario.',
    iconName: 'Shield',
    colorGrade: 'from-amber-600 to-amber-800',
    borderGrade: 'border-amber-600/50',
    textColor: 'text-amber-300',
    requirement: '10 Horas Aprobadas (Diploma 10h)',
    discordEmoji: '🛡️',
    unlockedAt: { hours: 10 },
  },
  {
    id: 'badge_hrs_25',
    category: 'milestones',
    categoryLabel: 'Hitos Oficiales',
    name: 'Escudo de Plata (25h)',
    description: 'Superaste 25 horas de servicio comunitario con impacto directo en las escuelas.',
    iconName: 'Award',
    colorGrade: 'from-slate-300 to-slate-500',
    borderGrade: 'border-slate-300/50',
    textColor: 'text-slate-200',
    requirement: '25 Horas Aprobadas (Diploma 25h)',
    discordEmoji: '🥈',
    unlockedAt: { hours: 25 },
  },
  {
    id: 'badge_hrs_50',
    category: 'milestones',
    categoryLabel: 'Hitos Oficiales',
    name: 'Escudo de Oro (50h)',
    description: '50 horas de liderazgo y dedicación continua en actividades del programa.',
    iconName: 'Award',
    colorGrade: 'from-yellow-400 to-amber-600',
    borderGrade: 'border-yellow-400/60',
    textColor: 'text-yellow-300',
    requirement: '50 Horas Aprobadas (Diploma 50h)',
    discordEmoji: '🥇',
    unlockedAt: { hours: 50 },
  },
  {
    id: 'badge_hrs_100',
    category: 'milestones',
    categoryLabel: 'Hitos Oficiales',
    name: 'Gran Cruz de Platino (100h)',
    description: 'Hito centenario: 100 horas de servicio solidario desinteresado.',
    iconName: 'Star',
    colorGrade: 'from-cyan-400 to-blue-600',
    borderGrade: 'border-cyan-400/60',
    textColor: 'text-cyan-300',
    requirement: '100 Horas Aprobadas (Distinción)',
    discordEmoji: '💎',
    unlockedAt: { hours: 100 },
  },
  {
    id: 'badge_hrs_160',
    category: 'milestones',
    categoryLabel: 'Hitos Oficiales',
    name: 'Cordón de Honor Silver Cord (160h)',
    description: 'Máximo honor cívico de Des Moines Public Schools: Cordón de Graduación 160h.',
    iconName: 'Crown',
    colorGrade: 'from-amber-300 via-yellow-400 to-amber-600',
    borderGrade: 'border-amber-400',
    textColor: 'text-amber-200',
    requirement: '160 Horas Aprobadas (Cordón de Toga)',
    discordEmoji: '👑',
    unlockedAt: { hours: 160 },
  },
  {
    id: 'badge_hrs_200',
    category: 'milestones',
    categoryLabel: 'Hitos Oficiales',
    name: 'Servidor Distrital de Élite (200h+)',
    description: 'Superaste las 200 horas de voluntariado, dejando una huella histórica en el distrito.',
    iconName: 'Sparkles',
    colorGrade: 'from-purple-400 via-pink-500 to-indigo-500',
    borderGrade: 'border-purple-400/60',
    textColor: 'text-purple-200',
    requirement: '200+ Horas Aprobadas',
    discordEmoji: '✨',
    unlockedAt: { hours: 200 },
  },

  // ==========================================
  // 2. PODIO DE HONOR Y COMPETENCIA
  // ==========================================
  {
    id: 'badge_podium_gold',
    category: 'podium',
    categoryLabel: 'Podio Distrital',
    name: 'Corona de Oro #1 del Distrito',
    description: 'Posición #1 absoluta en el ranking distrital de voluntarios con mayor servicio.',
    iconName: 'Crown',
    colorGrade: 'from-amber-300 via-yellow-400 to-amber-600',
    borderGrade: 'border-amber-300',
    textColor: 'text-amber-300',
    requirement: 'Top #1 en el Podio General',
    discordEmoji: '👑',
    unlockedAt: { podiumRank: 1 },
  },
  {
    id: 'badge_podium_silver',
    category: 'podium',
    categoryLabel: 'Podio Distrital',
    name: 'Medalla de Plata #2 del Podio',
    description: 'Segundo lugar en el ranking de mayor impacto y dedicación distrital.',
    iconName: 'Medal',
    colorGrade: 'from-slate-200 to-slate-400',
    borderGrade: 'border-slate-300/60',
    textColor: 'text-slate-100',
    requirement: 'Top #2 en el Podio General',
    discordEmoji: '🥈',
    unlockedAt: { podiumRank: 2 },
  },
  {
    id: 'badge_podium_bronze',
    category: 'podium',
    categoryLabel: 'Podio Distrital',
    name: 'Medalla de Bronce #3 del Podio',
    description: 'Tercer lugar en el ranking de honor de voluntarios destacados.',
    iconName: 'Medal',
    colorGrade: 'from-amber-600 to-orange-700',
    borderGrade: 'border-amber-500/50',
    textColor: 'text-amber-300',
    requirement: 'Top #3 en el Podio General',
    discordEmoji: '🥉',
    unlockedAt: { podiumRank: 3 },
  },

  // ==========================================
  // 3. EXCELENCIA, CONSTANCIA Y REPUTACIÓN
  // ==========================================
  {
    id: 'badge_rating_star',
    category: 'excellence',
    categoryLabel: 'Reputación y Constancia',
    name: 'Excelencia 5 Estrellas',
    description: 'Excelente reputación comunitaria con promedio de 4.8+ estrellas y 3+ reseñas públicas.',
    iconName: 'Star',
    colorGrade: 'from-amber-400 to-yellow-500',
    borderGrade: 'border-amber-400/50',
    textColor: 'text-amber-300',
    requirement: '3+ Reseñas y Promedio ≥ 4.8★',
    discordEmoji: '⭐',
    unlockedAt: { reviewsCount: 3, ratingMin: 4.8 },
  },
  {
    id: 'badge_consistency_10',
    category: 'excellence',
    categoryLabel: 'Reputación y Constancia',
    name: 'Constancia Ejemplar (10+ Registros)',
    description: 'Has realizado más de 10 registros de actividades debidamente verificados por coordinadores.',
    iconName: 'Flame',
    colorGrade: 'from-orange-500 to-rose-600',
    borderGrade: 'border-orange-500/50',
    textColor: 'text-orange-400',
    requirement: '10+ Solicitudes Aprobadas',
    discordEmoji: '🔥',
    unlockedAt: { submissionsCount: 10 },
  },

  // ==========================================
  // 4. ESPECIALIDADES Y ÁREAS DE IMPACTO (Skills)
  // ==========================================
  {
    id: 'badge_skill_family',
    category: 'skills',
    categoryLabel: 'Especialidades',
    name: 'Guía y Orientación Familiar BFL',
    description: 'Participación destacada en mesas de bienvenida, orientación y apoyo a familias.',
    iconName: 'HeartHandshake',
    colorGrade: 'from-blue-500 to-sky-600',
    borderGrade: 'border-blue-500/40',
    textColor: 'text-sky-300',
    requirement: 'Servicio en Guía y Orientación a Familias',
    discordEmoji: '🤝',
    unlockedAt: { categoryRequired: 'Guía y Orientación a Familias' },
  },
  {
    id: 'badge_skill_bilingual',
    category: 'skills',
    categoryLabel: 'Especialidades',
    name: 'Puente Lingüístico & Bilingüe',
    description: 'Traducción e interpretación para conectar a familias multilingües con la comunidad.',
    iconName: 'BookOpen',
    colorGrade: 'from-emerald-500 to-teal-600',
    borderGrade: 'border-emerald-500/40',
    textColor: 'text-emerald-300',
    requirement: 'Servicio en Traducción e Interpretación',
    discordEmoji: '🌐',
    unlockedAt: { categoryRequired: 'Traducción e Interpretación Bilingüe' },
  },
  {
    id: 'badge_skill_tech',
    category: 'skills',
    categoryLabel: 'Especialidades',
    name: 'Soporte Tecnológico & Audiovisual',
    description: 'Asistencia técnica en plataformas digitales, sonido o dispositivos escolares.',
    iconName: 'Zap',
    colorGrade: 'from-indigo-500 to-purple-600',
    borderGrade: 'border-indigo-500/40',
    textColor: 'text-indigo-300',
    requirement: 'Servicio en Soporte Tecnológico',
    discordEmoji: '⚡',
    unlockedAt: { categoryRequired: 'Soporte Tecnológico' },
  },
  {
    id: 'badge_skill_childcare',
    category: 'skills',
    categoryLabel: 'Especialidades',
    name: 'Recreación y Cuidado Infantil',
    description: 'Apoyo en dinámicas lúdicas, tutorías y cuidado de niños durante eventos escolares.',
    iconName: 'Users',
    colorGrade: 'from-pink-500 to-rose-600',
    borderGrade: 'border-pink-500/40',
    textColor: 'text-pink-300',
    requirement: 'Servicio en Cuidado y Recreación de Niños',
    discordEmoji: '🧸',
    unlockedAt: { categoryRequired: 'Cuidado y Recreación de Niños' },
  },
];

export interface EvaluationStats {
  approvedHours: number;
  approvedMinutes: number;
  totalSubmissions: number;
  reviewsCount?: number;
  ratingAvg?: number;
  volunteerSchool?: string;
  attendedSchools?: string[];
  activityCategories?: string[];
  podiumRank?: number; // 1, 2, 3 or null
}

/**
 * Strict evaluation of unlocked badges
 */
export function checkBadgeUnlocked(
  badge: AchievementBadge,
  stats: EvaluationStats
): boolean {
  const { unlockedAt } = badge;

  // Hours check
  if (unlockedAt.hours !== undefined) {
    if (stats.approvedHours < unlockedAt.hours) {
      return false;
    }
  }

  // Podium check
  if (unlockedAt.podiumRank !== undefined) {
    if (stats.podiumRank !== unlockedAt.podiumRank) {
      return false;
    }
  }

  // Submissions check
  if (unlockedAt.submissionsCount !== undefined) {
    if (stats.totalSubmissions < unlockedAt.submissionsCount) {
      return false;
    }
  }

  // Reviews count & rating check
  if (unlockedAt.reviewsCount !== undefined) {
    const revCount = stats.reviewsCount || 0;
    if (revCount < unlockedAt.reviewsCount) {
      return false;
    }
  }

  if (unlockedAt.ratingMin !== undefined) {
    const rAvg = stats.ratingAvg || 0;
    if (rAvg < unlockedAt.ratingMin) {
      return false;
    }
  }

  // Category requirement check
  if (unlockedAt.categoryRequired !== undefined) {
    const categories = stats.activityCategories || [];
    const hasCategory = categories.some(
      (c) => c.toLowerCase().includes(unlockedAt.categoryRequired!.toLowerCase())
    );
    if (!hasCategory && stats.approvedHours === 0) {
      return false;
    }
  }

  return true;
}
