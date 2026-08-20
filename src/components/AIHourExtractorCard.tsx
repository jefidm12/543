import React, { useState } from 'react';
import { api, formatMinutes } from '../services/api';
import { formatDateMMDDYYYY } from '../utils/dateFormat';
import {
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  Building,
  Calendar,
  User,
  MapPin,
  FileText,
  AlertCircle,
  RefreshCw,
  Zap,
  Layers,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface AIHourExtractorCardProps {
  onApplySingleEntry?: (entry: any) => void;
  onBatchSubmitSuccess?: () => void;
}

const EXAMPLE_PROMPTS = [
  'El sábado pasado estuve de 9:00 am a 1:30 pm en Roosevelt High School ayudando en la feria de ciencias con la profesora Brenda Lucero organizando stands.',
  'Ayer martes 3 horas de 3:30 pm a 6:30 pm en la biblioteca de East High clasificando libros de texto con el supervisor Carlos Mendoza.',
  'Hice 4 horas de voluntariado en Food Bank of Iowa el 15 de febrero de 8:00 a 12:00 empacando alimentos para familias del distrito.',
];

export const AIHourExtractorCard: React.FC<AIHourExtractorCardProps> = ({
  onApplySingleEntry,
  onBatchSubmitSuccess,
}) => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedEntries, setExtractedEntries] = useState<any[]>([]);
  const [batchSubmitting, setBatchSubmitting] = useState(false);
  const [batchSuccessMsg, setBatchSuccessMsg] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!inputText.trim()) {
      setError('Por favor ingresa un texto o notas describiendo tus actividades.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setBatchSuccessMsg(null);
      const res = await api.extractHoursAI(inputText.trim());
      if (res.success && res.entries && res.entries.length > 0) {
        setExtractedEntries(res.entries);
      } else {
        setError('No logramos detectar actividades con horas válidas en el texto. Prueba siendo más específico con los horarios o fechas.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al procesar con IA.');
    } finally {
      setLoading(false);
    }
  };

  const handleBatchSubmit = async () => {
    if (extractedEntries.length === 0) return;

    try {
      setBatchSubmitting(true);
      setError(null);
      const res = await api.submitBatchHours(extractedEntries);
      if (res.success) {
        setBatchSuccessMsg(
          `¡Éxito! Se enviaron ${res.count} actividades (${formatMinutes(res.total_minutes)}) a revisión de staff.`
        );
        setExtractedEntries([]);
        setInputText('');
        if (onBatchSubmitSuccess) onBatchSubmitSuccess();
      } else {
        throw new Error(res.message || 'Error al enviar registros en lote.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al enviar en lote.');
    } finally {
      setBatchSubmitting(false);
    }
  };

  return (
    <div className="bg-[#07111F] border border-sky-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25">
            <Sparkles size={22} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                Asistente Inteligente de Horas (Gemini AI)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-[10px] font-bold">
                Auto-Extracción
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pega mensajes de WhatsApp, correos de profesores o notas libres. La IA extraerá horarios, fechas y detalles automáticamente.
            </p>
          </div>
        </div>
      </div>

      {/* Text Area Input */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} className="text-sky-400" />
            <span>Texto o Descripción Libre</span>
          </label>
          <span className="text-[10px] text-slate-500 font-mono">{inputText.length} caracteres</span>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
          placeholder="Ej: El pasado jueves 12 de febrero ayudé 3 horas de 10:00 am a 1:00 pm en Lincoln High School organizando la colecta de alimentos con la coordinadora Brenda Lucero..."
          className="w-full px-4 py-3 bg-[#0B192E] border border-slate-700/80 focus:border-sky-400 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none leading-relaxed resize-none shadow-inner"
        />

        {/* Quick Example Chips */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Ejemplos rápidos para probar:</span>
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLE_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(prompt)}
                className="text-[11px] px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-left max-w-xs truncate cursor-pointer"
                title={prompt}
              >
                💡 {prompt.substring(0, 45)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Extract Button */}
      <div className="flex items-center justify-between pt-2 relative z-10">
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Zap size={13} className="text-amber-400" />
          <span>Soporta múltiples actividades en un solo párrafo</span>
        </div>

        <button
          type="button"
          onClick={handleExtract}
          disabled={loading || !inputText.trim()}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95"
        >
          {loading ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              <span>Extrayendo con IA...</span>
            </>
          ) : (
            <>
              <Sparkles size={14} />
              <span>Extraer Horas con IA</span>
            </>
          )}
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 relative z-10 animate-fadeIn">
          <AlertCircle size={16} className="shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {batchSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 relative z-10 animate-fadeIn">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          <span>{batchSuccessMsg}</span>
        </div>
      )}

      {/* Results / Extracted Entries Display */}
      {extractedEntries.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800 relative z-10 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Actividades Detectadas ({extractedEntries.length})
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Listas para Enviar
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBatchSubmit}
                disabled={batchSubmitting}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                {batchSubmitting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Enviar Todas en Lote ({extractedEntries.length})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {extractedEntries.map((item, index) => (
              <div
                key={item.id || index}
                className="p-4 rounded-2xl bg-[#0B192E] border border-slate-700/80 hover:border-sky-500/50 transition-all space-y-3 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      <span>{item.activity_name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold">
                        {item.category || 'Servicio General'}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Building size={12} className="text-slate-500" />
                      <span>{item.organization_name}</span>
                      <span>•</span>
                      <Calendar size={12} className="text-slate-500" />
                      <span>{formatDateMMDDYYYY(item.date)}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-400 font-mono block">
                        {item.hours}h {item.minutes ? `${item.minutes}m` : ''} ({item.start_time || '09:00'} - {item.end_time || '12:00'})
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Confianza IA: {Math.round((item.confidence_score || 0.95) * 100)}%
                      </span>
                    </div>

                    {onApplySingleEntry && (
                      <button
                        type="button"
                        onClick={() => onApplySingleEntry(item)}
                        className="px-3 py-1.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        title="Rellenar en formulario manual"
                      >
                        <span>Aplicar</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-indigo-400" />
                    <span>Supervisor: <strong className="text-slate-200">{item.supervisor_name || 'Brenda Lucero'}</strong></span>
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-rose-400" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
