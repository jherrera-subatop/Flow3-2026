import type { CampaignRecord } from "@/lib/types";

/**
 * Parsea una línea CSV respetando comillas dobles (campos entre "..." pueden contener comas).
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

function num(val: string): number {
  const s = String(val ?? "").replace(",", ".").replace(/\s/g, "");
  const n = parseFloat(s);
  return Number.isNaN(n) ? 0 : n;
}

function findCol(header: string[], ...names: string[]): number {
  for (const name of names) {
    const i = header.findIndex((h) =>
      h.toLowerCase().includes(name.toLowerCase())
    );
    if (i >= 0) return i;
  }
  return -1;
}

export function parseCampaignsCSV(content: string): CampaignRecord[] {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const header = parseCSVLine(lines[0]);
  const idxNombre = findCol(header, "nombre de la campaña", "campaña");
  const idxEntrega = findCol(header, "entrega");
  const idxResultados = findCol(header, "resultados");
  const idxGastoUSD = findCol(header, "importe gastado", "gastado (usd)");
  const idxImpresiones = findCol(header, "impresiones");
  const idxAlcance = findCol(header, "alcance");
  const idxInicio = findCol(header, "inicio del informe");
  const idxFin = findCol(header, "fin del informe");

  const result: CampaignRecord[] = [];
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    const nombreCampaña =
      idxNombre >= 0 ? String(row[idxNombre] ?? "").replace(/^"|"$/g, "") : "";
    if (!nombreCampaña) continue;

    result.push({
      id: `camp-${i}`,
      nombreCampaña,
      entrega: idxEntrega >= 0 ? String(row[idxEntrega] ?? "") : "",
      resultados: idxResultados >= 0 ? num(row[idxResultados]) : 0,
      gastoUSD: idxGastoUSD >= 0 ? num(row[idxGastoUSD]) : 0,
      impresiones: idxImpresiones >= 0 ? num(row[idxImpresiones]) : 0,
      alcance: idxAlcance >= 0 ? num(row[idxAlcance]) : 0,
      inicio: idxInicio >= 0 ? String(row[idxInicio] ?? "") : "",
      fin: idxFin >= 0 ? String(row[idxFin] ?? "") : "",
    });
  }
  return result;
}
