import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  Terminal, 
  FileText,
  CheckCircle,
  Award,
  Copy,
  ChevronDown,
  ChevronRight,
  Download,
  Settings,
  Folder,
  Cloud,
  Eye,
  Bot,
  Play,
  RefreshCw,
  Upload,
  X
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  xp: number;
  badge?: string;
  content: React.ReactNode;
}

const GitManualPage: React.FC = () => {
  const { addPoints, unlockBadge, user } = useGame();
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('git-manual-progress');
    if (saved) {
      setCompletedSections(JSON.parse(saved));
    }
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleSectionComplete = (sectionId: string, xp: number, badge?: string) => {
    if (!completedSections.includes(sectionId)) {
      const newCompleted = [...completedSections, sectionId];
      setCompletedSections(newCompleted);
      localStorage.setItem('git-manual-progress', JSON.stringify(newCompleted));
      
      addPoints(xp);
      
      if (badge) {
        unlockBadge({
          id: badge,
          name: getBadgeName(badge),
          description: getBadgeDescription(badge),
          icon: '🏅',
          color: '#FFD700',
          rarity: 'common',
          unlockedAt: new Date(),
          points: xp
        });
      }
    } else {
      const newCompleted = completedSections.filter(id => id !== sectionId);
      setCompletedSections(newCompleted);
      localStorage.setItem('git-manual-progress', JSON.stringify(newCompleted));
    }
  };

  const getBadgeName = (badge: string): string => {
    const badges: Record<string, string> = {
      'concept-master': 'Maestro Conceptual',
      'workflow-master': 'Maestro del Flujo',
      'repo-creator': 'Creador de Repos',
      'commit-master': 'Maestro del Commit',
      'staging-specialist': 'Especialista del Stage',
      'branch-wizard': 'Mago de las Ramas',
      'advanced-sorcerer': 'Hechicero Avanzado'
    };
    return badges[badge] || 'Badge Especial';
  };

  const getBadgeDescription = (badge: string): string => {
    const descriptions: Record<string, string> = {
      'concept-master': '¡Has entendido los conceptos clave de Git!',
      'workflow-master': '¡Dominas el flujo de trabajo de Git!',
      'repo-creator': '¡Has creado tu primer repositorio!',
      'commit-master': '¡Tu primer commit está en la historia!',
      'staging-specialist': '¡Controlas qué entra en cada commit!',
      'branch-wizard': '¡Creaste y fusionaste tu primera rama!',
      'advanced-sorcerer': '¡Has explorado los conceptos avanzados!'
    };
    return descriptions[badge] || 'Has completado una sección especial';
  };

  const CodeBlock: React.FC<{ children: string; language?: string }> = ({ children, language = 'bash' }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
        >
          {copied ? '¡Copiado!' : <Copy className="w-4 h-4" />}
        </button>
        <pre className="p-4 text-green-400 font-mono text-sm overflow-x-auto">
          <code>{children}</code>
        </pre>
      </div>
    );
  };

  const SectionCard: React.FC<{ 
    section: Section; 
    icon: React.ReactNode;
    isExpanded?: boolean;
    onToggle?: () => void;
  }> = ({ section, icon, isExpanded = true, onToggle }) => {
    const isCompleted = completedSections.includes(section.id);

    return (
      <div className="card mb-6">
        <div className="card-header flex items-center justify-between bg-gray-800 text-white p-4">
          <div className="flex items-center space-x-3">
            {icon}
            <h3 className="text-xl font-bold">{section.title}</h3>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => handleSectionComplete(section.id, section.xp, section.badge)}
              className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
            />
            {onToggle && (
              <button onClick={onToggle} className="text-white hover:text-gray-300">
                {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
        {isExpanded && (
          <div className="card-body p-6">
            {section.content}
          </div>
        )}
      </div>
    );
  };

  const sections: Section[] = [
    {
      id: 'intro',
      title: '1. ¿Qué es Git?',
      xp: 10,
      badge: 'concept-master',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Git es un <strong>sistema de control de versiones distribuido</strong> gratuito y de código abierto 
            diseñado para manejar todo tipo de proyectos con velocidad y eficiencia.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="italic text-blue-800">
              "Imagina Git como una máquina del tiempo para tu código. Te permite viajar al pasado, 
              ver qué cambió, crear líneas de tiempo alternativas y fusionar realidades."
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-primary mb-3">🎯 ¿Para qué sirve?</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Guardar versiones de tu trabajo</li>
                <li>• Colaborar con otros desarrolladores</li>
                <li>• Experimentar sin miedo a romper el código</li>
                <li>• Mantener un historial completo de cambios</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-primary mb-3">⚡ Características</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Distribuido (no necesita servidor central)</li>
                <li>• Rápido y eficiente</li>
                <li>• Ramificación fácil</li>
                <li>• Integridad de datos garantizada</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'conceptos',
      title: '2. Conceptos Fundamentales',
      xp: 15,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Repositorio
              </h4>
              <p className="text-blue-700">
                Una carpeta que contiene tu proyecto y todo el historial de cambios. 
                Es como un contenedor mágico que recuerda cada versión.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h4 className="font-bold text-green-800 mb-3 flex items-center">
                <GitCommit className="w-5 h-5 mr-2" />
                Commit
              </h4>
              <p className="text-green-700">
                Una fotografía de tu proyecto en un momento específico. 
                Cada commit tiene un identificador único y un mensaje descriptivo.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                <GitBranch className="w-5 h-5 mr-2" />
                Rama (Branch)
              </h4>
              <p className="text-purple-700">
                Una línea de desarrollo independiente. Puedes crear ramas para 
                experimentar sin afectar el código principal.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'instalacion',
      title: '3. Instalación de Git',
      xp: 10,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h4 className="font-bold text-gray-800 mb-3">🪟 Windows</h4>
              <p className="text-gray-700 mb-3">
                Descarga Git desde el sitio oficial e instala Git Bash para tener una terminal Linux-like.
              </p>
              <a 
                href="https://git-scm.com/download/win" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Descargar Git para Windows
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-500">
              <h4 className="font-bold text-gray-800 mb-3">🍎 macOS</h4>
              <p className="text-gray-700 mb-3">
                Instala usando Homebrew o descarga desde el sitio oficial.
              </p>
              <CodeBlock>brew install git</CodeBlock>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <h4 className="font-bold text-gray-800 mb-3">🐧 Linux</h4>
              <p className="text-gray-700 mb-3">
                Usa el gestor de paquetes de tu distribución.
              </p>
              <CodeBlock>sudo apt install git</CodeBlock>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>Verificar instalación:</strong> Después de instalar, abre una terminal y ejecuta:
            </p>
            <CodeBlock>git --version</CodeBlock>
          </div>
        </div>
      )
    },
    {
      id: 'configuracion',
      title: '4. Configuración Inicial',
      xp: 15,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 text-lg">
            Antes de usar Git, necesitas configurar tu identidad. Esta información se incluirá en todos tus commits.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-4">Configuración básica obligatoria:</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 mb-2">Configura tu nombre:</p>
                <CodeBlock>git config --global user.name "Tu Nombre"</CodeBlock>
              </div>
              <div>
                <p className="text-gray-700 mb-2">Configura tu email:</p>
                <CodeBlock>git config --global user.email "tu.email@ejemplo.com"</CodeBlock>
              </div>
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              La opción <code className="bg-gray-200 px-1 rounded">--global</code> aplica esta configuración a todos tus proyectos.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-4">Configuraciones opcionales útiles:</h4>
            <div className="space-y-3">
              <div>
                <p className="text-blue-700 mb-2">Editor por defecto:</p>
                <CodeBlock>git config --global core.editor "code --wait"</CodeBlock>
              </div>
              <div>
                <p className="text-blue-700 mb-2">Rama principal por defecto:</p>
                <CodeBlock>git config --global init.defaultBranch main</CodeBlock>
              </div>
              <div>
                <p className="text-blue-700 mb-2">Verificar configuración:</p>
                <CodeBlock>git config --list</CodeBlock>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'repositorios',
      title: '5. Creando Repositorios',
      xp: 15,
      badge: 'repo-creator',
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-bold text-primary mb-3 flex items-center">
              <Folder className="w-5 h-5 mr-2" />
              Inicializar un Repositorio
            </h4>
            <p className="text-gray-700 mb-3">
              Convierte un directorio existente en un repositorio de Git.
            </p>
            <CodeBlock>{`cd mi-proyecto
git init`}</CodeBlock>
            <p className="text-sm text-gray-600 mt-3">
              Esto crea una carpeta oculta <code className="bg-gray-200 px-1 rounded">.git</code> que contiene todo el historial y la configuración.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-bold text-primary mb-3 flex items-center">
              <Cloud className="w-5 h-5 mr-2" />
              Clonar un Repositorio
            </h4>
            <p className="text-gray-700 mb-3">
              Obtén una copia local de un proyecto existente desde un servidor remoto.
            </p>
            <CodeBlock>git clone &lt;URL_DEL_REPOSITORIO&gt;</CodeBlock>
            <p className="text-sm text-gray-600 mt-3">
              Esto descarga todo el proyecto y su historial completo.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'workflow',
      title: '6. El Flujo de Trabajo Básico',
      xp: 20,
      badge: 'workflow-master',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Para guardar cambios en Git, los archivos viajan a través de varias etapas. 
            Entender este flujo es crucial para usar Git de manera efectiva.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-red-800 mb-3">🔴 Working Directory</h4>
              <p className="text-red-700">
                Tu carpeta de trabajo donde realizas cambios en los archivos. 
                Los cambios aquí son temporales y no están guardados en Git.
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-bold text-yellow-800 mb-3">🟡 Staging Area</h4>
              <p className="text-yellow-700">
                Área de preparación donde seleccionas qué cambios quieres guardar. 
                Es como una sala de espera para tus cambios.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-800 mb-3">🟢 Repository</h4>
              <p className="text-green-700">
                El repositorio donde se guardan permanentemente tus cambios. 
                Una vez aquí, forman parte del historial.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-3">🔵 Remote</h4>
              <p className="text-blue-700">
                Versión en la nube de tu repositorio (como GitHub). 
                Permite colaborar y hacer respaldos.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-4 text-center">El Viaje de tus Cambios</h4>
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <p className="font-medium text-red-800">Working Directory</p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded mt-1">git add</code>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                  <Terminal className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="font-medium text-yellow-800">Staging Area</p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded mt-1">git commit</code>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <GitCommit className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-medium text-green-800">Repository</p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded mt-1">git push</code>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <GitBranch className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-medium text-blue-800">Remote</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-bold text-gray-800 mb-4">Comandos básicos del flujo:</h4>
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <code className="bg-gray-100 px-3 py-1 rounded font-mono">git status</code>
                <span className="text-gray-700">- Ver el estado actual de tus archivos</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <code className="bg-gray-100 px-3 py-1 rounded font-mono">git add archivo.txt</code>
                <span className="text-gray-700">- Agregar archivo al staging area</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <code className="bg-gray-100 px-3 py-1 rounded font-mono">git commit -m "mensaje"</code>
                <span className="text-gray-700">- Guardar cambios en el repositorio</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <code className="bg-gray-100 px-3 py-1 rounded font-mono">git push</code>
                <span className="text-gray-700">- Enviar cambios al repositorio remoto</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'gitignore',
      title: '7. El Archivo .gitignore',
      xp: 15,
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            No todos los archivos de tu proyecto deben ser guardados en el repositorio. 
            El archivo <code className="bg-gray-200 px-1 rounded">.gitignore</code> le dice a Git qué archivos o carpetas debe ignorar por completo.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4">¿Por qué ignorar archivos?</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">•</span>
                  <div>
                    <strong>Dependencias:</strong> Carpetas como <code className="bg-gray-200 px-1 rounded">node_modules</code> pueden contener miles de archivos que se pueden reinstalar fácilmente.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">•</span>
                  <div>
                    <strong>Archivos compilados:</strong> Código que se genera a partir de tu código fuente.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">•</span>
                  <div>
                    <strong>Archivos de entorno:</strong> Archivos como <code className="bg-gray-200 px-1 rounded">.env</code> que contienen contraseñas o claves de API secretas.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">•</span>
                  <div>
                    <strong>Archivos del sistema:</strong> Como <code className="bg-gray-200 px-1 rounded">.DS_Store</code> en macOS.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4">Ejemplo de un .gitignore</h4>
              <p className="text-gray-700 mb-3">
                Simplemente crea un archivo llamado <code className="bg-gray-200 px-1 rounded">.gitignore</code> en la raíz de tu proyecto:
              </p>
              <CodeBlock>{`# Ignorar archivos de log
*.log

# Ignorar carpeta de dependencias de Node.js
node_modules/

# Ignorar archivos de entorno
.env

# Ignorar carpeta de build
/dist
/build

# Ignorar archivos del sistema operativo
.DS_Store
Thumbs.db`}</CodeBlock>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ramas',
      title: '8. Trabajando con Ramas (Branches)',
      xp: 25,
      badge: 'branch-wizard',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Las ramas son la característica estrella de Git. Permiten trabajar en nuevas funcionalidades 
            o arreglos de forma aislada sin afectar la línea principal de desarrollo.
          </p>
          
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-bold text-purple-800 mb-3">💡 Concepto Clave</h4>
            <p className="text-purple-700">
              Imagina las ramas como líneas de tiempo paralelas en tu proyecto. Puedes crear una nueva línea 
              de tiempo para experimentar, y si todo sale bien, fusionar esos cambios de vuelta a la línea principal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4">Comandos básicos de ramas:</h4>
              <div className="space-y-3">
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git branch</code>
                  <p className="text-gray-600 text-sm mt-1">Ver todas las ramas existentes</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git branch nueva-rama</code>
                  <p className="text-gray-600 text-sm mt-1">Crear una nueva rama</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git checkout nueva-rama</code>
                  <p className="text-gray-600 text-sm mt-1">Cambiar a una rama específica</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git checkout -b nueva-rama</code>
                  <p className="text-gray-600 text-sm mt-1">Crear y cambiar a una nueva rama en un solo comando</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4">Fusionando ramas:</h4>
              <div className="space-y-3">
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git merge rama-a-fusionar</code>
                  <p className="text-gray-600 text-sm mt-1">Fusionar otra rama en la rama actual</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git branch -d rama-terminada</code>
                  <p className="text-gray-600 text-sm mt-1">Eliminar una rama ya fusionada</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git branch -D rama-forzar</code>
                  <p className="text-gray-600 text-sm mt-1">Forzar eliminación de una rama no fusionada</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-bold text-yellow-800 mb-2">🎯 Buenas Prácticas</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>• Usa nombres descriptivos para tus ramas: <code>feature/login</code>, <code>bugfix/error-404</code></li>
              <li>• Mantén las ramas pequeñas y enfocadas en una sola funcionalidad</li>
              <li>• Fusiona regularmente para evitar conflictos grandes</li>
              <li>• Elimina las ramas una vez que han sido fusionadas</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'remotos',
      title: '9. Repositorios Remotos',
      xp: 20,
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Los repositorios remotos (alojados en servidores como GitHub, GitLab o Bitbucket) son la clave 
            para colaborar con otros y mantener una copia de seguridad de tu trabajo.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="italic text-blue-800">
              "Un repositorio remoto es como tener tu proyecto guardado en la nube, 
              donde tú y tu equipo pueden acceder y sincronizar sus cambios."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4">Comandos para remotos:</h4>
              <div className="space-y-3">
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git remote -v</code>
                  <p className="text-gray-600 text-sm mt-1">Ver los remotos configurados</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git remote add origin &lt;url&gt;</code>
                  <p className="text-gray-600 text-sm mt-1">Agregar un repositorio remoto</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git push origin main</code>
                  <p className="text-gray-600 text-sm mt-1">Enviar cambios al remoto</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git pull origin main</code>
                  <p className="text-gray-600 text-sm mt-1">Traer cambios del remoto</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4">Flujo típico de colaboración:</h4>
              <ol className="space-y-2 text-gray-700">
                <li>1. <strong>Clone</strong> el repositorio del equipo</li>
                <li>2. <strong>Create</strong> una nueva rama para tu funcionalidad</li>
                <li>3. <strong>Commit</strong> tus cambios en esa rama</li>
                <li>4. <strong>Push</strong> tu rama al repositorio remoto</li>
                <li>5. <strong>Create</strong> un Pull Request para revisar</li>
                <li>6. <strong>Merge</strong> después de la aprobación</li>
              </ol>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'avanzados',
      title: '10. Conceptos Avanzados',
      xp: 30,
      badge: 'advanced-sorcerer',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            A medida que tus proyectos crecen, necesitarás estrategias más sofisticadas. 
            Aquí exploramos algunos conceptos y flujos de trabajo clave.
          </p>

          <div className="grid md:grid-cols-1 gap-6">
            <details className="bg-white rounded-lg shadow-md">
              <summary className="bg-gray-800 text-white p-4 rounded-t-lg cursor-pointer font-bold">
                🔄 Git Rebase: Reescribiendo la Historia
              </summary>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Rebase permite reescribir el historial de commits para mantenerlo limpio y lineal.
                </p>
                <CodeBlock>{`# Rebase interactivo para editar los últimos 3 commits
git rebase -i HEAD~3

# Rebase una rama sobre main
git checkout mi-rama
git rebase main`}</CodeBlock>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>⚠️ Cuidado:</strong> Solo usa rebase en commits que no hayas compartido con otros.
                  </p>
                </div>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md">
              <summary className="bg-gray-800 text-white p-4 rounded-t-lg cursor-pointer font-bold">
                ⚡ Git Stash: Guardado Temporal
              </summary>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Stash te permite guardar temporalmente cambios sin hacer commit.
                </p>
                <CodeBlock>{`# Guardar cambios temporalmente
git stash

# Ver lista de stashes
git stash list

# Recuperar el último stash
git stash pop

# Aplicar un stash específico
git stash apply stash@{0}`}</CodeBlock>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md">
              <summary className="bg-gray-800 text-white p-4 rounded-t-lg cursor-pointer font-bold">
                🔍 Resolviendo Conflictos
              </summary>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Los conflictos ocurren cuando Git no puede fusionar automáticamente los cambios.
                </p>
                <CodeBlock>{`<<<<<<< HEAD
// Código de tu rama actual (ej. main)
=======
// Código de la rama que estás fusionando
>>>>>>> nombre-de-la-otra-rama`}</CodeBlock>
                <div className="mt-4">
                  <h5 className="font-bold text-gray-800 mb-2">Para resolverlo:</h5>
                  <ol className="space-y-1 text-gray-700 text-sm">
                    <li>1. Abre el archivo en tu editor de código</li>
                    <li>2. Busca los marcadores de conflicto</li>
                    <li>3. Edita el archivo para dejar la versión final que deseas</li>
                    <li>4. Elimina los marcadores de Git</li>
                    <li>5. Usa <code className="bg-gray-200 px-1 rounded">git add &lt;archivo&gt;</code> para marcar como resuelto</li>
                    <li>6. Continúa con <code className="bg-gray-200 px-1 rounded">git commit</code></li>
                  </ol>
                </div>
              </div>
            </details>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 px-4 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Manual Esencial de Git</h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Domina el control de versiones con esta guía interactiva. Aprende Git paso a paso con 
            ejercicios prácticos y un sistema de gamificación que hace el aprendizaje divertido.
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="text-sm">
              📚 {sections.length} secciones • 🎯 {sections.reduce((sum, s) => sum + s.xp, 0)} XP total • 🏆 {sections.filter(s => s.badge).length} badges
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Tu Progreso</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Nivel {user.level}: Git {user.level >= 5 ? 'Maestro' : user.level >= 3 ? 'Experto' : 'Aprendiz'}</span>
              <span className="text-gray-600">{user.totalPoints} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((completedSections.length / sections.length) * 100, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {completedSections.length} de {sections.length} secciones completadas
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              icon={getSectionIcon(index)}
              isExpanded={expandedSections[section.id] !== false}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const getSectionIcon = (index: number): React.ReactNode => {
  const icons = [
    <GitBranch className="w-6 h-6" />,
    <FileText className="w-6 h-6" />,
    <Terminal className="w-6 h-6" />,
    <GitCommit className="w-6 h-6" />,
    <GitMerge className="w-6 h-6" />,
    <CheckCircle className="w-6 h-6" />,
    <Award className="w-6 h-6" />
  ];
  return icons[index % icons.length];
};

export default GitManualPage;
