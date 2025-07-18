import React, { useState } from 'react';
import { Bot, Loader, Copy, RefreshCw, Settings, AlertCircle, GitCompare, AlertTriangle } from 'lucide-react';
import { useAI } from '../services/aiService';
import { useAIContinuation } from '../services/aiContinuationService';
import { glossaryTerms } from '../data/glossary';

interface AIAssistantProps {
  onClose?: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = () => {
  const { setApiKey, setProvider, getConfig } = useAI();
  const { generateWithContinuation } = useAIContinuation();
  
  const [commitDescription, setCommitDescription] = useState('');
  const [commitResult, setCommitResult] = useState('');
  const [commitLoading, setCommitLoading] = useState(false);
  const [commitError, setCommitError] = useState('');
  const [commitContinuing, setCommitContinuing] = useState(false);

  const [commandDescription, setCommandDescription] = useState('');
  const [commandResult, setCommandResult] = useState('');
  const [commandLoading, setCommandLoading] = useState(false);
  const [commandError, setCommandError] = useState('');
  const [commandContinuing, setCommandContinuing] = useState(false);

  // Comparador de comandos
  const [command1, setCommand1] = useState('git pull');
  const [command2, setCommand2] = useState('git fetch');
  const [comparisonResult, setComparisonResult] = useState('');
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [comparisonError, setComparisonError] = useState('');
  const [comparisonContinuing, setComparisonContinuing] = useState(false);

  // Solucionador de errores
  const [errorDescription, setErrorDescription] = useState('');
  const [errorSolution, setErrorSolution] = useState('');
  const [errorLoading, setErrorLoading] = useState(false);
  const [errorError, setErrorError] = useState('');
  const [errorContinuing, setErrorContinuing] = useState(false);

  const [showConfig, setShowConfig] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [currentProvider, setCurrentProvider] = useState(getConfig().provider || 'gemini');

  const generateCommit = async () => {
    if (!commitDescription.trim()) {
      setCommitError('Por favor, describe los cambios que realizaste.');
      return;
    }

    setCommitError('');
    setCommitLoading(true);
    setCommitResult('');
    setCommitContinuing(false);

    try {
      const result = await generateWithContinuation(
        commitDescription, 
        'commit',
        {
          onProgress: (status) => {
            setCommitContinuing(status === 'continuing');
          },
          onPartialResponse: (content) => {
            setCommitResult(content);
          },
          onError: (error) => {
            setCommitError(error);
          }
        }
      );
      
      if (result.success) {
        setCommitResult(result.content);
      } else {
        setCommitError(result.error || 'Error al generar el mensaje de commit.');
      }
    } catch (error) {
      setCommitError('Error de conexión. Verifica tu configuración de API.');
    } finally {
      setCommitLoading(false);
      setCommitContinuing(false);
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
    setCommandContinuing(false);

    try {
      const result = await generateWithContinuation(
        commandDescription, 
        'command',
        {
          onProgress: (status) => {
            setCommandContinuing(status === 'continuing');
          },
          onPartialResponse: (content) => {
            setCommandResult(content);
          },
          onError: (error) => {
            setCommandError(error);
          }
        }
      );
      
      if (result.success) {
        setCommandResult(result.content);
      } else {
        setCommandError(result.error || 'Error al buscar el comando.');
      }
    } catch (error) {
      setCommandError('Error de conexión. Verifica tu configuración de API.');
    } finally {
      setCommandLoading(false);
      setCommandContinuing(false);
    }
  };

  const compareCommands = async () => {
    if (!command1 || !command2 || command1 === command2) {
      setComparisonError('Por favor, elige dos comandos diferentes para comparar.');
      return;
    }

    setComparisonError('');
    setComparisonLoading(true);
    setComparisonResult('');
    setComparisonContinuing(false);

    try {
      const prompt = `Para un principiante en Git, explica la diferencia fundamental entre los comandos "${command1}" y "${command2}". Enfócate en su propósito principal, cuándo es mejor usar cada uno, y los posibles riesgos o resultados. La respuesta debe ser clara, concisa y en español.`;
      const result = await generateWithContinuation(
        prompt, 
        'command',
        {
          onProgress: (status) => {
            setComparisonContinuing(status === 'continuing');
          },
          onPartialResponse: (content) => {
            setComparisonResult(content);
          },
          onError: (error) => {
            setComparisonError(error);
          }
        }
      );
      
      if (result.success) {
        setComparisonResult(result.content);
      } else {
        setComparisonError(result.error || 'Error al comparar comandos');
      }
    } catch (error) {
      setComparisonError('Error de conexión. Verifica tu configuración de IA.');
    } finally {
      setComparisonLoading(false);
      setComparisonContinuing(false);
    }
  };

  const solveError = async () => {
    if (!errorDescription.trim()) {
      setErrorError('Por favor, describe el error que estás experimentando.');
      return;
    }

    setErrorError('');
    setErrorLoading(true);
    setErrorSolution('');
    setErrorContinuing(false);

    try {
      const prompt = `Como un experto en Git, he recibido el siguiente mensaje de error: "${errorDescription}". Explícame en español, de forma sencilla, qué significa este error, por qué ocurre comúnmente y dame los pasos claros para solucionarlo.`;
      const result = await generateWithContinuation(
        prompt, 
        'command',
        {
          onProgress: (status) => {
            setErrorContinuing(status === 'continuing');
          },
          onPartialResponse: (content) => {
            setErrorSolution(content);
          },
          onError: (error) => {
            setErrorError(error);
          }
        }
      );
      
      if (result.success) {
        setErrorSolution(result.content);
      } else {
        setErrorError(result.error || 'Error al analizar el problema');
      }
    } catch (error) {
      setErrorError('Error de conexión. Verifica tu configuración de IA.');
    } finally {
      setErrorLoading(false);
      setErrorContinuing(false);
    }
  };

  const handleSaveConfig = () => {
    // Para Gemini, si no hay API key temporal, mantener la actual
    if (currentProvider === 'gemini' && !tempApiKey.trim()) {
      setProvider(currentProvider);
      setShowConfig(false);
      return;
    }
    
    // Para otros proveedores o si hay nueva API key
    if (tempApiKey.trim() || currentProvider === 'ollama') {
      if (tempApiKey.trim()) {
        setApiKey(tempApiKey);
      }
      setProvider(currentProvider, tempApiKey);
      setShowConfig(false);
      setTempApiKey('');
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

  // Lista de comandos Git para los selectores
  const gitCommands = glossaryTerms
    .filter(term => term.term.toLowerCase().includes('git ') || term.examples.some(ex => ex.startsWith('git ')))
    .map(term => {
      // Si el término no empieza con 'git ', usar el primer ejemplo que sí lo haga
      if (term.term.toLowerCase().includes('git ')) {
        return { term: term.term, label: term.term };
      } else {
        const gitExample = term.examples.find(ex => ex.startsWith('git '));
        return { term: gitExample || term.term, label: gitExample || term.term };
      }
    })
    .filter((item, index, array) => array.findIndex(i => i.term === item.term) === index) // Eliminar duplicados
    .sort((a, b) => a.term.localeCompare(b.term));

  // Agregar algunos comandos comunes que podrían no estar en el glosario
  const commonCommands = [
    { term: 'git add', label: 'git add' },
    { term: 'git commit', label: 'git commit' },
    { term: 'git push', label: 'git push' },
    { term: 'git pull', label: 'git pull' },
    { term: 'git fetch', label: 'git fetch' },
    { term: 'git merge', label: 'git merge' },
    { term: 'git branch', label: 'git branch' },
    { term: 'git checkout', label: 'git checkout' },
    { term: 'git status', label: 'git status' },
    { term: 'git log', label: 'git log' },
    { term: 'git reset', label: 'git reset' },
    { term: 'git rebase', label: 'git rebase' },
    { term: 'git stash', label: 'git stash' },
    { term: 'git clone', label: 'git clone' },
    { term: 'git init', label: 'git init' },
    { term: 'git diff', label: 'git diff' },
    { term: 'git cherry-pick', label: 'git cherry-pick' },
    { term: 'git tag', label: 'git tag' },
    { term: 'git remote', label: 'git remote' },
    { term: 'git config', label: 'git config' },
  ];

  // Combinar y deduplicar
  const allCommands = [...gitCommands, ...commonCommands]
    .filter((item, index, array) => array.findIndex(i => i.term === item.term) === index)
    .sort((a, b) => a.term.localeCompare(b.term));

  // Asegurar que los comandos iniciales estén en la lista
  React.useEffect(() => {
    if (allCommands.length > 0) {
      const cmd1Exists = allCommands.some(cmd => cmd.term === command1);
      const cmd2Exists = allCommands.some(cmd => cmd.term === command2);
      
      if (!cmd1Exists && allCommands.length > 0) {
        setCommand1(allCommands[0].term);
      }
      if (!cmd2Exists && allCommands.length > 1) {
        setCommand2(allCommands[1].term);
      }
    }
  }, [allCommands, command1, command2]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Asistente Git con IA ✨</h1>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </button>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          ¿Atascado? Usa el poder de la IA para generar commits, encontrar comandos, comparar opciones y solucionar errores de Git.
        </p>
      </div>

      {/* Indicador de Estado */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${getConfig().provider === 'ollama' || localStorage.getItem(`ai-api-key-${getConfig().provider}`) ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm font-medium text-gray-700">
              Estado: {getConfig().provider === 'ollama' || localStorage.getItem(`ai-api-key-${getConfig().provider}`) ? 'Configurado' : 'Requiere configuración'}
            </span>
            <span className="text-xs text-gray-500">
              Proveedor: {getConfig().provider.toUpperCase()}
            </span>
          </div>
          {(!localStorage.getItem(`ai-api-key-${getConfig().provider}`) && getConfig().provider !== 'ollama') && (
            <button
              onClick={() => setShowConfig(true)}
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              Configurar ahora
            </button>
          )}
        </div>
      </div>

      {/* Herramientas IA */}
      <div className="space-y-8">
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
                <div className="flex items-center space-x-2 text-sm text-red-600 mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{commitError}</span>
                </div>
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
                  <span>{commitContinuing ? 'Continuando respuesta...' : 'Generando...'}</span>
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
                {commitContinuing && (
                  <div className="mb-3 flex items-center text-sm text-blue-600">
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Continuando respuesta...
                  </div>
                )}
                <div className="border border-gray-200 rounded">
                  <pre className="bg-gray-900 text-green-400 p-3 text-sm overflow-x-auto whitespace-pre-wrap">
                    <code>{commitResult}</code>
                  </pre>
                </div>
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
                <div className="flex items-center space-x-2 text-sm text-red-600 mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{commandError}</span>
                </div>
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
                  <span>{commandContinuing ? 'Continuando respuesta...' : 'Buscando...'}</span>
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
                {commandContinuing && (
                  <div className="mb-3 flex items-center text-sm text-blue-600">
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Continuando respuesta...
                  </div>
                )}
                <div className="border border-gray-200 rounded p-3 bg-white">
                  <div 
                    className="prose prose-sm max-w-none text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(commandResult) }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comparador de Comandos */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <GitCompare className="w-5 h-5 mr-2 text-purple-600" />
            Comparar Comandos
          </h2>
          <p className="text-gray-600 mb-6">
            ¿Confundido entre dos comandos similares? Compáralos para entender sus diferencias y cuándo usar cada uno.
          </p>

          <div className="space-y-4">
            {allCommands.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <p>No hay comandos disponibles para comparar.</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primer comando:
                    </label>
                    <select
                      value={command1}
                      onChange={(e) => setCommand1(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    >
                      {allCommands.map(cmd => (
                        <option key={`cmd1-${cmd.term}`} value={cmd.term}>{cmd.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Segundo comando:
                    </label>
                    <select
                      value={command2}
                      onChange={(e) => setCommand2(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    >
                      {allCommands.map(cmd => (
                        <option key={`cmd2-${cmd.term}`} value={cmd.term}>{cmd.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {comparisonError && (
                  <div className="flex items-center space-x-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>{comparisonError}</span>
                  </div>
                )}

                <button
                  onClick={compareCommands}
                  disabled={comparisonLoading || allCommands.length === 0}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {comparisonLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>{comparisonContinuing ? 'Continuando respuesta...' : 'Comparando...'}</span>
                    </>
                  ) : (
                    <>
                      <GitCompare className="w-4 h-4" />
                      <span>Comparar Comandos</span>
                    </>
                  )}
                </button>

                {comparisonResult && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Comparación:</h4>
                      <button
                        onClick={() => copyToClipboard(comparisonResult.replace(/<[^>]*>/g, ''))}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded p-3 bg-white">
                      <div 
                        className="prose prose-sm max-w-none text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(comparisonResult) }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Solucionador de Errores */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
            Solucionador de Errores
          </h2>
          <p className="text-gray-600 mb-6">
            ¿Git te muestra un error que no entiendes? Pega el mensaje de error y la IA te explicará qué significa y cómo solucionarlo.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="error-description" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje de error:
              </label>
              <textarea
                id="error-description"
                value={errorDescription}
                onChange={(e) => setErrorDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Ej: fatal: not a git repository (or any of the parent directories): .git"
              />
              {errorError && (
                <div className="flex items-center space-x-2 text-sm text-red-600 mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorError}</span>
                </div>
              )}
            </div>

            <button
              onClick={solveError}
              disabled={errorLoading}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {errorLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>{errorContinuing ? 'Continuando respuesta...' : 'Analizando...'}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  <span>Analizar Error</span>
                </>
              )}
            </button>

            {errorSolution && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Solución:</h4>
                  <button
                    onClick={() => copyToClipboard(errorSolution.replace(/<[^>]*>/g, ''))}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="border border-gray-200 rounded p-3 bg-white">
                  <div 
                    className="prose prose-sm max-w-none text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(errorSolution) }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Panel de Configuración */}
      {showConfig && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de IA</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proveedor de IA
              </label>
              <select
                value={currentProvider}
                onChange={(e) => setCurrentProvider(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="gemini">Google Gemini (Recomendado)</option>
                <option value="openai">OpenAI (GPT)</option>
                <option value="anthropic">Anthropic (Claude)</option>
                <option value="ollama">Ollama (Local)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key {currentProvider !== 'ollama' && <span className="text-red-500">*</span>}
              </label>
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder={
                  currentProvider === 'ollama' ? 'No requerida para Ollama' : 
                  currentProvider === 'gemini' ? 'Ya configurado - Opcional cambiar' :
                  'Ingresa tu API key'
                }
                disabled={currentProvider === 'ollama'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Instrucciones por proveedor:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                {currentProvider === 'openai' && (
                  <p>• Obtén tu API key en: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Platform</a></p>
                )}
                {currentProvider === 'gemini' && (
                  <div>
                    <p>• ✅ <strong>Ya configurado</strong> - Gemini 2.0 Flash listo para usar</p>
                    <p>• Si necesitas cambiar la API key: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></p>
                  </div>
                )}
                {currentProvider === 'anthropic' && (
                  <p>• Obtén tu API key en: <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline">Anthropic Console</a></p>
                )}
                {currentProvider === 'ollama' && (
                  <p>• Instala Ollama localmente: <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="underline">ollama.ai</a> y ejecuta un modelo</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-3">
            <button
              onClick={() => setShowConfig(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveConfig}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Guardar Configuración
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-900 mb-2">🚀 Sistema de Continuación Automática Activo</h3>
        <p className="text-sm text-green-800">
          <strong>✨ Nuevo servicio mejorado:</strong> Ahora usando 
          <code className="mx-1 px-2 py-1 bg-green-100 rounded text-xs">aiContinuationService</code>
          que detecta automáticamente respuestas cortadas y las continúa sin intervención del usuario.
          Verás actualizaciones en tiempo real mientras se construye la respuesta completa.
        </p>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">💡 Consejos para usar el asistente:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Commits:</strong> Sé específico en tus descripciones para obtener mejores mensajes</li>
          <li>• <strong>Comandos:</strong> Describe exactamente lo que quieres lograr</li>
          <li>• <strong>Comparaciones:</strong> Usa esta herramienta cuando no sepas cuál comando es mejor</li>
          <li>• <strong>Errores:</strong> Copia el mensaje de error completo para una mejor diagnosis</li>
          <li>• <strong>Respuestas largas:</strong> Si una respuesta se corta, se continuará automáticamente</li>
          <li>• Siempre revisa las sugerencias antes de usarlas en tu proyecto</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default AIAssistant;
