import * as React from 'react';
const { useState, useEffect, useCallback } = React;

/**
 * Hook personalizado para persistir estado en localStorage
 * Previene pérdida de estado durante HMR en desarrollo
 */
export function usePersistentState<T>(
  key: string,
  defaultValue: T,
  serialize?: (value: T) => string,
  deserialize?: (value: string) => T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  
  const serializer = serialize || JSON.stringify;
  const deserializer = deserialize || JSON.parse;

  // Estado inicial con persistencia
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) return defaultValue;
      
      // Para valores primitivos como boolean, string, number
      if (typeof defaultValue === 'boolean') {
        return (stored === 'true') as T;
      }
      if (typeof defaultValue === 'string') {
        return stored as T;
      }
      if (typeof defaultValue === 'number') {
        return Number(stored) as T;
      }
      
      // Para objetos y arrays
      return deserializer(stored);
    } catch (error) {
      console.warn(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  });

  // Actualizar localStorage cuando cambia el estado
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      if (typeof state === 'boolean' || typeof state === 'string' || typeof state === 'number') {
        localStorage.setItem(key, String(state));
      } else {
        localStorage.setItem(key, serializer(state));
      }
    } catch (error) {
      console.warn(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, state, serializer]);

  // Función para limpiar el estado
  const clearState = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
    setState(defaultValue);
  }, [key, defaultValue]);

  return [state, setState, clearState];
}
