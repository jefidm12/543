import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Save,
  Check,
  Smile,
  Palette,
  Shield,
  GraduationCap,
  RefreshCw,
  Eye,
  Lock,
  Upload,
  Image as ImageIcon,
  Flame,
  Crown,
  Zap,
  Layers,
  User,
  Heart,
  Droplet,
} from 'lucide-react';
import { VolunteerProfileCard } from './DiscordProfileCard';
import {
  BANNER_COSMETICS,
  AVATAR_DECORATIONS,
  PROFILE_EFFECTS,
  CosmeticItem,
} from '../data/profileCosmeticsCatalog';
import { api } from '../services/api';
import { VolunteerProfile, VolunteerStats } from '../types';

interface DiscordProfileCustomizerModalProps {
  profile: Partial<VolunteerProfile>;
  stats: Partial<VolunteerStats>;
  onClose: () => void;
  onSaveSuccess: (updatedProfile: VolunteerProfile) => void;
}

const EMOJI_PRESETS = ['✨', '🎓', '🌟', '📚', '🚀', '❤️', '🔥', '🏆', '🤝', '🌿', '⚡', '🎉', '🌊', '🍁', '🌸'];

const PRONOUN_PRESETS = [
  'él/he',
  'ella/she',
  'elle/they',
  'he/him',
  'she/her',
  'they/them',
];

export const DiscordProfileCustomizerModal: React.FC<DiscordProfileCustomizerModalProps> = ({
  profile,
  stats,
  onClose,
  onSaveSuccess,
}) => {
  // Current user's verified hours
  const approvedMinutes = stats?.approved_minutes || profile.approved_minutes || 0;
  const approvedHours = stats?.approved_hours || Math.round(approvedMinutes / 60);

  // Active customization tab
  const [activeTab, setActiveTab] = useState<'effects' | 'banners' | 'avatar' | 'info'>('effects');

  // Form states
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '');
  const [bannerColor, setBannerColor] = useState(profile.banner_color || BANNER_COSMETICS[0].value);
  const [bannerImageUrl, setBannerImageUrl] = useState(profile.banner_image_url || '');
  const [avatarDecoration, setAvatarDecoration] = useState(profile.avatar_decoration || 'none');
  const [profileEffect, setProfileEffect] = useState(profile.profile_effect || 'none');
  const [customStatus, setCustomStatus] = useState(profile.custom_status || '');
  const [customStatusEmoji, setCustomStatusEmoji] = useState(profile.custom_status_emoji || '✨');
  const [pronouns, setPronouns] = useState(profile.pronouns || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [school, setSchool] = useState(profile.school || '');
  const [grade, setGrade] = useState(profile.grade || '');
  const [organization, setOrganization] = useState(profile.organization || '');
  const [languages, setLanguages] = useState<string[]>(
    profile.languages && profile.languages.length > 0 ? profile.languages : ['Español']
  );
  const [newLang, setNewLang] = useState('');

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // File upload for avatar
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('La imagen no debe superar los 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
          setErrorMsg(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // File upload for custom banner (unlocked at 25h+)
  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (approvedHours < 25) {
      setErrorMsg('Desbloquea 25 horas de voluntariado para subir tu propio fondo personalizado.');
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 6 * 1024 * 1024) {
        setErrorMsg('El banner no debe superar los 6MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBannerImageUrl(reader.result);
          setErrorMsg(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Live profile object for preview
  const livePreviewProfile: Partial<VolunteerProfile> = {
    ...profile,
    avatar_url: avatarUrl,
    banner_color: bannerColor,
    banner_image_url: bannerImageUrl,
    avatar_decoration: avatarDecoration,
    profile_effect: profileEffect,
    custom_status: customStatus,
    custom_status_emoji: customStatusEmoji,
    pronouns: pronouns,
    bio: bio,
    phone: phone,
    school: school,
    grade: grade,
    organization: organization,
    languages: languages,
    approved_minutes: approvedMinutes,
  };

  const handleAddLanguage = () => {
    if (newLang.trim() && !languages.includes(newLang.trim())) {
      setLanguages([...languages, newLang.trim()]);
      setNewLang('');
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!school.trim()) {
      setErrorMsg('La escuela es obligatoria.');
      return;
    }

    try {
      setSaving(true);
      setErrorMsg(null);
      const res = await api.updateProfile({
        phone: phone.trim(),
        school: school.trim(),
        grade: grade.trim(),
        organization: organization.trim(),
        languages,
        bio: bio.trim(),
        avatar_url: avatarUrl,
        banner_color: bannerColor,
        banner_image_url: bannerImageUrl,
        avatar_decoration: avatarDecoration,
        profile_effect: profileEffect,
        custom_status: customStatus.trim(),
        custom_status_emoji: customStatusEmoji.trim(),
        pronouns: pronouns.trim(),
      });

      if (res && res.profile) {
        onSaveSuccess(res.profile);
      } else {
        throw new Error('Error al actualizar el perfil.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-[#0B111E] border border-sky-500/30 rounded-3xl p-5 sm:p-7 max-w-5xl w-full shadow-2xl space-y-6 my-auto max-h-[94vh] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30">
              <Palette size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  Personalización de Perfil & Efectos
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {approvedHours}h Aprobadas
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Desbloquea fondos animados, efectos visuales de partículas, marcos de avatar e insignias conforme acumules horas.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors self-end sm:self-auto"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#070D18] border border-slate-800 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('effects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'effects'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles size={14} className="text-amber-300" />
            <span>Efectos de Perfil</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('banners')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'banners'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers size={14} />
            <span>Banners & Fondos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('avatar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'avatar'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Crown size={14} />
            <span>Foto & Decoración de Avatar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'info'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <User size={14} />
            <span>Identidad & Estado</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Form Body with Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Tab Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* TAB 1: PROFILE EFFECTS (Efectos de Perfil como Hydro Blast, Sakura, etc.) */}
            {activeTab === 'effects' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-400" />
                    <span>Efectos Visuales de Perfil (Partículas & Animaciones)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Selecciona un efecto que flotará dinámicamente alrededor de tu tarjeta de perfil en el ranking público y privado.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROFILE_EFFECTS.map((effect) => {
                    const isLocked = approvedHours < effect.requiredHours;
                    const isSelected = profileEffect === effect.value;

                    return (
                      <button
                        type="button"
                        key={effect.id}
                        onClick={() => {
                          if (isLocked) {
                            setErrorMsg(
                              `Necesitas ${effect.requiredHours} horas de voluntariado para desbloquear "${effect.name}". Actualmente tienes ${approvedHours}h.`
                            );
                          } else {
                            setProfileEffect(effect.value);
                            setErrorMsg(null);
                          }
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[90px] cursor-pointer ${
                          isSelected
                            ? 'bg-sky-950/80 border-sky-400 ring-2 ring-sky-400/40 text-white shadow-lg'
                            : isLocked
                            ? 'bg-[#090E17]/60 border-slate-800/80 text-slate-500 opacity-70 hover:opacity-90'
                            : 'bg-[#0E1726]/80 border-slate-700/80 text-slate-300 hover:border-slate-500 hover:bg-[#121E31]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              {effect.id === 'hydro_blast' ? (
                                <Droplet size={15} className="text-cyan-400" />
                              ) : effect.id === 'golden_rays' ? (
                                <Crown size={15} className="text-amber-400" />
                              ) : (
                                <Sparkles size={15} className="text-pink-400" />
                              )}
                              <span className="text-xs font-bold text-white">{effect.name}</span>
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1 leading-snug">
                              {effect.description}
                            </span>
                          </div>

                          {isLocked ? (
                            <span className="shrink-0 p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 flex items-center gap-1 text-[10px] font-bold">
                              <Lock size={11} />
                              <span>{effect.requiredHours}h</span>
                            </span>
                          ) : isSelected ? (
                            <span className="shrink-0 p-1 rounded-full bg-sky-500 text-white">
                              <Check size={12} />
                            </span>
                          ) : (
                            <span className="shrink-0 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                              {effect.tag}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: BANNERS & FONDOS */}
            {activeTab === 'banners' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers size={16} className="text-sky-400" />
                    <span>Gradientes y Banners Desbloqueables</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Gradientes temáticos y estilos dinámicos por cada nivel de horas de voluntariado.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {BANNER_COSMETICS.map((banner) => {
                    const isLocked = approvedHours < banner.requiredHours;
                    const isSelected = bannerColor === banner.value && !bannerImageUrl;

                    return (
                      <button
                        type="button"
                        key={banner.id}
                        onClick={() => {
                          if (isLocked) {
                            setErrorMsg(
                              `Necesitas ${banner.requiredHours} horas de voluntariado para desbloquear "${banner.name}". Actualmente tienes ${approvedHours}h.`
                            );
                          } else {
                            setBannerColor(banner.value);
                            setBannerImageUrl(''); // Clear custom URL when selecting preset
                            setErrorMsg(null);
                          }
                        }}
                        className={`h-20 rounded-2xl bg-gradient-to-r ${
                          banner.value
                        } border-2 relative transition-all duration-150 p-2.5 flex flex-col justify-between text-left cursor-pointer overflow-hidden ${
                          isSelected
                            ? 'border-white ring-2 ring-sky-400 scale-[1.02] shadow-lg'
                            : isLocked
                            ? 'border-transparent opacity-60 hover:opacity-80'
                            : 'border-transparent hover:border-slate-400 opacity-90 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white">
                            {banner.tag}
                          </span>
                          {isLocked ? (
                            <span className="p-1 rounded bg-black/70 text-amber-300 flex items-center gap-0.5 text-[9px] font-bold">
                              <Lock size={10} />
                              <span>{banner.requiredHours}h</span>
                            </span>
                          ) : isSelected ? (
                            <span className="p-1 rounded-full bg-white text-slate-950">
                              <Check size={12} />
                            </span>
                          ) : null}
                        </div>

                        <span className="text-xs font-black text-white drop-shadow-md truncate">
                          {banner.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Banner Upload (25h+) */}
                <div className="p-4 rounded-2xl bg-[#0E1726] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={16} className="text-amber-400" />
                      <h4 className="text-xs font-bold text-white">Subir Banner Personalizado Propio</h4>
                    </div>
                    {approvedHours < 25 ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                        <Lock size={10} />
                        <span>Desbloquea con 25h</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        ¡Desbloqueado!
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400">
                    Sube una foto o ilustración para utilizarla como fondo principal de tu perfil.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <label
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        approvedHours >= 25
                          ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                          : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <Upload size={14} />
                      <span>Seleccionar Archivo</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={approvedHours < 25}
                        onChange={handleBannerFileChange}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="url"
                      disabled={approvedHours < 25}
                      value={bannerImageUrl}
                      onChange={(e) => setBannerImageUrl(e.target.value)}
                      placeholder="O pega una URL directa de imagen (https://...)"
                      className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 disabled:opacity-50"
                    />

                    {bannerImageUrl && (
                      <button
                        type="button"
                        onClick={() => setBannerImageUrl('')}
                        className="px-3 py-2 bg-rose-500/20 text-rose-300 rounded-xl text-xs font-bold hover:bg-rose-500/30"
                      >
                        Quitar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: AVATAR FOTO & DECORACIONES */}
            {activeTab === 'avatar' && (
              <div className="space-y-5">
                {/* Custom Photo Upload */}
                <div className="p-4 rounded-2xl bg-[#0E1726] border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-sky-400" />
                    <h4 className="text-xs font-bold text-white">Tu Foto de Perfil Oficial</h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Sube tu propia fotografía o avatar para que la comunidad y el ranking te reconozcan.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <label className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white border border-sky-500 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md">
                      <Upload size={14} />
                      <span>Subir Mi Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="url"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="O ingresa enlace de imagen (https://...)"
                      className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                    />

                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setAvatarUrl('')}
                        className="px-3 py-2 bg-rose-500/20 text-rose-300 rounded-xl text-xs font-bold hover:bg-rose-500/30"
                      >
                        Restablecer
                      </button>
                    )}
                  </div>
                </div>

                {/* Avatar Decorations / Marcos */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Crown size={14} className="text-amber-400" />
                    <span>Marcos y Decoraciones de Avatar</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {AVATAR_DECORATIONS.map((dec) => {
                      const isLocked = approvedHours < dec.requiredHours;
                      const isSelected = avatarDecoration === dec.value;

                      return (
                        <button
                          type="button"
                          key={dec.id}
                          onClick={() => {
                            if (isLocked) {
                              setErrorMsg(
                                `Necesitas ${dec.requiredHours} horas para desbloquear el marco "${dec.name}". Actualmente tienes ${approvedHours}h.`
                              );
                            } else {
                              setAvatarDecoration(dec.value);
                              setErrorMsg(null);
                            }
                          }}
                          className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-sky-950/80 border-sky-400 ring-2 ring-sky-400/40 text-white'
                              : isLocked
                              ? 'bg-[#090E17]/60 border-slate-800/80 text-slate-500 opacity-60'
                              : 'bg-[#0E1726]/80 border-slate-700/80 text-slate-300 hover:border-slate-500 hover:bg-[#121E31]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold ${dec.previewClass}`}
                            >
                              ✨
                            </div>
                            <div>
                              <span className="text-xs font-bold text-white block">{dec.name}</span>
                              <span className="text-[10px] text-slate-400">{dec.description}</span>
                            </div>
                          </div>

                          {isLocked ? (
                            <span className="shrink-0 p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 flex items-center gap-1 text-[10px] font-bold">
                              <Lock size={11} />
                              <span>{dec.requiredHours}h</span>
                            </span>
                          ) : isSelected ? (
                            <span className="p-1 rounded-full bg-sky-500 text-white">
                              <Check size={12} />
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: IDENTIDAD, ESTADO & INFORMACIÓN */}
            {activeTab === 'info' && (
              <div className="space-y-4">
                {/* Custom Status Message & Emoji */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Estado Personalizado & Emoji
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={customStatusEmoji}
                      onChange={(e) => setCustomStatusEmoji(e.target.value)}
                      className="h-11 px-3 bg-slate-900 border border-slate-800 rounded-xl text-lg text-center text-white focus:outline-none focus:border-sky-400 cursor-pointer"
                    >
                      {EMOJI_PRESETS.map((emoji) => (
                        <option key={emoji} value={emoji}>
                          {emoji}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={customStatus}
                      onChange={(e) => setCustomStatus(e.target.value)}
                      placeholder="Ej. Apoyando en biblioteca • Roosevelt High"
                      maxLength={100}
                      className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                {/* Pronouns & Academic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Pronombres
                    </label>
                    <input
                      type="text"
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      placeholder="él/he, ella/she, elle/they"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                    <div className="flex flex-wrap gap-1 pt-1">
                      {PRONOUN_PRESETS.map((p) => (
                        <button
                          type="button"
                          key={p}
                          onClick={() => setPronouns(p)}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(515) 555-0199"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Escuela / Colegio <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="Ej. Roosevelt High School"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Grado Escolar
                    </label>
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="Ej. 10° Grado / Sophomore"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Sobre Mí / Declaración de Impacto
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">{bio.length}/300</span>
                  </div>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={300}
                    rows={3}
                    placeholder="Cuéntanos sobre tus pasiones de voluntariado, metas cívicas y áreas donde te gusta servir..."
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400 resize-none leading-relaxed"
                  />
                </div>

                {/* Languages */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Idiomas que Hablas
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLang}
                      onChange={(e) => setNewLang(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddLanguage();
                        }
                      }}
                      placeholder="Añadir idioma (ej. Francés, Árabe)"
                      className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                    <button
                      type="button"
                      onClick={handleAddLanguage}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      + Agregar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {languages.map((l) => (
                      <span
                        key={l}
                        className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-medium flex items-center gap-1.5"
                      >
                        <span>{l}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLanguage(l)}
                          className="hover:text-rose-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Profile Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-sky-400" />
                <span>Vista Previa en Vivo</span>
              </div>
              <span className="text-[10px] text-emerald-400 lowercase font-mono">
                ● tiempo real
              </span>
            </div>

            <div className="sticky top-4">
              <VolunteerProfileCard
                profile={livePreviewProfile}
                stats={stats}
                isEditable={false}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 hidden sm:block">
            ✨ Todos los cambios se reflejan inmediatamente en el Ranking Público y en tu Panel de Control.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-sky-600/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              {saving ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Guardar Cambios de Perfil</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
