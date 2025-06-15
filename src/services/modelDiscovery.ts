// Dynamic model discovery service that queries each platform's API for real-time model availability
export interface DiscoveredModel {
  id: string;
  name: string;
  provider: string;
  free: boolean;
  contextLength?: number;
  capabilities?: string[];
  available: boolean;
  note?: string;
}

export interface ModelDiscoveryResult {
  models: DiscoveredModel[];
  error?: string;
  lastUpdated: Date;
}

// Known free models for fallback and verification
const KNOWN_FREE_MODELS = {
  HuggingFace: [
    'microsoft/DialoGPT-large',
    'microsoft/DialoGPT-medium', 
    'google/flan-t5-large',
    'facebook/blenderbot-400M-distill',
    'distilbert-base-uncased',
    'gpt2'
  ],
  GoogleGemini: [
    'gemini-1.5-flash',
    'gemini-1.5-pro' // Has free tier
  ],
  Groq: [
    'mixtral-8x7b-32768',
    'llama-3-70b-8192',
    'llama-3-8b-8192',
    'gemma-7b-it'
  ]
};

// Cache for discovered models (30 minute TTL)
const MODEL_CACHE = new Map<string, { data: ModelDiscoveryResult; expires: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export async function discoverOpenAIModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering OpenAI models...');
  
  if (!apiKey) {
    return [{
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini (Requires API Key)',
      provider: 'OpenAI',
      free: false,
      available: false,
      note: 'API key required'
    }];
  }

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const chatModels = data.data.filter((model: any) => 
      model.id.includes('gpt-4') || model.id.includes('gpt-3.5')
    );

    return chatModels.map((model: any) => ({
      id: model.id,
      name: model.id.toUpperCase(),
      provider: 'OpenAI',
      free: false,
      available: true,
      contextLength: model.id.includes('32k') ? 32768 : 
                   model.id.includes('16k') ? 16384 : 4096
    }));
  } catch (error) {
    console.warn('⚠️ OpenAI model discovery failed:', error);
    // Return known working models as fallback
    return [
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        free: false,
        available: true,
        contextLength: 128000
      },
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o Mini',
        provider: 'OpenAI',
        free: false,
        available: true,
        contextLength: 128000
      }
    ];
  }
}

export async function discoverAnthropicModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Anthropic models...');
  
  // Anthropic doesn't have a public models endpoint, so we use known working models
  const knownModels = [
    {
      id: 'claude-3-5-sonnet-20241022',
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      free: false,
      available: !!apiKey,
      contextLength: 200000,
      note: apiKey ? undefined : 'API key required'
    },
    {
      id: 'claude-3-5-haiku-20241022',
      name: 'Claude 3.5 Haiku',
      provider: 'Anthropic',
      free: false,
      available: !!apiKey,
      contextLength: 200000,
      note: apiKey ? undefined : 'API key required'
    }
  ];

  if (apiKey) {
    // Test API key validity
    try {
      const testResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Hi' }]
        })
      });
      
      if (testResponse.ok || testResponse.status === 400) { // 400 might be quota limit but key is valid
        return knownModels.map(model => ({ ...model, available: true, note: undefined }));
      }
    } catch (error) {
      console.warn('⚠️ Anthropic API key test failed:', error);
    }
  }

  return knownModels;
}

export async function discoverGoogleGeminiModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Google Gemini models...');
  
  if (!apiKey) {
    return [{
      id: 'gemini-1.5-flash',
      name: 'Gemini 1.5 Flash (Free Tier Available)',
      provider: 'GoogleGemini',
      free: true,
      available: false,
      note: 'API key required for free tier'
    }];
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const chatModels = data.models?.filter((model: any) => 
      model.name.includes('gemini') && 
      model.supportedGenerationMethods?.includes('generateContent')
    ) || [];

    return chatModels.map((model: any) => {
      const modelId = model.name.split('/').pop();
      return {
        id: modelId,
        name: model.displayName || modelId,
        provider: 'GoogleGemini',
        free: modelId.includes('flash') || modelId.includes('pro'), // Gemini has free tier
        available: true,
        contextLength: 1000000 // Gemini has very large context
      };
    });
  } catch (error) {
    console.warn('⚠️ Gemini model discovery failed:', error);
    return [
      {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        provider: 'GoogleGemini',
        free: true,
        available: true,
        contextLength: 1000000
      },
      {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        provider: 'GoogleGemini',
        free: true,
        available: true,
        contextLength: 1000000
      }
    ];
  }
}

export async function discoverCohereModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Cohere models...');
  
  if (!apiKey) {
    return [{
      id: 'command-r',
      name: 'Command R (API Key Required)',
      provider: 'Cohere',
      free: false,
      available: false,
      note: 'API key required'
    }];
  }

  try {
    const response = await fetch('https://api.cohere.ai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Cohere API error: ${response.status}`);
    }

    const data = await response.json();
    const chatModels = data.models?.filter((model: any) => 
      model.name.includes('command')
    ) || [];

    return chatModels.map((model: any) => ({
      id: model.name,
      name: model.name.charAt(0).toUpperCase() + model.name.slice(1),
      provider: 'Cohere',
      free: false, // Cohere is generally paid
      available: true,
      contextLength: model.context_length || 4096
    }));
  } catch (error) {
    console.warn('⚠️ Cohere model discovery failed:', error);
    return [
      {
        id: 'command-r-plus',
        name: 'Command R+',
        provider: 'Cohere',
        free: false,
        available: true,
        contextLength: 128000
      },
      {
        id: 'command-r',
        name: 'Command R',
        provider: 'Cohere',
        free: false,
        available: true,
        contextLength: 128000
      }
    ];
  }
}

export async function discoverMistralModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Mistral models...');
  
  if (!apiKey) {
    return [{
      id: 'mistral-large-latest',
      name: 'Mistral Large (API Key Required)',
      provider: 'MistralAI',
      free: false,
      available: false,
      note: 'API key required'
    }];
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.data.map((model: any) => ({
      id: model.id,
      name: model.id.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
      provider: 'MistralAI',
      free: false,
      available: true,
      contextLength: model.max_context_length || 32768
    }));
  } catch (error) {
    console.warn('⚠️ Mistral model discovery failed:', error);
    return [
      {
        id: 'mistral-large-latest',
        name: 'Mistral Large',
        provider: 'MistralAI',
        free: false,
        available: true,
        contextLength: 32768
      },
      {
        id: 'mistral-medium-latest',
        name: 'Mistral Medium',
        provider: 'MistralAI',
        free: false,
        available: true,
        contextLength: 32768
      }
    ];
  }
}

export async function discoverGroqModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Groq models...');
  
  if (!apiKey) {
    return KNOWN_FREE_MODELS.Groq.map(modelId => ({
      id: modelId,
      name: modelId.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
      provider: 'Groq',
      free: true,
      available: false,
      note: 'API key required for free tier'
    }));
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.data.map((model: any) => ({
      id: model.id,
      name: model.id.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
      provider: 'Groq',
      free: true, // Groq offers free tier
      available: true,
      contextLength: parseInt(model.id.match(/\d+/)?.[0] || '8192')
    }));
  } catch (error) {
    console.warn('⚠️ Groq model discovery failed:', error);
    return KNOWN_FREE_MODELS.Groq.map(modelId => ({
      id: modelId,
      name: modelId.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
      provider: 'Groq',
      free: true,
      available: true,
      contextLength: 8192
    }));
  }
}

export async function discoverPerplexityModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Perplexity models...');
  
  const knownModels = [
    {
      id: 'llama-3.1-sonar-small-128k-online',
      name: 'Llama 3.1 Sonar Small (Online)',
      provider: 'Perplexity',
      free: false,
      available: !!apiKey,
      contextLength: 127072,
      capabilities: ['web_search'],
      note: apiKey ? undefined : 'API key required'
    },
    {
      id: 'llama-3.1-sonar-large-128k-online',
      name: 'Llama 3.1 Sonar Large (Online)',
      provider: 'Perplexity',
      free: false,
      available: !!apiKey,
      contextLength: 127072,
      capabilities: ['web_search'],
      note: apiKey ? undefined : 'API key required'
    }
  ];

  return knownModels;
}

export async function discoverHuggingFaceModels(): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering HuggingFace models...');
  
  // Use known working free models from HuggingFace
  return KNOWN_FREE_MODELS.HuggingFace.map(modelId => ({
    id: modelId,
    name: modelId.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || modelId,
    provider: 'HuggingFace',
    free: true,
    available: true,
    contextLength: 1024,
    note: 'Free public model'
  }));
}

// Main discovery function
export async function discoverAllModels(apiKeys: Record<string, string> = {}): Promise<Record<string, DiscoveredModel[]>> {
  console.log('🔍 Starting comprehensive model discovery...');
  
  const results: Record<string, DiscoveredModel[]> = {};
  
  // Run all discoveries in parallel
  const discoveries = await Promise.allSettled([
    discoverOpenAIModels(apiKeys.OpenAI),
    discoverAnthropicModels(apiKeys.Anthropic),
    discoverGoogleGeminiModels(apiKeys.GoogleGemini),
    discoverCohereModels(apiKeys.Cohere),
    discoverMistralModels(apiKeys.MistralAI),
    discoverGroqModels(apiKeys.Groq),
    discoverPerplexityModels(apiKeys.Perplexity),
    discoverHuggingFaceModels()
  ]);

  const providers = ['OpenAI', 'Anthropic', 'GoogleGemini', 'Cohere', 'MistralAI', 'Groq', 'Perplexity', 'HuggingFace'];
  
  discoveries.forEach((result, index) => {
    const provider = providers[index];
    if (result.status === 'fulfilled') {
      results[provider] = result.value;
    } else {
      console.error(`❌ ${provider} discovery failed:`, result.reason);
      results[provider] = [];
    }
  });

  console.log('✅ Model discovery completed:', Object.keys(results).map(p => `${p}: ${results[p].length} models`));
  return results;
}

// Cached version of discovery
export async function discoverAllModelsWithCache(apiKeys: Record<string, string> = {}): Promise<Record<string, DiscoveredModel[]>> {
  const cacheKey = JSON.stringify(Object.keys(apiKeys).sort());
  const cached = MODEL_CACHE.get(cacheKey);
  
  if (cached && cached.expires > Date.now()) {
    console.log('📦 Using cached model discovery results');
    return cached.data.models.reduce((acc, model) => {
      if (!acc[model.provider]) acc[model.provider] = [];
      acc[model.provider].push(model);
      return acc;
    }, {} as Record<string, DiscoveredModel[]>);
  }

  const models = await discoverAllModels(apiKeys);
  
  // Cache the results
  const flatModels = Object.entries(models).flatMap(([provider, modelList]) => modelList);
  MODEL_CACHE.set(cacheKey, {
    data: { models: flatModels, lastUpdated: new Date() },
    expires: Date.now() + CACHE_TTL
  });
  
  return models;
}
