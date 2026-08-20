import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api, formatMinutes } from '../../services/api';
import { VolunteerRankShields } from '../../components/VolunteerRankShields';
import { VolunteerProfileCard } from '../../components/DiscordProfileCard';
import { DiscordProfileCustomizerModal } from '../../components/DiscordProfileCustomizerModal';
import {
  Award,
  Phone,
  GraduationCap,
  Building,
  Globe,
  FileText,
  Mail,
  Calendar,
  CheckCircle2,
  Edit3,
  Save,
  X,
  Shield,
  Clock,
  Sparkles,
  Crown,
  Medal,
  Palette,
} from 'lucide-react';

export const VolunteerProfileView: React.FC = () => {
  const { user, profile, stats, updateLocalProfile } = useAuth();

  const [showCustomizer, setShowCustomizer] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleProfileSaved = (updated: any) => {
    updateLocalProfile(updated);
    setShowCustomizer(false);
    setSuccessMsg('¡Perfil de voluntario y efectos actualizados con éxito!');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <X size={16} className="text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 160+ Hours Silver Cord Official Completion Banner */}
      {(stats?.approved_minutes || 0) >= 9600 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#171105] via-[#2A1E07] to-[#171105] border-2 border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.25)] relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                  <Crown size={24} className="text-amber-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                    Graduado Oficial Silver Cord
                  </span>
                  <span className="text-xs text-amber-400 font-bold hidden sm:inline">★ 160+ Horas Cumplidas</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight mt-0.5">
                  Programa Silver Cord de Des Moines Public Schools Completado
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Has obtenido con honor el <strong>Cordón de Plata de Graduación</strong> y la máxima mención distrital. Sigue registrando horas para ampliar tu legado cívico.
                </p>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold text-center shrink-0">
              <div className="text-[10px] text-amber-400/80 uppercase font-semibold">Estado Oficial</div>
              <div>ACREDITADO PARA TOGA</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Discord Profile Header Card */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Palette size={14} className="text-[#5865F2]" />
            <span>Perfil de Voluntario Personalizable</span>
          </span>
          <button
            onClick={() => setShowCustomizer(true)}
            className="px-3.5 py-1.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Edit3 size={13} />
            <span>Personalizar Perfil & Efectos</span>
          </button>
        </div>

        <VolunteerProfileCard
          profile={profile}
          stats={stats}
          isEditable={true}
          onEdit={() => setShowCustomizer(true)}
        />
      </div>

      {/* Stats Breakdown Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-[#07111F] rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Horas Aprobadas</span>
          <span className="text-lg font-black text-emerald-400 font-mono mt-1 block">
            {formatMinutes(stats?.approved_minutes || 0)}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {stats?.approved_hours || Math.round((stats?.approved_minutes || 0) / 60)}h certificadas
          </span>
        </div>

        <div className="p-4 bg-[#07111F] rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Horas Pendientes</span>
          <span className="text-lg font-black text-amber-400 font-mono mt-1 block">
            {formatMinutes(stats?.pending_minutes || 0)}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">En revisión por staff</span>
        </div>

        <div className="p-4 bg-[#07111F] rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Registros</span>
          <span className="text-lg font-black text-white font-mono mt-1 block">
            {stats?.total_submissions || 0}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Actividades enviadas</span>
        </div>

        <div className="p-4 bg-[#07111F] rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">ID Inmutable</span>
          <span className="text-base font-black text-[#5865F2] font-mono mt-1 block truncate">
            {profile?.volunteer_id}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Folio oficial DMPS</span>
        </div>
      </div>

      {/* Ranks, Tier Shields & Achievement Badges with Details */}
      <VolunteerRankShields
        approvedMinutes={stats?.approved_minutes || 0}
        totalSubmissions={stats?.total_submissions || 0}
        volunteerProfile={{
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          volunteer_id: profile?.volunteer_id,
          school: profile?.school,
          grade: profile?.grade,
          join_date: profile?.join_date,
          phone: profile?.phone,
          email: profile?.email,
        }}
      />

      {/* Security and Privacy statement */}
      <div className="p-4 rounded-2xl bg-[#050A14] border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
        <Shield size={18} className="text-[#5865F2] shrink-0" />
        <span>
          <strong>Privacidad Protegida:</strong> Tu perfil y datos personales son privados y solo son visibles para ti y para los coordinadores de staff autorizados para la validación de horas.
        </span>
      </div>

      {/* Discord Profile Customizer Modal */}
      {showCustomizer && profile && (
        <DiscordProfileCustomizerModal
          profile={profile}
          stats={stats || {}}
          onClose={() => setShowCustomizer(false)}
          onSaveSuccess={handleProfileSaved}
        />
      )}
    </div>
  );
};
