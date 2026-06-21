/**
 * ProgressRing
 * -------------------------------------------------------------------------
 * Interactive SVG circular telemetry chart. Maps the user's daily carbon
 * utilization (used / budget) to a stroke-dashoffset sweep, with the stroke
 * color gracefully shifting from bright copper (low usage) down to burnt
 * ochre/clay (high usage).
 */

const LOW_COLOR = { r: 0xf0, g: 0x9a, b: 0x78 }; // clay-400 (bright copper)
const HIGH_COLOR = { r: 0xa6, g: 0x4b, b: 0x2a }; // clay-700 (burnt ochre)

function lerpColor(pct) {
  const t = Math.min(1, Math.max(0, pct / 100));
  const r = Math.round(LOW_COLOR.r + (HIGH_COLOR.r - LOW_COLOR.r) * t);
  const g = Math.round(LOW_COLOR.g + (HIGH_COLOR.g - LOW_COLOR.g) * t);
  const b = Math.round(LOW_COLOR.b + (HIGH_COLOR.b - LOW_COLOR.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ProgressRing({ used, budget, size = 192 }) {
  const radius = (size - 28) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, (used / budget) * 100);
  const offset = circumference * (1 - pct / 100);
  const strokeColor = lerpColor(pct);
  const center = size / 2;

  return (
    <div
      className="relative"
      style={{ width: size, height: size, filter: `drop-shadow(0 0 16px ${strokeColor}55)` }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#29221F"
          strokeWidth="14"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.7s ease-out, stroke 0.7s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-semibold text-stone-50">
          {used.toFixed(1)}
        </span>
        <span className="text-xs text-stone-500">/ {budget} kg CO2</span>
        <span className="text-[11px] mt-1" style={{ color: strokeColor }}>
          used today
        </span>
      </div>
    </div>
  );
}
