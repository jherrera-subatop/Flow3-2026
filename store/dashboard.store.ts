import { create } from "zustand";

interface DashboardState {
  sedeFilter: string;
  setSedeFilter: (sede: string) => void;
  dateRange: { start: Date | null; end: Date | null };
  setDateRange: (range: { start: Date | null; end: Date | null }) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sedeFilter: "Todas",
  setSedeFilter: (sede) => set({ sedeFilter: sede }),
  dateRange: { start: null, end: null },
  setDateRange: (dateRange) => set({ dateRange }),
}));
