export interface Slot {
  number: number;
  color: string;
  textColor: string;
}

export interface SpinResult {
  round: number;
  slotIndex: number;
  slot: Slot;
}

export interface RouletteState {
  totalRounds: number;
  currentRound: number;
  isSpinning: boolean;
  isComplete: boolean;
  history: SpinResult[];
  currentResult: SpinResult | null;
  wheelAngle: number;
  targetAngle: number;
}
