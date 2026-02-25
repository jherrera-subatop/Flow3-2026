import type { DeudorRecord } from "@/lib/types";

function toDate(d: Date | null | string): Date | null {
  if (!d) return null;
  if (d instanceof Date) return d;
  const parsed = new Date(d as string);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** Retorna el próximo pago pendiente del deudor */
export function getProximoPago(
  d: DeudorRecord
): { monto: number; fecha: Date } | null {
  const hoy = new Date();
  const pagos = [
    { monto: d.segundoPago, fecha: d.segundoPagoFecha },
    { monto: d.tercerPago, fecha: null },
    { monto: d.cuartoPago, fecha: null },
  ];
  for (const pago of pagos) {
    const monto = pago.monto ?? 0;
    const fecha = toDate(pago.fecha as Date | null);
    if (monto > 0 && fecha && fecha > hoy) {
      return { monto, fecha };
    }
  }
  return null;
}

/** Retorna true si el próximo pago vence en <= 7 días */
export function isVencimientoProximo(fecha: Date | null): boolean {
  if (!fecha) return false;
  const f = fecha instanceof Date ? fecha : new Date(fecha as string);
  const diff = (f.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
}

/** KPIs específicos de deudores */
export function calculateDeudoresKPIs(deudores: DeudorRecord[]) {
  const activos = deudores.filter((d) => d.estado === "ACTIVO");
  const suspendidos = deudores.filter((d) => d.estado === "SUSPENDIDO");

  return {
    totalPorCobrar: deudores.reduce((sum, d) => sum + d.deudaPendiente, 0),
    totalRecaudado: deudores.reduce((sum, d) => sum + d.importeAbonado, 0),
    deudaActiva: activos.reduce((sum, d) => sum + d.deudaPendiente, 0),
    totalDeudores: deudores.length,
    cantActivos: activos.length,
    cantSuspendidos: suspendidos.length,
    tasaMora:
      deudores.length > 0 ? (suspendidos.length / deudores.length) * 100 : 0,
    proximosAVencer: deudores.filter((d) => {
      const prox = getProximoPago(d);
      return prox ? isVencimientoProximo(prox.fecha) : false;
    }).length,
  };
}
