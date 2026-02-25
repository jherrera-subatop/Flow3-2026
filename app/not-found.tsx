import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-th-bg p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-th-text">Página no encontrada</h1>
        <p className="text-th-text-secondary max-w-sm">
          La ruta que buscas no existe. Usa el enlace de abajo para volver al
          dashboard.
        </p>
        <Link
          href="/overview"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primaryHover transition-colors"
        >
          <Home className="h-4 w-4" />
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
