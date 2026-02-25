"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import { KPICard } from "@/components/ui/kpi-card";
import { IngresosPorSede } from "@/components/charts/ingresos-por-sede";
import { CanalesAdquisicion } from "@/components/charts/canales-adquisicion";
import { IngresosPorCategoria } from "@/components/charts/ingresos-por-categoria";
import { VentasTable } from "@/components/tables/ventas-table";
import { formatCurrency, formatCurrencyUSD, formatNumber } from "@/lib/formatters";

const DEFAULT_KPIS = {
  ingresosTotales: 0,
  totalPorCobrar: 0,
  deudaActivaTotal: 0,
  totalClientes: 0,
  clientesPorCanal: {} as Record<string, number>,
  ingresosPorSede: {} as Record<string, number>,
  ingresosPorCategoria: {} as Record<string, number>,
};

export default function OverviewPage() {
  const { ventas, kpis, campaigns, isLoading, error, missingFile } = useDashboardData();
  const safeKpis = kpis ?? DEFAULT_KPIS;
  const totalGastoUSD = campaigns.reduce((sum, c) => sum + c.gastoUSD, 0);
  const totalResultados = campaigns.reduce((sum, c) => sum + c.resultados, 0);

  return (
    <div className="space-y-8">
      {(error || missingFile) && (
        <div
          className={
            missingFile
              ? "rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-200"
              : "rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
          }
        >
          {missingFile ? (
            <>
              <strong>Falta el archivo de datos.</strong> Coloca{" "}
              <code className="text-xs bg-black/10 dark:bg-black/30 px-1 rounded">
                LISTA_DE_CLIENTES_JHL_.xlsx
              </code>{" "}
              dentro de la carpeta <code className="text-xs bg-black/10 dark:bg-black/30 px-1 rounded">data/</code> en la raíz del proyecto y recarga la página.
            </>
          ) : (
            <>No se pudo cargar la data: {error}</>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="Ingresos Totales"
          value={isLoading ? "..." : formatCurrency(safeKpis.ingresosTotales)}
          iconName="payments"
          colorScheme="success"
          trend="+12.5%"
          trendPositive
        />
        <KPICard
          title="Por Cobrar"
          value={isLoading ? "..." : formatCurrency(safeKpis.totalPorCobrar)}
          iconName="schedule"
          colorScheme="warning"
          trend="+5.2%"
          trendPositive
        />
        <KPICard
          title="Deuda Activa"
          value={isLoading ? "..." : formatCurrency(safeKpis.deudaActivaTotal)}
          iconName="credit_card_off"
          colorScheme="danger"
          trend="-2.1%"
          trendPositive={false}
        />
        <KPICard
          title="Total Clientes"
          value={isLoading ? "..." : formatNumber(safeKpis.totalClientes)}
          iconName="group_add"
          colorScheme="primary"
          trend="+1.4%"
          trendPositive
        />
        <KPICard
          title="Gasto Meta Ads"
          value={isLoading ? "..." : formatCurrencyUSD(totalGastoUSD)}
          iconName="campaign"
          colorScheme="primary"
          subtitle={campaigns.length > 0 ? `${campaigns.length} campaña(s) · ${totalResultados} resultados` : undefined}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <IngresosPorSede data={safeKpis.ingresosPorSede ?? {}} />
        <CanalesAdquisicion data={safeKpis.clientesPorCanal ?? {}} />
      </div>
      <IngresosPorCategoria data={safeKpis.ingresosPorCategoria ?? {}} />
      {campaigns.length > 0 && (
        <div className="bg-th-surface border border-th-border rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-th-border">
            <h4 className="text-lg font-bold text-th-text">Campañas Meta Ads</h4>
            <p className="text-sm text-th-text-muted">Gasto y resultados por campaña (CSV)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-th-bg/50 text-th-text-secondary text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Campaña</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4 font-semibold">Gasto (USD)</th>
                  <th className="px-6 py-4 font-semibold">Resultados</th>
                  <th className="px-6 py-4 font-semibold">Impresiones</th>
                  <th className="px-6 py-4 font-semibold">Alcance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-th-border">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-th-surface-hover transition-colors">
                    <td className="px-6 py-4 font-medium text-th-text">{c.nombreCampaña}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${c.entrega === "active" ? "bg-emerald-500/20 text-emerald-500" : "bg-th-text-muted/20 text-th-text-secondary"}`}>
                        {c.entrega || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-emerald-500 font-medium">{formatCurrencyUSD(c.gastoUSD)}</td>
                    <td className="px-6 py-4 text-th-text">{formatNumber(c.resultados)}</td>
                    <td className="px-6 py-4 text-th-text-secondary">{formatNumber(c.impresiones)}</td>
                    <td className="px-6 py-4 text-th-text-secondary">{formatNumber(c.alcance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <VentasTable ventas={ventas} isLoading={isLoading} />
    </div>
  );
}
