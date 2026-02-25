"use client";

import { useTheme } from "@/components/theme-provider";

export function useChartColors() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return {
    grid: dark ? "#2A2A2A" : "#E5E7EB",
    axisLine: dark ? "#2A2A2A" : "#E5E7EB",
    tickFill: dark ? "#9CA3AF" : "#6B7280",
    tooltipBg: dark ? "#1A1A1A" : "#FFFFFF",
    tooltipBorder: dark ? "#2A2A2A" : "#E5E7EB",
    tooltipLabel: dark ? "#F9FAFB" : "#111827",
  };
}
