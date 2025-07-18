// Enhanced Resource Loader with Auto-Detection
(function() {
    console.log('🚀 Enhanced Resource Loader initialized');
    
    // Función para detectar el archivo JS principal
    async function detectMainScript() {
        console.log('🔍 Detecting main script...');
        
        // Buscar en el HTML actual los scripts que terminan en .js
        const scripts = Array.from(document.querySelectorAll('script[src*=".js"]'));
        const jsFiles = scripts.map(script => script.src).filter(src => src.includes('/assets/'));
        
        if (jsFiles.length > 0) {
            console.log('✅ Found JS files in HTML:', jsFiles);
            return jsFiles[0];
        }
        
        // Si no encuentra nada, buscar archivos con hash en assets
        const assetsPaths = [
            '/Curso-Git-Agent/assets/index.js',
            '/Curso-Git-Agent/assets/main.js',
            '/Curso-Git-Agent/assets/app.js'
        ];
        
        // Buscar también archivos con hash común de Vite
        const hashPatterns = [
            '/Curso-Git-Agent/assets/index-CjHu_5UW.js',
            '/Curso-Git-Agent/assets/index-DwcGaxKW.js',
            '/Curso-Git-Agent/assets/main-CjHu_5UW.js',
            '/Curso-Git-Agent/assets/app-CjHu_5UW.js'
        ];
        
        const allPaths = [...assetsPaths, ...hashPatterns];
        
        for (const path of allPaths) {
            try {
                const response = await fetch(path, { method: 'HEAD' });
                if (response.ok) {
                    console.log('✅ Found main script:', path);
                    return path;
                }
            } catch (error) {
                console.log('❌ Not found:', path);
            }
        }
        
        return null;
    }
    
    // Función para cargar recursos con fallbacks
    function loadWithFallbacks(resourcePaths, type = 'script') {
        return new Promise((resolve, reject) => {
            let currentIndex = 0;
            
            function tryLoad() {
                if (currentIndex >= resourcePaths.length) {
                    reject(new Error(`Failed to load resource from all paths: ${resourcePaths.join(', ')}`));
                    return;
                }
                
                const currentPath = resourcePaths[currentIndex];
                console.log(`🔄 Trying to load: ${currentPath}`);
                
                if (type === 'script') {
                    const script = document.createElement('script');
                    script.type = 'module';
                    script.src = currentPath;
                    
                    script.onload = () => {
                        console.log(`✅ Successfully loaded: ${currentPath}`);
                        resolve(currentPath);
                    };
                    
                    script.onerror = () => {
                        console.warn(`❌ Failed to load: ${currentPath}`);
                        currentIndex++;
                        tryLoad();
                    };
                    
                    document.head.appendChild(script);
                } else if (type === 'link') {
                    const link = document.createElement('link');
                    link.rel = 'manifest';
                    link.href = currentPath;
                    
                    // Test if manifest is accessible
                    fetch(currentPath)
                        .then(response => {
                            if (response.ok) {
                                console.log(`✅ Manifest accessible: ${currentPath}`);
                                document.head.appendChild(link);
                                resolve(currentPath);
                            } else {
                                throw new Error(`HTTP ${response.status}`);
                            }
                        })
                        .catch(error => {
                            console.warn(`❌ Manifest failed: ${currentPath} - ${error.message}`);
                            currentIndex++;
                            tryLoad();
                        });
                }
            }
            
            tryLoad();
        });
    }
    
    // Función principal para cargar la aplicación
    async function loadApplication() {
        console.log('📦 Loading application...');
        
        try {
            // Primero, intentar cargar el script principal desde src/main.tsx
            const mainScriptPaths = [
                '/Curso-Git-Agent/src/main.tsx',
                './src/main.tsx',
                'src/main.tsx'
            ];
            
            console.log('🎯 Attempting to load main script...');
            
            try {
                const mainPath = await loadWithFallbacks(mainScriptPaths, 'script');
                console.log(`✅ Main script loaded from: ${mainPath}`);
            } catch (error) {
                console.log('⚠️ Main script not found, trying to detect compiled version...');
                
                // Si no puede cargar main.tsx, buscar el archivo compilado
                const compiledScript = await detectMainScript();
                if (compiledScript) {
                    const script = document.createElement('script');
                    script.type = 'module';
                    script.src = compiledScript;
                    script.onload = () => console.log(`✅ Compiled script loaded: ${compiledScript}`);
                    script.onerror = () => console.error(`❌ Failed to load compiled script: ${compiledScript}`);
                    document.head.appendChild(script);
                } else {
                    throw new Error('No main script found');
                }
            }
            
        } catch (error) {
            console.error('❌ All script loading attempts failed:', error);
            
            // Mostrar mensaje de error al usuario
            const root = document.getElementById('root');
            if (root) {
                root.innerHTML = `
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f8f9fa;">
                        <h1 style="color: #F05032;">🔧 Error de Carga</h1>
                        <p style="color: #6c757d; font-size: 18px;">La aplicación no se pudo cargar correctamente.</p>
                        <p style="color: #6c757d;">Por favor, verifica que los recursos estén disponibles.</p>
                        <button onclick="location.reload()" style="background: #F05032; color: white; border: none; padding: 15px 30px; border-radius: 5px; font-size: 16px; cursor: pointer; margin-top: 20px;">
                            🔄 Recargar Página
                        </button>
                        <div style="margin-top: 30px; padding: 20px; background: #e9ecef; border-radius: 5px; text-align: left;">
                            <h3>🔍 Diagnóstico</h3>
                            <p>• <a href="/Curso-Git-Agent/debug.html" target="_blank">Página de Debug</a></p>
                            <p>• <a href="/Curso-Git-Agent/resource-check.html" target="_blank">Verificación de Recursos</a></p>
                            <p>• <a href="/Curso-Git-Agent/quick-test.html" target="_blank">Test Rápido</a></p>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    // Cargar manifest con fallbacks
    const manifestPaths = [
        '/Curso-Git-Agent/site.webmanifest',
        './site.webmanifest',
        'site.webmanifest'
    ];
    
    loadWithFallbacks(manifestPaths, 'link')
        .then(path => console.log(`✅ Manifest loaded from: ${path}`))
        .catch(error => console.warn('⚠️ Manifest not loaded:', error.message));
    
    // Función para cargar cuando el DOM esté listo
    function initWhenReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadApplication);
        } else {
            loadApplication();
        }
    }
    
    // Inicializar
    initWhenReady();
    
    // Información de debugging
    console.log('🔍 Debug info:', {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        documentState: document.readyState
    });
})();
