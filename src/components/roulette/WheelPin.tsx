"use client";

export default function WheelPin({ cx, top }: { cx: number; top: number }) {
  const pinW = 18;
  const pinH = 28;

  return (
    <g>
      {/* drop shadow */}
      <polygon
        points={`${cx},${top + pinH + 4} ${cx - pinW / 2},${top + 4} ${cx + pinW / 2},${top + 4}`}
        fill="rgba(74,63,92,0.2)"
        transform="translate(2,2)"
      />
      <polygon
        points={`${cx},${top + pinH} ${cx - pinW / 2},${top} ${cx + pinW / 2},${top}`}
        fill="#FF8FAB"
        stroke="white"
        strokeWidth={2}
      />
      <circle cx={cx} cy={top + 5} r={4} fill="white" opacity={0.9} />
    </g>
  );
}
