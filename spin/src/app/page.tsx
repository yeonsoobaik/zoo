"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Slot data ──────────────────────────────────────────────
const SLOTS = [
  { number: 1, bg: "#FFB3BA", text: "#8B2A3A" },
  { number: 2, bg: "#C9B1FF", text: "#4A2080" },
  { number: 3, bg: "#A8E6CF", text: "#2D7A5A" },
  { number: 4, bg: "#FFDAC1", text: "#8B4A1A" },
  { number: 5, bg: "#B5E8F7", text: "#1A6A8B" },
  { number: 6, bg: "#FFF5BA", text: "#7A6A00" },
  { number: 7, bg: "#FF8FAB", text: "#7A1A35" },
  { number: 8, bg: "#D4B1FF", text: "#3A1A7A" },
];
const N = SLOTS.length;
const CX = 200, CY = 200, R = 168, OUTER_R = 184;

// ── Math helpers ───────────────────────────────────────────
function wedgePath(i: number) {
  const a = (2 * Math.PI) / N;
  const s = i * a - Math.PI / 2;
  const e = s + a;
  const x1 = CX + R * Math.cos(s), y1 = CY + R * Math.sin(s);
  const x2 = CX + R * Math.cos(e), y2 = CY + R * Math.sin(e);
  return `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`;
}
function labelPos(i: number) {
  const a = (2 * Math.PI) / N;
  const mid = i * a - Math.PI / 2 + a / 2;
  const lr = R * 0.68;
  return {
    x: CX + lr * Math.cos(mid),
    y: CY + lr * Math.sin(mid),
    rot: (mid * 180) / Math.PI + 90,
  };
}
function spinTarget(currentAngle: number, slotIndex: number) {
  const slotDeg = 360 / N;
  const slotMid = slotIndex * slotDeg + slotDeg / 2;
  const extra = (3 + Math.floor(Math.random() * 3)) * 360;
  const align = (360 - (slotMid % 360)) % 360;
  return currentAngle + extra + align;
}

// ── Main component ─────────────────────────────────────────
export default function Home() {
  const [totalRounds, setTotalRoundsRaw] = useState(8);
  const [currentRound, setCurrentRound] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(0);
  const [result, setResult] = useState<typeof SLOTS[0] | null>(null);
  const [history, setHistory] = useState<Array<{ round: number; slot: typeof SLOTS[0] }>>([]);

  const isSpinningRef = useRef(false);
  useEffect(() => { isSpinningRef.current = isSpinning; }, [isSpinning]);

  const setTotalRounds = (n: number) => {
    if (currentRound > 0) return;
    setTotalRoundsRaw(Math.max(1, Math.min(20, n)));
  };

  const spin = useCallback(() => {
    if (isSpinningRef.current || isComplete) return;
    const idx = Math.floor(Math.random() * N);
    const slot = SLOTS[idx];
    const target = spinTarget(wheelAngle, idx);
    setResult(slot);
    setTargetAngle(target);
    setIsSpinning(true);
  }, [wheelAngle, isComplete]);

  const onSpinDone = useCallback(() => {
    if (!isSpinningRef.current) return;
    setIsSpinning(false);
    setWheelAngle(targetAngle);
    setCurrentRound((r) => {
      const next = r + 1;
      if (next >= totalRounds) setIsComplete(true);
      return next;
    });
    setHistory((h) => {
      const round = currentRound + 1;
      return [{ round, slot: result! }, ...h];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetAngle, totalRounds, currentRound, result]);

  const reset = () => {
    setCurrentRound(0);
    setIsSpinning(false);
    setIsComplete(false);
    setWheelAngle(0);
    setTargetAngle(0);
    setResult(null);
    setHistory([]);
  };

  // most frequent for summary
  const mostFrequent = history.length > 0
    ? Object.entries(
        history.reduce((acc, { slot }) => ({ ...acc, [slot.number]: (acc[slot.number] || 0) + 1 }), {} as Record<number, number>)
      ).sort((a, b) => +b[1] - +a[1])[0]
    : null;

  return (
    <main className="min-h-screen bg-kawaii-cream p-4 md:p-6 font-nunito">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-kawaii-dark">🎰 짱귀여운 룰렛</h1>
        <p className="text-sm text-kawaii-dark/50 mt-1">귀여운 카지노 룰렛 🌸</p>
      </div>

      {/* Grid layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-5 items-start">

        {/* LEFT: controls */}
        <div className="flex flex-col gap-4">
          {/* Round config */}
          <AnimatePresence>
            {currentRound === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-kawaii"
              >
                <p className="font-semibold text-sm text-kawaii-dark/70 mb-3 text-center">총 라운드 수</p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setTotalRounds(totalRounds - 1)}
                    disabled={totalRounds <= 1}
                    className="w-10 h-10 rounded-full bg-kawaii-lavender/60 font-fredoka text-xl font-bold text-kawaii-dark disabled:opacity-40 hover:bg-kawaii-lavender transition-colors"
                  >−</button>
                  <span className="font-fredoka text-4xl font-bold text-kawaii-dark w-12 text-center">{totalRounds}</span>
                  <button
                    onClick={() => setTotalRounds(totalRounds + 1)}
                    disabled={totalRounds >= 20}
                    className="w-10 h-10 rounded-full bg-kawaii-lavender/60 font-fredoka text-xl font-bold text-kawaii-dark disabled:opacity-40 hover:bg-kawaii-lavender transition-colors"
                  >＋</button>
                </div>
                <p className="text-xs text-kawaii-dark/50 text-center mt-2">1 ~ 20 라운드</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Round counter */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-kawaii text-center">
            {isComplete ? (
              <p className="font-fredoka text-xl font-semibold text-kawaii-pink">🎉 게임 완료!</p>
            ) : (
              <>
                <p className="text-xs font-semibold text-kawaii-dark/60 mb-1">현재 라운드</p>
                <p className="font-fredoka text-3xl font-bold text-kawaii-dark">
                  {currentRound === 0 ? "—" : currentRound}
                  <span className="text-kawaii-dark/40 text-xl font-normal"> / {totalRounds}</span>
                </p>
                {currentRound === 0 && <p className="text-xs text-kawaii-dark/50 mt-1">스핀을 눌러 시작하세요!</p>}
              </>
            )}
            <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
              {Array.from({ length: totalRounds }).map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${
                  i < currentRound ? "w-3 h-3 bg-kawaii-pink" :
                  i === currentRound && !isComplete ? "w-3 h-3 bg-kawaii-lavender animate-pulse" :
                  "w-2 h-2 bg-kawaii-lavender/30 mt-0.5"
                }`} />
              ))}
            </div>
          </div>

          {/* Spin button */}
          <motion.button
            onClick={spin}
            disabled={isSpinning || isComplete}
            whileHover={isSpinning || isComplete ? {} : { scale: 1.05 }}
            whileTap={isSpinning || isComplete ? {} : { scale: 0.95 }}
            className={`w-full py-4 px-8 rounded-full font-fredoka font-semibold text-2xl text-white transition-all ${
              isSpinning || isComplete
                ? "opacity-60 cursor-not-allowed bg-gradient-to-r from-kawaii-lavender to-kawaii-rose"
                : "bg-gradient-to-r from-kawaii-pink to-kawaii-lavender shadow-kawaii-pink cursor-pointer"
            }`}
          >
            {isSpinning ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}>✨</motion.span>
                스핀 중...
              </span>
            ) : "🎰 SPIN!"}
          </motion.button>
        </div>

        {/* CENTER: wheel */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full" style={{ maxWidth: 400 }}>
            {/* Rotating wheel */}
            <motion.div
              animate={{ rotate: targetAngle }}
              transition={{ duration: isSpinning ? 4.5 : 0, ease: [0.15, 0.85, 0.35, 1.0] }}
              onAnimationComplete={onSpinDone}
              style={{ transformOrigin: "center center" }}
            >
              <svg viewBox="0 0 400 400" width="100%" height="100%">
                <circle cx={CX} cy={CY} r={OUTER_R + 5} fill="none" stroke="#FFB3BA" strokeWidth={3} opacity={0.5} />
                <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="#C9B1FF" strokeWidth={8} opacity={0.7} />
                {SLOTS.map((slot, i) => {
                  const lp = labelPos(i);
                  return (
                    <g key={i}>
                      <path d={wedgePath(i)} fill={slot.bg} stroke="white" strokeWidth={2} />
                      <text
                        x={lp.x} y={lp.y}
                        textAnchor="middle" dominantBaseline="central"
                        fontSize={24} fontWeight="700" fill={slot.text}
                        fontFamily="var(--font-fredoka), sans-serif"
                        transform={`rotate(${lp.rot}, ${lp.x}, ${lp.y})`}
                      >{slot.number}</text>
                    </g>
                  );
                })}
                <circle cx={CX} cy={CY} r={30} fill="white" stroke="#C9B1FF" strokeWidth={3} />
                <circle cx={CX} cy={CY} r={20} fill="#FFB3BA" opacity={0.9} />
                <circle cx={CX} cy={CY} r={10} fill="white" />
              </svg>
            </motion.div>

            {/* Fixed pin (does NOT rotate) */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 400 400" width="100%" height="100%">
                <polygon
                  points={`${CX},${CY - OUTER_R + 24} ${CX - 12},${CY - OUTER_R - 6} ${CX + 12},${CY - OUTER_R - 6}`}
                  fill="#FF8FAB" stroke="white" strokeWidth={2.5}
                />
                <circle cx={CX} cy={CY - OUTER_R} r={5} fill="white" />
              </svg>
            </div>
          </div>

          {/* Current result */}
          <div className="min-h-[80px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isSpinning ? (
                <motion.p key="spinning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-sm text-kawaii-dark/60 animate-pulse">
                  🌀 룰렛이 돌아가고 있어요...
                </motion.p>
              ) : result && currentRound > 0 ? (
                <motion.div key={`r-${currentRound}`}
                  initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 300 }}
                  className="flex flex-col items-center gap-1"
                >
                  <p className="text-xs text-kawaii-dark/60">Round {currentRound} 결과</p>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center font-fredoka font-bold text-4xl shadow-kawaii-lg"
                    style={{ background: result.bg, color: result.text }}>
                    {result.number}
                  </div>
                </motion.div>
              ) : (
                <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-sm text-kawaii-dark/40">
                  SPIN 버튼을 눌러주세요 🎰
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: history */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-kawaii min-h-[300px] lg:min-h-[480px] flex flex-col">
          <h3 className="font-fredoka font-semibold text-lg text-kawaii-dark mb-3 text-center">🎲 결과 기록</h3>
          {history.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-kawaii-dark/40 text-center">아직 결과가 없어요<br />스핀해보세요! 🌸</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-2">
              <AnimatePresence initial={false}>
                {history.map((item, idx) => (
                  <motion.div key={`${item.round}-${idx}`}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3 p-2.5 rounded-2xl"
                    style={{ background: item.slot.bg + "33" }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-fredoka font-bold text-base shrink-0"
                      style={{ background: item.slot.bg, color: item.slot.text }}>
                      {item.slot.number}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-kawaii-dark">Round {item.round}</p>
                      <p className="text-xs text-kawaii-dark/60">{item.slot.number}번 슬롯</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Results modal */}
      <AnimatePresence>
        {isComplete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-kawaii-dark/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-kawaii-cream rounded-4xl shadow-kawaii-lg p-6 w-full max-w-sm"
            >
              <div className="text-center mb-5">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", damping: 12 }}
                  className="text-5xl mb-2">🎉</motion.div>
                <h2 className="font-fredoka text-3xl font-bold text-kawaii-dark">게임 완료!</h2>
                <p className="text-sm text-kawaii-dark/60 mt-1">총 {history.length}번의 스핀 결과</p>
              </div>
              {mostFrequent && (
                <div className="bg-white/80 rounded-3xl p-4 mb-4 text-center shadow-kawaii">
                  <p className="text-xs text-kawaii-dark/60 mb-1">가장 많이 나온 숫자</p>
                  <span className="font-fredoka text-4xl font-bold text-kawaii-pink">{mostFrequent[0]}</span>
                  <p className="text-xs text-kawaii-dark/50 mt-1">{mostFrequent[1]}번 등장</p>
                </div>
              )}
              <div className="space-y-1.5 mb-5 max-h-44 overflow-y-auto">
                {[...history].reverse().map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-3 py-2 rounded-2xl"
                    style={{ background: item.slot.bg + "44" }}>
                    <span className="text-xs text-kawaii-dark/60 w-16">Round {item.round}</span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center font-fredoka font-bold text-sm"
                      style={{ background: item.slot.bg, color: item.slot.text }}>
                      {item.slot.number}
                    </div>
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={reset}
                className="w-full py-3.5 rounded-full font-fredoka text-xl font-semibold text-white bg-gradient-to-r from-kawaii-pink to-kawaii-lavender shadow-kawaii-pink">
                🔄 다시 플레이
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
