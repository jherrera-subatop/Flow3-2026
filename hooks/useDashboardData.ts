"use client";

import { useEffect, useMemo, useState } from "react";
import { useDashboardStore } from "@/store/dashboard.store";
import { calculateKPIs } from "@/lib/calculators/kpi.calculator";
import type { VentaRecord, DeudorRecord, DashboardKPIs, CampaignRecord } from "@/lib/types";

interface DashboardDataState {
  ventas: VentaRecord[];
  deudores: DeudorRecord[];
  kpis: DashboardKPIs;
  campaigns: CampaignRecord[];
  isLoading: boolean;
  error: string | null;
  missingFile: boolean;
}

export function useDashboardData(): DashboardDataState {
  const sedeFilter = useDashboardStore((s) => s.sedeFilter);
  const [ventas, setVentas] = useState<VentaRecord[]>([]);
  const [deudores, setDeudores] = useState<DeudorRecord[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [missingFile, setMissingFile] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setMissingFile(false);
    setIsLoading(true);
    fetch("/api/data")
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = (data as { error?: string })?.error ?? res.statusText;
          throw new Error(msg);
        }
        const payload = data as {
          ventas?: VentaRecord[];
          deudores?: DeudorRecord[];
          campaigns?: CampaignRecord[];
          missingFile?: boolean;
          message?: string;
        };
        if (!cancelled) {
          setVentas(payload.ventas ?? []);
          setDeudores(payload.deudores ?? []);
          setCampaigns(payload.campaigns ?? []);
          if (payload.missingFile) setMissingFile(true);
        }
        return payload;
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error al cargar datos");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredVentas = useMemo(() => {
    if (sedeFilter === "Todas") return ventas;
    const sede = sedeFilter.toUpperCase();
    return ventas.filter((v) => v.sede === sede);
  }, [ventas, sedeFilter]);

  const kpis = useMemo(
    () => calculateKPIs(filteredVentas, deudores),
    [filteredVentas, deudores]
  );

  return {
    ventas: filteredVentas,
    deudores,
    kpis,
    campaigns,
    isLoading,
    error,
    missingFile,
  };
}
