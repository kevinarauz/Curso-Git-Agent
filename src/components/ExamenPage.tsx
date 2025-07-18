import * as React from 'react';
const { useEffect } = React;
import { Clock, FileText, CheckCircle, AlertCircle, Trophy, Download, Terminal } from 'lucide-react';
import { useGame } from '../hooks/useGame';
import { usePersistentState } from '../hooks/usePersistentState';
import { usePreventAutoRefresh, useModalPositionLock } from '../hooks/usePreventAutoRefresh';
import { createStaticCertificateModal } from '../utils/staticCertificate';

const ExamenPage: React.FC = () => {
  const { addPoints, unlockBadge } = useGame();
  
  // Estados persistentes para prevenir pérdida durante HMR
  const [examStarted, setExamStarted, clearExamStarted] = usePersistentState('exam-started', false);
  const [timeLeft, setTimeLeft, clearTimeLeft] = usePersistentState('exam-time-left', 60 * 60);
  const [showCommands, setShowCommands, clearShowCommands] = usePersistentState<{ [key: string]: boolean }>('exam-show-commands', {});
  const [showCertificate, setShowCertificate, clearShowCertificate] = usePersistentState('exam-show-certificate', false);

  const examSections = [
    {
      id: 'configuracion',
      title: '1. Configuración de Git',
      points: 1,
      color: 'from-blue-600 to-purple-600',
      icon: '⚙️',
      description: 'Configura tu identidad en Git para comenzar a trabajar',
      tasks: [
        'Ajustar nombre de usuario global de Git',
        'Ajustar correo electrónico global de Git',
        'Verificar que la configuración se haya aplicado correctamente'
      ],
      commands: [
        'git config --global user.name "Tu Nombre"',
        'git config --global user.email "tu@email.com"',
        'git config --list | grep user',
        'git config --global --list'
      ],
      tips: [
        'El nombre y email se usarán en todos tus commits',
        'Puedes usar --local para configurar solo el repositorio actual',
        'Verifica que no haya espacios extra en tu configuración'
      ]
    },
    {
      id: 'repositorio',
      title: '2. Creación y clonación de repositorio remoto',
      points: 1.5,
      color: 'from-green-600 to-blue-600',
      icon: '📂',
      description: 'Aprende a crear y clonar repositorios desde GitHub',
      tasks: [
        'Crear repositorio en GitHub llamado examen-<tu_nombre>',
        'Clonar el repositorio en tu máquina local',
        'Explorar y explicar archivos y carpetas ocultas generadas por Git'
      ],
      commands: [
        '# En GitHub: New Repository -> examen-tu_nombre',
        'git clone https://github.com/usuario/examen-tu_nombre.git',
        'cd examen-tu_nombre',
        'ls -la',
        'ls -la .git/',
        'cat .git/config'
      ],
      tips: [
        'La carpeta .git contiene toda la metadata del repositorio',
        'El archivo .git/config tiene la configuración local',
        'HEAD apunta a la rama actual'
      ]
    },
    {
      id: 'staging',
      title: '3. Área de staging y primer commit',
      points: 2,
      color: 'from-purple-600 to-pink-600',
      icon: '📝',
      description: 'Entiende el flujo de trabajo básico de Git',
      tasks: [
        'Crear archivo hola.txt con el texto "Hola Git"',
        'Añadir archivo al área de staging',
        'Realizar el commit inicial',
        'Mostrar historial de commits y analizar la estructura'
      ],
      commands: [
        'echo "Hola Git" > hola.txt',
        'git status',
        'git add hola.txt',
        'git status',
        'git commit -m "Commit inicial: agregado hola.txt"',
        'git log --oneline',
        'git log --graph --oneline --decorate'
      ],
      tips: [
        'El área de staging es intermedia entre working directory y repository',
        'git status te muestra el estado actual de los archivos',
        'Los commits tienen un hash único (SHA-1)'
      ]
    },
    {
      id: 'ramas',
      title: '4. Trabajo con ramas',
      points: 1.5,
      color: 'from-orange-600 to-red-600',
      icon: '🌳',
      description: 'Maneja ramas para desarrollo paralelo',
      tasks: [
        'Crear rama nueva llamada feature',
        'Cambiar a la rama feature',
        'Modificar hola.txt añadiendo "Línea en feature"',
        'Realizar commit de los cambios'
      ],
      commands: [
        'git branch feature',
        'git checkout feature',
        '# O usar: git checkout -b feature (crea y cambia)',
        'echo "Línea en feature" >> hola.txt',
        'cat hola.txt',
        'git add hola.txt',
        'git commit -m "Añadida línea en feature"',
        'git log --oneline --all --graph'
      ],
      tips: [
        'Las ramas permiten desarrollo paralelo sin afectar main',
        'git checkout -b crea y cambia a la rama en un comando',
        'Cada rama tiene su propia línea de desarrollo'
      ]
    },
    {
      id: 'merge',
      title: '5. Merge de ramas',
      points: 2,
      color: 'from-red-600 to-pink-600',
      icon: '⚔️',
      description: 'Aprende a resolver conflictos en merges',
      tasks: [
        'Cambiar a rama main y modificar la misma línea',
        'Hacer commit en main',
        'Intentar fusionar la rama feature',
        'Resolver el conflicto manualmente',
        'Completar el merge'
      ],
      commands: [
        'git checkout main',
        'echo "Línea en main" >> hola.txt',
        'git add hola.txt',
        'git commit -m "Modificación en main"',
        'git merge feature',
        '# ¡CONFLICTO! Editar hola.txt manualmente',
        'git add hola.txt',
        'git commit -m "Resuelto conflicto entre main y feature"',
        'git log --oneline --graph --all'
      ],
      tips: [
        'Los conflictos ocurren cuando se modifica la misma línea',
        'Git marca los conflictos con <<<<<<, ======, >>>>>>',
        'Debes resolver manualmente y hacer git add + commit'
      ]
    },
    {
      id: 'push',
      title: '6. Push al repositorio remoto',
      points: 2,
      color: 'from-indigo-600 to-purple-600',
      icon: '☁️',
      description: 'Sincroniza cambios con el repositorio remoto',
      tasks: [
        'Subir cambios de main al servidor remoto',
        'Verificar en GitHub que el historial esté disponible',
        'Documentar todo el proceso realizado'
      ],
      commands: [
        'git remote -v',
        'git push origin main',
        'git log --oneline --graph --all',
        '# Verificar en GitHub web interface',
        'git status'
      ],
      tips: [
        'git push sincroniza tu repositorio local con el remoto',
        'origin es el nombre por defecto del repositorio remoto',
        'Siempre verifica que el push fue exitoso'
      ]
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]); // setTimeLeft is stable from useState, using functional form

  const startExam = () => {
    setExamStarted(true);
    addPoints(10); // Puntos por iniciar el examen
  };

  const resetExam = () => {
    // Limpiar todos los estados persistentes
    clearExamStarted();
    clearTimeLeft();
    clearShowCommands();
    clearShowCertificate();
    
    console.log('🔄 Estado del examen reseteado completamente');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const finishExam = () => {
    unlockBadge({
      id: 'git-certified',
      name: 'Certificado Git',
      description: 'Completaste exitosamente el examen de Git',
      icon: '🎓',
      color: '#FFD700',
      rarity: 'legendary',
      points: 100,
      unlockedAt: new Date()
    });
    addPoints(100); // Bonus por completar todo
    
    // Usar certificado estático para prevenir auto-refresh
    if (process.env.NODE_ENV === 'development') {
      console.log('🔒 Usando certificado estático (modo desarrollo)');
      createStaticCertificateModal();
    } else {
      setShowCertificate(true); // Mostrar certificado React normal
    }
  };

  const toggleCommands = (sectionId: string) => {
    setShowCommands(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Componente del Certificado
  const Certificate = () => {
    // Hooks para prevenir auto-refresh
    usePreventAutoRefresh(true);
    useModalPositionLock(true);
    
    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setShowCertificate(false);
      }
    };

    // Cerrar con tecla Escape
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowCertificate(false);
        }
      };

      // Prevenir scroll del body cuando el modal está abierto
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const scrollY = window.scrollY;
      
      // Fijar el body completamente
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      // Evitar que el modal se mueva
      const preventScroll = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };

      // Prevenir scroll en toda la página
      document.addEventListener('scroll', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        // Restaurar todo
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('scroll', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
        document.removeEventListener('wheel', preventScroll);
        
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = 'auto';
        
        // Restaurar posición del scroll
        window.scrollTo(0, scrollY);
      };
    }, []);

    return (
      <>
        <style>{`
          .modal-backdrop-certificate {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: rgba(0, 0, 0, 0.5) !important;
            z-index: 99999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 20px !important;
            overflow: hidden !important;
            touch-action: none !important;
          }
          
          .modal-content-certificate {
            background: white !important;
            border-radius: 24px !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            max-width: 64rem !important;
            width: 100% !important;
            max-height: 90vh !important;
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            display: flex !important;
            flex-direction: column !important;
            touch-action: none !important;
          }
          
          .modal-scroll-content {
            overflow-y: auto !important;
            flex: 1 !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: thin !important;
            scroll-behavior: smooth !important;
          }
          
          .modal-scroll-content::-webkit-scrollbar {
            width: 8px !important;
          }
          
          .modal-scroll-content::-webkit-scrollbar-track {
            background: #f1f1f1 !important;
            border-radius: 10px !important;
          }
          
          .modal-scroll-content::-webkit-scrollbar-thumb {
            background: #c1c1c1 !important;
            border-radius: 10px !important;
          }
          
          .modal-scroll-content::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1 !important;
          }
          
          /* Prevenir cualquier movimiento del modal */
          .modal-backdrop-certificate * {
            pointer-events: auto !important;
          }
          
          /* Asegurar que el modal no se mueva */
          .modal-content-certificate:focus {
            outline: none !important;
          }
        `}</style>
        <div 
          className="modal-backdrop-certificate"
          onClick={handleBackdropClick}
        >
          <div className="modal-content-certificate">
            {/* Botón de cerrar en la esquina superior derecha */}
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
            >
              <span className="text-gray-600 hover:text-gray-800 text-xl font-bold">✕</span>
            </button>

            <div className="modal-scroll-content">
              {/* Header del certificado */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white text-center rounded-t-3xl">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4">
                    <Trophy className="w-12 h-12 text-yellow-300" />
                  </div>
                  <h1 className="text-4xl font-bold mb-2">CERTIFICADO DE COMPLETACIÓN</h1>
                  <p className="text-xl text-blue-100">Git Training Portal</p>
                </div>
              </div>

          {/* Contenido del certificado */}
          <div className="p-12 text-center">
            {/* Decoración superior */}
            <div className="flex justify-center mb-8">
              <div className="border-4 border-yellow-400 rounded-full p-6 bg-yellow-50">
                <div className="text-6xl">🎓</div>
              </div>
            </div>

            {/* Texto principal */}
            <div className="mb-8">
              <h2 className="text-2xl text-gray-700 mb-4">Se certifica que</h2>
              <h3 className="text-5xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-2 inline-block">
                Estudiante de Git
              </h3>
              <p className="text-xl text-gray-700 mb-6">
                ha completado exitosamente el
              </p>
              <h4 className="text-3xl font-bold text-blue-600 mb-6">
                Examen de Git
              </h4>
            </div>

            {/* Detalles del curso */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">📚</div>
                  <h5 className="font-bold text-gray-800">Módulos Completados</h5>
                  <p className="text-gray-600">6 Secciones Prácticas</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">⏱️</div>
                  <h5 className="font-bold text-gray-800">Duración</h5>
                  <p className="text-gray-600">1 Hora de Examen</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🏆</div>
                  <h5 className="font-bold text-gray-800">Puntuación</h5>
                  <p className="text-gray-600">10/10 Puntos</p>
                </div>
              </div>
            </div>

            {/* Habilidades certificadas */}
            <div className="mb-8">
              <h5 className="text-xl font-bold text-gray-800 mb-4">Habilidades Certificadas:</h5>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Configuración Git</span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">Repositorios Remotos</span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Área de Staging</span>
                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">Manejo de Ramas</span>
                <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">Resolución de Conflictos</span>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">Push y Sincronización</span>
              </div>
            </div>

            {/* Fecha y firmas */}
            <div className="border-t border-gray-200 pt-8">
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="border-b-2 border-gray-300 pb-2 mb-2 mx-8">
                    <p className="text-lg font-bold text-gray-800">Git Training Portal</p>
                  </div>
                  <p className="text-sm text-gray-600">Plataforma de Certificación</p>
                </div>
                <div>
                  <div className="border-b-2 border-gray-300 pb-2 mb-2 mx-8">
                    <p className="text-lg font-bold text-gray-800">{currentDate}</p>
                  </div>
                  <p className="text-sm text-gray-600">Fecha de Completación</p>
                </div>
              </div>
            </div>

            {/* Decoración inferior */}
            <div className="mt-8 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            </div>

            {/* ID del certificado */}
            <div className="mt-4">
              <p className="text-xs text-gray-400">
                ID del Certificado: GIT-{Date.now().toString().slice(-6)}
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="bg-gray-50 px-8 py-6 rounded-b-3xl flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              🖨️ Imprimir Certificado
            </button>
            <button
              onClick={() => setShowCertificate(false)}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              ✖️ Cerrar
            </button>
          </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header del Examen */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Examen de Git
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Demuestra tus conocimientos de Git con este examen práctico
              </p>
            </div>

            {/* Instrucciones Generales */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-blue-600" />
                Instrucciones Generales
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-2 text-orange-500" />
                    <span><strong>Duración:</strong> 1 hora</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Download className="w-5 h-5 mr-2 text-green-500" />
                    <span><strong>Entrega:</strong> Documento Word (.docx)</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Terminal className="w-5 h-5 mr-2 text-red-500" />
                    <span><strong>Entorno:</strong> Solo terminal (sin GUI)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    <span><strong>Puntaje total:</strong> 10 puntos</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />
                    <span><strong>Incluir:</strong> Capturas + descripciones</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FileText className="w-5 h-5 mr-2 text-purple-500" />
                    <span><strong>Directorio:</strong> Limpio y nuevo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen de Secciones */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secciones del Examen</h3>
              <div className="grid gap-4">
                {examSections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{section.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{section.title}</h4>
                        <p className="text-sm text-gray-600">{section.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg text-blue-600">{section.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requisitos importantes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-bold text-yellow-800 mb-2">Requisitos importantes:</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Trabaja en un directorio limpio y crea un repositorio Git local</li>
                    <li>• Utiliza exclusivamente la terminal (sin interfaces gráficas)</li>
                    <li>• Documenta cada comando con captura de pantalla</li>
                    <li>• Explica qué hace cada operación realizada</li>
                    <li>• Entrega un único documento Word (.docx)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Botón para iniciar */}
            <div className="text-center">
              <button
                onClick={startExam}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                🚀 Iniciar Examen
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Al hacer clic, comenzará el contador de 1 hora
              </p>
              
              {/* Botón de reset para desarrollo */}
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={resetExam}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
                >
                  🔄 Reset (Dev)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header con timer */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Examen de Git</h1>
              <p className="text-gray-600">Todas las secciones - Tiempo límite: 1 hora</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-mono ${timeLeft < 600 ? 'text-red-600' : 'text-blue-600'}`}>
                <Clock className="w-6 h-6 inline mr-2" />
                {formatTime(timeLeft)}
              </div>
              {timeLeft === 0 && (
                <p className="text-red-600 font-bold mt-2">¡Tiempo agotado!</p>
              )}
              
              {/* Botón de reset para desarrollo */}
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={resetExam}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  🔄 Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Todas las secciones del examen */}
        <div className="space-y-8">
          {examSections.map((section) => (
            <div key={section.id} className="bg-white rounded-2xl shadow-xl p-8">
              <div className={`bg-gradient-to-r ${section.color} text-white p-6 rounded-xl mb-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-4xl mr-4">{section.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                      <p className="text-white/90">{section.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{section.points}</div>
                    <div className="text-sm text-white/80">puntos</div>
                  </div>
                </div>
              </div>

              {/* Tareas */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Tareas a realizar:</h3>
                <div className="space-y-3">
                  {section.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        {taskIndex + 1}
                      </div>
                      <p className="text-gray-700">{task}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comandos sugeridos */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">💻 Comandos de referencia:</h3>
                  <button
                    onClick={() => toggleCommands(section.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      showCommands[section.id]
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {showCommands[section.id] ? '🙈 Ocultar Comandos' : '👁️ Mostrar Comandos'}
                  </button>
                </div>
                
                {showCommands[section.id] ? (
                  <div className="bg-gray-900 rounded-xl p-6 space-y-2">
                    {section.commands.map((command, cmdIndex) => (
                      <div key={cmdIndex} className="flex items-center">
                        <span className="text-green-400 mr-2">$</span>
                        <code className="text-gray-300 font-mono text-sm">{command}</code>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-xl p-6 text-center">
                    <div className="text-gray-500 text-lg mb-2">🔒</div>
                    <p className="text-gray-600 text-sm">
                      Los comandos están ocultos. El instructor puede mostrarlos cuando sea necesario.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Intenta resolver las tareas por tu cuenta primero
                    </p>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Tips importantes:</h3>
                <div className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start text-sm text-gray-600">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recordatorios finales */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-bold text-yellow-800 mb-2">Recordatorios importantes para la entrega:</h4>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Incluye captura de pantalla de cada comando ejecutado</li>
                <li>• Explica detalladamente qué hace cada operación</li>
                <li>• Documenta cualquier error encontrado y cómo lo resolviste</li>
                <li>• Al final del conflicto en merge, explica paso a paso la resolución</li>
                <li>• Verifica que tu repositorio en GitHub muestre el historial completo</li>
                <li>• Entrega un único documento Word (.docx) con todo el trabajo</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botón para finalizar y ganar badge */}
        <div className="text-center mt-8">
          <button
            onClick={finishExam}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            🎓 Finalizar Examen y Obtener Certificación
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Presiona cuando hayas completado todas las secciones y tengas tu documento listo
          </p>
          
          {/* Botón para certificado estático en desarrollo */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4">
              <button
                onClick={() => createStaticCertificateModal()}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                🔒 Certificado Estático (Sin Auto-Refresh)
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Versión que no se ve afectada por auto-refresh
              </p>
            </div>
          )}
        </div>

        {/* Certificado Modal */}
        {showCertificate && <Certificate />}
      </div>
    </div>
  );
};

export default ExamenPage;
