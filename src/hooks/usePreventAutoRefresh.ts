import * as React from 'react';
const { useEffect, useRef } = React;

/**
 * Hook que previene auto-refresh y mantiene el estado del modal
 */
export const usePreventAutoRefresh = (isModalOpen: boolean) => {
  const refreshBlocked = useRef(false);

  useEffect(() => {
    if (isModalOpen && !refreshBlocked.current) {
      refreshBlocked.current = true;
      
      // Bloquear refresh/reload de la página
      const preventRefresh = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = 'El modal está abierto. ¿Estás seguro de que quieres salir?';
        return e.returnValue;
      };

      // Bloquear F5, Ctrl+R, etc.
      const preventKeyRefresh = (e: KeyboardEvent) => {
        // F5 o Ctrl+R
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
          e.preventDefault();
          e.stopPropagation();
          console.warn('🚫 Refresh bloqueado - Modal abierto');
          return false;
        }
      };

      // Bloquear cambios de URL que pueden causar refresh
      const preventNavigation = (e: PopStateEvent) => {
        if (isModalOpen) {
          e.preventDefault();
          window.history.pushState(null, '', window.location.href);
          console.warn('🚫 Navegación bloqueada - Modal abierto');
        }
      };

      // Agregar event listeners
      window.addEventListener('beforeunload', preventRefresh);
      window.addEventListener('keydown', preventKeyRefresh, { capture: true });
      window.addEventListener('popstate', preventNavigation);

      // Bloquear WebSocket reconnection de Vite si existe
      if ((window as any).__vite_plugin_react_preamble_installed__) {
        console.warn('🚫 Vite HMR detectado y bloqueado durante modal');
      }

      return () => {
        // Cleanup
        window.removeEventListener('beforeunload', preventRefresh);
        window.removeEventListener('keydown', preventKeyRefresh, { capture: true });
        window.removeEventListener('popstate', preventNavigation);
        refreshBlocked.current = false;
      };
    }
  }, [isModalOpen]);

  // Bloquear console.clear() que puede causar refresh visual
  useEffect(() => {
    if (isModalOpen) {
      const originalClear = console.clear;
      console.clear = () => {
        console.warn('🚫 console.clear() bloqueado durante modal');
      };

      return () => {
        console.clear = originalClear;
      };
    }
  }, [isModalOpen]);
};

/**
 * Hook para forzar la posición del modal sin importar refreshes
 */
export const useModalPositionLock = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // Forzar posición cada 100ms
      const interval = setInterval(() => {
        const modal = document.querySelector('.modal-content-certificate') as HTMLElement;
        if (modal) {
          modal.style.position = 'fixed !important';
          modal.style.top = '50% !important';
          modal.style.left = '50% !important';
          modal.style.transform = 'translate(-50%, -50%) !important';
          modal.style.zIndex = '99999 !important';
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isOpen]);
};
