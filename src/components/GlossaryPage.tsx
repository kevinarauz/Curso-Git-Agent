import React from 'react';
import { 
  Search, 
  BookMarked, 
  Filter, 
  X, 
  Loader
} from 'lucide-react';
import { glossaryTerms, searchGlossary, getTermsByCategory } from '../data/glossary';
import { useAIContinuation } from '../services/aiContinuationService';
import type { GlossaryTerm } from '../types';

const GlossaryPage: React.FC = () => {
  const { generateWithContinuation } = useAIContinuation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [expandedTerm, setExpandedTerm] = React.useState<string | null>(null);
  
  // Modal states
  const [showModal, setShowModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalContent, setModalContent] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isContinuing, setIsContinuing] = React.useState(false);
  
  // Ref para el contenido del modal
  const modalContentRef = React.useRef<HTMLDivElement>(null);

  // Effects para manejar scroll del modal
  React.useEffect(() => {
    if (showModal) {
      // Bloquear scroll de la página principal
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
      
      // Scroll al inicio del modal
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0;
      }
    } else {
      // Restaurar scroll de la página
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [showModal]);

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

  const filteredTerms = React.useMemo(() => {
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
    setIsContinuing(false);

    try {
      const prompt = `Explica el comando de git "${command}" para un principiante. Detalla qué hace, cuándo se usa comúnmente, y un ejemplo práctico. La respuesta debe estar en español y ser clara y concisa.`;
      const result = await generateWithContinuation(
        prompt, 
        'command',
        {
          onProgress: (status) => {
            if (status === 'continuing') {
              setIsContinuing(true);
              setModalContent(prevContent => prevContent + '\n\n[Continuando explicación...]');
            } else if (status === 'completed') {
              setIsContinuing(false);
            }
          },
          onPartialResponse: (content) => {
            setModalContent(content);
          }
        }
      );
      
      if (result.success) {
        setModalContent(result.content);
      } else {
        setModalContent(result.error || 'Error al obtener explicación');
      }
    } catch {
      setModalContent('Error de conexión. Verifica tu configuración de IA.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalContent('');
  };

  const renderMarkdown = (text: string) => {
    // Limpiar marcas de continuación antes de renderizar
    const cleanText = text.replace(/---CONTINUAR---\s*/g, '').trim();
    
    return cleanText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\* (.*?)(?:\n|$)/g, '<ul><li>$1</li></ul>')
      .replace(/```bash\n([\s\S]*?)\n```/g, '<pre style="background-color: #1a1a1a; color: #00ff00; padding: 12px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; max-width: 100%; margin: 16px 0;"><code>$1</code></pre>')
      .replace(/```(.*?)\n([\s\S]*?)\n```/g, '<pre style="background-color: #f5f5f5; padding: 12px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; max-width: 100%; margin: 16px 0;"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="background-color: #f0f0f0; padding: 2px 4px; border-radius: 4px; font-size: 0.9em; word-wrap: break-word;">$1</code>')
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

      {/* Modal con scroll interno - MEJORADO */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
          onWheel={(e) => e.preventDefault()}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header fijo */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">{modalTitle}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Contenido con scroll interno */}
            <div 
              ref={modalContentRef}
              className="flex-1 overflow-y-scroll"
              style={{
                height: 'calc(90vh - 120px)', // Altura FIJA para forzar scroll
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e1 #f1f5f9'
              }}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Generando explicación...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Contenido principal */}
                    <div 
                      className="prose prose-sm max-w-none leading-relaxed"
                      style={{ 
                        lineHeight: '1.6',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        minHeight: '500px' // Altura mínima para forzar scroll
                      }}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(modalContent) }}
                    />
                    
                    {/* Indicador de continuación */}
                    {isContinuing && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                        <Loader className="w-4 h-4 animate-spin text-blue-600 mr-2" />
                        <span className="text-blue-700 text-sm">Continuando explicación automáticamente...</span>
                      </div>
                    )}
                    
                    {/* Espaciador para garantizar scroll visible */}
                    <div style={{ height: '200px', opacity: 0 }}>
                      {/* Espacio invisible para forzar scroll */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlossaryPage;
