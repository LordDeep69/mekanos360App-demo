# Mekanos Demo

Proyecto demo UI para Mekanos S.A.S.

Contenido:
- Estructura del frontend en React + Vite.
- Mock data en `src/data/`.
- Store global en `src/store/globalStore.js` (Zustand).

Cómo subir a GitHub (pasos locales):

1. Inicializar git y crear rama principal:

```powershell
git init
git add -A
git commit -m "Initial import of Mekanos demo"
git branch -M main
```

2. Crear repositorio en GitHub (desde web) y copiar URL remota (ej: `git@github.com:<usuario>/<repo>.git` o `https://github.com/<usuario>/<repo>.git`).

3. Agregar remote y pushear:

```powershell
git remote add origin <REPO_URL>
git push -u origin main
```

4. (Opcional) Crear ramas de trabajo:

```powershell
git checkout -b feat/cleanup-mocks
```

CI básico con GitHub Actions ya incluido en `.github/workflows/ci.yml`.
