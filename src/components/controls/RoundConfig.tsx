"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  totalRounds: number;
  currentRound: number;
  onChange: (n: number) => void;
}

export default function RoundConfig({ totalRounds, currentRound, onChange }: Props) {
  const editable = currentRound === 0;

  return (
    <AnimatePresence>
      {editable && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-kawaii"
        >
          <p className="font-nunito font-semibold text-sm text-kawaii-dark/70 mb-3 text-center">
            총 라운드 수
          </p>
          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(totalRounds - 1)}
              disabled={totalRounds <= 1}
              className="w-10 h-10 rounded-full bg-kawaii-lavender/60 font-fredoka text-xl font-bold text-kawaii-dark disabled:opacity-40 flex items-center justify-center hover:bg-kawaii-lavender transition-colors"
            >
              −
            </motion.button>

            <input
              type="number"
              min={1}
              max={20}
              value={totalRounds}
              onChange={(e) => onChange(Number(e.target.value))}
              onBlur={(e) => {
                const v = Math.max(1, Math.min(20, Number(e.target.value)));
                onChange(v);
              }}
              className="w-16 text-center font-fredoka text-3xl font-bold text-kawaii-dark bg-transparent border-b-2 border-kawaii-lavender outline-none"
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(totalRounds + 1)}
              disabled={totalRounds >= 20}
              className="w-10 h-10 rounded-full bg-kawaii-lavender/60 font-fredoka text-xl font-bold text-kawaii-dark disabled:opacity-40 flex items-center justify-center hover:bg-kawaii-lavender transition-colors"
            >
              ＋
            </motion.button>
          </div>
          <p className="font-nunito text-xs text-kawaii-dark/50 text-center mt-2">1 ~ 20 라운드</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
