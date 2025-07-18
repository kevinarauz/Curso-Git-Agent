// Resource Loader with Multiple Fallbacks
(function() {
    console.log('🚀 Resource Loader initialized');
    
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
    
    // Cargar el script principal con fallbacks
    const mainScriptPaths = [
        '/Curso-Git-Agent/src/main.tsx',
        './src/main.tsx',
        'src/main.tsx'
    ];
    
    // Cargar manifest con fallbacks
    const manifestPaths = [
        '/Curso-Git-Agent/site.webmanifest',
        './site.webmanifest',
        'site.webmanifest'
    ];
    
    // Intentar cargar el manifest
    loadWithFallbacks(manifestPaths, 'link')
        .then(path => console.log(`✅ Manifest loaded from: ${path}`))
        .catch(error => console.error('❌ All manifest paths failed:', error));
    
    // Función para cargar el script principal cuando el DOM esté listo
    function loadMainScript() {
        console.log('📦 Loading main script...');
        loadWithFallbacks(mainScriptPaths, 'script')
            .then(path => console.log(`✅ Main script loaded from: ${path}`))
            .catch(error => {
                console.error('❌ All main script paths failed:', error);
                // Mostrar mensaje de error al usuario
                document.body.innerHTML = `
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                        <h1>Error de Carga</h1>
                        <p>No se pudo cargar la aplicación. Por favor, recarga la página.</p>
                        <button onclick="location.reload()">Recargar</button>
                    </div>
                `;
            });
    }
    
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMainScript);
    } else {
        loadMainScript();
    }
})();
