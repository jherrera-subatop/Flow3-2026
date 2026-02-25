"use client";

type Status = "ACTIVO" | "SUSPENDIDO" | "COMPLETADO";

const STYLES: Record<Status, string> = {
  ACTIVO: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  SUSPENDIDO: "bg-red-500/15 text-red-400 border border-red-500/20",
  COMPLETADO: "bg-gray-500/15 text-gray-400 border border-gray-500/20",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-medium ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
