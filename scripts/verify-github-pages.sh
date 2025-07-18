#!/bin/bash

# Script de verificación para GitHub Pages

echo "🔍 Verificando configuración de GitHub Pages..."
echo "================================================"

# Verificar build
echo "1. Verificando build..."
if [ -d "dist" ]; then
    echo "✅ Directorio dist existe"
    
    # Verificar archivos importantes
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html existe"
        
        # Verificar que index.html tenga las rutas correctas
        if grep -q 'href="/assets/' dist/index.html; then
            echo "✅ Assets con rutas correctas"
        else
            echo "❌ Assets no tienen rutas correctas"
        fi
        
        # Verificar manifest
        if grep -q 'href="/site.webmanifest"' dist/index.html; then
            echo "✅ Manifest con ruta correcta"
        else
            echo "❌ Manifest no tiene ruta correcta"
        fi
        
    else
        echo "❌ index.html no existe"
    fi
    
    # Verificar site.webmanifest
    if [ -f "dist/site.webmanifest" ]; then
        echo "✅ site.webmanifest existe"
    else
        echo "❌ site.webmanifest no existe"
    fi
    
    # Verificar assets
    if [ -d "dist/assets" ]; then
        echo "✅ Directorio assets existe"
        asset_count=$(ls -1 dist/assets | wc -l)
        echo "📁 Archivos en assets: $asset_count"
    else
        echo "❌ Directorio assets no existe"
    fi
    
else
    echo "❌ Directorio dist no existe - ejecuta 'npm run build'"
fi

echo ""
echo "2. Verificando configuración..."

# Verificar vite.config.ts
if grep -q 'base: "/"' vite.config.ts; then
    echo "✅ Base path configurado para dominio raíz"
elif grep -q "base: '/'" vite.config.ts; then
    echo "✅ Base path configurado para dominio raíz"
else
    echo "❌ Base path no configurado correctamente"
fi

# Verificar package.json
if grep -q '"homepage": "https://kevinarauz.github.io"' package.json; then
    echo "✅ Homepage configurada para dominio raíz"
else
    echo "❌ Homepage no configurada correctamente"
fi

# Verificar workflow
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ Workflow de deployment existe"
    
    if grep -q "pages: write" .github/workflows/deploy.yml; then
        echo "✅ Permisos de Pages configurados"
    else
        echo "❌ Permisos de Pages no configurados"
    fi
else
    echo "❌ Workflow de deployment no existe"
fi

echo ""
echo "3. Información del proyecto:"
echo "Repository: https://github.com/kevinarauz/Curso-Git-Agent"
echo "Actions: https://github.com/kevinarauz/Curso-Git-Agent/actions"
echo "Expected URL: https://kevinarauz.github.io/"

echo ""
echo "4. Próximos pasos:"
echo "- Hacer commit y push de los cambios"
echo "- Verificar que GitHub Pages esté configurado con Source: GitHub Actions"
echo "- Monitorear el deployment en la pestaña Actions"
