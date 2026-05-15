"use client";

import { useState, useCallback } from "react";
import { SLOTS, SLOT_COUNT } from "@/lib/slots";
import { calculateTargetAngle, randomSlotIndex } from "@/lib/roulette-math";
import { RouletteState, SpinResult } from "@/types/roulette";

const DEFAULT_ROUNDS = 8;

function initialState(totalRounds: number): RouletteState {
  return {
    totalRounds,
    currentRound: 0,
    isSpinning: false,
    isComplete: false,
    history: [],
    currentResult: null,
    wheelAngle: 0,
    targetAngle: 0,
  };
}

export function useRoulette() {
  const [state, setState] = useState<RouletteState>(() => initialState(DEFAULT_ROUNDS));

  const spin = useCallback(() => {
    setState((prev) => {
      if (prev.isSpinning || prev.isComplete) return prev;

      const slotIndex = randomSlotIndex(SLOT_COUNT);
      const target = calculateTargetAngle(prev.wheelAngle, slotIndex, SLOT_COUNT);

      return {
        ...prev,
        isSpinning: true,
        targetAngle: target,
        currentResult: {
          round: prev.currentRound + 1,
          slotIndex,
          slot: SLOTS[slotIndex],
        },
      };
    });
  }, []);

  const onSpinComplete = useCallback(() => {
    setState((prev) => {
      if (!prev.currentResult) return prev;

      const newHistory: SpinResult[] = [prev.currentResult, ...prev.history];
      const newRound = prev.currentRound + 1;
      const isComplete = newRound >= prev.totalRounds;

      return {
        ...prev,
        isSpinning: false,
        wheelAngle: prev.targetAngle,
        currentRound: newRound,
        history: newHistory,
        isComplete,
      };
    });
  }, []);

  const setTotalRounds = useCallback((n: number) => {
    setState((prev) => {
      if (prev.currentRound > 0) return prev;
      const clamped = Math.max(1, Math.min(20, n));
      return { ...prev, totalRounds: clamped };
    });
  }, []);

  const reset = useCallback(() => {
    setState((prev) => initialState(prev.totalRounds));
  }, []);

  return { state, spin, onSpinComplete, setTotalRounds, reset };
}
