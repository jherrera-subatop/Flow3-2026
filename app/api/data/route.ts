import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import { parseVentas } from "@/lib/parsers/ventas.parser";
import { parseDeudores } from "@/lib/parsers/deudores.parser";
import { parseCampaignsCSV } from "@/lib/parsers/campaigns.parser";
import { calculateKPIs } from "@/lib/calculators/kpi.calculator";
import type { CampaignRecord } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const EXCEL_PATH = path.join(DATA_DIR, "LISTA_DE_CLIENTES_JHL_.xlsx");

function getCampaigns(): CampaignRecord[] {
  try {
    const files = fs.readdirSync(DATA_DIR);
    const csv = files.find(
      (f) =>
        f.endsWith(".csv") &&
        (f.includes("Campañas") || f.includes("DLS-Event") || f.includes("campaign"))
    );
    if (!csv) return [];
    const content = fs.readFileSync(path.join(DATA_DIR, csv), "utf-8");
    return parseCampaignsCSV(content);
  } catch {
    return [];
  }
}

export async function GET() {
  console.log("📂 Reading Excel from:", EXCEL_PATH);
  console.log("📂 Exists:", fs.existsSync(EXCEL_PATH));

  try {
    const campaigns = getCampaigns();

    if (!fs.existsSync(EXCEL_PATH)) {
      console.log("❌ Excel file not found at:", EXCEL_PATH);
      return Response.json({
        ventas: [],
        deudores: [],
        kpis: null,
        campaigns,
        missingFile: true,
        message: `Coloca el archivo LISTA_DE_CLIENTES_JHL_.xlsx en la carpeta data/ del proyecto y recarga.`,
      });
    }

    const buf = fs.readFileSync(EXCEL_PATH);
    console.log("✅ Excel read OK, size:", buf.length, "bytes");

    const workbook = XLSX.read(buf, { type: "buffer", cellDates: false });
    console.log("📋 Available sheets:", workbook.SheetNames);

    const ventas = parseVentas(workbook);
    const deudores = parseDeudores(workbook);
    const kpis = calculateKPIs(ventas, deudores);

    console.log(`✅ Parsed: ${ventas.length} ventas, ${deudores.length} deudores, ${campaigns.length} campaigns`);

    return Response.json({
      ventas,
      deudores,
      kpis,
      campaigns,
      missingFile: false,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Data API error:", message);
    return Response.json(
      { error: message, ventas: [], deudores: [], kpis: null, campaigns: [] },
      { status: 500 }
    );
  }
}
