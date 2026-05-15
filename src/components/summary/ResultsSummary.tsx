"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SpinResult } from "@/types/roulette";

interface Props {
  isComplete: boolean;
  history: SpinResult[];
  onReset: () => void;
}

function getMostFrequent(history: SpinResult[]): { number: number; count: number } {
  const counts: Record<number, number> = {};
  for (const r of history) {
    counts[r.slot.number] = (counts[r.slot.number] || 0) + 1;
  }
  const [num, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return { number: Number(num), count };
}

export default function ResultsSummary({ isComplete, history, onReset }: Props) {
  const most = history.length > 0 ? getMostFrequent(history) : null;

  return (
    <AnimatePresence>
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-kawaii-dark/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onReset()}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-kawaii-cream rounded-4xl shadow-kawaii-lg p-6 w-full max-w-sm"
          >
            <div className="text-center mb-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 12 }}
                className="text-5xl mb-2"
              >
                🎉
              </motion.div>
              <h2 className="font-fredoka text-3xl font-bold text-kawaii-dark">게임 완료!</h2>
              <p className="font-nunito text-sm text-kawaii-dark/60 mt-1">
                총 {history.length}번의 스핀 결과
              </p>
            </div>

            {most && (
              <div className="bg-white/80 rounded-3xl p-4 mb-4 text-center shadow-kawaii">
                <p className="font-nunito text-xs text-kawaii-dark/60 mb-1">가장 많이 나온 숫자</p>
                <span className="font-fredoka text-4xl font-bold text-kawaii-pink">
                  {most.number}
                </span>
                <p className="font-nunito text-xs text-kawaii-dark/50 mt-1">{most.count}번 등장</p>
              </div>
            )}

            <div className="space-y-1.5 mb-5 max-h-48 overflow-y-auto">
              {[...history].reverse().map((result) => (
                <div
                  key={result.round}
                  className="flex items-center gap-3 px-3 py-2 rounded-2xl"
                  style={{ backgroundColor: result.slot.color + "44" }}
                >
                  <span className="font-nunito text-xs text-kawaii-dark/60 w-16">
                    Round {result.round}
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-fredoka font-bold text-sm"
                    style={{ backgroundColor: result.slot.color, color: result.slot.textColor }}
                  >
                    {result.slot.number}
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onReset}
              className="w-full py-3.5 rounded-full font-fredoka text-xl font-semibold text-white bg-gradient-to-r from-kawaii-pink to-kawaii-lavender shadow-kawaii-pink"
            >
              🔄 다시 플레이
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
