# Deploy en Vercel

## Problema detectado

Vercel estaba desplegando el **commit antiguo 5662f79** en lugar del último. Los fixes están en commits posteriores (7a82286, etc.).

## Configuración necesaria en Vercel

1. **Dashboard Vercel** → Tu proyecto Flow3-2026
2. **Settings** → **Git**
   - **Production Branch**: debe ser `main`
   - Si hay "Redeploy" o "Preview", asegúrate de desplegar desde el commit más reciente
3. **Deployments** → **Create Deployment**
   - Elige la rama `main` y el commit más reciente (no uses "Redeploy" en un deployment viejo)

## Configuración del proyecto (vercel.json)

- **Root Directory**: dejar vacío (raíz del repo)
- **Build Command**: `npm run build`
- **Output Directory**: `app/dist`
- **Install Command**: `npm install` (desde raíz para resolver workspaces)

## Si sigue fallando

1. **Desconectar y reconectar** el repo de GitHub en Vercel
2. Hacer un push vacío para forzar un nuevo deploy:  
   `git commit --allow-empty -m "Trigger Vercel deploy" && git push origin main`
3. En Vercel: **Deployments** → **Create Deployment** → Branch: main
