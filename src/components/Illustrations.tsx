interface Palette {
  sky: string; hill1: string; hill2: string; hill3: string; moon: string;
}

const PALETTES: Palette[] = [
  { sky: "#1c3a5c", hill1: "#2c6788", hill2: "#1d4e6a", hill3: "#0e2c44", moon: "#e0a23a" },
  { sky: "#1a3a3a", hill1: "#2e7d52", hill2: "#1f5a3a", hill3: "#0f3a26", moon: "#d49b3a" },
  { sky: "#0f4a52", hill1: "#1f6b6b", hill2: "#134a4a", hill3: "#082f30", moon: "#dca347" },
];

function MoonHill({ palette }: { palette: Palette }) {
  return (
    <svg viewBox="0 0 600 600" className="w-full h-full block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="600" fill={palette.sky} />
      <circle cx="380" cy="220" r="78" fill={palette.moon} />
      <ellipse cx="380" cy="226" rx="120" ry="14" fill={palette.moon} opacity="0.10" />
      <path d="M0,420 C140,330 240,360 360,330 C460,305 540,340 600,330 L600,600 L0,600 Z" fill={palette.hill3} opacity="0.92" />
      <path d="M0,470 C100,420 200,440 320,420 C420,402 520,440 600,420 L600,600 L0,600 Z" fill={palette.hill2} />
      <path d="M0,540 C100,500 220,520 320,500 C420,482 520,510 600,496 L600,600 L0,600 Z" fill={palette.hill1} />
      <g stroke={palette.hill2} strokeWidth="2" fill="none" opacity="0.25">
        <path d="M0,556 C120,524 240,540 360,524 C460,510 540,524 600,516" />
        <path d="M0,572 C120,544 240,560 360,544 C460,532 540,544 600,538" />
      </g>
      <g fill={palette.hill3} opacity="0.55">
        <circle cx="120" cy="500" r="6" />
        <circle cx="148" cy="498" r="5" />
        <circle cx="178" cy="502" r="7" />
        <circle cx="430" cy="488" r="6" />
        <circle cx="456" cy="486" r="5" />
      </g>
    </svg>
  );
}

export function MoonHillIllustration({ paletteIndex = 0, className = "" }: { paletteIndex?: number; className?: string }) {
  const palette = PALETTES[paletteIndex % PALETTES.length];
  return <div className={className}><MoonHill palette={palette} /></div>;
}

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 720" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f3a52" />
          <stop offset="55%" stopColor="#3d6680" />
          <stop offset="100%" stopColor="#e2a04b" />
        </linearGradient>
        <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f3a52" />
          <stop offset="100%" stopColor="#082434" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5b94a" stopOpacity="1" />
          <stop offset="55%" stopColor="#e08a2a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e08a2a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="720" fill="url(#hero-sky)" />
      <ellipse cx="540" cy="430" rx="220" ry="130" fill="url(#hero-sun)" opacity="0.7" />
      <circle cx="540" cy="430" r="42" fill="#f6c558" opacity="0.85" />
      <path d="M0,470 C120,430 220,440 360,420 C480,402 600,425 800,408 L800,500 L0,500 Z" fill="#1d3850" opacity="0.6" />
      <rect x="0" y="470" width="800" height="250" fill="url(#hero-sea)" />
      <ellipse cx="540" cy="478" rx="130" ry="6" fill="#f5b94a" opacity="0.5" />
      <ellipse cx="540" cy="498" rx="180" ry="5" fill="#f5b94a" opacity="0.30" />
      <ellipse cx="540" cy="520" rx="220" ry="4" fill="#f5b94a" opacity="0.20" />
      <ellipse cx="540" cy="548" rx="260" ry="3" fill="#f5b94a" opacity="0.13" />
      <g stroke="#7ac8e8" strokeWidth="1" fill="none" opacity="0.10">
        <path d="M0,560 Q200,556 400,560 Q600,564 800,560" />
        <path d="M0,592 Q200,588 400,592 Q600,596 800,592" />
        <path d="M0,632 Q200,628 400,632 Q600,636 800,632" />
        <path d="M0,680 Q200,676 400,680 Q600,684 800,680" />
      </g>
      <g fill="#0a2233" opacity="0.96">
        <rect x="50" y="404" width="32" height="68" />
        <rect x="86" y="392" width="22" height="80" />
        <rect x="112" y="412" width="38" height="60" />
        <rect x="154" y="386" width="26" height="86" />
        <rect x="184" y="404" width="22" height="68" />
        <rect x="210" y="396" width="34" height="76" />
        <rect x="248" y="412" width="20" height="60" />
        <rect x="272" y="404" width="28" height="68" />
      </g>
      <g fill="#f0c060" opacity="0.55">
        <rect x="58" y="420" width="3" height="3" />
        <rect x="68" y="430" width="3" height="3" />
        <rect x="92" y="410" width="3" height="3" />
        <rect x="158" y="408" width="3" height="3" />
        <rect x="166" y="420" width="3" height="3" />
        <rect x="218" y="412" width="3" height="3" />
        <rect x="280" y="418" width="3" height="3" />
      </g>
      <g fill="#0a2233">
        <rect x="318" y="368" width="10" height="106" />
        <path d="M323,378 L420,344 L420,350 L323,384 Z" />
        <path d="M323,378 L294,388 L294,384 L323,374 Z" />
        <rect x="288" y="384" width="14" height="10" rx="2" />
        <line x1="420" y1="346" x2="402" y2="430" stroke="#0a2233" strokeWidth="1.5" />
        <circle cx="402" cy="432" r="3" fill="none" stroke="#0a2233" strokeWidth="1.5" />
      </g>
      <g>
        <path d="M580,520 Q620,508 660,520 L658,535 L582,535 Z" fill="#f6f0e0" />
        <rect x="596" y="506" width="50" height="14" rx="2" fill="#e8dfc8" />
        <rect x="606" y="498" width="22" height="9" rx="1" fill="#d8cdb0" />
        <rect x="612" y="510" width="6" height="6" fill="#3a6a8a" opacity="0.5" />
        <rect x="624" y="510" width="6" height="6" fill="#3a6a8a" opacity="0.5" />
        <rect x="636" y="510" width="6" height="6" fill="#3a6a8a" opacity="0.5" />
      </g>
      <g>
        <path d="M180,558 Q210,548 240,558 L238,572 L182,572 Z" fill="#efe6cf" />
        <rect x="190" y="546" width="22" height="10" rx="1" fill="#d9cdab" />
        <line x1="200" y1="546" x2="200" y2="528" stroke="#aa9870" strokeWidth="1.6" />
        <path d="M200,528 L188,544 L200,528" stroke="#aa9870" strokeWidth="1.2" fill="none" />
      </g>
      <g fill="none" stroke="#e6dac5" strokeWidth="1.4" opacity="0.6" strokeLinecap="round">
        <path d="M120,180 q8,-7 16,0" />
        <path d="M150,210 q7,-6 14,0" />
        <path d="M188,170 q8,-7 16,0" />
        <path d="M250,200 q7,-6 14,0" />
      </g>
    </svg>
  );
}
