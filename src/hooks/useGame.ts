import * as React from 'react';
import { GameContext } from '../contexts/GameContextImpl';
import { GameContextType } from '../types';

// Hook personalizado
export const useGame = (): GameContextType => {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
  }
  return context;
};