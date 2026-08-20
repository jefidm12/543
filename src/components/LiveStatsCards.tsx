import React, { useEffect, useState } from 'react';
import {
  Clock,
  Users,
  Calendar,
  Award,
  Crown,
  GraduationCap,
  Building,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { api, formatMinutes } from '../services/api';
import { LiveCommunityStats } from '../types';

interface LiveStatsCardsProps {
  variant?: 'grid' | 'compact';
  onNavigate?: (view: string) => void;
}

export const LiveStatsCards: React.FC<LiveStatsCardsProps> = ({ variant = 'grid', onNavigate }) => {
  const [stats, setStats] = useState<LiveCommunityStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    // Auto-refresh every 30 seconds for live feel
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.getLiveCommunityStats();
      if (res.success && res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      console.error('Error fetching live stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      id: 'hours',
      label: 'Horas Servidas',
      sublabel: `${stats ? formatMinutes(stats.total_approved_minutes) : '0 h'} totales`,
      value: stats ? `${stats.total_approved_hours.toLocaleString()} h` : '—',
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      glow: 'from-amber-500/10 to-transparent',
    },
    {
      id: 'volunteers',
      label: 'Voluntarios Registrados',
      sublabel: 'Estudiantes y líderes activos',
      value: stats ? stats.total_volunteers.toLocaleString() : '—',
      icon: Users,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20 hover:border-sky-500/40',
      glow: 'from-sky-500/10 to-transparent',
      onClick: onNavigate ? () => onNavigate('public-ranking') : undefined,
    },
    {
      id: 'events',
      label: 'Eventos & Convocatorias',
      sublabel: `${stats?.total_open_events || 0} con inscripción abierta`,
      value: stats ? stats.total_events.toLocaleString() : '—',
      icon: Calendar,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      glow: 'from-emerald-500/10 to-transparent',
      onClick: onNavigate ? () => onNavigate('public-events') : undefined,
    },
    {
      id: 'certificates',
      label: 'Diplomas & Certificados',
      sublabel: 'Acreditados con folio oficial',
      value: stats ? stats.total_certificates_issued.toLocaleString() : '—',
      icon: Award,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20 hover:border-indigo-500/40',
      glow: 'from-indigo-500/10 to-transparent',
    },
    {
      id: 'silver_cord',
      label: 'Silver Cord (160h)',
      sublabel: 'Máximo galardón de honor',
      value: stats ? stats.silver_cord_honorees_count.toLocaleString() : '—',
      icon: Crown,
      color: 'text-yellow-300',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30 hover:border-yellow-500/50',
      glow: 'from-yellow-500/10 to-transparent',
      onClick: onNavigate ? () => onNavigate('public-ranking') : undefined,
    },
    {
      id: 'schools',
      label: 'Escuelas & Programas',
      sublabel: 'Comunidades impactadas',
      value: stats ? stats.schools_impacted_count.toLocaleString() : '5',
      icon: GraduationCap,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      glow: 'from-cyan-500/10 to-transparent',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-28 rounded-2xl bg-slate-900/60 border border-slate-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-sky-400 font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Activity size={14} />
          <span>Impacto Comunitario en Tiempo Real</span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">Actualizado en vivo</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statItems.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.onClick}
              className={`p-4 rounded-2xl bg-gradient-to-b from-[#0B1728] to-[#07111F] border ${
                item.border
              } transition-all duration-200 shadow-lg relative overflow-hidden group ${
                item.onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
              }`}
            >
              {/* Subtle top-right glow */}
              <div
                className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${item.glow} blur-xl pointer-events-none`}
              />

              <div className="flex items-center justify-between gap-1 mb-2">
                <div className={`p-2 rounded-xl ${item.bg} ${item.color} shrink-0`}>
                  <Icon size={18} />
                </div>
                {item.id === 'silver_cord' && (
                  <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                    TOP
                  </span>
                )}
              </div>

              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-slate-200 line-clamp-1">{item.label}</div>
                <div className="text-[10px] text-slate-400 line-clamp-1">{item.sublabel}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
