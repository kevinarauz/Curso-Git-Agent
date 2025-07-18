import * as React from 'react';
const { useState } = React;
import { GameProvider } from './contexts/GameContext';
import GitManualPage from './components/GitManualPage';
import AIAssistant from './components/AIAssistant';
import GlossaryPage from './components/GlossaryPage';
import AchievementsPage from './components/AchievementsPage';
import ExercisesPage from './components/ExercisesPage';
import ExamenPage from './components/ExamenPage';
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';
import ToastContainer, { type ToastMessage } from './components/ToastContainer';
import GamificationBar from './components/GamificationBar';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  BookMarked, 
  User, 
  Home,
  Bot,
  Menu,
  X,
  Award
} from 'lucide-react';
import './App.css';

// Componente principal de navegación
const Navigation = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'manual', label: 'Manual Git', icon: BookOpen },
    { id: 'ai-assistant', label: 'IA Asistente', icon: Bot },
    { id: 'exercises', label: 'Ejercicios', icon: Target },
    { id: 'examen', label: 'Examen', icon: Award },
    { id: 'glossary', label: 'Glosario', icon: BookMarked },
    { id: 'achievements', label: 'Logros', icon: Trophy },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-git-orange to-gitlab-orange rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Git Training Portal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Componente de la página de inicio
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-git-orange to-gitlab-orange rounded-full mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Aprende Git, GitLab y GitHub
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Domina el control de versiones con nuestro portal interactivo. Teoría, práctica y gamificación en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary text-lg px-8 py-3">
                Comenzar Ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Qué aprenderás?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="card-body text-center">
                <div className="w-12 h-12 bg-git-orange rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Git Fundamentals</h3>
                <p className="text-gray-600">
                  Aprende los conceptos básicos de Git: repositorios, commits, ramas y más.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="w-12 h-12 bg-gitlab-orange rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">GitLab CI/CD</h3>
                <p className="text-gray-600">
                  Domina la integración continua y despliegue automático con GitLab.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="w-12 h-12 bg-github-dark rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">GitHub Desktop</h3>
                <p className="text-gray-600">
                  Usa la interfaz gráfica de GitHub para gestionar repositorios fácilmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24</div>
              <div className="text-gray-600">Módulos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">72</div>
              <div className="text-gray-600">Ejercicios</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-git-orange mb-2">150+</div>
              <div className="text-gray-600">Términos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gitlab-orange mb-2">∞</div>
              <div className="text-gray-600">Práctica</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para convertirte en un experto en Git?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Únete a miles de desarrolladores que ya han mejorado sus habilidades con nuestro portal.
          </p>
          <button className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
            Empezar Gratis
          </button>
        </div>
      </section>

      {/* Credits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Créditos y Reconocimientos
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Portal Creado por
              </h3>
              <p className="text-lg text-primary font-medium mb-2">
                Instructor de Programación y Desarrollo
              </p>
              <p className="text-gray-600 mb-4">
                Especialista en Control de Versiones y DevOps
              </p>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Sobre este Portal
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Este portal de capacitación fue desarrollado con el objetivo de proporcionar una experiencia 
                de aprendizaje completa e interactiva para Git, GitLab y GitHub. Combina teoría sólida, 
                ejercicios prácticos y un sistema de gamificación para hacer el aprendizaje más efectivo y divertido.
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-git-orange text-white text-xs rounded-full">Git Expert</span>
                <span className="px-3 py-1 bg-gitlab-orange text-white text-xs rounded-full">GitLab Specialist</span>
                <span className="px-3 py-1 bg-github-dark text-white text-xs rounded-full">GitHub Pro</span>
                <span className="px-3 py-1 bg-primary text-white text-xs rounded-full">React Developer</span>
              </div>
              
              <div className="text-xs text-gray-500">
                <p className="mb-1">
                  💡 <strong>Tecnologías utilizadas:</strong> React + TypeScript, Tailwind CSS, Vite
                </p>
                <p className="mb-1">
                  🎯 <strong>Objetivo:</strong> Democratizar el aprendizaje del control de versiones
                </p>
                <p>
                  📚 <strong>Versión:</strong> 1.0.0 - Portal de Capacitación Git Interactivo
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs text-gray-400">
                "El conocimiento es poder, pero compartir el conocimiento es empoderamiento"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Generador de IDs únicos
  const toastIdCounterRef = React.useRef(0);
  
  const addToast = React.useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const newToast: ToastMessage = {
      ...toast,
      id: `${Date.now()}-${++toastIdCounterRef.current}`,
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Escuchar eventos globales de gamificación
  React.useEffect(() => {
    const handlePointsEarned = (event: CustomEvent) => {
      addToast({
        type: 'points',
        title: '¡Puntos Ganados!',
        message: `Has ganado ${event.detail.points} XP`,
        duration: 3000,
      });
    };

    const handleBadgeUnlocked = (event: CustomEvent) => {
      addToast({
        type: 'badge',
        title: '🏅 ¡Badge Desbloqueado!',
        message: event.detail.badge.name,
        duration: 5000,
      });
    };

    window.addEventListener('points-earned', handlePointsEarned as EventListener);
    window.addEventListener('badge-unlocked', handleBadgeUnlocked as EventListener);

    return () => {
      window.removeEventListener('points-earned', handlePointsEarned as EventListener);
      window.removeEventListener('badge-unlocked', handleBadgeUnlocked as EventListener);
    };
  }, [addToast]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'manual':
        return <GitManualPage />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'exercises':
        return <ExercisesPage />;
      case 'examen':
        return <ExamenPage />;
      case 'glossary':
        return <GlossaryPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <GameProvider>
      <div className="App min-h-screen flex flex-col">
        <GamificationBar />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1">
          {renderContent()}
        </main>
        <Footer />
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    </GameProvider>
  );
}

export default App;
