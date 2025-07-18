# GitHub Pages Deployment Troubleshooting

## Solución para el error 403 (Permission denied)

### 1. Verificar permisos en el repositorio

**Ir a Repository Settings > Actions > General > Workflow permissions:**
- ✅ Seleccionar "Read and write permissions" 
- ✅ Marcar "Allow GitHub Actions to create and approve pull requests"

### 2. Configurar GitHub Pages correctamente

**Ir a Repository Settings > Pages:**
- ✅ Source: "GitHub Actions" (no "Deploy from a branch")
- ✅ Esto permitirá que el workflow maneje el deployment

### 3. Opciones de workflow

Hemos creado dos workflows:

#### Opción A: `deploy.yml` (Actualizado)
- Usa `peaceiris/actions-gh-pages@v3`
- Requiere permisos explícitos en el workflow
- Crea/actualiza la rama `gh-pages` automáticamente

#### Opción B: `deploy-modern.yml` (Recomendado)
- Usa las nuevas acciones oficiales de GitHub Pages
- Más seguro y moderno
- No requiere rama `gh-pages`

### 4. Comandos para verificar el estado

```bash
# Verificar si hay cambios pendientes
git status

# Hacer commit de los cambios del workflow
git add .github/workflows/
git commit -m "Fix GitHub Pages deployment permissions"

# Push para activar el workflow
git push origin master
```

### 5. Monitorear el deployment

1. **Ir a la pestaña "Actions"** en GitHub
2. **Verificar que el workflow se ejecute** sin errores
3. **Acceder al sitio** en: https://kevinarauz.github.io/Curso-Git-Agent/

### 6. Si persisten los problemas

Crear un Personal Access Token:
1. GitHub Settings > Developer settings > Personal access tokens
2. Crear token con permisos `repo`
3. Agregarlo como secret: `GH_PAGES_TOKEN`
4. Actualizar el workflow para usar este token

### 7. Verificación final

Una vez configurado correctamente:
- ✅ El workflow se ejecutará automáticamente con cada push
- ✅ Se creará/actualizará la rama `gh-pages`
- ✅ El sitio estará disponible en GitHub Pages
