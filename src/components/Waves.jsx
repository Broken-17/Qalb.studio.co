/* Soft silk-wave lines, echoing the brand's black-and-grain artwork. Purely decorative. */
export default function Waves({ className = '' }) {
  return (
    <svg className={`waves ${className}`} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wv" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4ede1" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="#f4ede1" stopOpacity="0.22" />
          <stop offset="1" stopColor="#f4ede1" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#wv)" strokeWidth="1.2">
        <path d="M-50 640 C 250 420, 520 800, 820 520 S 1280 240, 1500 380" />
        <path d="M-50 700 C 300 470, 560 860, 860 580 S 1300 300, 1500 440" />
        <path d="M-50 760 C 350 520, 600 900, 900 640 S 1320 360, 1500 500" />
        <path d="M-50 120 C 200 300, 520 -40, 800 200 S 1240 380, 1500 160" />
        <path d="M-50 180 C 250 340, 560 20, 840 250 S 1260 420, 1500 220" />
      </g>
    </svg>
  );
}
