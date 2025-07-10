import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  Terminal, 
  FileText,
  Copy,
  ChevronDown,
  ChevronRight,
  Download,
  Settings,
  Folder,
  Cloud,
  Eye,
  Play
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
      'advanced-sorcerer': 'Hechicero Avanzado',
      'hands-on-hero': 'Héroe Práctico',
      'conflict-resolver': 'Resolvedor de Conflictos',
      'version-master': 'Maestro del Versionado'
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
      'advanced-sorcerer': '¡Has explorado los conceptos avanzados!',
      'hands-on-hero': '¡Has completado todas las prácticas!',
      'conflict-resolver': '¡Dominas la resolución de conflictos!',
      'version-master': '¡Sabes crear releases y versiones!'
    };
    return descriptions[badge] || 'Has completado una sección especial';
  };

  const CodeBlock: React.FC<{ children: string }> = ({ children }) => {
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
      id: 'terminal',
      title: '9. Comandos Básicos de la Terminal (Git Bash)',
      xp: 15,
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Aunque Git tiene sus propios comandos, te moverás por tu sistema de archivos usando una terminal. 
            Git Bash en Windows emula una terminal de Linux. Aquí tienes los comandos más comunes para navegar.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-blue-600" />
                Navegación y Archivos
              </h4>
              <div className="space-y-3">
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">pwd</code>
                  <p className="text-gray-600 text-sm mt-1">Mostrar directorio actual</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">ls</code>
                  <p className="text-gray-600 text-sm mt-1">Listar archivos y carpetas</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">ls -la</code>
                  <p className="text-gray-600 text-sm mt-1">Listar con detalles (incluso ocultos)</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">cd carpeta</code>
                  <p className="text-gray-600 text-sm mt-1">Cambiar a una carpeta</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">cd ..</code>
                  <p className="text-gray-600 text-sm mt-1">Subir un nivel</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">cd ~</code>
                  <p className="text-gray-600 text-sm mt-1">Ir al directorio home</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Crear y Manipular
              </h4>
              <div className="space-y-3">
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">mkdir nombre</code>
                  <p className="text-gray-600 text-sm mt-1">Crear carpeta</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">touch archivo.txt</code>
                  <p className="text-gray-600 text-sm mt-1">Crear archivo vacío</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">echo "texto" {'>'} archivo.txt</code>
                  <p className="text-gray-600 text-sm mt-1">Crear archivo con contenido</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">cat archivo.txt</code>
                  <p className="text-gray-600 text-sm mt-1">Ver contenido de archivo</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">rm archivo.txt</code>
                  <p className="text-gray-600 text-sm mt-1">Eliminar archivo</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">rm -rf carpeta</code>
                  <p className="text-gray-600 text-sm mt-1">Eliminar carpeta y su contenido</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center">
              <Terminal className="w-5 h-5 mr-2" />
              💡 Consejos para la Terminal
            </h4>
            <ul className="text-blue-800 space-y-1">
              <li>• Usa <kbd>Tab</kbd> para autocompletar nombres de archivos y carpetas</li>
              <li>• Usa las flechas ↑↓ para navegar por el historial de comandos</li>
              <li>• <code>Ctrl+C</code> cancela un comando en ejecución</li>
              <li>• <code>clear</code> limpia la pantalla de la terminal</li>
              <li>• Los archivos que empiezan con <code>.</code> están ocultos</li>
            </ul>
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
    },
    {
      id: 'practicas',
      title: '11. ¡Manos a la Obra! Prácticas Guiadas',
      xp: 50,
      badge: 'version-master',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            La mejor forma de aprender es haciendo. Sigue estas prácticas en tu terminal para 
            afianzar los conceptos clave de Git. Cada ejercicio te ayudará a dominar una habilidad específica.
          </p>

          <div className="grid gap-6">
            {/* Práctica 1: Tu primer repositorio */}
            <details className="bg-white rounded-lg shadow-md">
              <summary className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg cursor-pointer font-bold">
                🚀 Práctica 1: Tu Primer Repositorio
              </summary>
              <div className="p-6">
                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                  <p className="text-blue-800 text-sm">
                    <strong>🎯 Objetivo:</strong> Crear tu primer repositorio Git y hacer tu primer commit.
                  </p>
                </div>
                <h5 className="font-bold text-gray-800 mb-3">Pasos a seguir:</h5>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    <strong>1. Crea una carpeta para tu proyecto:</strong>
                    <CodeBlock>{`mkdir mi-primer-proyecto
cd mi-primer-proyecto`}</CodeBlock>
                  </li>
                  <li>
                    <strong>2. Inicializa Git:</strong>
                    <CodeBlock>{`git init`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">Verás el mensaje "Initialized empty Git repository..."</p>
                  </li>
                  <li>
                    <strong>3. Crea tu primer archivo:</strong>
                    <CodeBlock>{`echo "# Mi Primer Proyecto" {'>'} README.md`}</CodeBlock>
                  </li>
                  <li>
                    <strong>4. Revisa el estado:</strong>
                    <CodeBlock>{`git status`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">Git te mostrará que hay archivos "untracked"</p>
                  </li>
                  <li>
                    <strong>5. Configura tu identidad (si no lo has hecho):</strong>
                    <CodeBlock>{`git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"`}</CodeBlock>
                  </li>
                  <li>
                    <strong>6. Prepara y confirma tu primer commit:</strong>
                    <CodeBlock>{`git add README.md
git commit -m "feat: agregar README inicial"`}</CodeBlock>
                  </li>
                  <li>
                    <strong>7. Ve tu historial:</strong>
                    <CodeBlock>{`git log --oneline`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">🎉 ¡Felicidades! Has creado tu primer repositorio Git</p>
                  </li>
                </ol>
              </div>
            </details>

            {/* Práctica 2: Trabajando con el área de staging */}
            <details className="bg-white rounded-lg shadow-md">
              <summary className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-t-lg cursor-pointer font-bold">
                📦 Práctica 2: Domina el Área de Staging
              </summary>
              <div className="p-6">
                <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
                  <p className="text-green-800 text-sm">
                    <strong>🎯 Objetivo:</strong> Entender cómo funciona el área de preparación (staging) haciendo commits selectivos.
                  </p>
                </div>
                <h5 className="font-bold text-gray-800 mb-3">Pasos a seguir:</h5>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    <strong>1. Continúa en tu proyecto y crea más archivos:</strong>
                    <CodeBlock>{`echo "Página de inicio" {'>'} index.html
echo "Acerca de nosotros" {'>'} about.html`}</CodeBlock>
                  </li>
                  <li>
                    <strong>2. Revisa el estado:</strong>
                    <CodeBlock>{`git status`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">Verás que Git lista ambos archivos como "untracked"</p>
                  </li>
                  <li>
                    <strong>3. Prepara solo un archivo:</strong>
                    <CodeBlock>{`git add index.html`}</CodeBlock>
                  </li>
                  <li>
                    <strong>4. Revisa el estado de nuevo:</strong>
                    <CodeBlock>{`git status`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">¡Observa cómo ahora tienes dos secciones diferentes!</p>
                  </li>
                  <li>
                    <strong>5. Crea un commit solo con lo preparado:</strong>
                    <CodeBlock>{`git commit -m "feat: agregar página de inicio"`}</CodeBlock>
                  </li>
                  <li>
                    <strong>6. Comprueba el estado final:</strong>
                    <CodeBlock>{`git status`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">El archivo about.html sigue esperando ser confirmado</p>
                  </li>
                  <li>
                    <strong>7. Termina agregando el segundo archivo:</strong>
                    <CodeBlock>{`git add about.html
git commit -m "feat: agregar página about"`}</CodeBlock>
                  </li>
                </ol>
              </div>
            </details>

            {/* Práctica 3: Trabajando con ramas */}
            <details className="bg-white rounded-lg shadow-md">
              <summary className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-lg cursor-pointer font-bold">
                🌳 Práctica 3: Tu Primera Rama de Desarrollo
              </summary>
              <div className="p-6">
                <div className="bg-purple-50 border border-purple-200 rounded p-3 mb-4">
                  <p className="text-purple-800 text-sm">
                    <strong>🎯 Objetivo:</strong> Crear una rama para una nueva funcionalidad y luego fusionarla.
                  </p>
                </div>
                <h5 className="font-bold text-gray-800 mb-3">Pasos a seguir:</h5>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    <strong>1. Ve en qué rama estás:</strong>
                    <CodeBlock>{`git branch`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">Verás "* main" indicando que estás en la rama principal</p>
                  </li>
                  <li>
                    <strong>2. Crea y cambia a una nueva rama:</strong>
                    <CodeBlock>{`git checkout -b agregar-estilos`}</CodeBlock>
                  </li>
                  <li>
                    <strong>3. Crea un archivo CSS:</strong>
                    <CodeBlock>{`echo "body { font-family: Arial; }" {'>'} styles.css`}</CodeBlock>
                  </li>
                  <li>
                    <strong>4. Confirma el cambio en esta rama:</strong>
                    <CodeBlock>{`git add styles.css
git commit -m "feat: agregar hoja de estilos"`}</CodeBlock>
                  </li>
                  <li>
                    <strong>5. Regresa a la rama principal:</strong>
                    <CodeBlock>{`git checkout main`}</CodeBlock>
                  </li>
                  <li>
                    <strong>6. Lista los archivos:</strong>
                    <CodeBlock>{`ls`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">¡Magia! El archivo styles.css ha desaparecido</p>
                  </li>
                  <li>
                    <strong>7. Fusiona la nueva funcionalidad:</strong>
                    <CodeBlock>{`git merge agregar-estilos`}</CodeBlock>
                  </li>
                  <li>
                    <strong>8. Lista los archivos de nuevo:</strong>
                    <CodeBlock>{`ls`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">🎉 ¡El archivo styles.css ha vuelto!</p>
                  </li>
                  <li>
                    <strong>9. Limpia la rama ya fusionada:</strong>
                    <CodeBlock>{`git branch -d agregar-estilos`}</CodeBlock>
                  </li>
                </ol>
              </div>
            </details>

            {/* Práctica 4: Simulando colaboración */}
            <details className="bg-white rounded-lg shadow-md">
              <summary className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-t-lg cursor-pointer font-bold">
                👥 Práctica 4: Simulando Colaboración con GitHub
              </summary>
              <div className="p-6">
                <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-4">
                  <p className="text-orange-800 text-sm">
                    <strong>🎯 Objetivo:</strong> Conectar tu proyecto local con GitHub y simular colaboración.
                  </p>
                </div>
                <h5 className="font-bold text-gray-800 mb-3">Pasos a seguir:</h5>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    <strong>1. Crea un repositorio en GitHub:</strong>
                    <p className="text-sm text-gray-600 mt-1">Ve a github.com, crea cuenta si no tienes, y crea un nuevo repositorio llamado "mi-primer-proyecto"</p>
                  </li>
                  <li>
                    <strong>2. Conecta tu proyecto local:</strong>
                    <CodeBlock>{`git remote add origin https://github.com/TU-USUARIO/mi-primer-proyecto.git`}</CodeBlock>
                  </li>
                  <li>
                    <strong>3. Sube tu trabajo a GitHub:</strong>
                    <CodeBlock>{`git push -u origin main`}</CodeBlock>
                  </li>
                  <li>
                    <strong>4. Simula un cambio remoto:</strong>
                    <p className="text-sm text-gray-600 mt-1">En GitHub, edita el README.md directamente en el navegador y haz commit</p>
                  </li>
                  <li>
                    <strong>5. Trae los cambios a tu máquina:</strong>
                    <CodeBlock>{`git pull origin main`}</CodeBlock>
                  </li>
                  <li>
                    <strong>6. Ve el historial completo:</strong>
                    <CodeBlock>{`git log --oneline --graph`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">🎉 ¡Has completado tu primer flujo de colaboración!</p>
                  </li>
                </ol>
              </div>
            </details>

            {/* Práctica 5: Resolución de Conflictos */}
            <details className="bg-white rounded-lg shadow-md">
              <summary className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-4 rounded-t-lg cursor-pointer font-bold">
                ⚔️ Práctica 5: Resolución de Conflictos
              </summary>
              <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                  <p className="text-red-800 text-sm">
                    <strong>🎯 Objetivo:</strong> Aprender a resolver conflictos de merge que Git no puede resolver automáticamente.
                  </p>
                </div>
                <h5 className="font-bold text-gray-800 mb-3">Pasos a seguir:</h5>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    <strong>1. Crea un archivo de prueba:</strong>
                    <CodeBlock>{`echo "Línea original del archivo" > Test.txt
git add Test.txt
git commit -m "Archivo inicial Test.txt"`}</CodeBlock>
                  </li>
                  <li>
                    <strong>2. Crea una rama para hacer cambios:</strong>
                    <CodeBlock>{`git checkout -b feature-branch
echo "Cambio desde feature-branch" > Test.txt
git add Test.txt
git commit -m "Modificación en feature-branch"`}</CodeBlock>
                  </li>
                  <li>
                    <strong>3. Regresa a main y haz un cambio diferente:</strong>
                    <CodeBlock>{`git checkout main
echo "Cambio desde main branch" > Test.txt
git add Test.txt
git commit -m "Modificación en main"`}</CodeBlock>
                  </li>
                  <li>
                    <strong>4. Intenta fusionar (esto creará un conflicto):</strong>
                    <CodeBlock>{`git merge feature-branch`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">🔥 Git te dirá que hay un conflicto automático que no puede resolver</p>
                  </li>
                  <li>
                    <strong>5. Abre Test.txt y verás los marcadores de conflicto:</strong>
                    <div className="bg-gray-100 p-4 rounded-lg mt-2">
                      <pre className="text-sm font-mono text-gray-800">
{`<<<<<<< HEAD
Cambio desde main branch
=======
Cambio desde feature-branch
>>>>>>> feature-branch`}
                      </pre>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Explicación:</strong> 
                      <br />• <code>{'<<<<<<< HEAD'}</code> marca el inicio del contenido de tu rama actual
                      <br />• <code>{'======='}</code> separa los dos contenidos en conflicto
                      <br />• <code>{'>>>>>>> feature-branch'}</code> marca el final del contenido de la otra rama
                    </p>
                  </li>
                  <li>
                    <strong>6. Edita el archivo para resolver el conflicto:</strong>
                    <p className="text-sm text-gray-600 mt-2">Puedes elegir quedarte con una versión, ambas, o crear una nueva. Por ejemplo:</p>
                    <CodeBlock>{`echo "Cambio combinado: main + feature-branch" > Test.txt`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">O edita manualmente el archivo eliminando los marcadores y quedándote con el contenido que prefieras</p>
                  </li>
                  <li>
                    <strong>7. Marca el conflicto como resuelto:</strong>
                    <CodeBlock>{`git add Test.txt`}</CodeBlock>
                  </li>
                  <li>
                    <strong>8. Finaliza el merge:</strong>
                    <CodeBlock>{`git commit -m "Resuelto conflicto en Test.txt"`}</CodeBlock>
                  </li>
                  <li>
                    <strong>9. Verifica la resolución:</strong>
                    <CodeBlock>{`git log --oneline --graph
cat Test.txt`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">🎉 ¡Conflicto resuelto exitosamente!</p>
                  </li>
                </ol>
                
                <div className="mt-6 space-y-4">
                  <h5 className="font-bold text-gray-800">🛠️ Herramientas Adicionales:</h5>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-blue-800 text-sm font-semibold mb-2">Opción 1: Usar un asistente visual</p>
                    <CodeBlock>{`git mergetool`}</CodeBlock>
                    <p className="text-blue-700 text-sm mt-2">Esto abrirá una herramienta gráfica para resolver conflictos (si está configurada)</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <p className="text-yellow-800 text-sm font-semibold mb-2">Opción 2: Cancelar el merge si cambias de opinión</p>
                    <CodeBlock>{`git merge --abort`}</CodeBlock>
                    <p className="text-yellow-700 text-sm mt-2">Esto regresa tu repositorio al estado anterior al merge</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-green-800 text-sm font-semibold mb-2">💡 Consejo Pro:</p>
                    <p className="text-green-700 text-sm">
                      Para evitar conflictos, mantén una comunicación constante con tu equipo y 
                      haz pull frecuentemente para mantener tu rama actualizada.
                    </p>
                  </div>
                </div>
              </div>
            </details>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mt-8">
            <h4 className="font-bold text-green-900 mb-3 flex items-center">
              <Play className="w-5 h-5 mr-2" />
              🏆 ¡Felicidades por completar las prácticas!
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-bold text-green-800 mb-2">Has aprendido a:</h5>
                <ul className="text-green-700 space-y-1">
                  <li>✅ Crear y configurar repositorios</li>
                  <li>✅ Usar el área de staging estratégicamente</li>
                  <li>✅ Trabajar con ramas de forma efectiva</li>
                  <li>✅ Colaborar usando repositorios remotos</li>
                  <li>✅ Resolver conflictos de merge</li>
                  <li>✅ Usar Git Stash para guardado temporal</li>
                  <li>✅ Recuperarse de errores con reset/revert</li>
                  <li>✅ Crear Pull Requests profesionales</li>
                  <li>✅ Aplicar estrategias de merge avanzadas</li>
                  <li>✅ Gestionar versiones y releases con tags</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-blue-800 mb-2">Próximos pasos recomendados:</h5>
                <ul className="text-blue-700 space-y-1">
                  <li>🚀 Practica con proyectos reales</li>
                  <li>🤝 Contribuye a proyectos open source</li>
                  <li>📚 Explora comandos avanzados</li>
                  <li>🔧 Configura aliases para eficiencia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'masterclass',
      title: '12. Masterclass: Comandos Avanzados',
      xp: 30,
      badge: 'hands-on-hero',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            🎉 ¡Has completado todas las prácticas básicas! Ahora es momento de conocer algunos comandos 
            avanzados que te convertirán en un verdadero experto de Git.
          </p>

          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-purple-600" />
                🔍 Comandos de Investigación
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-purple-700">git blame archivo.txt</code>
                  <p className="text-gray-600 text-sm mt-1">Ver quién escribió cada línea de un archivo</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-purple-700">git log --author="nombre"</code>
                  <p className="text-gray-600 text-sm mt-1">Ver commits de un autor específico</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-purple-700">git log --since="2 weeks ago"</code>
                  <p className="text-gray-600 text-sm mt-1">Ver commits desde una fecha específica</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-purple-700">git diff HEAD~1</code>
                  <p className="text-gray-600 text-sm mt-1">Comparar con el commit anterior</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <GitBranch className="w-5 h-5 mr-2 text-blue-600" />
                🌿 Comandos de Ramas Avanzados
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-blue-700">git branch -r</code>
                  <p className="text-gray-600 text-sm mt-1">Listar todas las ramas remotas</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-blue-700">git branch -a</code>
                  <p className="text-gray-600 text-sm mt-1">Listar todas las ramas (locales y remotas)</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-blue-700">git branch --merged</code>
                  <p className="text-gray-600 text-sm mt-1">Ver ramas que ya fueron fusionadas</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-blue-700">git branch -d $(git branch --merged | grep -v main)</code>
                  <p className="text-gray-600 text-sm mt-1">Eliminar todas las ramas ya fusionadas</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-green-600" />
                ⚙️ Configuración y Aliases
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-green-700">git config --global alias.st status</code>
                  <p className="text-gray-600 text-sm mt-1">Crear alias: <code>git st</code> = <code>git status</code></p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-green-700">git config --global alias.co checkout</code>
                  <p className="text-gray-600 text-sm mt-1">Crear alias: <code>git co</code> = <code>git checkout</code></p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-green-700">git config --global alias.br branch</code>
                  <p className="text-gray-600 text-sm mt-1">Crear alias: <code>git br</code> = <code>git branch</code></p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-green-700">git config --global alias.lg "log --oneline --graph --all"</code>
                  <p className="text-gray-600 text-sm mt-1">Alias para un log hermoso: <code>git lg</code></p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <GitCommit className="w-5 h-5 mr-2 text-red-600" />
                🔄 Comandos de Corrección
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-red-700">git commit --amend</code>
                  <p className="text-gray-600 text-sm mt-1">Editar el último commit (mensaje o contenido)</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-red-700">git reset HEAD~1</code>
                  <p className="text-gray-600 text-sm mt-1">Deshacer el último commit (mantiene cambios)</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-red-700">git checkout -- archivo.txt</code>
                  <p className="text-gray-600 text-sm mt-1">Descartar cambios en un archivo específico</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm font-mono text-red-700">git clean -fd</code>
                  <p className="text-gray-600 text-sm mt-1">Eliminar archivos no rastreados</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mt-8">
            <h4 className="font-bold text-purple-900 mb-3 flex items-center">
              <Play className="w-5 h-5 mr-2" />
              🎯 ¡Reto Final!
            </h4>
            <p className="text-purple-800 mb-4">
              Ahora que conoces estos comandos avanzados, desafíate a ti mismo:
            </p>
            <ul className="text-purple-700 space-y-2">
              <li>🔥 Crea aliases para tus comandos más usados</li>
              <li>🚀 Practica rebase interactivo para limpiar tu historial</li>
              <li>🎨 Usa git log con diferentes formatos para visualizar tu historial</li>
              <li>🤝 Contribuye a un proyecto open source en GitHub</li>
            </ul>
            <div className="mt-4 p-3 bg-white/50 rounded">
              <p className="text-sm text-purple-800">
                <strong>💡 Pro tip:</strong> Los verdaderos expertos de Git no memorizan todos los comandos, 
                sino que saben dónde buscar y cómo combinarlos para resolver problemas específicos.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tags',
      title: '10. Git Tags - Versionado y Releases',
      xp: 20,
      badge: 'advanced-sorcerer',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Los tags en Git son utilizados para marcar puntos específicos en la historia de tu proyecto, 
            generalmente para señalar versiones (releases). Aprenderás a crear y gestionar tags eficientemente.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4">¿Qué son los Git Tags?</h4>
              <p className="text-gray-700 mb-4">
                Los tags son referencias que apuntan a commits específicos. A diferencia de las ramas, los tags 
                no cambian y son ideales para marcar versiones estables de tu proyecto.
              </p>
              <h4 className="font-bold text-gray-800 mb-3">Tipos de Tags:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Tags Ligeros:</strong> Son como un marcador, apuntan a un commit específico.
                  <CodeBlock>git tag v1.0.0</CodeBlock>
                </li>
                <li>
                  <strong>Tags Anotados:</strong> Son objetos completos en Git, incluyen información del autor, fecha y mensaje.
                  <CodeBlock>git tag -a v1.0.0 -m "Mensaje del tag"</CodeBlock>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-4">Comandos Básicos de Git Tags</h4>
              <div className="space-y-3">
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git tag</code>
                  <p className="text-gray-600 text-sm mt-1">Listar todos los tags</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git tag -a v1.0.0 -m "Mensaje"</code>
                  <p className="text-gray-600 text-sm mt-1">Crear un tag anotado</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git tag -d v1.0.0</code>
                  <p className="text-gray-600 text-sm mt-1">Eliminar un tag</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">git push origin --tags</code>
                  <p className="text-gray-600 text-sm mt-1">Subir todos los tags al remoto</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-bold text-yellow-800 mb-2">🎯 Buenas Prácticas con Git Tags</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>• Usa tags anotados para versiones oficiales</li>
              <li>• Sigue un esquema de versionado semántico (SemVer)</li>
              <li>• Incluye un changelog en el mensaje del tag</li>
              <li>• Crea releases en GitHub/GitLab basados en tags</li>
              <li>• Usa prefijo 'v' para versiones (v1.0.0)</li>
            </ul>
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
    <GitBranch className="w-6 h-6" />,        // 1. Introducción
    <Download className="w-6 h-6" />,         // 2. Conceptos
    <Settings className="w-6 h-6" />,         // 3. Instalación
    <Folder className="w-6 h-6" />,           // 4. Configuración
    <GitCommit className="w-6 h-6" />,        // 5. Repositorios
    <Eye className="w-6 h-6" />,              // 6. Flujo de Trabajo
    <GitBranch className="w-6 h-6" />,        // 7. .gitignore
    <Cloud className="w-6 h-6" />,            // 8. Ramas
    <Terminal className="w-6 h-6" />,         // 9. Remotos
    <GitMerge className="w-6 h-6" />,         // 10. Terminal
    <Play className="w-6 h-6" />,             // 11. Avanzados
    <Settings className="w-6 h-6" />          // 12. Prácticas
  ];
  return icons[index % icons.length];
};

export default GitManualPage;
