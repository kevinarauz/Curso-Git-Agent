// GitHub Pages URL Fix
(function() {
    const currentUrl = window.location.href;
    const expectedBase = 'https://kevinarauz.github.io/Curso-Git-Agent/';
    
    // Si estamos en la URL raíz y no en el subdirectorio correcto
    if (currentUrl === 'https://kevinarauz.github.io/' || 
        currentUrl === 'https://kevinarauz.github.io/index.html') {
        console.log('Redirecting to correct subdirectory...');
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
        
        // Mostrar información de depuración
        console.log('🔍 Debug info:');
        console.log('- Current URL:', currentUrl);
        console.log('- Expected base:', expectedBase);
        console.log('- Base element:', document.querySelector('base'));
        console.log('- Document ready:', document.readyState);
    } else {
        console.warn('❌ Unexpected URL:', currentUrl);
        console.warn('Expected to start with:', expectedBase);
    }
})();
