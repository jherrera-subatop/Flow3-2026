import type { VentaRecord, DeudorRecord, DashboardKPIs } from "@/lib/types";

export function calculateKPIs(
  ventas: VentaRecord[],
  deudores: DeudorRecord[],
  sedeFilter?: string
): DashboardKPIs {
  let filteredVentas = ventas;
  if (sedeFilter != null && sedeFilter.toUpperCase() !== "TODAS") {
    const sede = sedeFilter.toUpperCase();
    filteredVentas = ventas.filter((v) => v.sede === sede);
  }

  const ingresosTotales = filteredVentas.reduce(
    (sum, v) => sum + v.totalServicio,
    0
  );
  const totalPorCobrar = filteredVentas.reduce((sum, v) => sum + v.porCobrar, 0);
  const deudaActivaTotal = deudores
    .filter((d) => d.estado === "ACTIVO")
    .reduce((sum, d) => sum + d.deudaPendiente, 0);
  const totalClientes = filteredVentas.length;

  const clientesPorCanal: Record<string, number> = {};
  for (const v of filteredVentas) {
    const canal = v.canalAdquisicion;
    clientesPorCanal[canal] = (clientesPorCanal[canal] ?? 0) + 1;
  }

  const ingresosPorSede: Record<string, number> = {};
  for (const v of filteredVentas) {
    const sede = v.sede;
    ingresosPorSede[sede] = (ingresosPorSede[sede] ?? 0) + v.totalServicio;
  }

  const ingresosPorCategoria: Record<string, number> = {};
  for (const v of filteredVentas) {
    const cat = v.categoria || "(sin categoría)";
    ingresosPorCategoria[cat] =
      (ingresosPorCategoria[cat] ?? 0) + v.totalServicio;
  }

  return {
    ingresosTotales,
    totalPorCobrar,
    deudaActivaTotal,
    totalClientes,
    clientesPorCanal,
    ingresosPorSede,
    ingresosPorCategoria,
  };
}
