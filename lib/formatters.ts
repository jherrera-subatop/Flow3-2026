export const formatCurrency = (n: number): string =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const formatCurrencyUSD = (n: number): string =>
  `USD ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const formatNumber = (n: number): string =>
  n.toLocaleString("es-PE");

export const formatPercent = (n: number): string =>
  `${n.toFixed(1)}%`;

export const formatDate = (d: Date | null): string => {
  if (!d) return "—";
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
};
