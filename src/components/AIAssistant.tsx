import React, { useState } from 'react';
import { Bot, Loader, Copy, RefreshCw } from 'lucide-react';

interface AIAssistantProps {
  onClose?: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [commitDescription, setCommitDescription] = useState('');
  const [commitResult, setCommitResult] = useState('');
  const [commitLoading, setCommitLoading] = useState(false);
  const [commitError, setCommitError] = useState('');

  const [commandDescription, setCommandDescription] = useState('');
  const [commandResult, setCommandResult] = useState('');
  const [commandLoading, setCommandLoading] = useState(false);
  const [commandError, setCommandError] = useState('');

  // Función para llamar a una API de IA (simulada por ahora)
  const callAI = async (prompt: string, type: 'commit' | 'command'): Promise<string> => {
    // Por ahora vamos a simular respuestas de IA
    // En una implementación real, aquí iría la llamada a OpenAI, Gemini, etc.
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simular latencia

    if (type === 'commit') {
      const examples = [
        'feat: agregar página de contacto con formulario y validaciones',
        'fix: corregir error en validación de email',
        'docs: actualizar README con instrucciones de instalación',
        'style: mejorar estilos de la página principal',
        'refactor: reorganizar estructura de componentes',
        'test: agregar pruebas para el componente Header'
      ];
      return examples[Math.floor(Math.random() * examples.length)];
    } else {
      const examples = [
        '```bash\ngit status\n```\n\n**Explicación:** Este comando te muestra el estado actual de tu repositorio, incluyendo archivos modificados, archivos en staging, y archivos no rastreados.',
        '```bash\ngit log --oneline\n```\n\n**Explicación:** Muestra el historial de commits de forma compacta, con una línea por commit.',
        '```bash\ngit checkout HEAD~1 -- nombre_archivo.txt\n```\n\n**Explicación:** Restaura un archivo específico a la versión del commit anterior.',
        '```bash\ngit branch nueva-rama\ngit checkout nueva-rama\n```\n\n**Explicación:** Crea una nueva rama y cambia a ella. También puedes usar `git checkout -b nueva-rama` para hacer ambas acciones en un solo comando.'
      ];
      return examples[Math.floor(Math.random() * examples.length)];
    }
  };

  const generateCommit = async () => {
    if (!commitDescription.trim()) {
      setCommitError('Por favor, describe los cambios que realizaste.');
      return;
    }

    setCommitError('');
    setCommitLoading(true);
    setCommitResult('');

    try {
      const result = await callAI(commitDescription, 'commit');
      setCommitResult(result);
    } catch (error) {
      setCommitError('Error al generar el mensaje de commit. Inténtalo de nuevo.');
    } finally {
      setCommitLoading(false);
    }
  };

  const findCommand = async () => {
    if (!commandDescription.trim()) {
      setCommandError('Por favor, describe lo que necesitas hacer.');
      return;
    }

    setCommandError('');
    setCommandLoading(true);
    setCommandResult('');

    try {
      const result = await callAI(commandDescription, 'command');
      setCommandResult(result);
    } catch (error) {
      setCommandError('Error al buscar el comando. Inténtalo de nuevo.');
    } finally {
      setCommandLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Aquí podrías mostrar una notificación de éxito
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/```bash\n([\s\S]*?)\n```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Asistente Git con IA ✨</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          ¿Atascado? Usa el poder de la IA para generar mensajes de commit o encontrar el comando que necesitas.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Generador de Mensajes de Commit */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Bot className="w-5 h-5 mr-2 text-blue-600" />
            Generador de Mensajes de Commit
          </h2>
          <p className="text-gray-600 mb-6">
            Describe los cambios que hiciste en lenguaje natural y la IA creará un mensaje de commit convencional para ti.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="commit-description" className="block text-sm font-medium text-gray-700 mb-2">
                Describe tus cambios:
              </label>
              <textarea
                id="commit-description"
                value={commitDescription}
                onChange={(e) => setCommitDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Ej: Agregué la página de contacto con un formulario y validaciones."
              />
              {commitError && (
                <p className="text-sm text-red-600 mt-2">{commitError}</p>
              )}
            </div>

            <button
              onClick={generateCommit}
              disabled={commitLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {commitLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Generando...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Generar Mensaje</span>
                </>
              )}
            </button>

            {commitResult && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Mensaje generado:</h4>
                  <button
                    onClick={() => copyToClipboard(commitResult)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
                  <code>{commitResult}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Buscador de Comandos */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-green-600" />
            Buscador de Comandos
          </h2>
          <p className="text-gray-600 mb-6">
            ¿No sabes qué comando usar? Describe lo que quieres hacer y la IA te sugerirá el comando correcto y te lo explicará.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="command-description" className="block text-sm font-medium text-gray-700 mb-2">
                ¿Qué necesitas hacer?
              </label>
              <textarea
                id="command-description"
                value={commandDescription}
                onChange={(e) => setCommandDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Ej: Quiero volver a la versión anterior de un archivo."
              />
              {commandError && (
                <p className="text-sm text-red-600 mt-2">{commandError}</p>
              )}
            </div>

            <button
              onClick={findCommand}
              disabled={commandLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {commandLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Buscando...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Encontrar Comando</span>
                </>
              )}
            </button>

            {commandResult && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Comando sugerido:</h4>
                  <button
                    onClick={() => copyToClipboard(commandResult.replace(/<[^>]*>/g, ''))}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(commandResult) }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">💡 Consejos para usar el asistente:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Sé específico en tus descripciones para obtener mejores resultados</li>
          <li>• Para commits, incluye qué tipo de cambio hiciste (nueva función, corrección, etc.)</li>
          <li>• Para comandos, describe exactamente lo que quieres lograr</li>
          <li>• Siempre revisa las sugerencias antes de usarlas en tu proyecto</li>
        </ul>
      </div>
    </div>
  );
};

export default AIAssistant;
