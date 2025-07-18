#!/bin/bash

# Verificación de deployment para GitHub Pages
echo "🔍 Verificando configuración de GitHub Pages..."

# Verificar que existe el build
if [ ! -d "dist" ]; then
    echo "❌ Error: No existe el directorio 'dist'. Ejecuta 'npm run build' primero."
    exit 1
fi

# Verificar archivos importantes
echo "✅ Verificando archivos..."
files=("dist/index.html" "dist/assets" "dist/site.webmanifest" "dist/.nojekyll")

for file in "${files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file existe"
    else
        echo "❌ $file no encontrado"
    fi
done

# Verificar configuración de Vite
if grep -q "base: '/Curso-Git-Agent/'" vite.config.ts; then
    echo "✅ Configuración de base path correcta en vite.config.ts"
else
    echo "❌ Base path no configurado correctamente en vite.config.ts"
fi

# Verificar package.json
if grep -q "kevinarauz.github.io/Curso-Git-Agent" package.json; then
    echo "✅ Homepage URL correcta en package.json"
else
    echo "❌ Homepage URL no configurada en package.json"
fi

# Verificar GitHub Actions
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ GitHub Actions workflow configurado"
else
    echo "❌ GitHub Actions workflow no encontrado"
fi

echo ""
echo "🚀 Pasos para desplegar:"
echo "1. Commit todos los cambios"
echo "2. Push a la rama master"
echo "3. GitHub Actions desplegará automáticamente"
echo "4. Verifica el estado en: https://github.com/kevinarauz/Curso-Git-Agent/actions"
echo "5. Sitio disponible en: https://kevinarauz.github.io/Curso-Git-Agent/"
