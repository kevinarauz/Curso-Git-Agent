import React from 'react';
import { GameContextType } from '../types';

export const GameContext = React.createContext<GameContextType | undefined>(undefined);