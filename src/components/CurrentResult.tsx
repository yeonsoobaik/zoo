"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SpinResult } from "@/types/roulette";

interface Props {
  result: SpinResult | null;
  isSpinning: boolean;
}

export default function CurrentResult({ result, isSpinning }: Props) {
  return (
    <div className="text-center min-h-[72px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isSpinning ? (
          <motion.div
            key="spinning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-nunito text-sm text-kawaii-dark/60 animate-pulse-soft"
          >
            🌀 룰렛이 돌아가고 있어요...
          </motion.div>
        ) : result ? (
          <motion.div
            key={`result-${result.round}`}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 300 }}
            className="flex flex-col items-center gap-1"
          >
            <p className="font-nunito text-xs text-kawaii-dark/60">Round {result.round} 결과</p>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center font-fredoka font-bold text-4xl shadow-kawaii-lg"
              style={{ backgroundColor: result.slot.color, color: result.slot.textColor }}
            >
              {result.slot.number}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-nunito text-sm text-kawaii-dark/40"
          >
            SPIN 버튼을 눌러주세요 🎰
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
