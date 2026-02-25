import * as XLSX from "xlsx";
import type { DeudorRecord } from "@/lib/types";

const SHEET_NAME = "DEUDORES";

function excelSerialToDate(value: unknown): Date | null {
  if (value == null || value === "") return null;
  if (value instanceof Date) return value;
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  const date = new Date((n - 25569) * 86400 * 1000);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeEstado(raw: unknown): DeudorRecord["estado"] {
  const s = String(raw ?? "").trim();
  if (/activo/i.test(s)) return "ACTIVO";
  if (/suspendido/i.test(s)) return "SUSPENDIDO";
  return "COMPLETADO";
}

function num(val: unknown): number {
  if (val == null || val === "") return 0;
  const s = String(val).trim();
  if (/^=/.test(s)) return 0; // Excel formula
  const n = Number(s);
  return Number.isNaN(n) ? 0 : n;
}

export function parseDeudores(input: string | XLSX.WorkBook): DeudorRecord[] {
  const workbook =
    typeof input === "string"
      ? XLSX.readFile(input, { cellDates: false })
      : input;
  const sheet = workbook.Sheets[SHEET_NAME];
  if (!sheet) {
    throw new Error(`Sheet "${SHEET_NAME}" not found. Available: ${workbook.SheetNames.join(", ")}`);
  }
  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  }) as unknown[][];

  const result: DeudorRecord[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!Array.isArray(row)) continue;
    const nombres = String(row[1] ?? "").trim();
    const apellidos = String(row[2] ?? "").trim();
    const celular = String(row[3] ?? "").trim();
    const programa = String(row[11] ?? "").trim();
    const importeAbonado = num(row[14]);
    const asesor = String(row[17] ?? "").trim();
    const estado = normalizeEstado(row[18]);
    const segundoPago = num(row[23]);
    const segundoPagoFecha = excelSerialToDate(row[24]);
    const tercerPago = num(row[25]);
    const cuartoPago = num(row[27]);

    const totalProgramado =
      importeAbonado + segundoPago + tercerPago + cuartoPago;
    const deudaPendiente = totalProgramado - importeAbonado;

    result.push({
      id: `deudor-${i}`,
      nombres,
      apellidos,
      celular,
      programa,
      importeAbonado,
      estado,
      asesor,
      segundoPago: segundoPago || null,
      segundoPagoFecha,
      tercerPago: tercerPago || null,
      cuartoPago: cuartoPago || null,
      totalProgramado,
      deudaPendiente,
    });
  }
  return result;
}
