const fs = require('fs');
const path = require('path');

// Función para copiar archivos
function copyFile(source, destination) {
    try {
        fs.copyFileSync(source, destination);
        console.log(`✅ Copiado: ${source} → ${destination}`);
    } catch (error) {
        console.error(`❌ Error copiando ${source}: ${error.message}`);
    }
}

// Archivos a copiar desde public a dist
const filesToCopy = [
    'status.html',
    'verification.html',
    'diagnostics.html',
    'test.html',
    'error-check.html',
    'success.html',
    'pages-index.html',
    'github-pages-fix.js',
    '.htaccess',
    '.nojekyll'
];

console.log('🚀 Iniciando copia de archivos...');

// Asegurar que la carpeta dist existe
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
    console.log('📁 Carpeta dist creada');
}

// Copiar archivos
filesToCopy.forEach(file => {
    const source = path.join(__dirname, 'public', file);
    const destination = path.join(__dirname, 'dist', file);
    
    if (fs.existsSync(source)) {
        copyFile(source, destination);
    } else {
        console.log(`⚠️  Archivo no encontrado: ${source}`);
    }
});

console.log('✅ Proceso de copia completado');
