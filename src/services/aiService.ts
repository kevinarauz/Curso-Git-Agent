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
    model: 'gemini-pro',
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
    // Usar OpenAI por defecto, o el proveedor especificado
    const provider = config?.provider || 'openai';
    this.config = {
      ...DEFAULT_CONFIG[provider],
      ...config
    };
  }

  // Método principal para generar texto
  async generateText(prompt: string, type: 'commit' | 'command' = 'commit'): Promise<AIResponse> {
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

      switch (this.config.provider) {
        case 'openai':
          return await this.callOpenAI(prompt, type, apiKey);
        case 'gemini':
          return await this.callGemini(prompt, type, apiKey);
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

  // Google Gemini
  private async callGemini(prompt: string, type: string, apiKey: string): Promise<AIResponse> {
    const fullPrompt = this.formatPrompt(prompt, type, 'gemini');
    
    const response = await fetch(`${this.config.baseUrl}/models/${this.config.model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!content) {
      throw new Error('Respuesta vacía de Gemini');
    }

    return {
      success: true,
      content
    };
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
      
      return `${prefix}Basado en: "${userPrompt}", ¿qué comando(s) de Git debo usar? 
              Proporciona el comando en un bloque de código y una explicación breve en español.
              Usa formato markdown: \`\`\`bash para comandos y **negrita** para resaltar.`;
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

// Instancia singleton
export const aiService = new AIService();

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
