import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Trophy, Award, Star, Target, Clock, Zap, Calendar, TrendingUp } from 'lucide-react';

const AchievementsPage: React.FC = () => {
  const { user, progress } = useGame();
  const [activeTab, setActiveTab] = useState<'badges' | 'stats' | 'leaderboard'>('badges');

  // Badges disponibles con sus condiciones
  const availableBadges = [
    {
      id: 'first-commit',
      name: 'Primera Confirmación',
      description: 'Realiza tu primer commit',
      icon: '🚀',
      condition: 'Completa la sección de commits en el manual',
      unlocked: user.badges.some(b => b.id === 'commit-master'),
      rarity: 'common',
    },
    {
      id: 'branch-master',
      name: 'Maestro de Ramas',
      description: 'Crea y fusiona tu primera rama',
      icon: '🌿',
      condition: 'Completa la sección de ramas en el manual',
      unlocked: user.badges.some(b => b.id === 'branch-wizard'),
      rarity: 'common',
    },
    {
      id: 'workflow-expert',
      name: 'Experto en Flujo',
      description: 'Domina el flujo de trabajo de Git',
      icon: '⚡',
      condition: 'Completa la sección de workflow en el manual',
      unlocked: user.badges.some(b => b.id === 'workflow-master'),
      rarity: 'uncommon',
    },
    {
      id: 'level-5',
      name: 'Git Veterano',
      description: 'Alcanza el nivel 5',
      icon: '🏆',
      condition: 'Llegar al nivel 5',
      unlocked: user.level >= 5,
      rarity: 'rare',
    },
    {
      id: 'perfectionist',
      name: 'Perfeccionista',
      description: 'Completa todas las secciones del manual',
      icon: '💎',
      condition: 'Completa todo el manual de Git',
      unlocked: false, // Esta se calculará dinámicamente
      rarity: 'epic',
    },
    {
      id: 'early-bird',
      name: 'Madrugador',
      description: 'Completa una lección antes de las 8 AM',
      icon: '🌅',
      condition: 'Actividad temprana',
      unlocked: false,
      rarity: 'uncommon',
    },
    {
      id: 'streak-master',
      name: 'Racha Maestra',
      description: 'Mantén una racha de 7 días',
      icon: '🔥',
      condition: 'Racha de 7 días consecutivos',
      unlocked: progress.streak >= 7,
      rarity: 'rare',
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'uncommon':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rare':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const achievements = {
    totalBadges: user.badges.length,
    totalPoints: progress.totalPoints,
    currentLevel: user.level,
    streak: progress.streak,
    longestStreak: progress.longestStreak,
    completedModules: progress.completedModules,
    completedExercises: progress.completedExercises,
  };

  const renderBadgesTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {achievements.totalBadges} de {availableBadges.length} Badges Desbloqueados
        </h3>
        <p className="text-gray-600">
          Completa desafíos y alcanza hitos para desbloquear nuevos badges
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableBadges.map((badge) => (
          <div
            key={badge.id}
            className={`bg-white rounded-lg p-6 border-2 transition-all duration-200 ${
              badge.unlocked
                ? 'border-yellow-300 shadow-lg'
                : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="text-center">
              <div className={`text-4xl mb-3 ${badge.unlocked ? '' : 'grayscale'}`}>
                {badge.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
              
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getRarityColor(badge.rarity)}`}>
                {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">{badge.condition}</p>
                {badge.unlocked && (
                  <div className="flex items-center justify-center mt-2 text-green-600">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">Desbloqueado</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Estadísticas</h3>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Nivel Actual</p>
              <p className="text-3xl font-bold">{achievements.currentLevel}</p>
            </div>
            <Star className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Puntos Totales</p>
              <p className="text-3xl font-bold">{achievements.totalPoints}</p>
            </div>
            <Zap className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Racha Actual</p>
              <p className="text-3xl font-bold">{achievements.streak}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Badges</p>
              <p className="text-3xl font-bold">{achievements.totalBadges}</p>
            </div>
            <Trophy className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Progreso de Módulos
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Módulos Completados</span>
              <span>{achievements.completedModules}/{progress.totalModules}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.floor((achievements.completedModules / progress.totalModules) * 100)}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Progreso de Ejercicios
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Ejercicios Completados</span>
              <span>{achievements.completedExercises}/{progress.totalExercises}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.floor((achievements.completedExercises / progress.totalExercises) * 100)}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-purple-600" />
          Historial de Actividad
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded ${
                Math.random() > 0.7 ? 'bg-green-200' : 'bg-gray-100'
              }`}
              title={`Día ${i + 1}`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Últimos 35 días de actividad
        </p>
      </div>
    </div>
  );

  const renderLeaderboardTab = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Tabla de Clasificación</h3>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center">
          <Trophy className="w-12 h-12 mx-auto mb-3" />
          <h4 className="text-xl font-bold">Tu Posición Global</h4>
          <p className="text-2xl font-bold mt-2">#42</p>
          <p className="text-sm opacity-90">de 1,247 estudiantes</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'Carlos Developer', points: 2850, level: 8, badge: '🏆' },
              { name: 'Ana Coder', points: 2720, level: 7, badge: '🥈' },
              { name: 'Luis Programmer', points: 2650, level: 7, badge: '🥉' },
              { name: 'María García', points: 2400, level: 6, badge: '🏅' },
              { name: 'Tú', points: achievements.totalPoints, level: achievements.currentLevel, badge: '⭐' },
            ].map((player) => (
              <div
                key={player.name}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  player.name === 'Tú' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{player.badge}</span>
                  <div>
                    <h5 className="font-semibold text-gray-900">{player.name}</h5>
                    <p className="text-sm text-gray-600">Nivel {player.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{player.points}</p>
                  <p className="text-xs text-gray-500">puntos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Logros y Progreso</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sigue tu progreso, desbloquea badges y compite con otros estudiantes
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mt-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('badges')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'badges'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Badges
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'stats'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Estadísticas
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'leaderboard'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Clasificación
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'badges' && renderBadgesTab()}
        {activeTab === 'stats' && renderStatsTab()}
        {activeTab === 'leaderboard' && renderLeaderboardTab()}
      </div>
    </div>
  );
};

export default AchievementsPage;
