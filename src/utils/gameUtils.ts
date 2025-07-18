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
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${minutes}m`;
};