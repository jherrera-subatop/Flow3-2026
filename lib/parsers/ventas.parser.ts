import * as XLSX from "xlsx";
import type { VentaRecord } from "@/lib/types";

const SHEET_NAME = "REGISTRO DE VENTAS";

function excelSerialToDate(value: unknown): Date | null {
  if (value == null || value === "") return null;
  if (value instanceof Date) return value;
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  // Excel serial: days since 1900-01-01 (Excel epoch)
  const date = new Date((n - 25569) * 86400 * 1000);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeSede(raw: unknown): "CHINCHA" | "LIMA" | "OTRO" {
  const s = String(raw ?? "").trim().toUpperCase();
  if (s === "CHINCHA") return "CHINCHA";
  if (s === "LIMA") return "LIMA";
  return "OTRO";
}

function normalizeCanal(raw: unknown): VentaRecord["canalAdquisicion"] {
  if (raw == null || raw === "") return "OTRO";
  const val = String(raw)
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (!val) return "OTRO";

  if (val.includes("FACE") || val.includes("FB") || val === "F") return "FACEBOOK";
  if (val.includes("INSTA") || val.includes("GRAM") || val === "IG")
    return "INSTAGRAM";
  if (val.includes("TIK") || val.includes("TOK")) return "TIKTOK";
  if (
    val.includes("BOCA") ||
    val.includes("RECOM") ||
    val.includes("AMIGO") ||
    val.includes("FAMILIAR") ||
    val.includes("CONOCIDO") ||
    val.includes("REFERIDO") ||
    val.includes("REFERENCIA") ||
    val.includes("PACIENTE") ||
    val.includes("INFLUENCER")
  )
    return "BOCA_A_BOCA";

  return "OTRO";
}

function num(val: unknown): number {
  const n = Number(val);
  return Number.isNaN(n) ? 0 : n;
}

export function parseVentas(input: string | XLSX.WorkBook): VentaRecord[] {
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

  const result: VentaRecord[] = [];
  // Skip header row (index 0)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!Array.isArray(row)) continue;
    const nombre = String(row[0] ?? "").trim();
    const apellido = String(row[1] ?? "").trim();
    const celular = String(row[2] ?? "").trim();
    const sede = normalizeSede(row[3]);
    const servicio = String(row[4] ?? "").trim();
    const categoria = String(row[5] ?? "").trim();
    const fechaSeparacion = excelSerialToDate(row[6]);
    const adelanto = num(row[7]);
    const porCobrar = num(row[11]);
    const totalServicio = adelanto + porCobrar;
    const canalAdquisicion = normalizeCanal(row[8]);
    const vendedor = String(row[9] ?? "").trim();
    const medioPago = String(row[12] ?? "").trim();

    result.push({
      id: `venta-${i}`,
      nombre,
      apellido,
      celular,
      sede,
      servicio,
      categoria,
      fechaSeparacion,
      adelanto,
      porCobrar,
      totalServicio,
      canalAdquisicion,
      vendedor,
      medioPago,
    });
  }
  return result;
}
