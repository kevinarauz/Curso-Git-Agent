// GitHub Pages URL Fix - Enhanced Version
(function() {
    console.log('🔧 GitHub Pages Fix Script loaded');
    
    const currentUrl = window.location.href;
    const expectedBase = 'https://kevinarauz.github.io/Curso-Git-Agent/';
    
    // Debug information
    console.log('Current URL:', currentUrl);
    console.log('Expected base:', expectedBase);
    console.log('Document ready state:', document.readyState);
    
    // Si estamos en la URL raíz y no en el subdirectorio correcto
    if (currentUrl === 'https://kevinarauz.github.io/' || 
        currentUrl === 'https://kevinarauz.github.io/index.html') {
        console.log('🔄 Redirecting to correct subdirectory...');
        window.location.replace(expectedBase);
        return;
    }
    
    // Si estamos en el subdirectorio correcto, verificar que los recursos se carguen
    if (currentUrl.startsWith(expectedBase)) {
        console.log('✅ Correct URL detected:', currentUrl);
        
        // Verificar que el base path esté configurado correctamente
        const baseElement = document.querySelector('base');
        if (!baseElement) {
            const base = document.createElement('base');
            base.href = '/Curso-Git-Agent/';
            document.head.insertBefore(base, document.head.firstChild);
            console.log('✅ Base path added dynamically');
        }
        
        // Verificar recursos críticos
        const criticalResources = [
            '/Curso-Git-Agent/site.webmanifest',
            '/Curso-Git-Agent/vite.svg',
            '/Curso-Git-Agent/assets/index.js'
        ];
        
        criticalResources.forEach(resource => {
            fetch(resource)
                .then(response => {
                    if (response.ok) {
                        console.log(`✅ Resource OK: ${resource}`);
                    } else {
                        console.warn(`❌ Resource failed: ${resource} (${response.status})`);
                    }
                })
                .catch(error => {
                    console.error(`❌ Resource error: ${resource}`, error);
                });
        });
        
        // Mostrar información de depuración
        console.log('🔍 Debug info:');
        console.log('- Current URL:', currentUrl);
        console.log('- Expected base:', expectedBase);
        console.log('- Base element:', document.querySelector('base'));
        console.log('- User agent:', navigator.userAgent);
        console.log('- Timestamp:', new Date().toISOString());
        console.log('- Document ready:', document.readyState);
    } else {
        console.warn('❌ Unexpected URL:', currentUrl);
        console.warn('Expected to start with:', expectedBase);
    }
})();
