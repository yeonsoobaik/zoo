export function wedgePath(
  cx: number,
  cy: number,
  r: number,
  index: number,
  total: number
): string {
  const angle = (2 * Math.PI) / total;
  const startAngle = index * angle - Math.PI / 2;
  const endAngle = startAngle + angle;

  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);

  const largeArc = angle > Math.PI ? 1 : 0;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

export function labelPosition(
  cx: number,
  cy: number,
  r: number,
  index: number,
  total: number
): { x: number; y: number; angle: number } {
  const slotAngle = (2 * Math.PI) / total;
  const midAngle = index * slotAngle - Math.PI / 2 + slotAngle / 2;
  const labelR = r * 0.72;

  return {
    x: cx + labelR * Math.cos(midAngle),
    y: cy + labelR * Math.sin(midAngle),
    angle: (midAngle * 180) / Math.PI + 90,
  };
}

export function calculateTargetAngle(
  currentAngle: number,
  slotIndex: number,
  totalSlots: number
): number {
  const slotAngleDeg = 360 / totalSlots;
  const slotMidAngle = slotIndex * slotAngleDeg + slotAngleDeg / 2;
  // extra full rotations for drama (3–5 spins)
  const extraSpins = (3 + Math.floor(Math.random() * 3)) * 360;
  // how much we rotate to align slotMidAngle to the top (pin at 0°)
  const alignmentOffset = (360 - (slotMidAngle % 360)) % 360;
  return currentAngle + extraSpins + alignmentOffset;
}

export function randomSlotIndex(total: number): number {
  return Math.floor(Math.random() * total);
}
