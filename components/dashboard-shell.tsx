"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardStore } from "@/store/dashboard.store";
import { useTheme } from "@/components/theme-provider";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const NAV_ITEMS = [
  { href: "/overview", label: "Overview", icon: "dashboard" },
  { href: "/ventas", label: "Ventas", icon: "receipt_long" },
  { href: "/deudores", label: "Deudores", icon: "account_balance_wallet" },
  { href: "/marketing", label: "Marketing", icon: "campaign" },
] as const;

const SEDE_OPTIONS = ["Todas", "Chincha", "Lima"] as const;

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sedeFilter, setSedeFilter, dateRange } = useDashboardStore();
  const { theme, toggleTheme } = useTheme();
  const dateRangeLabel =
    dateRange.start && dateRange.end
      ? `${format(dateRange.start, "d MMM yyyy", { locale: es })} – ${format(dateRange.end, "d MMM yyyy", { locale: es })}`
      : "Últimos 30 días";

  return (
    <div className="flex h-screen overflow-hidden bg-th-bg text-th-text antialiased font-display">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-th-border bg-th-surface flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined font-bold">health_and_safety</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">JHL</h1>
            <p className="text-xs text-th-text-muted font-medium">Beauty &amp; Health</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive =
              href === "/overview" ? pathname === "/overview" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-th-text-secondary hover:text-th-text hover:bg-th-surface-hover"
                }`}
              >
                <span
                  className={`material-symbols-outlined ${isActive ? "fill-1" : ""}`}
                  style={{ fontSize: "1.25rem" }}
                >
                  {icon}
                </span>
                <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 mt-auto border-t border-th-border">
          <div className="flex items-center gap-3 p-2">
            <div className="size-8 rounded-full bg-th-text-muted/20 overflow-hidden flex items-center justify-center text-th-text-secondary text-xs font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Admin JHL</p>
              <p className="text-xs text-th-text-muted truncate">Sede Lima</p>
            </div>
            <span className="material-symbols-outlined text-th-text-muted" style={{ fontSize: "1.25rem" }}>
              settings
            </span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-th-border bg-th-surface/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div className="flex items-center bg-th-bg border border-th-border rounded-lg p-1">
            {SEDE_OPTIONS.map((sede) => (
              <button
                key={sede}
                type="button"
                onClick={() => setSedeFilter(sede)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  sedeFilter === sede
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-th-text-secondary hover:text-th-text"
                }`}
              >
                {sede}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-th-bg border border-th-border rounded-lg px-3 py-1.5">
              <span className="material-symbols-outlined text-th-text-muted" style={{ fontSize: "1.125rem" }}>
                calendar_month
              </span>
              <span className="text-sm font-medium">{dateRangeLabel}</span>
              <span className="material-symbols-outlined text-th-text-muted" style={{ fontSize: "1.125rem" }}>
                expand_more
              </span>
            </div>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className="size-10 flex items-center justify-center rounded-lg border border-th-border text-th-text-secondary hover:text-th-text hover:bg-th-surface-hover transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <button
              type="button"
              className="size-10 flex items-center justify-center rounded-lg border border-th-border text-th-text-secondary hover:text-th-text hover:bg-th-surface-hover transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>
                notifications
              </span>
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
