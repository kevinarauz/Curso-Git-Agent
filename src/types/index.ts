// Tipos principales para la aplicación
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  experience: number;
  totalPoints: number;
  badges: Badge[];
  completedModules: string[];
  completedExercises: string[];
  createdAt: Date;
  lastLoginAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  points: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: 'git' | 'gitlab' | 'github';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // en minutos
  prerequisites: string[];
  lessons: Lesson[];
  exercises: Exercise[];
  points: number;
  isLocked: boolean;
  progress: number; // 0-100
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'theory' | 'video' | 'interactive';
  duration: number; // en minutos
  codeExamples: CodeExample[];
  keyPoints: string[];
  isCompleted: boolean;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: 'bash' | 'git' | 'javascript' | 'typescript';
  explanation: string;
  runnable: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'coding' | 'simulation' | 'practical';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  questions?: Question[];
  scenario?: SimulationScenario;
  hints: string[];
  solution: string;
  isCompleted: boolean;
  userAnswer?: string;
  attempts: number;
  maxAttempts: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'code';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  initialState: GitState;
  commands: GitCommand[];
  expectedResult: GitState;
  terminal: TerminalState;
}

export interface GitState {
  workingDirectory: FileSystem;
  stagingArea: FileSystem;
  repository: Repository;
  currentBranch: string;
  branches: Branch[];
  remotes: Remote[];
  commits: Commit[];
  status: GitStatus;
}

export interface FileSystem {
  files: GitFile[];
  directories: GitDirectory[];
}

export interface GitFile {
  name: string;
  path: string;
  content: string;
  status: 'untracked' | 'modified' | 'staged' | 'committed';
  lastModified: Date;
}

export interface GitDirectory {
  name: string;
  path: string;
  files: GitFile[];
  subdirectories: GitDirectory[];
}

export interface Repository {
  name: string;
  description: string;
  url: string;
  isPrivate: boolean;
  defaultBranch: string;
  size: number;
  language: string;
  stars: number;
  forks: number;
}

export interface Branch {
  name: string;
  commit: string;
  isActive: boolean;
  isRemote: boolean;
  upstream?: string;
  lastCommit: Commit;
}

export interface Remote {
  name: string;
  url: string;
  type: 'fetch' | 'push' | 'both';
}

export interface Commit {
  hash: string;
  message: string;
  author: {
    name: string;
    email: string;
  };
  date: Date;
  parent?: string;
  files: string[];
}

export interface GitStatus {
  branch: string;
  ahead: number;
  behind: number;
  staged: string[];
  unstaged: string[];
  untracked: string[];
  conflicted: string[];
}

export interface GitCommand {
  command: string;
  args: string[];
  description: string;
  output: string;
  success: boolean;
}

export interface TerminalState {
  currentDirectory: string;
  history: TerminalCommand[];
  output: string[];
  isRunning: boolean;
}

export interface TerminalCommand {
  command: string;
  timestamp: Date;
  output: string;
  exitCode: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'git' | 'gitlab' | 'github' | 'general';
  relatedTerms: string[];
  examples: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'milestone' | 'streak' | 'mastery' | 'exploration';
  condition: string;
  points: number;
  badge?: Badge;
  isSecret: boolean;
  unlockedBy: string[];
}

export interface Leaderboard {
  daily: LeaderboardEntry[];
  weekly: LeaderboardEntry[];
  monthly: LeaderboardEntry[];
  allTime: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  user: User;
  points: number;
  rank: number;
  change: number; // cambio en ranking
  badges: Badge[];
}

export interface GameProgress {
  currentLevel: number;
  currentExperience: number;
  experienceToNextLevel: number;
  totalPoints: number;
  completedModules: number;
  totalModules: number;
  completedExercises: number;
  totalExercises: number;
  streak: number;
  longestStreak: number;
  averageScore: number;
  timeSpent: number; // en minutos
  lastActivity: Date;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  notifications: boolean;
  soundEffects: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
  autoSave: boolean;
  showHints: boolean;
  fontSize: 'small' | 'medium' | 'large';
  colorScheme: 'default' | 'colorblind' | 'highContrast';
}

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon: string;
  badge?: string;
  children?: NavigationItem[];
  isActive?: boolean;
  isLocked?: boolean;
  requiredLevel?: number;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration: number;
  isVisible: boolean;
}

export interface Modal {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdrop: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'module' | 'lesson' | 'exercise' | 'glossary' | 'achievement';
  category: string;
  url: string;
  relevance: number;
  highlights: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  timestamp: Date;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  filters: Record<string, string | number | boolean>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Tipos para hooks y contextos
export interface GameContextType {
  user: User;
  progress: GameProgress;
  settings: Settings;
  updateProgress: (progress: Partial<GameProgress>) => void;
  addPoints: (points: number) => void;
  unlockBadge: (badge: Badge) => void;
  completeModule: (moduleId: string) => void;
  completeExercise: (exerciseId: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  resetProgress: () => void;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface NotificationContextType {
  notifications: Toast[];
  addNotification: (notification: Omit<Toast, 'id' | 'isVisible'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export interface ModalContextType {
  modals: Modal[];
  openModal: (modal: Omit<Modal, 'id' | 'isOpen'>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

// Tipos para utilidades
export interface LocalStorageKeys {
  USER_PROGRESS: 'git-training-user-progress';
  SETTINGS: 'git-training-settings';
  THEME: 'git-training-theme';
  COMPLETED_MODULES: 'git-training-completed-modules';
  COMPLETED_EXERCISES: 'git-training-completed-exercises';
  BADGES: 'git-training-badges';
  STATISTICS: 'git-training-statistics';
}
