import React, { useState, useMemo } from 'react';
import { Search, BookMarked, Filter, X } from 'lucide-react';
import { glossaryTerms, searchGlossary, getTermsByCategory } from '../data/glossary';
import type { GlossaryTerm } from '../types';

const GlossaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <BookMarked className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Glosario Git</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra definiciones detalladas de más de 150 términos relacionados con Git, control de versiones y colaboración.
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
                      
                      {item.examples && item.examples.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4">
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
    </div>
  );
};

export default GlossaryPage;
