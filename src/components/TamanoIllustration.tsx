export default function TamanoIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 560"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Sky */}
        <linearGradient id="ti-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1c4a7e"/>
          <stop offset="52%"  stopColor="#4a98cc"/>
          <stop offset="100%" stopColor="#f2c870"/>
        </linearGradient>
        {/* Sea */}
        <linearGradient id="ti-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1a7a9a"/>
          <stop offset="100%" stopColor="#0d4668"/>
        </linearGradient>
        {/* Left mountain */}
        <linearGradient id="ti-mtnL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3a9060"/>
          <stop offset="100%" stopColor="#1a4c2e"/>
        </linearGradient>
        {/* Right hill */}
        <linearGradient id="ti-mtnR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3c8858"/>
          <stop offset="100%" stopColor="#1c5234"/>
        </linearGradient>
        {/* Far mountains (blue-tinted) */}
        <linearGradient id="ti-mtnFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5888a0"/>
          <stop offset="100%" stopColor="#2c5a70"/>
        </linearGradient>
        {/* Sun radial glow */}
        <radialGradient id="ti-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#f8b830" stopOpacity="0.9"/>
          <stop offset="60%"  stopColor="#f5a020" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#f5a020" stopOpacity="0"/>
        </radialGradient>
        {/* White fade overlay — ensures left text readability */}
        <linearGradient id="ti-overlay" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#fefcf8" stopOpacity="0.88"/>
          <stop offset="40%"  stopColor="#fefcf8" stopOpacity="0.55"/>
          <stop offset="62%"  stopColor="#fefcf8" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#fefcf8" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* ── SKY ── */}
      <rect width="1440" height="560" fill="url(#ti-sky)"/>

      {/* Sun glow */}
      <ellipse cx="880" cy="308" rx="200" ry="90"  fill="url(#ti-sun)" opacity="0.55"/>
      <ellipse cx="880" cy="308" rx="80"  ry="38"  fill="#f8c048" opacity="0.35"/>

      {/* ── CLOUDS ── */}
      <g opacity="0.82">
        <ellipse cx="240"  cy="82"  rx="95"  ry="28" fill="#e6f2fc"/>
        <ellipse cx="185"  cy="92"  rx="58"  ry="22" fill="#deeefa"/>
        <ellipse cx="300"  cy="90"  rx="68"  ry="25" fill="#e6f2fc"/>
        <ellipse cx="240"  cy="103" rx="115" ry="20" fill="#d8eaf8"/>
      </g>
      <g opacity="0.72">
        <ellipse cx="680"  cy="58"  rx="125" ry="34" fill="#eef6fa"/>
        <ellipse cx="616"  cy="70"  rx="75"  ry="26" fill="#e6f0f8"/>
        <ellipse cx="746"  cy="68"  rx="84"  ry="28" fill="#eef6fa"/>
        <ellipse cx="680"  cy="83"  rx="148" ry="22" fill="#e2eef6"/>
      </g>
      <g opacity="0.65">
        <ellipse cx="1230" cy="70"  rx="108" ry="28" fill="#f0f8fa"/>
        <ellipse cx="1175" cy="80"  rx="65"  ry="23" fill="#eaf4f8"/>
        <ellipse cx="1285" cy="79"  rx="74"  ry="25" fill="#f0f8fa"/>
      </g>

      {/* ── SEAGULLS ── */}
      <g fill="none" stroke="#daeef8" strokeWidth="1.6" opacity="0.55" strokeLinecap="round">
        <path d="M718,196 Q724,190 730,196"/>
        <path d="M736,184 Q742,178 748,184"/>
        <path d="M707,208 Q713,202 719,208"/>
        <path d="M762,180 Q769,173 776,180"/>
        <path d="M802,194 Q808,188 814,194"/>
        <path d="M854,171 Q860,165 866,171"/>
      </g>

      {/* ── FAR MOUNTAINS (horizon) ── */}
      <path
        d="M0,318 Q140,268 300,295 Q480,248 660,278
           Q840,238 1020,262 Q1220,232 1440,252
           L1440,375 L0,375 Z"
        fill="url(#ti-mtnFar)" opacity="0.62"
      />

      {/* ── SEA ── */}
      <rect x="0" y="312" width="1440" height="248" fill="url(#ti-sea)"/>

      {/* Sea shimmer lines */}
      <g stroke="#7ac8e8" strokeWidth="1.2" fill="none" opacity="0.12">
        <path d="M0,338 Q240,333 480,338 Q720,343 960,338 Q1200,333 1440,338"/>
        <path d="M0,358 Q240,353 480,358 Q720,363 960,358 Q1200,353 1440,358"/>
        <path d="M0,382 Q280,377 560,382 Q840,387 1120,382 Q1300,378 1440,382"/>
        <path d="M0,412 Q280,407 560,412 Q840,417 1120,412 Q1300,408 1440,412"/>
        <path d="M0,448 Q300,443 600,448 Q900,453 1200,448 Q1360,445 1440,448"/>
        <path d="M0,492 Q360,487 720,492 Q1080,497 1440,492"/>
      </g>

      {/* ── ISLANDS (瀬戸内の島々) ── */}
      <g>
        {/* Island A */}
        <ellipse cx="574" cy="318" rx="60"  ry="13" fill="#245838" opacity="0.88"/>
        <path d="M530,318 Q574,302 618,318 Z"          fill="#2e7048" opacity="0.82"/>
        {/* Island B */}
        <ellipse cx="988" cy="324" rx="40"  ry="10" fill="#204e30" opacity="0.84"/>
        <path d="M960,324 Q988,313 1016,324 Z"         fill="#286240" opacity="0.78"/>
        {/* Island C (small) */}
        <ellipse cx="1198" cy="320" rx="27" ry="7"  fill="#1e4a2c" opacity="0.78"/>
        {/* Island D (tiny) */}
        <ellipse cx="762"  cy="326" rx="18" ry="5"  fill="#245a36" opacity="0.72"/>
        {/* Island E */}
        <ellipse cx="1320" cy="328" rx="22" ry="6"  fill="#204828" opacity="0.70"/>
      </g>

      {/* ── LEFT MOUNTAIN ── */}
      <path
        d="M-80,560 L-80,385 Q0,322 85,282
           Q148,244 210,262 Q268,232 332,290
           Q395,250 435,314 L455,385 L455,560 Z"
        fill="url(#ti-mtnL)"
      />
      {/* Left mountain bright ridge */}
      <path
        d="M85,282 Q148,244 210,262 Q148,258 85,296 Z"
        fill="#4aaa72" opacity="0.30"
      />

      {/* ── RIGHT HILL ── */}
      <path
        d="M1110,560 L1090,402 Q1155,342 1235,312
           Q1308,290 1375,318 Q1428,308 1520,340
           L1520,560 Z"
        fill="url(#ti-mtnR)" opacity="0.90"
      />

      {/* ── CITY BUILDINGS silhouette ── */}
      <g fill="#16344e" opacity="0.82">
        {/* Back row */}
        <rect x="518" y="283" width="28"  height="57"/>
        <rect x="550" y="270" width="22"  height="70"/>
        <rect x="576" y="278" width="32"  height="62"/>
        <rect x="612" y="260" width="26"  height="80"/>
        <rect x="642" y="272" width="20"  height="68"/>
        <rect x="666" y="264" width="36"  height="76"/>
        <rect x="706" y="274" width="24"  height="66"/>
        <rect x="734" y="266" width="30"  height="74"/>
        <rect x="768" y="279" width="20"  height="61"/>
        <rect x="792" y="268" width="26"  height="72"/>
        {/* Front row */}
        <rect x="505" y="296" width="38"  height="64"/>
        <rect x="547" y="286" width="30"  height="74"/>
        <rect x="581" y="292" width="26"  height="68"/>
        <rect x="611" y="280" width="34"  height="80"/>
        <rect x="649" y="286" width="28"  height="74"/>
        <rect x="681" y="277" width="42"  height="83"/>
        <rect x="727" y="282" width="26"  height="78"/>
        <rect x="757" y="288" width="34"  height="72"/>
        <rect x="795" y="293" width="22"  height="67"/>
      </g>

      {/* Building windows */}
      <g fill="#88c4e0" opacity="0.18">
        {[
          [522,290],[530,290],[522,298],[530,298],
          [553,277],[561,277],[553,285],
          [616,268],[624,268],[616,276],
          [670,272],[678,272],[670,280],[678,280],
          [737,274],[745,274],[737,282],
          [795,275],[803,275],
          [685,284],[693,284],[685,292],[693,292],
          [614,287],[622,287],[614,295],
        ].map(([x,y], i) => (
          <rect key={i} x={x} y={y} width="4" height="4"/>
        ))}
      </g>

      {/* ── HARBOR / PIER ── */}
      <g fill="#122c40" opacity="0.88">
        {/* Main pier deck */}
        <rect x="578" y="318" width="230" height="11" rx="1"/>
        {/* Left pylon */}
        <rect x="578" y="318" width="8"   height="35"/>
        {/* Right pylon */}
        <rect x="800" y="318" width="8"   height="28"/>
        {/* Bollards */}
        {[598,618,642,672,706,738,770].map((x, i) => (
          <rect key={i} x={x} y={313} width="6" height="8" rx="1"/>
        ))}
        {/* Walkway railing */}
        <rect x="578" y="316" width="230" height="2" rx="1" opacity="0.5"/>
      </g>

      {/* ── HARBOR CRANE (造船の象徴) ── */}
      <g opacity="0.90">
        {/* Tower */}
        <rect x="846" y="278" width="14"  height="52" fill="#1e3c52"/>
        {/* Boom arm */}
        <path d="M846,284 L920,255 L920,260 L846,289 Z" fill="#1e3c52"/>
        {/* Counter-jib */}
        <path d="M846,284 L814,296 L814,292 L846,280 Z" fill="#1e3c52"/>
        {/* Counterweight */}
        <rect x="806" y="291" width="18"  height="10" rx="2" fill="#1e3c52"/>
        {/* Hoist cable */}
        <line x1="920" y1="258" x2="896" y2="318"
              stroke="#1e3c52" strokeWidth="1.5" opacity="0.75"/>
        {/* Hook */}
        <ellipse cx="896" cy="320" rx="4" ry="4" fill="none"
                 stroke="#1e3c52" strokeWidth="1.5" opacity="0.75"/>
        {/* Base structure */}
        <path d="M840,330 L860,330 L854,330 L854,328 L852,328 L852,330 L848,330 L848,328 L846,328 L846,330 Z"
              fill="#1e3c52" opacity="0.7"/>
      </g>

      {/* ── BOATS ── */}
      {/* Fishing boat */}
      <g>
        <path d="M636,344 Q662,336 688,344 L686,355 L638,355 Z" fill="#f0e8d2"/>
        <rect x="646" y="337" width="30" height="10" rx="1" fill="#ddd0b8" opacity="0.9"/>
        <path d="M660,337 L660,320" stroke="#c8b89a" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M660,320 L646,334 L660,320" stroke="#c8b89a" strokeWidth="1.2"
              fill="none" strokeLinecap="round"/>
        <path d="M636,351 Q662,355 688,351" stroke="#a09070" strokeWidth="1" fill="none" opacity="0.45"/>
      </g>

      {/* Ferry */}
      <g>
        <path d="M848,350 Q900,339 952,350 L950,362 L850,362 Z" fill="#f6f2ea"/>
        <rect x="866" y="337" width="66" height="17" rx="2" fill="#e8e0cc" opacity="0.95"/>
        <rect x="876" y="329" width="28" height="11" rx="1" fill="#ddd6c0"/>
        <rect x="898" y="324" width="10" height="14" rx="1" fill="#c8bea8"/>
        <rect x="880" y="337" width="10" height="10" fill="#3a6a8a" opacity="0.35"/>
        <rect x="894" y="337" width="10" height="10" fill="#3a6a8a" opacity="0.35"/>
        <rect x="908" y="337" width="10" height="10" fill="#3a6a8a" opacity="0.35"/>
        <path d="M848,356 Q900,360 952,356" stroke="#9a9080" strokeWidth="1" fill="none" opacity="0.40"/>
      </g>

      {/* Distant small boat */}
      <g opacity="0.65">
        <path d="M1060,332 Q1076,326 1092,332 L1091,340 L1061,340 Z" fill="#ede8e0"/>
        <path d="M1076,326 L1076,314" stroke="#c0b8a8" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M1076,314 L1064,326 L1076,326" fill="none" stroke="#c0b8a8" strokeWidth="1.2" strokeLinecap="round"/>
      </g>

      {/* ── OVERLAY (text readability on left) ── */}
      <rect width="1440" height="560" fill="url(#ti-overlay)"/>
    </svg>
  );
}
