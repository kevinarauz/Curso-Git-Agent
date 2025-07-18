import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Github, Mail, Heart, RefreshCw } from 'lucide-react';

const Footer: React.FC = () => {
  const { resetProgress } = useGame();

  const handleResetProgress = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
      resetProgress();
      window.location.reload();
    }
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Información del proyecto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Git Training Portal</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Una plataforma interactiva para aprender Git, GitLab y GitHub Desktop. 
              Domina el control de versiones con nuestro sistema de gamificación y 
              ejercicios prácticos.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Manual de Git
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Asistente IA
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Glosario
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Ejercicios Prácticos
                </a>
              </li>
            </ul>
          </div>

          {/* Recursos externos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://git-scm.com/doc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  Documentación Oficial de Git
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  GitHub Docs
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.gitlab.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  GitLab Docs
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © 2025 Kevin Aráuz. Todos los derechos reservados.
              </p>
              <div className="flex items-center text-gray-400 text-sm">
                Hecho con <Heart className="w-4 h-4 mx-1 text-red-500" /> para la comunidad
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Enlaces sociales */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@example.com" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              
              {/* Botón de reiniciar progreso */}
              <button
                onClick={handleResetProgress}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reiniciar Progreso</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
