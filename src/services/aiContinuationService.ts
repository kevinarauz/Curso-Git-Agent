// src/services/aiContinuationService.ts
// Servicio especializado para manejar continuación automática de respuestas IA

import { aiService, AIResponse } from './aiService';

export interface ContinuationCallbacks {
  onProgress?: (status: 'loading' | 'continuing' | 'completed') => void;
  onPartialResponse?: (content: string) => void;
  onError?: (error: string) => void;
}

export interface ContinuationConfig {
  maxAttempts?: number;
  maxTokensPerCall?: number;
  provider?: 'gemini' | 'openai' | 'anthropic' | 'ollama';
}

class AIContinuationService {
  private defaultConfig: ContinuationConfig = {
    maxAttempts: 3,
    maxTokensPerCall: 2048,
    provider: 'gemini'
  };

  /**
   * Genera texto con continuación automática si es necesario
   */
  async generateWithContinuation(
    prompt: string, 
    type: 'commit' | 'command' = 'command',
    callbacks?: ContinuationCallbacks,
    config?: ContinuationConfig
  ): Promise<AIResponse> {
    const finalConfig = { ...this.defaultConfig, ...config };
    
    try {
      callbacks?.onProgress?.('loading');

      // Primera llamada
      const initialResponse = await this.makeInitialCall(prompt, type, finalConfig);
      
      if (!initialResponse.success) {
        callbacks?.onError?.(initialResponse.error || 'Error en la llamada inicial');
        return initialResponse;
      }

      // Si no se cortó, retornar inmediatamente
      if (!this.isResponseTruncated(initialResponse)) {
        callbacks?.onProgress?.('completed');
        return initialResponse;
      }

      // Si se cortó, continuar automáticamente
      callbacks?.onProgress?.('continuing');
      callbacks?.onPartialResponse?.(initialResponse.content);

      const continuedResponse = await this.continueResponse(
        initialResponse.content,
        prompt,
        type,
        callbacks,
        finalConfig
      );

      callbacks?.onProgress?.('completed');
      return continuedResponse;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      callbacks?.onError?.(errorMessage);
      return {
        success: false,
        content: '',
        error: errorMessage
      };
    }
  }

  /**
   * Llamada inicial a la IA
   */
  private async makeInitialCall(
    prompt: string, 
    type: 'commit' | 'command',
    _config: ContinuationConfig
  ): Promise<AIResponse & { wasTruncated?: boolean }> {
    const enhancedPrompt = this.enhancePromptForContinuation(prompt, type);
    
    // Usar el servicio existente pero con configuración mejorada
    const response = await aiService.generateText(enhancedPrompt, type);
    
    return {
      ...response,
      wasTruncated: this.isResponseTruncated(response)
    };
  }

  /**
   * Continuar respuesta cortada
   */
  private async continueResponse(
    partialContent: string,
    originalPrompt: string,
    type: 'commit' | 'command',
    callbacks?: ContinuationCallbacks,
    config?: ContinuationConfig
  ): Promise<AIResponse> {
    let fullContent = partialContent;
    let attempts = 0;
    const maxAttempts = config?.maxAttempts || 3;

    while (attempts < maxAttempts) {
      attempts++;
      
      try {
        const continuePrompt = this.buildContinuationPrompt(fullContent, originalPrompt, type);
        const response = await aiService.generateText(continuePrompt, type);
        
        if (!response.success) {
          console.warn(`Error en intento ${attempts} de continuación:`, response.error);
          if (attempts === maxAttempts) {
            fullContent += '\n\n[Nota: La respuesta fue cortada debido a límites de tokens]';
            break;
          }
          continue;
        }

        // Limpiar superposiciones y concatenar
        const cleanContent = this.cleanOverlap(fullContent, response.content);
        fullContent += '\n' + cleanContent;
        
        // Notificar progreso
        callbacks?.onPartialResponse?.(fullContent);

        // Verificar si necesita continuar
        if (!this.needsContinuation(response.content)) {
          break;
        }

        // Limpiar marca de continuación si existe
        fullContent = fullContent.replace(/---CONTINUAR---\s*/g, '').trim();

      } catch (error) {
        console.warn(`Error en intento ${attempts} de continuación:`, error);
        if (attempts === maxAttempts) {
          fullContent += '\n\n[Nota: La respuesta fue cortada debido a límites de tokens]';
        }
        break;
      }
    }

    return {
      success: true,
      content: fullContent.replace(/---CONTINUAR---\s*/g, '').trim()
    };
  }

  /**
   * Mejorar prompt para incluir instrucciones de continuación
   */
  private enhancePromptForContinuation(prompt: string, type: 'commit' | 'command'): string {
    if (type === 'commit') {
      return prompt; // Los commits no necesitan continuación
    }

    return `${prompt}

INSTRUCCIONES IMPORTANTES:
- Proporciona una explicación detallada y completa
- Usa formato markdown para códigos: \`\`\`bash para comandos
- Si tu respuesta es muy larga y se corta por límites de tokens, incluye exactamente "---CONTINUAR---" al final
- Incluye ejemplos prácticos cuando sea apropiado`;
  }

  /**
   * Construir prompt de continuación
   */
  private buildContinuationPrompt(currentContent: string, originalPrompt: string, _type: string): string {
    const lastParagraph = this.getLastCompleteParagraph(currentContent);
    
    return `CONTINUACIÓN DE RESPUESTA:

Consulta original: ${originalPrompt}

Tu respuesta anterior terminó así:
"...${lastParagraph}"

Por favor, continúa la explicación exactamente desde donde se cortó. NO repitas el contenido anterior.
Si la respuesta sigue siendo muy larga, incluye "---CONTINUAR---" al final.

Continúa ahora:`;
  }

  /**
   * Verificar si la respuesta se cortó
   */
  private isResponseTruncated(response: AIResponse): boolean {
    if (!response.success || !response.content) return false;
    
    const content = response.content.trim();
    
    // Verificar varios indicadores de corte
    const truncationIndicators = [
      /\.\.\.\s*$/,                    // Termina con puntos suspensivos
      /[^.!?]\s*$/,                    // No termina con puntuación completa
      /```\s*[^`]*$/,                  // Bloque de código incompleto
      /\*\*[^*]*$/,                    // Markdown bold incompleto
      /---CONTINUAR---/,               // Marca explícita
      content.length > 1800            // Contenido muy largo (probable corte)
    ];

    return truncationIndicators.some(indicator => 
      typeof indicator === 'boolean' ? indicator : indicator.test(content)
    );
  }

  /**
   * Verificar si necesita continuar basado en el contenido
   */
  private needsContinuation(content: string): boolean {
    return content.includes('---CONTINUAR---') || this.isResponseTruncated({ success: true, content });
  }

  /**
   * Limpiar superposiciones entre respuestas
   */
  private cleanOverlap(existingContent: string, newContent: string): string {
    const lines = existingContent.split('\n');
    const lastLine = lines[lines.length - 1]?.trim();
    
    if (!lastLine || lastLine.length < 10) return newContent;

    // Buscar si la nueva respuesta empieza con parte de la última línea
    const newLines = newContent.split('\n');
    for (let i = 0; i < Math.min(3, newLines.length); i++) {
      const newLine = newLines[i].trim();
      if (newLine && lastLine.includes(newLine.substring(0, Math.min(20, newLine.length)))) {
        return newLines.slice(i + 1).join('\n');
      }
    }

    return newContent;
  }

  /**
   * Obtener el último párrafo completo para contexto
   */
  private getLastCompleteParagraph(content: string): string {
    const paragraphs = content.split('\n\n');
    const lastParagraph = paragraphs[paragraphs.length - 1]?.trim();
    
    if (!lastParagraph) return content.slice(-100);
    
    return lastParagraph.length > 200 
      ? '...' + lastParagraph.slice(-200)
      : lastParagraph;
  }

  /**
   * Generar texto simple sin continuación (para casos que no la necesiten)
   */
  async generateSimple(prompt: string, type: 'commit' | 'command' = 'command'): Promise<AIResponse> {
    return aiService.generateText(prompt, type);
  }
}

// Instancia singleton
export const aiContinuationService = new AIContinuationService();

// Hook para React
export const useAIContinuation = () => {
  return {
    generateWithContinuation: aiContinuationService.generateWithContinuation.bind(aiContinuationService),
    generateSimple: aiContinuationService.generateSimple.bind(aiContinuationService)
  };
};
