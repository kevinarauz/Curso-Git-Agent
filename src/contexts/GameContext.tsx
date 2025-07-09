import React, { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from 'react';
import type { GameContextType, User, GameProgress, Settings, Badge } from '../types';

export interface ToastMessage {
  id: string;
  type: 'badge' | 'level' | 'points';
  title: string;
  message: string;
  duration?: number;
}

// Estado inicial
const initialUser: User = {
  id: 'user-001',
  name: 'Aprendiz Git',
  email: 'aprendiz@git.com',
  level: 1,
  experience: 0,
  totalPoints: 0,
  badges: [],
  completedModules: [],
  completedExercises: [],
  createdAt: new Date(),
  lastLoginAt: new Date(),
};

const initialProgress: GameProgress = {
  currentLevel: 1,
  currentExperience: 0,
  experienceToNextLevel: 100,
  totalPoints: 0,
  completedModules: 0,
  totalModules: 24,
  completedExercises: 0,
  totalExercises: 72,
  streak: 0,
  longestStreak: 0,
  averageScore: 0,
  timeSpent: 0,
  lastActivity: new Date(),
};

const initialSettings: Settings = {
  theme: 'light',
  language: 'es',
  notifications: true,
  soundEffects: true,
  difficulty: 'normal',
  autoSave: true,
  showHints: true,
  fontSize: 'medium',
  colorScheme: 'default',
};

// Tipos para actions
type GameAction =
  | { type: 'UPDATE_PROGRESS'; payload: Partial<GameProgress> }
  | { type: 'ADD_POINTS'; payload: number }
  | { type: 'UNLOCK_BADGE'; payload: Badge }
  | { type: 'COMPLETE_MODULE'; payload: string }
  | { type: 'COMPLETE_EXERCISE'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'RESET_PROGRESS' }
  | { type: 'LEVEL_UP' }
  | { type: 'UPDATE_STREAK' }
  | { type: 'LOAD_STATE'; payload: { user: User; progress: GameProgress; settings: Settings } };

interface GameState {
  user: User;
  progress: GameProgress;
  settings: Settings;
}

const initialState: GameState = {
  user: initialUser,
  progress: initialProgress,
  settings: initialSettings,
};

// Reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_PROGRESS': {
      const newProgress = { ...state.progress, ...action.payload };
      
      // Verificar si subió de nivel
      if (newProgress.currentExperience >= newProgress.experienceToNextLevel) {
        const levelsGained = Math.floor(newProgress.currentExperience / newProgress.experienceToNextLevel);
        newProgress.currentLevel += levelsGained;
        newProgress.currentExperience = newProgress.currentExperience % newProgress.experienceToNextLevel;
        newProgress.experienceToNextLevel = calculateExperienceToNextLevel(newProgress.currentLevel);
      }

      return {
        ...state,
        progress: newProgress,
        user: {
          ...state.user,
          level: newProgress.currentLevel,
          experience: newProgress.currentExperience,
          totalPoints: newProgress.totalPoints,
        },
      };
    }

    case 'ADD_POINTS': {
      const newPoints = state.progress.totalPoints + action.payload;
      const newExperience = state.progress.currentExperience + action.payload;
      
      return gameReducer(state, {
        type: 'UPDATE_PROGRESS',
        payload: {
          totalPoints: newPoints,
          currentExperience: newExperience,
          lastActivity: new Date(),
        },
      });
    }

    case 'UNLOCK_BADGE': {
      const newBadges = [...state.user.badges, action.payload];
      return {
        ...state,
        user: {
          ...state.user,
          badges: newBadges,
        },
      };
    }

    case 'COMPLETE_MODULE': {
      const newCompletedModules = [...state.user.completedModules, action.payload];
      const newProgress = {
        ...state.progress,
        completedModules: newCompletedModules.length,
        lastActivity: new Date(),
      };

      return {
        ...state,
        user: {
          ...state.user,
          completedModules: newCompletedModules,
        },
        progress: newProgress,
      };
    }

    case 'COMPLETE_EXERCISE': {
      const newCompletedExercises = [...state.user.completedExercises, action.payload];
      const newProgress = {
        ...state.progress,
        completedExercises: newCompletedExercises.length,
        lastActivity: new Date(),
      };

      return {
        ...state,
        user: {
          ...state.user,
          completedExercises: newCompletedExercises,
        },
        progress: newProgress,
      };
    }

    case 'UPDATE_SETTINGS': {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    }

    case 'RESET_PROGRESS': {
      return {
        ...initialState,
        settings: state.settings, // Mantener configuraciones
      };
    }

    case 'LEVEL_UP': {
      return gameReducer(state, {
        type: 'UPDATE_PROGRESS',
        payload: {
          currentLevel: state.progress.currentLevel + 1,
          experienceToNextLevel: calculateExperienceToNextLevel(state.progress.currentLevel + 1),
        },
      });
    }

    case 'UPDATE_STREAK': {
      const today = new Date();
      const lastActivity = new Date(state.progress.lastActivity);
      const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
      
      let newStreak = state.progress.streak;
      if (daysDiff === 1) {
        newStreak += 1;
      } else if (daysDiff > 1) {
        newStreak = 1;
      }

      return gameReducer(state, {
        type: 'UPDATE_PROGRESS',
        payload: {
          streak: newStreak,
          longestStreak: Math.max(newStreak, state.progress.longestStreak),
          lastActivity: today,
        },
      });
    }

    case 'LOAD_STATE': {
      return action.payload;
    }

    default:
      return state;
  }
};

// Utilidades
const calculateExperienceToNextLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Funciones de localStorage
const STORAGE_KEY = 'git-training-game-state';

const saveToStorage = (state: GameState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
};

const loadFromStorage = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        user: {
          ...parsed.user,
          createdAt: new Date(parsed.user.createdAt),
          lastLoginAt: new Date(parsed.user.lastLoginAt),
        },
        progress: {
          ...parsed.progress,
          lastActivity: new Date(parsed.progress.lastActivity),
        },
      };
    }
  } catch (error) {
    console.error('Error al cargar desde localStorage:', error);
  }
  return null;
};

// Contexto
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider
interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Cargar estado desde localStorage al inicializar
  useEffect(() => {
    const savedState = loadFromStorage();
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: savedState });
    }
  }, []);

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  // Actualizar streak diariamente
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_STREAK' });
    }, 60000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, []);

  const updateProgress = (progress: Partial<GameProgress>) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: progress });
  };

  const addPoints = (points: number) => {
    dispatch({ type: 'ADD_POINTS', payload: points });
    
    // Mostrar notificación de puntos
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('points-earned', { detail: { points } }));
    }
  };

  const unlockBadge = (badge: Badge) => {
    dispatch({ type: 'UNLOCK_BADGE', payload: badge });
    
    // Mostrar notificación de badge
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('badge-unlocked', { detail: { badge } }));
    }
  };

  const completeModule = (moduleId: string) => {
    if (!state.user.completedModules.includes(moduleId)) {
      dispatch({ type: 'COMPLETE_MODULE', payload: moduleId });
      addPoints(100); // Puntos base por completar módulo
    }
  };

  const completeExercise = (exerciseId: string) => {
    if (!state.user.completedExercises.includes(exerciseId)) {
      dispatch({ type: 'COMPLETE_EXERCISE', payload: exerciseId });
      addPoints(50); // Puntos base por completar ejercicio
    }
  };

  const updateSettings = (settings: Partial<Settings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const resetProgress = () => {
    dispatch({ type: 'RESET_PROGRESS' });
  };

  const contextValue: GameContextType = {
    user: state.user,
    progress: state.progress,
    settings: state.settings,
    updateProgress,
    addPoints,
    unlockBadge,
    completeModule,
    completeExercise,
    updateSettings,
    resetProgress,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personalizado
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
  }
  return context;
};

// Función para calcular el progreso del nivel
export const calculateLevelProgress = (currentExperience: number, experienceToNextLevel: number): number => {
  const currentLevelExp = currentExperience;
  return Math.floor((currentLevelExp / experienceToNextLevel) * 100);
};

// Función para formatear números grandes
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Función para calcular tiempo estimado
export const formatTime = (minutes: number): string => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
  return `${minutes}m`;
};

export default GameContext;
