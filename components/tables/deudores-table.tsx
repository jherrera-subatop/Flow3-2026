"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { DeudorRecord } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { StatusBadge } from "@/components/ui/status-badge";
import { PaymentProgress } from "@/components/ui/payment-progress";
import { getProximoPago, isVencimientoProximo } from "@/lib/calculators/deudores.calculator";
import { Skeleton } from "@/components/ui/skeleton";

const ROWS_PER_PAGE = 20;

function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + "...";
}

function normalizeCelular(celular: string): string {
  const trimmed = String(celular ?? "").trim().replace(/\D/g, "");
  if (trimmed.startsWith("51")) return trimmed;
  return "51" + trimmed;
}

interface DeudoresTableProps {
  deudores: DeudorRecord[];
  isLoading: boolean;
}

export function DeudoresTable({ deudores, isLoading }: DeudoresTableProps) {
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState<string>("TODOS");
  const [asesorFilter, setAsesorFilter] = useState<string>("TODOS");
  const [currentPage, setCurrentPage] = useState(0);

  const filtered = useMemo(() => {
    return deudores
      .filter(
        (d) =>
          search === "" ||
          `${d.nombres} ${d.apellidos}`.toLowerCase().includes(search.toLowerCase()) ||
          (d.programa ?? "").toLowerCase().includes(search.toLowerCase())
      )
      .filter((d) => estadoFilter === "TODOS" || d.estado === estadoFilter)
      .filter((d) => asesorFilter === "TODOS" || d.asesor === asesorFilter)
      .sort((a, b) => b.deudaPendiente - a.deudaPendiente);
  }, [deudores, search, estadoFilter, asesorFilter]);

  const totalDeudaFiltrada = useMemo(
    () => filtered.reduce((sum, d) => sum + d.deudaPendiente, 0),
    [filtered]
  );

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

  const uniqueAsesores = useMemo(() => {
    const set = new Set(deudores.map((d) => d.asesor).filter(Boolean));
    return Array.from(set).sort();
  }, [deudores]);

  const exportToCSV = () => {
    const headers = [
      "Nombres",
      "Apellidos",
      "Programa",
      "Asesor",
      "Estado",
      "Abonado",
      "Deuda Pendiente",
      "Total Programado",
    ];
    const rows = filtered.map((d) => [
      d.nombres,
      d.apellidos,
      d.programa,
      d.asesor,
      d.estado,
      d.importeAbonado,
      d.deudaPendiente,
      d.totalProgramado,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deudores-jhl-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-border-subtle flex flex-wrap gap-3">
          <Skeleton className="h-9 flex-1 max-w-xs" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background-dark/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Nombre</th>
                <th className="px-6 py-4 font-semibold">Programa</th>
                <th className="px-6 py-4 font-semibold">Asesor</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold">Abonado</th>
                <th className="px-6 py-4 font-semibold">Deuda Pendiente</th>
                <th className="px-6 py-4 font-semibold">Progreso</th>
                <th className="px-6 py-4 font-semibold">Próximo Pago</th>
                <th className="px-6 py-4 font-semibold">WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-8" /></td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-border-subtle flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Buscar deudor o programa..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(0);
          }}
          className="min-w-[200px] rounded-lg border border-border-subtle bg-background-dark px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <select
          value={estadoFilter}
          onChange={(e) => {
            setEstadoFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="rounded-lg border border-border-subtle bg-background-dark px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="TODOS">Todos</option>
          <option value="ACTIVO">Activo</option>
          <option value="SUSPENDIDO">Suspendido</option>
          <option value="COMPLETADO">Completado</option>
        </select>
        <select
          value={asesorFilter}
          onChange={(e) => {
            setAsesorFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="rounded-lg border border-border-subtle bg-background-dark px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="TODOS">Todos</option>
          {uniqueAsesores.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <span className="ml-auto text-xs text-slate-500">
          {filtered.length} registros · S/ {formatCurrency(totalDeudaFiltrada)}
        </span>
        <button
          type="button"
          onClick={exportToCSV}
          className="text-sm text-primary font-semibold hover:underline"
        >
          Exportar CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background-dark/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Programa</th>
              <th className="px-6 py-4 font-semibold">Asesor</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Abonado</th>
              <th className="px-6 py-4 font-semibold">Deuda Pendiente</th>
              <th className="px-6 py-4 font-semibold">Progreso</th>
              <th className="px-6 py-4 font-semibold">Próximo Pago</th>
              <th className="px-6 py-4 font-semibold">WhatsApp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {paginated.map((d) => {
              const proximoPago = getProximoPago(d);
              const celularNorm = normalizeCelular(d.celular);
              const waText = proximoPago
                ? `Hola ${d.nombres}, le recordamos su próximo pago de ${formatCurrency(proximoPago.monto)} programado para el ${formatDate(proximoPago.fecha)}.`
                : `Hola ${d.nombres}, le escribimos respecto a su programa ${d.programa}.`;
              const waHref = `https://wa.me/${celularNorm}?text=${encodeURIComponent(waText)}`;
              return (
                <tr
                  key={d.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">
                    {d.nombres} {d.apellidos}
                  </td>
                  <td
                    className="px-6 py-4 text-slate-300 max-w-[200px]"
                    title={d.programa}
                  >
                    {truncate(d.programa, 40)}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{d.asesor}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={d.estado} />
                  </td>
                  <td className="px-6 py-4 text-emerald-500">
                    {formatCurrency(d.importeAbonado)}
                  </td>
                  <td className="px-6 py-4">
                    {d.deudaPendiente > 0 ? (
                      <span className="text-red-400 font-semibold">
                        {formatCurrency(d.deudaPendiente)}
                      </span>
                    ) : (
                      <span className="text-emerald-500 text-sm">✓ Al día</span>
                    )}
                  </td>
                  <td className="px-6 py-4 min-w-[120px]">
                    <PaymentProgress
                      pagado={d.importeAbonado}
                      total={d.totalProgramado}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {proximoPago ? (
                      isVencimientoProximo(proximoPago.fecha) ? (
                        <span className="text-amber-500 text-xs font-medium animate-pulse">
                          ⚠ {formatCurrency(proximoPago.monto)} ·{" "}
                          {formatDate(proximoPago.fecha)}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">
                          {formatCurrency(proximoPago.monto)} ·{" "}
                          {formatDate(proximoPago.fecha)}
                        </span>
                      )
                    ) : (
                      <span className="text-slate-500 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                      aria-label="Enviar WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-500 hover:text-emerald-400" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-border-subtle">
        <span className="text-xs text-slate-500">
          Página {currentPage + 1} de {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={!canPrev}
            className="rounded-lg border border-border-subtle bg-background-dark px-3 py-1.5 text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-border-subtle transition-colors"
          >
            ← Anterior
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
            }
            disabled={!canNext}
            className="rounded-lg border border-border-subtle bg-background-dark px-3 py-1.5 text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-border-subtle transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
