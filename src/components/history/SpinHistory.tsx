"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SpinResult } from "@/types/roulette";

interface Props {
  history: SpinResult[];
}

export default function SpinHistory({ history }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-kawaii h-full flex flex-col">
      <h3 className="font-fredoka font-semibold text-lg text-kawaii-dark mb-3 text-center">
        🎲 결과 기록
      </h3>

      {history.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="font-nunito text-sm text-kawaii-dark/40 text-center">
            아직 결과가 없어요<br />스핀해보세요! 🌸
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <AnimatePresence initial={false}>
            {history.map((result) => (
              <motion.div
                key={`${result.round}-${result.slot.number}`}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-3 p-2.5 rounded-2xl"
                style={{ backgroundColor: result.slot.color + "33" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-fredoka font-bold text-base shrink-0"
                  style={{ backgroundColor: result.slot.color, color: result.slot.textColor }}
                >
                  {result.slot.number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-nunito font-semibold text-sm text-kawaii-dark">
                    Round {result.round}
                  </p>
                  <p className="font-nunito text-xs text-kawaii-dark/60">
                    {result.slot.number}번 슬롯
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
