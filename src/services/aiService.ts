// src/services/aiService.ts
// Servicio para conectar con diferentes APIs de IA

export interface AIResponse {
  success: boolean;
  content: string;
  error?: string;
}

export interface AIConfig {
  provider: 'openai' | 'gemini' | 'ollama' | 'anthropic';
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

// Configuración por defecto
const DEFAULT_CONFIG: Record<string, AIConfig> = {
  openai: {
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    baseUrl: 'https://api.openai.com/v1'
  },
  gemini: {
    provider: 'gemini',
    model: 'gemini-2.0-flash',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta'
  },
  ollama: {
    provider: 'ollama',
    model: 'llama2',
    baseUrl: 'http://localhost:11434'
  },
  anthropic: {
    provider: 'anthropic',
    model: 'claude-3-sonnet-20240229',
    baseUrl: 'https://api.anthropic.com/v1'
  }
};

class AIService {
  private config: AIConfig;

  constructor(config?: Partial<AIConfig>) {
    // Usar Gemini por defecto con tu API key
    const provider = config?.provider || 'gemini';
    this.config = {
      ...DEFAULT_CONFIG[provider],
      ...config
    };
    
    // Configurar tu API key de Gemini por defecto
    if (provider === 'gemini' && !localStorage.getItem(`ai-api-key-${provider}`)) {
      localStorage.setItem('ai-api-key-gemini', 'AIzaSyCypmLSsEUQ7qoCYZXjy_pbXRKVR1a51D0');
      localStorage.setItem('ai-provider', 'gemini');
    }
  }

  // Método principal para generar texto con callbacks de progreso
  async generateText(prompt: string, type: 'commit' | 'command' = 'commit', onProgress?: (status: 'loading' | 'continuing') => void): Promise<AIResponse> {
    try {
      // Obtener API key del localStorage o variables de entorno
      const apiKey = this.getApiKey();
      
      if (!apiKey && this.config.provider !== 'ollama') {
        return {
          success: false,
          content: '',
          error: `API key requerida para ${this.config.provider}. Configúrala en el perfil.`
        };
      }

      onProgress?.('loading');

      switch (this.config.provider) {
        case 'openai':
          return await this.callOpenAI(prompt, type, apiKey);
        case 'gemini':
          return await this.callGeminiWithProgress(prompt, type, apiKey, onProgress);
        case 'ollama':
          return await this.callOllama(prompt, type);
        case 'anthropic':
          return await this.callAnthropic(prompt, type, apiKey);
        default:
          return {
            success: false,
            content: '',
            error: 'Proveedor de IA no soportado'
          };
      }
    } catch (error) {
      console.error('Error en AIService:', error);
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  private async callGeminiWithProgress(prompt: string, type: string, apiKey: string, onProgress?: (status: 'loading' | 'continuing') => void): Promise<AIResponse> {
    try {
      const fullPrompt = this.formatPrompt(prompt, type, 'gemini');
      const response = await this.callGeminiSingle(fullPrompt, apiKey);
      
      // Si la respuesta se cortó, intentar continuación automática
      if (response.wasTruncated) {
        onProgress?.('continuing');
        return await this.continueGeminiResponse(response.content, fullPrompt, apiKey);
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // OpenAI GPT
  private async callOpenAI(prompt: string, type: string, apiKey: string): Promise<AIResponse> {
    const systemPrompt = type === 'commit' 
      ? 'Eres un asistente especializado en generar mensajes de commit siguiendo las convenciones de Conventional Commits. Responde solo con el mensaje de commit, sin explicaciones adicionales.'
      : 'Eres un asistente especializado en comandos de Git. Proporciona el comando correcto y una breve explicación en español. Usa formato markdown para los códigos.';

    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: this.formatPrompt(prompt, type) }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error('Respuesta vacía de la API');
    }

    return {
      success: true,
      content
    };
  }

  private async callGeminiSingle(prompt: string, apiKey: string, maxTokens: number = 2048): Promise<AIResponse & {wasTruncated?: boolean}> {
    const response = await fetch(`${this.config.baseUrl}/models/${this.config.model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: maxTokens,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini Response:', data); // Para debug
    
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    const finishReason = data.candidates?.[0]?.finishReason;

    if (!content) {
      throw new Error('Respuesta vacía de Gemini');
    }

    return {
      success: true,
      content,
      wasTruncated: finishReason === 'MAX_TOKENS'
    };
  }

  private async continueGeminiResponse(partialContent: string, originalPrompt: string, apiKey: string, maxAttempts: number = 3): Promise<AIResponse> {
    let fullContent = partialContent;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      attempts++;
      
      // Crear prompt de continuación
      const continuePrompt = `Continuación de la respuesta anterior:

Contexto original: ${originalPrompt}

Respuesta parcial hasta ahora:
${fullContent}

Por favor, continúa exactamente desde donde se cortó la respuesta anterior. Si es necesario, incluye al final "---CONTINUAR---" si la respuesta sigue siendo muy larga.`;
      
      try {
        const response = await this.callGeminiSingle(continuePrompt, apiKey, 2048);
        
        // Concatenar la nueva parte
        const newContent = response.content;
        
        // Si la nueva parte empieza repitiendo el final, limpiarlo
        const cleanNewContent = this.cleanContinuationOverlap(fullContent, newContent);
        fullContent += '\n' + cleanNewContent;
        
        // Si no se cortó esta vez, hemos terminado
        if (!response.wasTruncated && !cleanNewContent.includes('---CONTINUAR---')) {
          break;
        }
        
        // Si incluye la marca de continuar, removerla para la próxima iteración
        if (cleanNewContent.includes('---CONTINUAR---')) {
          fullContent = fullContent.replace('---CONTINUAR---', '').trim();
        }
        
      } catch (error) {
        console.warn(`Error en intento de continuación ${attempts}:`, error);
        if (attempts === maxAttempts) {
          // Si fallaron todos los intentos, devolver lo que tenemos
          fullContent += '\n\n[Nota: La respuesta fue cortada debido a límites de tokens]';
        }
        break;
      }
    }
    
    return {
      success: true,
      content: fullContent
    };
  }

  private cleanContinuationOverlap(existingContent: string, newContent: string): string {
    // Obtener las últimas 100 caracteres del contenido existente
    const suffix = existingContent.slice(-100).trim();
    
    // Si el nuevo contenido empieza con parte del sufijo, remover la superposición
    if (suffix.length > 20) {
      const words = suffix.split(' ');
      for (let i = words.length - 1; i >= words.length - 5 && i >= 0; i--) {
        const overlap = words.slice(i).join(' ');
        if (newContent.toLowerCase().startsWith(overlap.toLowerCase())) {
          return newContent.slice(overlap.length).trim();
        }
      }
    }
    
    return newContent;
  }

  // Ollama (local)
  private async callOllama(prompt: string, type: string): Promise<AIResponse> {
    const response = await fetch(`${this.config.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        prompt: this.formatPrompt(prompt, type, 'ollama'),
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 150,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Error connecting to Ollama: HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data.response?.trim();

    if (!content) {
      throw new Error('Respuesta vacía de Ollama');
    }

    return {
      success: true,
      content
    };
  }

  // Anthropic Claude
  private async callAnthropic(prompt: string, type: string, apiKey: string): Promise<AIResponse> {
    const systemPrompt = type === 'commit' 
      ? 'Genera mensajes de commit siguiendo Conventional Commits. Responde solo con el mensaje.'
      : 'Eres experto en Git. Proporciona comandos y explicaciones en español con formato markdown.';

    const response = await fetch(`${this.config.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: 150,
        system: systemPrompt,
        messages: [
          { role: 'user', content: this.formatPrompt(prompt, type) }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text?.trim();

    if (!content) {
      throw new Error('Respuesta vacía de Claude');
    }

    return {
      success: true,
      content
    };
  }

  // Formatear prompt según el tipo y proveedor
  private formatPrompt(userPrompt: string, type: string, provider?: string): string {
    if (type === 'commit') {
      return `Genera un mensaje de commit convencional en español basado en: "${userPrompt}". 
              Usa el formato: tipo(ámbito): descripción
              Tipos válidos: feat, fix, docs, style, refactor, test, chore
              Responde SOLO con el mensaje de commit, sin explicaciones.`;
    } else {
      const prefix = provider === 'gemini' || provider === 'ollama' 
        ? 'Eres un experto en Git. '
        : '';
      
      const continuationInstruction = provider === 'gemini' 
        ? '\n\nIMPORTANTE: Si tu respuesta es muy larga y se corta por límite de tokens, incluye al final exactamente "---CONTINUAR---" para que pueda pedirte que continúes.'
        : '';
      
      return `${prefix}Basado en: "${userPrompt}", ¿qué comando(s) de Git debo usar? 
              Proporciona el comando en un bloque de código y una explicación detallada en español.
              Usa formato markdown: \`\`\`bash para comandos y **negrita** para resaltar.
              Incluye ejemplos prácticos si es necesario.${continuationInstruction}`;
    }
  }

  // Obtener API key del almacenamiento local
  private getApiKey(): string {
    const provider = this.config.provider;
    return localStorage.getItem(`ai-api-key-${provider}`) || '';
  }

  // Configurar API key
  public setApiKey(apiKey: string): void {
    localStorage.setItem(`ai-api-key-${this.config.provider}`, apiKey);
  }

  // Obtener configuración actual
  public getConfig(): AIConfig {
    return { ...this.config };
  }

  // Cambiar proveedor
  public setProvider(provider: AIConfig['provider'], apiKey?: string): void {
    this.config = {
      ...DEFAULT_CONFIG[provider],
      apiKey
    };
    
    if (apiKey) {
      this.setApiKey(apiKey);
    }
  }

  // Verificar si la configuración es válida
  public async testConnection(): Promise<AIResponse> {
    return this.generateText('test', 'commit');
  }
}

// Instancia singleton con Gemini por defecto
export const aiService = new AIService({ provider: 'gemini' });

// Hook para usar el servicio en React
export const useAI = () => {
  return {
    generateText: aiService.generateText.bind(aiService),
    setApiKey: aiService.setApiKey.bind(aiService),
    setProvider: aiService.setProvider.bind(aiService),
    getConfig: aiService.getConfig.bind(aiService),
    testConnection: aiService.testConnection.bind(aiService),
  };
};
