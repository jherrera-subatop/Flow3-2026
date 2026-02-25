export interface VentaRecord {
  id: string;
  nombre: string;
  apellido: string;
  celular: string;
  sede: "CHINCHA" | "LIMA" | "OTRO";
  servicio: string;
  categoria: string;
  fechaSeparacion: Date | null;
  adelanto: number;
  porCobrar: number;
  totalServicio: number;
  canalAdquisicion:
    | "FACEBOOK"
    | "INSTAGRAM"
    | "TIKTOK"
    | "BOCA_A_BOCA"
    | "OTRO";
  vendedor: string;
  medioPago: string;
}

export interface DeudorRecord {
  id: string;
  nombres: string;
  apellidos: string;
  celular: string;
  programa: string;
  importeAbonado: number;
  estado: "ACTIVO" | "SUSPENDIDO" | "COMPLETADO";
  asesor: string;
  segundoPago: number | null;
  segundoPagoFecha: Date | null;
  tercerPago: number | null;
  cuartoPago: number | null;
  totalProgramado: number;
  deudaPendiente: number;
}

export interface DashboardKPIs {
  ingresosTotales: number;
  totalPorCobrar: number;
  deudaActivaTotal: number;
  totalClientes: number;
  clientesPorCanal: Record<string, number>;
  ingresosPorSede: Record<string, number>;
  ingresosPorCategoria: Record<string, number>;
}

export interface CampaignRecord {
  id: string;
  nombreCampaña: string;
  entrega: string;
  resultados: number;
  gastoUSD: number;
  impresiones: number;
  alcance: number;
  inicio: string;
  fin: string;
}
