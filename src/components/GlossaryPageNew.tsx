import React, { useState, useMemo } from 'react';
import { Search, BookMarked, Filter, X, Bot, Zap, GitCompare, AlertTriangle, Copy, Loader } from 'lucide-react';
import { glossaryTerms, searchGlossary, getTermsByCategory } from '../data/glossary';
import { useAI } from '../services/aiService';
import type { GlossaryTerm } from '../types';

const GlossaryPage: React.FC = () => {
  const { generateText } = useAI();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // AI Tools states
  const [command1, setCommand1] = useState('git pull');
  const [command2, setCommand2] = useState('git fetch');
  const [comparisonResult, setComparisonResult] = useState('');
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [errorDescription, setErrorDescription] = useState('');
  const [errorSolution, setErrorSolution] = useState('');
  const [commitDescription, setCommitDescription] = useState('');
  const [commitMessage, setCommitMessage] = useState('');

  const categories = [
    'all',
    'commands',
    'concepts',
    'workflow',
    'collaboration',
    'advanced',
    'tools'
  ];

  const categoryLabels: Record<string, string> = {
    all: 'Todos',
    commands: 'Comandos',
    concepts: 'Conceptos',
    workflow: 'Flujo de Trabajo',
    collaboration: 'Colaboración',
    advanced: 'Avanzado',
    tools: 'Herramientas'
  };

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;

    if (selectedCategory !== 'all') {
      terms = getTermsByCategory(selectedCategory);
    }

    if (searchTerm) {
      terms = searchGlossary(searchTerm);
    }

    return terms.sort((a: GlossaryTerm, b: GlossaryTerm) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const toggleTerm = (termName: string) => {
    setExpandedTerm(expandedTerm === termName ? null : termName);
  };

  // AI Functions
  const explainWithAI = async (command: string) => {
    setModalTitle(`✨ Explicando: ${command}`);
    setModalContent('Cargando explicación...');
    setShowModal(true);
    setIsLoading(true);

    try {
      const prompt = `Explica el comando de git "${command}" para un principiante. Detalla qué hace, cuándo se usa comúnmente, y un ejemplo práctico. La respuesta debe estar en español y ser clara y concisa.`;
      const result = await generateText(prompt, 'command');
      
      if (result.success) {
        setModalContent(result.content);
      } else {
        setModalContent(result.error || 'Error al obtener explicación');
      }
    } catch (error) {
      setModalContent('Error de conexión. Verifica tu configuración de IA.');
    } finally {
      setIsLoading(false);
    }
  };

  const compareCommands = async () => {
    const cmd1 = command1.trim();
    const cmd2 = command2.trim();
    
    console.log('Comparando comandos:', { cmd1, cmd2 });
    
    if (!cmd1 || !cmd2) {
      alert('Por favor, ingresa ambos comandos para comparar.');
      return;
    }
    
    if (cmd1 === cmd2) {
      alert('Por favor, ingresa dos comandos diferentes para comparar.');
      return;
    }

    setComparisonLoading(true);
    setComparisonResult('Analizando las diferencias...');
    
    try {
      const prompt = `Para un principiante en Git, explica la diferencia fundamental entre los comandos "${cmd1}" y "${cmd2}". Enfócate en su propósito principal, cuándo es mejor usar cada uno, y los posibles riesgos o resultados. La respuesta debe ser clara, concisa y en español.`;
      const result = await generateText(prompt, 'command');
      
      console.log('Resultado de IA:', result);
      
      if (result.success) {
        setComparisonResult(result.content);
      } else {
        setComparisonResult(result.error || 'Error al comparar comandos');
      }
    } catch (error) {
      console.error('Error en compareCommands:', error);
      setComparisonResult('Error de conexión. Verifica tu configuración de IA.');
    } finally {
      setComparisonLoading(false);
    }
  };

  const solveError = async () => {
    if (!errorDescription.trim()) {
      alert('Por favor, describe el error que estás experimentando.');
      return;
    }

    setErrorSolution('Analizando el error...');
    
    try {
      const prompt = `Como un experto en Git, he recibido el siguiente mensaje de error: "${errorDescription}". Explícame en español, de forma sencilla, qué significa este error, por qué ocurre comúnmente y dame los pasos claros para solucionarlo.`;
      const result = await generateText(prompt, 'command');
      
      if (result.success) {
        setErrorSolution(result.content);
      } else {
        setErrorSolution(result.error || 'Error al analizar el problema');
      }
    } catch (error) {
      setErrorSolution('Error de conexión. Verifica tu configuración de IA.');
    }
  };

  const generateCommit = async () => {
    if (!commitDescription.trim()) {
      alert('Por favor, describe los cambios que realizaste.');
      return;
    }

    try {
      const prompt = `Basado en la siguiente descripción de cambios: "${commitDescription}", genera un mensaje de commit semántico en una sola línea, en español, siguiendo el estándar de Conventional Commits (ej. feat:, fix:, docs:). Solo devuelve el mensaje del commit, sin explicaciones.`;
      const result = await generateText(prompt, 'commit');
      
      if (result.success) {
        setCommitMessage(result.content);
      } else {
        setCommitMessage(result.error || 'Error al generar mensaje');
      }
    } catch (error) {
      setCommitMessage('Error de conexión. Verifica tu configuración de IA.');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Podrías agregar una notificación aquí
    } catch (error) {
      console.error('Error al copiar:', error);
    }
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

  const closeModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalContent('');
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\* (.*?)(?:\n|$)/g, '<ul><li>$1</li></ul>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <BookMarked className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Glosario Git con IA ✨</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra definiciones detalladas, explicaciones con IA y herramientas inteligentes para dominar Git.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar términos..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {categoryLabels[category]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpiar
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-center text-gray-600 mb-8">
              {filteredTerms.length === 0 ? (
                <p>No se encontraron términos que coincidan con tu búsqueda.</p>
              ) : (
                <p>
                  Mostrando {filteredTerms.length} de {glossaryTerms.length} términos
                  {searchTerm && ` para "${searchTerm}"`}
                  {selectedCategory !== 'all' && ` en la categoría "${categoryLabels[selectedCategory]}"`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Tools Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">🤖 Herramientas IA para Git</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Comparar Comandos */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <GitCompare className="w-5 h-5 mr-2 text-blue-600" />
                Comparar Comandos
              </h3>
              <div className="space-y-4">
                {allCommands.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    <p>No hay comandos disponibles para comparar.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primer comando:
                        </label>
                        <select
                          value={command1}
                          onChange={(e) => setCommand1(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          {allCommands.map(cmd => (
                            <option key={`cmd2-${cmd.term}`} value={cmd.term}>{cmd.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={compareCommands}
                      disabled={comparisonLoading || allCommands.length === 0}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      {comparisonLoading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin mr-2" />
                          Comparando...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Comparar con IA
                        </>
                      )}
                    </button>
                    {comparisonResult && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-800">Comparación:</span>
                          <button
                            onClick={() => copyToClipboard(comparisonResult.replace(/<[^>]*>/g, ''))}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="border border-gray-200 rounded p-3 bg-white">
                          <div 
                            className="text-sm text-gray-700 leading-relaxed"
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Solucionar Errores
              </h3>
              <div className="space-y-4">
                <textarea
                  value={errorDescription}
                  onChange={(e) => setErrorDescription(e.target.value)}
                  placeholder="Pega aquí el mensaje de error de Git..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                />
                <button
                  onClick={solveError}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Analizar Error
                </button>
                {errorSolution && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <div className="border border-red-200 rounded p-3 bg-white">
                      <div 
                        className="text-sm text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(errorSolution) }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Generador de Commits */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Bot className="w-5 h-5 mr-2 text-green-600" />
                Generar Commits
              </h3>
              <div className="space-y-4">
                <textarea
                  value={commitDescription}
                  onChange={(e) => setCommitDescription(e.target.value)}
                  placeholder="Describe los cambios que hiciste..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
                />
                <button
                  onClick={generateCommit}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Generar Commit
                </button>
                {commitMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Mensaje generado:</span>
                      <button
                        onClick={() => copyToClipboard(commitMessage)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <code className="block bg-gray-900 text-green-400 p-2 rounded text-sm">
                      {commitMessage}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredTerms.length > 0 ? (
          <div className="grid gap-4">
            {filteredTerms.map((item: GlossaryTerm) => (
              <div key={item.term} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTerm(item.term)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.term}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {categoryLabels[item.category] || item.category}
                      </span>
                    </div>
                    <div className={`transform transition-transform duration-200 ${
                      expandedTerm === item.term ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {expandedTerm === item.term && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <div className="pt-4">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {item.definition}
                      </p>
                      
                      {/* Botón Explicar con IA */}
                      <div className="mb-4">
                        <button
                          onClick={() => explainWithAI(item.term)}
                          className="inline-flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          ✨ Explicar con IA
                        </button>
                      </div>
                      
                      {item.examples && item.examples.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Ejemplos:</h4>
                          <div className="space-y-2">
                            {item.examples.map((example, index) => (
                              <pre key={index} className="text-sm text-gray-800 overflow-x-auto">
                                <code>{example}</code>
                              </pre>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.relatedTerms && item.relatedTerms.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Términos relacionados:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedTerms.map((relatedTerm: string) => (
                              <button
                                key={relatedTerm}
                                onClick={() => {
                                  setSearchTerm(relatedTerm);
                                  setExpandedTerm(relatedTerm);
                                }}
                                className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                              >
                                {relatedTerm}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron términos
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta con otros términos de búsqueda o cambia el filtro de categoría.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todos los términos
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{modalTitle}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 120px)' }}>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-8 h-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Generando explicación...</span>
                </div>
              ) : (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(modalContent) }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlossaryPage;
