"use client";

interface Props {
  currentRound: number;
  totalRounds: number;
  isComplete: boolean;
}

export default function RoundCounter({ currentRound, totalRounds, isComplete }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-kawaii text-center">
      {isComplete ? (
        <p className="font-fredoka text-lg font-semibold text-kawaii-pink">
          🎉 게임 완료!
        </p>
      ) : (
        <>
          <p className="font-nunito text-xs font-semibold text-kawaii-dark/60 mb-1">현재 라운드</p>
          <p className="font-fredoka text-3xl font-bold text-kawaii-dark">
            {currentRound === 0 ? "—" : currentRound}
            <span className="text-kawaii-dark/40 text-xl font-normal"> / {totalRounds}</span>
          </p>
          {currentRound === 0 && (
            <p className="font-nunito text-xs text-kawaii-dark/50 mt-1">스핀을 눌러 시작하세요!</p>
          )}
        </>
      )}

      {/* progress dots */}
      <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
        {Array.from({ length: totalRounds }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i < currentRound
                ? "w-3 h-3 bg-kawaii-pink"
                : i === currentRound && !isComplete
                ? "w-3 h-3 bg-kawaii-lavender animate-pulse-soft"
                : "w-2 h-2 bg-kawaii-lavender/30 mt-0.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
