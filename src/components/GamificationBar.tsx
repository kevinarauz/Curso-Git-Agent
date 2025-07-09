import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Star, Trophy, Zap } from 'lucide-react';

const GamificationBar: React.FC = () => {
  const { user, progress } = useGame();

  const progressPercentage = progress.experienceToNextLevel > 0 
    ? Math.floor((progress.currentExperience / progress.experienceToNextLevel) * 100) 
    : 0;

  const getLevelName = (level: number) => {
    if (level >= 10) return 'Maestro Git';
    if (level >= 7) return 'Experto Git';
    if (level >= 4) return 'Avanzado Git';
    if (level >= 2) return 'Intermedio Git';
    return 'Novato Git';
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Nivel y Progreso */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">
                Nivel {user.level}: {getLevelName(user.level)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
                {progress.currentExperience} / {progress.experienceToNextLevel} XP
              </div>
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-300 to-orange-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm">{progress.totalPoints} Puntos</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span className="text-sm">{user.badges.length} Badges</span>
            </div>

            <div className="flex items-center space-x-1">
              <span className="text-sm">
                🔥 {progress.streak} días
              </span>
            </div>

            {/* Progreso de módulos */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm">
                📚 {progress.completedModules}/{progress.totalModules} módulos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationBar;
