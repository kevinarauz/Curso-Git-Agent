import React, { useState } from 'react';
import { useGame } from '../hooks/useGame';
import { Play, CheckCircle, Clock, Target, Trophy, Code } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  points: number;
  category: string;
  completed: boolean;
}

const ExercisesPage: React.FC = () => {
  const { addPoints } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const exercises: Exercise[] = [
    {
      id: 'git-basics-1',
      title: 'Tu primer repositorio',
      description: 'Crea un repositorio desde cero y realiza tu primer commit',
      difficulty: 'beginner',
      estimatedTime: 15,
      points: 50,
      category: 'basics',
      completed: false,
    },
    {
      id: 'git-basics-2',
      title: 'Trabajando con el Staging Area',
      description: 'Aprende a usar git add y git status para preparar tus cambios',
      difficulty: 'beginner',
      estimatedTime: 20,
      points: 75,
      category: 'basics',
      completed: false,
    },
    {
      id: 'git-branches-1',
      title: 'Creando y fusionando ramas',
      description: 'Crea una nueva rama, haz cambios y fusiona con la rama principal',
      difficulty: 'intermediate',
      estimatedTime: 30,
      points: 100,
      category: 'branching',
      completed: false,
    },
    {
      id: 'git-remote-1',
      title: 'Conectando con GitHub',
      description: 'Conecta tu repositorio local con un repositorio remoto en GitHub',
      difficulty: 'intermediate',
      estimatedTime: 25,
      points: 125,
      category: 'remote',
      completed: false,
    },
    {
      id: 'git-advanced-1',
      title: 'Resolviendo conflictos de fusión',
      description: 'Aprende a resolver conflictos cuando dos ramas modifican el mismo archivo',
      difficulty: 'advanced',
      estimatedTime: 45,
      points: 200,
      category: 'advanced',
      completed: false,
    },
    {
      id: 'git-advanced-2',
      title: 'Git Rebase Interactivo',
      description: 'Usa git rebase para limpiar el historial de commits',
      difficulty: 'advanced',
      estimatedTime: 40,
      points: 250,
      category: 'advanced',
      completed: false,
    },
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'basics', name: 'Básicos' },
    { id: 'branching', name: 'Ramas' },
    { id: 'remote', name: 'Remotos' },
    { id: 'advanced', name: 'Avanzado' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return difficulty;
    }
  };

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === selectedCategory);

  const handleStartExercise = (exerciseId: string) => {
    // En una implementación real, esto abriría el ejercicio interactivo
    alert(`¡Iniciando ejercicio ${exerciseId}! Esta función estará disponible próximamente.`);
  };

  const handleCompleteExercise = (exerciseId: string, points: number) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
      addPoints(points);
    }
  };

  const stats = {
    total: exercises.length,
    completed: completedExercises.length,
    totalPoints: exercises
      .filter(ex => completedExercises.includes(ex.id))
      .reduce((sum, ex) => sum + ex.points, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Ejercicios Prácticos</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Practica tus habilidades de Git con ejercicios interactivos diseñados para reforzar tu aprendizaje
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Ejercicios Completados</p>
                  <p className="text-3xl font-bold">{stats.completed}/{stats.total}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Puntos Ganados</p>
                  <p className="text-3xl font-bold">{stats.totalPoints}</p>
                </div>
                <Trophy className="w-8 h-8 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Progreso</p>
                  <p className="text-3xl font-bold">{Math.round((stats.completed / stats.total) * 100)}%</p>
                </div>
                <Target className="w-8 h-8 text-purple-200" />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {filteredExercises.map((exercise) => {
            const isCompleted = completedExercises.includes(exercise.id);
            
            return (
              <div key={exercise.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exercise.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                        {getDifficultyLabel(exercise.difficulty)}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completado
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>~{exercise.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>{exercise.points} puntos</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Code className="w-4 h-4" />
                        <span className="capitalize">{exercise.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <button
                      onClick={() => handleStartExercise(exercise.id)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isCompleted ? 'Rehacer' : 'Comenzar'}
                    </button>
                    
                    {!isCompleted && (
                      <button
                        onClick={() => handleCompleteExercise(exercise.id, exercise.points)}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Marcar como completado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay ejercicios en esta categoría
            </h3>
            <p className="text-gray-600">
              Selecciona otra categoría para ver más ejercicios.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;
