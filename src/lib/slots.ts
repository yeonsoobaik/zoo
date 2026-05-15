import { Slot } from "@/types/roulette";

// 8-slot roulette with distinct kawaii colors
export const SLOTS: Slot[] = [
  { number: 1, color: "#FFB3BA", textColor: "#8B2A3A" },
  { number: 2, color: "#C9B1FF", textColor: "#4A2080" },
  { number: 3, color: "#A8E6CF", textColor: "#2D7A5A" },
  { number: 4, color: "#FFDAC1", textColor: "#8B4A1A" },
  { number: 5, color: "#B5E8F7", textColor: "#1A6A8B" },
  { number: 6, color: "#FFF5BA", textColor: "#7A6A00" },
  { number: 7, color: "#FF8FAB", textColor: "#7A1A35" },
  { number: 8, color: "#D4B1FF", textColor: "#3A1A7A" },
];

export const SLOT_COUNT = SLOTS.length;
