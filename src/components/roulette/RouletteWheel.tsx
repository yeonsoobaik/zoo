"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SLOTS } from "@/lib/slots";
import { wedgePath, labelPosition } from "@/lib/roulette-math";

const CX = 200;
const CY = 200;
const R = 170;
const OUTER_R = 185;
const SIZE = 400;

interface Props {
  targetAngle: number;
  isSpinning: boolean;
  onSpinComplete: () => void;
}

export default function RouletteWheel({ targetAngle, isSpinning, onSpinComplete }: Props) {
  const isSpinningRef = useRef(isSpinning);
  useEffect(() => { isSpinningRef.current = isSpinning; }, [isSpinning]);

  const total = SLOTS.length;
  const fontSize = total <= 8 ? 22 : total <= 16 ? 14 : 9;

  return (
    <div className="relative select-none w-full" style={{ maxWidth: 420, margin: "0 auto" }}>

      {/* ── Rotating wheel (motion.div) ── */}
      <motion.div
        animate={{ rotate: targetAngle }}
        transition={{
          duration: isSpinning ? 4.5 : 0,
          ease: [0.15, 0.85, 0.35, 1.0],
        }}
        onAnimationComplete={() => {
          if (isSpinningRef.current) onSpinComplete();
        }}
        style={{ transformOrigin: "center center" }}
      >
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width="100%"
          height="100%"
        >
          {/* outer decorative rings */}
          <circle cx={CX} cy={CY} r={OUTER_R + 5} fill="none" stroke="#FFB3BA" strokeWidth={3} opacity={0.5} />
          <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="#C9B1FF" strokeWidth={7} opacity={0.7} />

          {/* wedges */}
          {SLOTS.map((slot, i) => {
            const d = wedgePath(CX, CY, R, i, total);
            const lp = labelPosition(CX, CY, R, i, total);
            return (
              <g key={i}>
                <path d={d} fill={slot.color} stroke="white" strokeWidth={2} />
                <text
                  x={lp.x}
                  y={lp.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={fontSize}
                  fontWeight="700"
                  fill={slot.textColor}
                  fontFamily="var(--font-fredoka), sans-serif"
                  transform={`rotate(${lp.angle}, ${lp.x}, ${lp.y})`}
                >
                  {slot.number}
                </text>
              </g>
            );
          })}

          {/* center cap */}
          <circle cx={CX} cy={CY} r={28} fill="white" stroke="#C9B1FF" strokeWidth={3} />
          <circle cx={CX} cy={CY} r={18} fill="#FFB3BA" opacity={0.9} />
          <circle cx={CX} cy={CY} r={9} fill="white" opacity={0.9} />
        </svg>
      </motion.div>

      {/* ── Fixed pin overlay (does NOT rotate) ── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%">
          {/* pin shadow */}
          <polygon
            points={`${CX},${CY - OUTER_R + 22} ${CX - 11},${CY - OUTER_R - 4} ${CX + 11},${CY - OUTER_R - 4}`}
            fill="rgba(74,63,92,0.2)"
            transform="translate(2,2)"
          />
          {/* pin body */}
          <polygon
            points={`${CX},${CY - OUTER_R + 22} ${CX - 11},${CY - OUTER_R - 4} ${CX + 11},${CY - OUTER_R - 4}`}
            fill="#FF8FAB"
            stroke="white"
            strokeWidth={2}
          />
          <circle cx={CX} cy={CY - OUTER_R} r={5} fill="white" opacity={0.9} />
        </svg>
      </div>
    </div>
  );
}
