import React from 'react';

interface ProfileEffectLayerProps {
  effectId?: string;
  className?: string;
}

export const ProfileEffectLayer: React.FC<ProfileEffectLayerProps> = ({
  effectId = 'none',
  className = '',
}) => {
  if (!effectId || effectId === 'none') return null;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-20 ${className}`}
      aria-hidden="true"
    >
      {/* 1. HYDRO BLAST (Animated swirling water stream, glowing blue water droplets) */}
      {effectId === 'hydro_blast' && (
        <div className="absolute inset-0">
          {/* Swirling Aquatic Vortex Glow */}
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-cyan-400/20 blur-2xl animate-water-swirl" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-blue-500/20 blur-2xl animate-water-swirl" />

          {/* Water Splash Blobs / Droplets */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hydroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="hydroGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
              </linearGradient>
              <filter id="hydroGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Aquatic Splash Arcs */}
            <path
              d="M 20,40 Q 60,10 120,45 T 220,30"
              fill="none"
              stroke="url(#hydroGrad1)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#hydroGlow)"
              className="animate-pulse opacity-80"
            />
            <path
              d="M 180,180 Q 240,140 280,200 T 360,160"
              fill="none"
              stroke="url(#hydroGrad2)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#hydroGlow)"
              className="animate-pulse opacity-75"
            />

            {/* Floating Water Droplets */}
            <circle cx="35" cy="55" r="8" fill="url(#hydroGrad1)" filter="url(#hydroGlow)" className="animate-bounce" />
            <circle cx="270" cy="45" r="6" fill="url(#hydroGrad2)" filter="url(#hydroGlow)" />
            <circle cx="320" cy="110" r="10" fill="url(#hydroGrad1)" filter="url(#hydroGlow)" className="animate-pulse" />
            <circle cx="45" cy="200" r="7" fill="url(#hydroGrad2)" filter="url(#hydroGlow)" />
            <circle cx="160" cy="240" r="9" fill="url(#hydroGrad1)" filter="url(#hydroGlow)" className="animate-bounce" />
          </svg>
        </div>
      )}

      {/* 2. AUTUMN LEAVES */}
      {effectId === 'autumn_leaves' && (
        <div className="absolute inset-0">
          <div className="absolute top-2 left-6 text-amber-400/80 text-xl animate-[fallPetals_6s_linear_infinite]">🍂</div>
          <div className="absolute top-4 right-10 text-orange-400/80 text-lg animate-[fallPetals_8s_linear_infinite_1.5s]">🍁</div>
          <div className="absolute top-1/3 left-1/4 text-yellow-500/80 text-base animate-[fallPetals_7s_linear_infinite_3s]">🍂</div>
          <div className="absolute top-1/2 right-1/3 text-amber-500/80 text-xl animate-[fallPetals_9s_linear_infinite_4s]">🍁</div>
          <div className="absolute -top-4 right-6 text-orange-300/80 text-sm animate-[fallPetals_5s_linear_infinite_0.8s]">🍂</div>
        </div>
      )}

      {/* 3. SAKURA PETALS */}
      {effectId === 'sakura_petals' && (
        <div className="absolute inset-0">
          <div className="absolute top-1 left-8 text-pink-300/80 text-lg animate-[fallPetals_5s_linear_infinite]">🌸</div>
          <div className="absolute top-3 right-12 text-rose-300/80 text-base animate-[fallPetals_7s_linear_infinite_1s]">🌸</div>
          <div className="absolute top-1/4 left-1/3 text-pink-400/80 text-sm animate-[fallPetals_6s_linear_infinite_2.5s]">🌸</div>
          <div className="absolute top-1/2 right-1/4 text-pink-200/80 text-lg animate-[fallPetals_8s_linear_infinite_3.5s]">🌸</div>
          <div className="absolute -top-2 left-2/3 text-rose-400/80 text-xs animate-[fallPetals_6.5s_linear_infinite_4.5s]">🌸</div>
        </div>
      )}

      {/* 4. CYBER SPARKS */}
      {effectId === 'cyber_sparks' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_70%)] animate-pulse" />
          <div className="absolute top-4 left-6 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee] animate-ping" />
          <div className="absolute bottom-8 right-10 w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_15px_#e879f9] animate-ping" />
          <div className="absolute top-1/2 left-10 w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_10px_#d8b4fe] animate-pulse" />
          <div className="absolute top-1/3 right-8 w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_12px_#7dd3fc] animate-ping" />
        </div>
      )}

      {/* 5. NEON HEARTS */}
      {effectId === 'neon_hearts' && (
        <div className="absolute inset-0">
          <div className="absolute bottom-4 left-8 text-rose-400 text-lg animate-[floatParticle_4s_ease-in-out_infinite] filter drop-shadow-[0_0_8px_#f43f5e]">💖</div>
          <div className="absolute bottom-6 right-12 text-pink-400 text-base animate-[floatParticle_5s_ease-in-out_infinite_1.2s] filter drop-shadow-[0_0_8px_#ec4899]">💜</div>
          <div className="absolute bottom-10 left-1/3 text-fuchsia-400 text-xl animate-[floatParticle_4.5s_ease-in-out_infinite_2.4s] filter drop-shadow-[0_0_8px_#d946ef]">✨</div>
        </div>
      )}

      {/* 6. GOLDEN RAYS (SILVER CORD) with Soft Diffused Radial Mask */}
      {effectId === 'golden_rays' && (
        <div className="absolute inset-0">
          {/* Rotating Soft Rays with diffused center-out mask */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[conic-gradient(from_0deg,transparent_0deg,#F59E0B25_25deg,transparent_50deg,#F59E0B25_75deg,transparent_100deg,#F59E0B25_125deg,transparent_150deg,#F59E0B25_175deg,transparent_200deg,#F59E0B25_225deg,transparent_250deg,#F59E0B25_275deg,transparent_300deg,#F59E0B25_325deg,transparent_360deg)] rounded-full animate-gold-rays opacity-90 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
          />
          {/* Subtle golden floating sparkles */}
          <div className="absolute top-6 left-8 text-amber-300 text-sm animate-pulse filter drop-shadow-[0_0_6px_#fbbf24]">✨</div>
          <div className="absolute top-10 right-10 text-yellow-200 text-xs animate-ping filter drop-shadow-[0_0_8px_#fef08a]">⭐</div>
          <div className="absolute bottom-8 left-12 text-amber-400 text-sm animate-pulse filter drop-shadow-[0_0_6px_#f59e0b]">✨</div>
        </div>
      )}
    </div>
  );
};
