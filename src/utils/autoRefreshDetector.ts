/**
 * Detector de auto-refresh para modales
 * Detecta cuando un modal se está moviendo o cerrando inesperadamente
 */

import * as React from 'react';
const { useEffect } = React;

export class AutoRefreshDetector {
  private static instance: AutoRefreshDetector;
  private isDetecting = false;
  private refreshCount = 0;
  private lastRefreshTime = 0;

  static getInstance(): AutoRefreshDetector {
    if (!AutoRefreshDetector.instance) {
      AutoRefreshDetector.instance = new AutoRefreshDetector();
    }
    return AutoRefreshDetector.instance;
  }

  startDetection(onRefreshDetected: () => void) {
    if (this.isDetecting) return;
    
    this.isDetecting = true;
    console.log('🔍 Iniciando detección de auto-refresh...');

    // Detectar cambios en el DOM que indiquen refresh
    const observer = new MutationObserver((mutations) => {
      const now = Date.now();
      if (now - this.lastRefreshTime < 1000) return; // Evitar falsos positivos
      
      mutations.forEach((mutation) => {
        // Si se añaden muchos nodos de golpe, probablemente es un refresh
        if (mutation.type === 'childList' && mutation.addedNodes.length > 5) {
          this.refreshCount++;
          this.lastRefreshTime = now;
          
          if (this.refreshCount > 2) {
            console.warn('🚨 Auto-refresh detectado!');
            onRefreshDetected();
            this.refreshCount = 0;
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Detectar cambios en window.location que indiquen navigation refresh
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args: Parameters<typeof originalPushState>) => {
      console.warn('🔄 Navigation change detected');
      onRefreshDetected();
      return originalPushState.apply(history, args);
    };

    history.replaceState = (...args: Parameters<typeof originalReplaceState>) => {
      console.warn('🔄 Navigation change detected');
      onRefreshDetected();
      return originalReplaceState.apply(history, args);
    };

    // Detectar WebSocket reconnections (típico de Vite HMR)
    const originalWebSocket = window.WebSocket;
    window.WebSocket = class extends WebSocket {
      constructor(url: string | URL, protocols?: string | string[]) {
        super(url, protocols);
        console.warn('🔄 WebSocket connection detected (posible HMR)');
        onRefreshDetected();
      }
    } as typeof WebSocket;

    return () => {
      observer.disconnect();
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.WebSocket = originalWebSocket;
      this.isDetecting = false;
    };
  }

  stopDetection() {
    this.isDetecting = false;
    this.refreshCount = 0;
  }
}

/**
 * Hook para detectar auto-refresh y tomar acción
 */
export const useAutoRefreshDetection = (onRefreshDetected: () => void) => {
  useEffect(() => {
    const detector = AutoRefreshDetector.getInstance();
    const cleanup = detector.startDetection(onRefreshDetected);

    return cleanup;
  }, [onRefreshDetected]);
};
