export interface CosmeticItem {
  id: string;
  name: string;
  category: 'banner' | 'avatar_decoration' | 'profile_effect';
  requiredHours: number;
  description: string;
  previewClass?: string;
  value: string;
  tag?: string;
  animated?: boolean;
}

export const BANNER_COSMETICS: CosmeticItem[] = [
  // 0 Hours - Nivel Inicial
  {
    id: 'banner_ocean',
    name: 'Océano DMPS Clásico',
    category: 'banner',
    requiredHours: 0,
    description: 'Gradiente marino oficial de Des Moines Public Schools.',
    value: 'from-[#0284C7] via-[#0369A1] to-[#07192F]',
    tag: 'Inicial',
  },
  {
    id: 'banner_midnight',
    name: 'Medianoche Cyber',
    category: 'banner',
    requiredHours: 0,
    description: 'Tonalidad sobria y elegante de medianoche.',
    value: 'from-[#0F172A] via-[#1E293B] to-[#0A0F1D]',
    tag: 'Inicial',
  },
  {
    id: 'banner_royal_blue',
    name: 'Azul Real Escolar',
    category: 'banner',
    requiredHours: 0,
    description: 'Estilo clásico institucional de alta visibilidad.',
    value: 'from-[#2563EB] to-[#1D4ED8]',
    tag: 'Inicial',
  },

  // 10 Hours - Nivel Plata
  {
    id: 'banner_emerald_elite',
    name: 'Aurora Esmeralda',
    category: 'banner',
    requiredHours: 10,
    description: 'Gradiente verde esmeralda brillante con matices bosque.',
    value: 'from-[#059669] via-[#064E3B] to-[#022C22]',
    tag: '10h Plata',
  },
  {
    id: 'banner_mystic_amethyst',
    name: 'Lavanda Crepúsculo',
    category: 'banner',
    requiredHours: 10,
    description: 'Tonalidades violetas y amatista mística.',
    value: 'from-[#7C3AED] via-[#4C1D95] to-[#1E1035]',
    tag: '10h Plata',
  },

  // 25 Hours - Nivel Oro
  {
    id: 'banner_golden_dawn',
    name: 'Obsidiana Dorada',
    category: 'banner',
    requiredHours: 25,
    description: 'Gradiente ámbar y oro quemado de liderazgo comunitario.',
    value: 'from-[#D97706] via-[#78350F] to-[#1E1B18]',
    tag: '25h Oro',
  },
  {
    id: 'banner_crimson_realm',
    name: 'Carmesí Real',
    category: 'banner',
    requiredHours: 25,
    description: 'Rojo carmesí profundo con halo rubí de honor.',
    value: 'from-[#E11D48] via-[#881337] to-[#1F0A10]',
    tag: '25h Oro',
  },

  // 50 Hours - Nivel Platino
  {
    id: 'banner_cosmic_nebula',
    name: 'Nebulosa Cósmica',
    category: 'banner',
    requiredHours: 50,
    description: 'Fusión interestelar de púrpuras, rosas y destellos celestes.',
    value: 'from-[#4F46E5] via-[#7C3AED] to-[#DB2777]',
    tag: '50h Platino',
  },
  {
    id: 'banner_starlight_animated',
    name: 'Starlight Shimmer (Dinámico)',
    category: 'banner',
    requiredHours: 50,
    description: 'Banner dinámico con destellos celestiales continuos.',
    value: 'from-[#1E1B4B] via-[#4338CA] to-[#065F46]',
    tag: '50h Platino',
    animated: true,
  },

  // 100 Hours - Nivel Diamante
  {
    id: 'banner_solar_flare',
    name: 'Fuego Solar Radiante (Animado)',
    category: 'banner',
    requiredHours: 100,
    description: 'Energía solar viva para los voluntarios más dedicados del distrito.',
    value: 'from-[#EA580C] via-[#DC2626] to-[#7C2D12]',
    tag: '100h Diamante',
    animated: true,
  },
  {
    id: 'banner_aurora_borealis',
    name: 'Aurora Boreal Legendaria (Animada)',
    category: 'banner',
    requiredHours: 100,
    description: 'Marea de colores norteños en constante movimiento ondulatorio.',
    value: 'from-[#0D9488] via-[#2563EB] to-[#9333EA]',
    tag: '100h Diamante',
    animated: true,
  },

  // 160 Hours - Máximo Nivel Silver Cord
  {
    id: 'banner_silver_cord_supreme',
    name: 'Silver Cord Mítico Supremo (160h)',
    category: 'banner',
    requiredHours: 160,
    description: 'Corona dorada mítica con destellos y partículas de graduación.',
    value: 'from-[#F59E0B] via-[#D97706] to-[#451A03]',
    tag: '160h Graduado',
    animated: true,
  },
];

export const AVATAR_DECORATIONS: CosmeticItem[] = [
  // 0 Hours
  {
    id: 'none',
    name: 'Ninguno',
    category: 'avatar_decoration',
    requiredHours: 0,
    description: 'Sin decoración adicional en el avatar.',
    value: 'none',
    previewClass: 'border-slate-700/60 ring-0',
    tag: 'Básico',
  },
  {
    id: 'student_ring',
    name: 'Aro Estudiantil DMPS',
    category: 'avatar_decoration',
    requiredHours: 0,
    description: 'Borde cian sutil de inicio en el programa.',
    value: 'student_ring',
    previewClass: 'border-sky-500/80 ring-2 ring-sky-500/30 shadow-[0_0_10px_rgba(14,165,233,0.3)]',
    tag: 'Inicial',
  },

  // 10 Hours
  {
    id: 'silver_ring',
    name: 'Aro Plateado Brillante',
    category: 'avatar_decoration',
    requiredHours: 10,
    description: 'Marco pulido de plata reflectante.',
    value: 'silver_ring',
    previewClass: 'border-slate-200 ring-2 ring-slate-400/50 shadow-[0_0_15px_rgba(203,213,225,0.4)]',
    tag: '10h Plata',
  },

  // 25 Hours
  {
    id: 'gold_crown',
    name: 'Corona & Laurel Dorado',
    category: 'avatar_decoration',
    requiredHours: 25,
    description: 'Aura dorada con resplandor cívico.',
    value: 'gold_crown',
    previewClass: 'border-amber-400 ring-2 ring-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    tag: '25h Oro',
  },

  // 50 Hours
  {
    id: 'emerald_halo',
    name: 'Halo Esmeralda Místico',
    category: 'avatar_decoration',
    requiredHours: 50,
    description: 'Corona de energía esmeralda y naturaleza.',
    value: 'emerald_halo',
    previewClass: 'border-emerald-400 ring-2 ring-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.5)]',
    tag: '50h Platino',
  },
  {
    id: 'cyber_neon',
    name: 'Anillo Cyberpunk Neón',
    category: 'avatar_decoration',
    requiredHours: 50,
    description: 'Doble anillo holográfico neón azul y magenta.',
    value: 'cyber_neon',
    previewClass: 'border-cyan-400 ring-2 ring-pink-500/60 shadow-[0_0_20px_rgba(236,72,153,0.6)] animate-cyber-pulse',
    tag: '50h Platino',
    animated: true,
  },

  // 100 Hours
  {
    id: 'diamond_sparkle',
    name: 'Diamante Astral Resplandeciente',
    category: 'avatar_decoration',
    requiredHours: 100,
    description: 'Marco estelar de destellos de diamante puro.',
    value: 'diamond_sparkle',
    previewClass: 'border-sky-300 ring-4 ring-indigo-400/70 shadow-[0_0_25px_rgba(99,102,241,0.7)]',
    tag: '100h Diamante',
  },
  {
    id: 'flame_fire',
    name: 'Fuego Servidor Comunitario',
    category: 'avatar_decoration',
    requiredHours: 100,
    description: 'Llamas ardientes de servicio inquebrantable.',
    value: 'flame_fire',
    previewClass: 'border-orange-500 ring-4 ring-red-500/70 shadow-[0_0_25px_rgba(249,115,22,0.7)]',
    tag: '100h Diamante',
  },

  // 160 Hours
  {
    id: 'supreme_silver_cord',
    name: 'Corona Suprema Silver Cord (160h)',
    category: 'avatar_decoration',
    requiredHours: 160,
    description: 'Condecoración máxima de graduación con fulgor áureo perpetuo.',
    value: 'supreme_silver_cord',
    previewClass: 'border-amber-300 ring-4 ring-yellow-400/80 shadow-[0_0_30px_rgba(252,211,77,0.85)] animate-pulse',
    tag: '160h Graduado',
    animated: true,
  },
];

export const PROFILE_EFFECTS: CosmeticItem[] = [
  // 0 Hours
  {
    id: 'none',
    name: 'Ninguno',
    category: 'profile_effect',
    requiredHours: 0,
    description: 'Sin efecto de fondo animado en la tarjeta.',
    value: 'none',
    tag: 'Estándar',
  },

  // 10 Hours
  {
    id: 'autumn_leaves',
    name: 'Hojas de Otoño Flotantes',
    category: 'profile_effect',
    requiredHours: 10,
    description: 'Hojas doradas de roble y arce que descienden suavemente.',
    value: 'autumn_leaves',
    tag: '10h Plata',
    animated: true,
  },

  // 25 Hours
  {
    id: 'hydro_blast',
    name: 'Hydro Blast (Ondas de Agua)',
    category: 'profile_effect',
    requiredHours: 25,
    description: 'Chorros de agua azul brillante y burbujas de energía que giran alrededor del perfil.',
    value: 'hydro_blast',
    tag: '25h Oro',
    animated: true,
  },

  // 50 Hours
  {
    id: 'sakura_petals',
    name: 'Lluvia de Pétalos Sakura',
    category: 'profile_effect',
    requiredHours: 50,
    description: 'Pétalos de flor de cerezo rosados en suave brisa flotante.',
    value: 'sakura_petals',
    tag: '50h Platino',
    animated: true,
  },

  // 100 Hours
  {
    id: 'cyber_sparks',
    name: 'Relámpagos & Chispas Neón',
    category: 'profile_effect',
    requiredHours: 100,
    description: 'Chispas eléctricas y pulsos cibernéticos de alta energía.',
    value: 'cyber_sparks',
    tag: '100h Diamante',
    animated: true,
  },
  {
    id: 'neon_hearts',
    name: 'Corazones Neón Solidarios',
    category: 'profile_effect',
    requiredHours: 100,
    description: 'Auras de corazones luminiscentes que representan el amor por la comunidad.',
    value: 'neon_hearts',
    tag: '100h Diamante',
    animated: true,
  },

  // 160 Hours
  {
    id: 'golden_rays',
    name: 'Rayos Legendarios Silver Cord',
    category: 'profile_effect',
    requiredHours: 160,
    description: 'Aura majestuosa de rayos dorados difuminados y destellos de honor.',
    value: 'golden_rays',
    tag: '160h Graduado',
    animated: true,
  },
];
