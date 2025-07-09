import React, { useState } from 'react';
import { GameProvider } from './contexts/GameContext';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  BookMarked, 
  User, 
  Settings, 
  Home,
  Search,
  Menu,
  X
} from 'lucide-react';
import './App.css';

// Componente principal de navegación
const Navigation = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'modules', label: 'Módulos', icon: BookOpen },
    { id: 'exercises', label: 'Ejercicios', icon: Target },
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
              <button className="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 text-lg px-8 py-3">
                Ver Demo
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
    </div>
  );
};

// Componente placeholder para las demás páginas
const PlaceholderPage = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">{description}</p>
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="text-gray-500">
            <Settings className="w-16 h-16 mx-auto mb-4" />
            <p>Esta sección está en desarrollo...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'modules':
        return <PlaceholderPage title="Módulos de Aprendizaje" description="Explora nuestros módulos interactivos de Git, GitLab y GitHub Desktop" />;
      case 'exercises':
        return <PlaceholderPage title="Ejercicios Prácticos" description="Practica tus habilidades con simuladores y desafíos interactivos" />;
      case 'glossary':
        return <PlaceholderPage title="Glosario" description="Consulta términos y definiciones de Git, GitLab y GitHub" />;
      case 'achievements':
        return <PlaceholderPage title="Logros y Badges" description="Visualiza tu progreso y desbloquea nuevos logros" />;
      case 'profile':
        return <PlaceholderPage title="Mi Perfil" description="Gestiona tu perfil y configuraciones" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <GameProvider>
      <div className="App">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          {renderContent()}
        </main>
      </div>
    </GameProvider>
  );
}

export default App;
