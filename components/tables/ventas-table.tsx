"use client";

import { useMemo, useState } from "react";
import type { VentaRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";

const ROWS_PER_PAGE = 20;

interface VentasTableProps {
  ventas: VentaRecord[];
  isLoading: boolean;
}

export function VentasTable({ ventas, isLoading }: VentasTableProps) {
  const [search, setSearch] = useState("");
  const [sedeFilter, setSedeFilter] = useState<string>("TODAS");
  const [canalFilter, setCanalFilter] = useState<string>("TODOS");
  const [currentPage, setCurrentPage] = useState(0);

  const filtered = useMemo(() => {
    return ventas
      .filter(
        (v) =>
          search === "" ||
          `${v.nombre} ${v.apellido}`.toLowerCase().includes(search.toLowerCase()) ||
          v.servicio.toLowerCase().includes(search.toLowerCase())
      )
      .filter((v) => sedeFilter === "TODAS" || v.sede === sedeFilter)
      .filter((v) => canalFilter === "TODOS" || v.canalAdquisicion === canalFilter);
  }, [ventas, search, sedeFilter, canalFilter]);

  const paginated = useMemo(
    () =>
      filtered.slice(
        currentPage * ROWS_PER_PAGE,
        (currentPage + 1) * ROWS_PER_PAGE
      ),
    [filtered, currentPage]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  const uniqueCanales = useMemo(() => {
    const set = new Set(ventas.map((v) => v.canalAdquisicion));
    return Array.from(set).sort();
  }, [ventas]);

  const exportToCSV = () => {
    const headers = [
      "Nombre",
      "Apellido",
      "Sede",
      "Servicio",
      "Categoria",
      "Adelanto",
      "Por Cobrar",
      "Canal",
      "Vendedor",
    ];
    const rows = filtered.map((v) => [
      v.nombre,
      v.apellido,
      v.sede,
      v.servicio,
      v.categoria,
      v.adelanto,
      v.porCobrar,
      v.canalAdquisicion,
      v.vendedor,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ventas-jhl-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="bg-th-surface border border-th-border rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-th-border flex items-center justify-between">
          <h4 className="text-lg font-bold text-th-text">Movimientos Recientes</h4>
        </div>
        <div className="flex gap-3 p-6">
          <Skeleton className="h-9 flex-1 max-w-xs" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-th-bg/50 text-th-text-secondary text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Nombre</th>
                <th className="px-6 py-4 font-semibold">Sede</th>
                <th className="px-6 py-4 font-semibold">Categoría</th>
                <th className="px-6 py-4 font-semibold">Adelanto</th>
                <th className="px-6 py-4 font-semibold">Por Cobrar</th>
                <th className="px-6 py-4 font-semibold">Canal</th>
                <th className="px-6 py-4 font-semibold">Vendedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-th-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="hover:bg-th-surface-hover transition-colors">
                  <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-th-surface border border-th-border rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-th-border flex items-center justify-between flex-wrap gap-3">
        <h4 className="text-lg font-bold text-th-text">Movimientos Recientes</h4>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Buscar cliente o servicio..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(0);
            }}
            className="min-w-[200px] rounded-lg border border-th-border bg-th-bg px-3 py-1.5 text-sm text-th-text placeholder-th-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <select
            value={sedeFilter}
            onChange={(e) => {
              setSedeFilter(e.target.value);
              setCurrentPage(0);
            }}
            className="rounded-lg border border-th-border bg-th-bg px-3 py-1.5 text-sm text-th-text focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="TODAS">Todas</option>
            <option value="CHINCHA">Chincha</option>
            <option value="LIMA">Lima</option>
          </select>
          <select
            value={canalFilter}
            onChange={(e) => {
              setCanalFilter(e.target.value);
              setCurrentPage(0);
            }}
            className="rounded-lg border border-th-border bg-th-bg px-3 py-1.5 text-sm text-th-text focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="TODOS">Todos</option>
            {uniqueCanales.map((c) => (
              <option key={c} value={c}>
                {c.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          <span className="text-xs text-th-text-muted">{filtered.length} registros</span>
          <button
            type="button"
            onClick={exportToCSV}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Exportar CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-th-bg/50 text-th-text-secondary text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Sede</th>
              <th className="px-6 py-4 font-semibold">Categoría</th>
              <th className="px-6 py-4 font-semibold">Adelanto</th>
              <th className="px-6 py-4 font-semibold">Por Cobrar</th>
              <th className="px-6 py-4 font-semibold">Canal</th>
              <th className="px-6 py-4 font-semibold">Vendedor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-th-border">
            {paginated.map((v) => {
              const digits = v.celular.replace(/\D/g, "");
              const waNumber = digits.length === 9 ? `51${digits}` : digits;
              const waUrl = digits ? `https://wa.me/${waNumber}` : null;

              return (
                <tr
                  key={v.id}
                  onClick={() => waUrl && window.open(waUrl, "_blank")}
                  title={digits ? `Abrir WhatsApp: +${waNumber}` : "Sin número"}
                  className={`hover:bg-th-surface-hover transition-colors group ${waUrl ? "cursor-pointer" : "cursor-default opacity-60"}`}
                >
                  <td className="px-6 py-4 font-medium text-th-text">
                    <div className="flex items-center gap-2">
                      {waUrl && (
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      )}
                      <span>{v.nombre} {v.apellido}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-th-text-secondary text-sm">{v.sede}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-th-text-muted/15 text-th-text-secondary text-xs">
                      {v.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-emerald-500 font-semibold text-sm">
                    {formatCurrency(v.adelanto)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {v.porCobrar === 0 ? (
                      <span className="text-th-text-secondary">{formatCurrency(v.porCobrar)}</span>
                    ) : (
                      <span className="text-amber-500 font-semibold">
                        {formatCurrency(v.porCobrar)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${v.canalAdquisicion === "FACEBOOK" ? "bg-blue-400" : v.canalAdquisicion === "INSTAGRAM" ? "bg-pink-400" : v.canalAdquisicion === "TIKTOK" ? "bg-slate-300" : "bg-primary/80"}`}
                      />
                      <span className="text-th-text-secondary">{v.canalAdquisicion.replace(/_/g, " ")}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-th-text-secondary text-sm">{v.vendedor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-6 py-4 border-t border-th-border">
        <span className="text-xs text-th-text-muted">
          Página {currentPage + 1} de {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={!canPrev}
            className="rounded-lg border border-th-border bg-th-bg px-3 py-1.5 text-sm text-th-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-th-surface-hover transition-colors"
          >
            &larr; Anterior
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={!canNext}
            className="rounded-lg border border-th-border bg-th-bg px-3 py-1.5 text-sm text-th-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-th-surface-hover transition-colors"
          >
            Siguiente &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
