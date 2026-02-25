"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/formatters";

export interface CSVPreviewRow {
  nombre: string;
  gasto: number;
  gastoUSD: number;
  canal: "FACEBOOK" | "INSTAGRAM" | "TIKTOK";
  resultados: number;
  impresiones: number;
  alcance: number;
  periodo: string;
}

interface AdsSpendFormProps {
  onAdd: (item: {
    canal: "FACEBOOK" | "INSTAGRAM" | "TIKTOK";
    periodo: string;
    gasto: number;
  }) => void;
}

export function AdsSpendForm({ onAdd }: AdsSpendFormProps) {
  const [csvPreview, setCsvPreview] = useState<CSVPreviewRow[]>([]);
  const [periodoDetectado, setPeriodoDetectado] = useState("");
  const [tipoCambio, setTipoCambio] = useState(3.75);

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;

      const parseCSVLine = (line: string): string[] => {
        const result: string[] = [];
        let current = "";
        let inQuotes = false;
        for (const char of line) {
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === "," && !inQuotes) {
            result.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };

      const rows = text.split("\n").filter((r) => r.trim() !== "");
      const headers = parseCSVLine(rows[0]);

      const findCol = (keywords: string[]): number => {
        return headers.findIndex((h) =>
          keywords.some((k) => h.toLowerCase().includes(k.toLowerCase()))
        );
      };

      const nombreIdx = findCol(["nombre de la campaña", "campaign name"]);
      const gastoIdx = findCol(["importe gastado", "amount spent"]);
      const resultIdx = findCol(["resultados", "results"]);
      const cpmIdx = findCol(["costo por resultado", "cost per result"]);
      const impresIdx = findCol(["impresiones", "impressions"]);
      const alcanceIdx = findCol(["alcance", "reach"]);
      const inicioIdx = findCol(["inicio del informe", "reporting starts"]);

      if (gastoIdx === -1) {
        alert(
          '❌ No se encontró la columna "Importe gastado". Verifica que exportaste con esa columna activa.'
        );
        return;
      }

      const detectCanal = (
        nombre: string
      ): "FACEBOOK" | "INSTAGRAM" | "TIKTOK" => {
        const n = nombre.toLowerCase();
        if (
          n.includes("instagram") ||
          n.includes(" ig ") ||
          n.includes("ig_")
        )
          return "INSTAGRAM";
        if (n.includes("tiktok") || n.includes("tik tok")) return "TIKTOK";
        return "FACEBOOK";
      };

      const firstRow = parseCSVLine(rows[1]);
      const periodoRaw = inicioIdx !== -1 ? firstRow[inicioIdx] : "";
      const periodo = periodoRaw
        ? periodoRaw.slice(0, 7)
        : new Date().toISOString().slice(0, 7);

      const parsed = rows
        .slice(1)
        .map((row) => parseCSVLine(row))
        .filter((r) => r.length > gastoIdx)
        .map((r) => {
          const gastoUSD = parseFloat(
            r[gastoIdx]?.replace(/[^0-9.]/g, "") ?? "0"
          );
          const gastoPEN = gastoUSD * tipoCambio;
          return {
            nombre: r[nombreIdx]?.trim() ?? "Sin nombre",
            gasto: Math.round(gastoPEN * 100) / 100,
            gastoUSD,
            canal: detectCanal(r[nombreIdx] ?? ""),
            resultados: parseInt(r[resultIdx] ?? "0") || 0,
            impresiones: parseInt(r[impresIdx] ?? "0") || 0,
            alcance: parseInt(r[alcanceIdx] ?? "0") || 0,
            periodo,
          };
        })
        .filter((r) => r.gasto > 0);

      setCsvPreview(parsed);
      setPeriodoDetectado(periodo);
    };

    reader.readAsText(file, "utf-8");
  };

  const handleImportCSV = () => {
    const grouped = csvPreview.reduce(
      (acc, row) => {
        if (!acc[row.canal])
          acc[row.canal] = { gasto: 0, resultados: 0, impresiones: 0 };
        acc[row.canal].gasto += row.gasto;
        acc[row.canal].resultados += row.resultados;
        acc[row.canal].impresiones += row.impresiones;
        return acc;
      },
      {} as Record<
        string,
        { gasto: number; resultados: number; impresiones: number }
      >
    );

    Object.entries(grouped).forEach(([canal, data]) => {
      onAdd({
        canal: canal as "FACEBOOK" | "INSTAGRAM" | "TIKTOK",
        periodo: periodoDetectado,
        gasto: Math.round(data.gasto * 100) / 100,
      });
    });

    setCsvPreview([]);
    setPeriodoDetectado("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-400">USD → S/</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={tipoCambio}
          onChange={(e) => setTipoCambio(Number(e.target.value) || 3.75)}
          className="w-16 bg-[#2A2A2A] border border-[#3A3A3A] rounded px-2 py-1 text-xs text-white"
        />
      </div>

      <label className="block border-2 border-dashed border-[#2A2A2A] rounded-xl p-6 text-center cursor-pointer hover:border-violet-500/50 transition-colors">
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="hidden"
        />
        <p className="text-sm text-gray-400">
          Arrastra o selecciona CSV de Meta Ads Manager
        </p>
      </label>

      <p className="text-xs text-amber-400/70 mt-2">
        ⚠ Meta exporta en USD. Se convierte automáticamente a S/ usando tipo de
        cambio {tipoCambio}
      </p>

      {csvPreview.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {csvPreview.length} campañas · {periodoDetectado}
            </p>
            <p className="text-xs text-gray-500">USD → S/ (x{tipoCambio})</p>
          </div>

          {csvPreview.map((row, i) => (
            <div
              key={i}
              className="bg-[#2A2A2A] rounded-lg px-3 py-2 space-y-1"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-300 truncate max-w-[65%]">
                  {row.nombre}
                </span>
                <div className="text-right">
                  <p className="text-xs text-white font-medium">
                    {formatCurrency(row.gasto)}
                  </p>
                  <p className="text-xs text-gray-500">
                    ${row.gastoUSD.toFixed(2)} USD
                  </p>
                </div>
              </div>
              <div className="flex gap-3 text-xs text-gray-500">
                <span>📣 {row.impresiones.toLocaleString()} imp.</span>
                <span>✉ {row.resultados} resultados</span>
                <span
                  className={`font-medium ${
                    row.canal === "INSTAGRAM"
                      ? "text-pink-400"
                      : row.canal === "TIKTOK"
                        ? "text-gray-300"
                        : "text-blue-400"
                  }`}
                >
                  {row.canal}
                </span>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2 border-t border-[#3A3A3A]">
            <div>
              <p className="text-xs text-gray-500">Total invertido</p>
              <p className="text-xs text-gray-600">
                $
                {csvPreview
                  .reduce((s, r) => s + r.gastoUSD, 0)
                  .toFixed(2)}{" "}
                USD
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-emerald-400 font-semibold">
                {formatCurrency(
                  csvPreview.reduce((s, r) => s + r.gasto, 0)
                )}
              </p>
              <p className="text-xs text-gray-500">en soles</p>
            </div>
          </div>

          <button
            onClick={handleImportCSV}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            ✓ Importar {csvPreview.length} campañas al Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
