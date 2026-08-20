import React from 'react';
import {
  Award,
  Crown,
  Medal,
  Star,
  Shield,
  GraduationCap,
  Calendar,
  Clock,
  Sparkles,
  Heart,
  Globe,
  Flame,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { formatDateMMDDYYYY } from '../utils/dateFormat';
import { formatMinutes } from '../services/api';
import { VolunteerProfile, VolunteerStats } from '../types';
import { ProfileEffectLayer } from './ProfileEffectLayer';
import {
  BANNER_COSMETICS,
  AVATAR_DECORATIONS,
  PROFILE_EFFECTS,
} from '../data/profileCosmeticsCatalog';
import { ACHIEVEMENTS_CATALOG } from '../data/achievementsCatalog';

interface VolunteerProfileCardProps {
  profile?: Partial<VolunteerProfile> | null;
  stats?: Partial<VolunteerStats> | null;
  onEdit?: () => void;
  isEditable?: boolean;
}

export const VolunteerProfileCard: React.FC<VolunteerProfileCardProps> = ({
  profile,
  stats,
  onEdit,
  isEditable = false,
}) => {
  const approvedMinutes = stats?.approved_minutes || profile?.approved_minutes || 0;
  const approvedHours = stats?.approved_hours || Math.round(approvedMinutes / 60);
  const isSilverCord = approvedMinutes >= 9600; // 160h

  // User initials fallback
  const firstName = profile?.first_name || 'Voluntario';
  const lastName = profile?.last_name || 'DMPS';
  const initials = `${firstName[0] || 'V'}${lastName[0] || 'D'}`.toUpperCase();

  // Banner handling
  const bannerColor = profile?.banner_color || 'from-[#0284C7] via-[#0369A1] to-[#07192F]';
  const bannerImageUrl = profile?.banner_image_url;
  const isGradient = bannerColor.includes('from-') || bannerColor.includes('gradient');

  // Avatar decoration styling
  const decId = profile?.avatar_decoration || 'none';
  const decItem = AVATAR_DECORATIONS.find((d) => d.id === decId) || AVATAR_DECORATIONS[0];
  const decBorderClass = decItem.previewClass || 'border-slate-700/60 ring-0';

  // Profile Effect
  const activeEffectId = profile?.profile_effect || 'none';

  // Calculate earned milestone badges to show in the badge showcase
  const earnedBadges = ACHIEVEMENTS_CATALOG.filter((b) => {
    if (b.unlockedAt.hours && approvedHours >= b.unlockedAt.hours) return true;
    if (b.unlockedAt.submissionsCount && (stats?.total_submissions || 0) >= b.unlockedAt.submissionsCount) return true;
    return false;
  });

  return (
    <div className="w-full bg-[#0D121F] text-white rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden font-sans select-none relative group">
      {/* Active Profile Animated Effect Layer (e.g. Hydro Blast, Sakura, Golden Rays, etc.) */}
      <ProfileEffectLayer effectId={activeEffectId} />

      {/* 1. Header Banner */}
      <div
        className={`h-36 sm:h-44 w-full relative transition-all duration-300 ${
          isGradient ? `bg-gradient-to-r ${bannerColor}` : ''
        }`}
        style={
          bannerImageUrl
            ? {
                backgroundImage: `url(${bannerImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : !isGradient
            ? { backgroundColor: bannerColor }
            : undefined
        }
      >
        {/* Banner Overlay Pattern & Highlights */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0D121F]/90" />

        {isSilverCord && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/60 text-amber-300 text-[11px] font-extrabold shadow-lg">
            <Crown size={14} className="text-amber-400 animate-pulse" />
            <span>GRADUADO SILVER CORD (160h)</span>
          </div>
        )}

        {/* Edit Profile Button on banner */}
        {isEditable && onEdit && (
          <button
            onClick={onEdit}
            className="absolute top-3 right-3 z-30 px-3.5 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer hover:border-sky-400"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>Personalizar Perfil</span>
          </button>
        )}
      </div>

      {/* 2. Avatar & Honor Badges Row */}
      <div className="px-5 sm:px-6 pb-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-18 gap-4 mb-4">
          {/* Avatar Container with Decorations */}
          <div className="relative inline-block">
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#161F30] p-1.5 flex items-center justify-center relative shadow-2xl transition-all ${decBorderClass}`}
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={firstName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0284C7] to-[#2563EB] flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-inner">
                  {initials}
                </div>
              )}

              {/* Status Indicator Dot */}
              <div
                className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-[3.5px] border-[#0D121F] shadow-md flex items-center justify-center"
                title="Voluntario Activo"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-90" />
              </div>
            </div>
          </div>

          {/* Honor Badges & Milestone Insignias */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#141C2E]/90 backdrop-blur-md border border-slate-700/60 px-3 py-1.5 rounded-2xl shadow-inner self-start sm:self-auto max-w-full">
            {/* Rank Shield */}
            <div
              className="p-1.5 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center gap-1 text-[11px] font-bold"
              title={`Nivel de Servicio: ${
                approvedHours >= 160
                  ? 'Diamante Silver Cord'
                  : approvedHours >= 50
                  ? 'Platino'
                  : approvedHours >= 25
                  ? 'Oro'
                  : approvedHours >= 10
                  ? 'Plata'
                  : 'Bronce'
              }`}
            >
              <Shield size={14} className="text-sky-400" />
              <span>
                {approvedHours >= 160
                  ? 'Diamante'
                  : approvedHours >= 50
                  ? 'Platino'
                  : approvedHours >= 25
                  ? 'Oro'
                  : approvedHours >= 10
                  ? 'Plata'
                  : 'Bronce'}
              </span>
            </div>

            {/* Silver Cord Graduation Crown */}
            {isSilverCord && (
              <div
                className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 text-[11px] font-bold"
                title="160+ Horas de Servicio Comunitario Cumplidas (Silver Cord Oficial)"
              >
                <Crown size={14} className="text-amber-400" />
                <span>Silver Cord</span>
              </div>
            )}

            {/* Official Verification */}
            <div
              className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 text-[11px] font-bold"
              title="Voluntario Oficial Acreditado DMPS"
            >
              <CheckCircle2 size={14} />
              <span>Verificado</span>
            </div>

            {/* Streak */}
            {(stats?.total_submissions || 0) >= 3 && (
              <div
                className="p-1.5 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center gap-1 text-[11px] font-bold"
                title="Servidor Comunitario Frecuente"
              >
                <Flame size={14} />
                <span>Activo</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. User Identity & Details Box */}
        <div className="bg-[#141C2E]/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
          {/* Names, Pronouns & Identifier */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {firstName} {lastName}
              </h2>
              {profile?.pronouns && (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold border border-slate-700">
                  {profile.pronouns}
                </span>
              )}
            </div>

            <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="text-sky-400 font-bold">{profile?.volunteer_id || 'VOL-00000'}</span>
              <span>•</span>
              <span className="text-slate-500">
                voluntario@{profile?.school?.toLowerCase().replace(/\s+/g, '') || 'dmps'}
              </span>
            </div>
          </div>

          {/* Custom Status Message */}
          {(profile?.custom_status || profile?.custom_status_emoji) && (
            <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-[#0B101D] border border-slate-800 text-xs text-slate-200">
              <span className="text-sm">{profile.custom_status_emoji || '💬'}</span>
              <span className="truncate">{profile.custom_status}</span>
            </div>
          )}

          {/* Medals and Achievement Showcase Bar */}
          {earnedBadges.length > 0 && (
            <div className="p-3 rounded-xl bg-[#0A0E1A] border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Medal size={13} className="text-amber-400" />
                  <span>Insignias de Honor Desbloqueadas ({earnedBadges.length})</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {approvedHours}h acumuladas
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {earnedBadges.slice(0, 7).map((badge) => (
                  <div
                    key={badge.id}
                    className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 bg-gradient-to-r ${badge.colorGrade} text-white shadow-sm`}
                    title={`${badge.name}: ${badge.requirement}`}
                  >
                    <span>{badge.discordEmoji}</span>
                    <span className="truncate max-w-[120px]">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-[1px] bg-slate-800" />

          {/* About Me Section */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Sobre Mí / Declaración de Impacto
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {profile?.bio ||
                '¡Hola! Soy voluntario activo en las escuelas de Des Moines participando en eventos y actividades comunitarias.'}
            </p>
          </div>

          {/* Activity / Volunteer Focus */}
          <div className="space-y-2 pt-1">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Actividad Escolar & Voluntariado
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#0B101D] border border-slate-800 flex items-center gap-2.5">
                <GraduationCap size={16} className="text-sky-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">Escuela / Colegio</span>
                  <span className="text-white font-semibold truncate block">
                    {profile?.school || 'No especificada'}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0B101D] border border-slate-800 flex items-center gap-2.5">
                <Clock size={16} className="text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">Horas Aprobadas</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {formatMinutes(approvedMinutes)} ({approvedHours.toFixed(1)}h)
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0B101D] border border-slate-800 flex items-center gap-2.5">
                <Calendar size={16} className="text-sky-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">Miembro Desde</span>
                  <span className="text-white font-medium">
                    {formatDateMMDDYYYY(profile?.join_date || new Date().toISOString())}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0B101D] border border-slate-800 flex items-center gap-2.5">
                <Globe size={16} className="text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">Idiomas</span>
                  <span className="text-white font-medium truncate block">
                    {profile?.languages && profile.languages.length > 0
                      ? profile.languages.join(', ')
                      : 'Español, Inglés'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Aliases for compatibility
export const DiscordProfileCard = VolunteerProfileCard;
export const DISCORD_BANNER_PALETTES = BANNER_COSMETICS.map((b) => ({
  name: b.name,
  value: b.value,
}));
