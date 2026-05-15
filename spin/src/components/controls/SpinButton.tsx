"use client";

import { motion } from "framer-motion";

interface Props {
  onClick: () => void;
  disabled: boolean;
  isSpinning: boolean;
}

export default function SpinButton({ onClick, disabled, isSpinning }: Props) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.06 }}
      whileTap={disabled ? {} : { scale: 0.94 }}
      className={`
        relative w-full py-4 px-8 rounded-full font-fredoka font-semibold text-2xl text-white
        transition-all duration-200 overflow-hidden
        ${disabled
          ? "opacity-60 cursor-not-allowed bg-gradient-to-r from-kawaii-lavender to-kawaii-rose"
          : "bg-gradient-to-r from-kawaii-pink to-kawaii-lavender shadow-kawaii-pink cursor-pointer"
        }
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isSpinning ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              ✨
            </motion.span>
            스핀 중...
          </>
        ) : (
          <>
            🎰 SPIN!
          </>
        )}
      </span>
    </motion.button>
  );
}
