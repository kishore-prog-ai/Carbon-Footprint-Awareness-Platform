/**
 * BackgroundPosters
 * -------------------------------------------------------------------------
 * Decorative, ultra-subtle line-art canvas. Three motifs rendered as pure
 * SVG silhouettes, evoking ancient engineering blueprints, megalithic
 * pottery-ring burial urns, and stylized heritage glyph blocks — without
 * reproducing any real script or artifact. Pure geometry, museum-grade,
 * never competes with foreground content.
 */
export default function BackgroundPosters() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Top-left: stepped engineering blueprint */}
      <svg
        className="absolute -top-10 -left-16 w-[420px] h-[420px] opacity-[0.06] text-clay-500"
        viewBox="0 0 400 400"
        fill="none"
      >
        <rect x="40" y="260" width="320" height="20" stroke="currentColor" strokeWidth="1.5" />
        <rect x="70" y="220" width="260" height="40" stroke="currentColor" strokeWidth="1.5" />
        <rect x="100" y="170" width="200" height="50" stroke="currentColor" strokeWidth="1.5" />
        <rect x="140" y="110" width="120" height="60" stroke="currentColor" strokeWidth="1.5" />
        <line x1="200" y1="60" x2="200" y2="110" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="45" r="15" stroke="currentColor" strokeWidth="1.5" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1={40 + i * 40}
            y1="280"
            x2={40 + i * 40}
            y2="300"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Top-right: pottery / burial ring concentric motif */}
      <svg
        className="absolute -top-24 -right-24 w-[460px] h-[460px] opacity-[0.05] text-clay-600"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="135" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="65" stroke="currentColor" strokeWidth="1.2" />
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const x1 = 200 + Math.cos(angle) * 65;
          const y1 = 200 + Math.sin(angle) * 65;
          const x2 = 200 + Math.cos(angle) * 170;
          const y2 = 200 + Math.sin(angle) * 170;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.5"
            />
          );
        })}
      </svg>

      {/* Bottom-left: heritage glyph block (abstract, non-script) */}
      <svg
        className="absolute bottom-0 -left-10 w-[360px] h-[360px] opacity-[0.05] text-clay-500"
        viewBox="0 0 360 360"
        fill="none"
      >
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => {
            const variant = (row + col) % 3;
            const x = 20 + col * 55;
            const y = 20 + row * 55;
            if (variant === 0) {
              return <circle key={`${row}-${col}`} cx={x} cy={y} r="10" stroke="currentColor" strokeWidth="1" />;
            }
            if (variant === 1) {
              return (
                <rect
                  key={`${row}-${col}`}
                  x={x - 9}
                  y={y - 9}
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              );
            }
            return (
              <line
                key={`${row}-${col}`}
                x1={x - 10}
                y1={y}
                x2={x + 10}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
              />
            );
          })
        )}
      </svg>

      {/* Bottom-right: terraced step motif (long horizon line) */}
      <svg
        className="absolute bottom-10 right-0 w-[500px] h-[260px] opacity-[0.05] text-clay-600"
        viewBox="0 0 500 260"
        fill="none"
      >
        <path
          d="M0 240 L60 240 L60 200 L130 200 L130 150 L210 150 L210 100 L300 100 L300 60 L400 60 L400 20 L500 20"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}
