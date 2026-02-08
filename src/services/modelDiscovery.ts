
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

// Cache for discovered models (30 minute TTL)
const MODEL_CACHE = new Map<string, { data: ModelDiscoveryResult; expires: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export async function discoverOpenAIModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering OpenAI models...');
  
  if (!apiKey) {
    console.log('⚠️ No OpenAI API key provided');
    return [];
  }

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`❌ OpenAI API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const chatModels = data.data.filter((model: any) => 
      model.id.includes('gpt-4') || model.id.includes('gpt-3.5')
    );

    return chatModels.map((model: any) => ({
      id: model.id,
      name: model.id.toUpperCase(),
      provider: 'OpenAI',
      free: false, // OpenAI is paid
      available: true,
      contextLength: model.id.includes('32k') ? 32768 : 
                   model.id.includes('16k') ? 16384 : 4096
    }));
  } catch (error) {
    console.error('❌ OpenAI model discovery failed:', error);
    return [];
  }
}

export async function discoverAnthropicModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Anthropic models...');
  
  if (!apiKey) {
    console.log('⚠️ No Anthropic API key provided');
    return [];
  }

  // Anthropic doesn't have a public models endpoint, but we can test the API
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
    
    if (testResponse.ok || testResponse.status === 400) {
      // API key is valid, return current working models
      return [
        {
          id: 'claude-3-5-sonnet-20241022',
          name: 'Claude 3.5 Sonnet',
          provider: 'Anthropic',
          free: false,
          available: true,
          contextLength: 200000
        },
        {
          id: 'claude-3-5-haiku-20241022',
          name: 'Claude 3.5 Haiku',
          provider: 'Anthropic',
          free: false,
          available: true,
          contextLength: 200000
        }
      ];
    }
  } catch (error) {
    console.error('❌ Anthropic API test failed:', error);
  }

  return [];
}

export async function discoverGoogleGeminiModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Google Gemini models...');
  
  if (!apiKey) {
    console.log('⚠️ No Google Gemini API key provided');
    return [];
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      console.error(`❌ Gemini API error: ${response.status}`);
      return [];
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
        free: modelId.includes('flash'), // Flash has free tier
        available: true,
        contextLength: 1000000
      };
    });
  } catch (error) {
    console.error('❌ Gemini model discovery failed:', error);
    return [];
  }
}

export async function discoverCohereModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Cohere models...');
  
  if (!apiKey) {
    console.log('⚠️ No Cohere API key provided');
    return [];
  }

  try {
    const response = await fetch('https://api.cohere.ai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`❌ Cohere API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const chatModels = data.models?.filter((model: any) => 
      model.name.includes('command')
    ) || [];

    return chatModels.map((model: any) => ({
      id: model.name,
      name: model.name.charAt(0).toUpperCase() + model.name.slice(1),
      provider: 'Cohere',
      free: false,
      available: true,
      contextLength: model.context_length || 4096
    }));
  } catch (error) {
    console.error('❌ Cohere model discovery failed:', error);
    return [];
  }
}

export async function discoverMistralModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Mistral models...');
  
  if (!apiKey) {
    console.log('⚠️ No Mistral API key provided');
    return [];
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`❌ Mistral API error: ${response.status}`);
      return [];
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
    console.error('❌ Mistral model discovery failed:', error);
    return [];
  }
}

export async function discoverGroqModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Groq models...');
  
  if (!apiKey) {
    console.log('⚠️ No Groq API key provided');
    return [];
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`❌ Groq API error: ${response.status}`);
      return [];
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
    console.error('❌ Groq model discovery failed:', error);
    return [];
  }
}

export async function discoverPerplexityModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering Perplexity models...');
  
  if (!apiKey) {
    console.log('⚠️ No Perplexity API key provided');
    return [];
  }

  // Perplexity doesn't have a public models endpoint, but we can test the API
  try {
    const testResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 10
      })
    });
    
    if (testResponse.ok || testResponse.status === 400) {
      // API key is valid, return current working models
      return [
        {
          id: 'llama-3.1-sonar-small-128k-online',
          name: 'Llama 3.1 Sonar Small (Online)',
          provider: 'Perplexity',
          free: false,
          available: true,
          contextLength: 127072,
          capabilities: ['web_search']
        },
        {
          id: 'llama-3.1-sonar-large-128k-online',
          name: 'Llama 3.1 Sonar Large (Online)',
          provider: 'Perplexity',
          free: false,
          available: true,
          contextLength: 127072,
          capabilities: ['web_search']
        }
      ];
    }
  } catch (error) {
    console.error('❌ Perplexity API test failed:', error);
  }

  return [];
}

export async function discoverLLM7Models(): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering LLM7 models...');
  
  // LLM7 has predefined routing options - always available without API key
  return [
    {
      id: 'default',
      name: 'Default (Balanced)',
      provider: 'LLM7',
      free: true,
      available: true,
      contextLength: 4096,
      note: 'First available model with balanced quality and speed'
    },
    {
      id: 'fast',
      name: 'Fast (Low Latency)',
      provider: 'LLM7',
      free: true,
      available: true,
      contextLength: 4096,
      note: 'Routes to fastest available option'
    },
    {
      id: 'pro',
      name: 'Pro (Highest Quality)',
      provider: 'LLM7',
      free: false,
      available: true,
      contextLength: 8192,
      note: 'Targets most capable models (may require paid token)'
    }
  ];
}

export async function discoverHuggingFaceModels(apiKey?: string): Promise<DiscoveredModel[]> {
  console.log('🔍 Discovering HuggingFace models...');
  
  // HuggingFace Hub API to get inference-enabled models
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (apiKey && apiKey.trim() !== '') {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  
  try {
    // Query for text-generation models that are currently available
    const response = await fetch('https://huggingface.co/api/models?task=text-generation&sort=downloads&limit=20', {
      headers
    });

    if (!response.ok) {
      console.error(`❌ HuggingFace API error: ${response.status}`);
      return [];
    }

    const models = await response.json();
    
    // Filter for models that are likely to work for chat/text generation
    const chatModels = models.filter((model: any) => 
      model.pipeline_tag === 'text-generation' && 
      !model.disabled &&
      (model.id.includes('chat') || 
       model.id.includes('instruct') || 
       model.id.includes('dialog') ||
       model.id.includes('gpt') ||
       model.id.includes('llama'))
    ).slice(0, 10); // Limit to top 10

    return chatModels.map((model: any) => ({
      id: model.id,
      name: model.id.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || model.id,
      provider: 'HuggingFace',
      free: true, // HuggingFace inference is free
      available: true,
      contextLength: 1024,
      note: 'Free public model'
    }));
  } catch (error) {
    console.error('❌ HuggingFace model discovery failed:', error);
    return [];
  }
}

// Main discovery function
export async function discoverAllModels(apiKeys: Record<string, string> = {}): Promise<Record<string, DiscoveredModel[]>> {
  console.log('🔍 Starting comprehensive model discovery...');
  
  const results: Record<string, DiscoveredModel[]> = {};
  
  // Run all discoveries in parallel (LLM7 first as default)
  const discoveries = await Promise.allSettled([
    discoverLLM7Models(),
    discoverOpenAIModels(apiKeys.OpenAI),
    discoverAnthropicModels(apiKeys.Anthropic),
    discoverGoogleGeminiModels(apiKeys.GoogleGemini),
    discoverCohereModels(apiKeys.Cohere),
    discoverMistralModels(apiKeys.MistralAI),
    discoverGroqModels(apiKeys.Groq),
    discoverPerplexityModels(apiKeys.Perplexity),
    discoverHuggingFaceModels(apiKeys.HuggingFace)
  ]);

  const providers = ['LLM7', 'OpenAI', 'Anthropic', 'GoogleGemini', 'Cohere', 'MistralAI', 'Groq', 'Perplexity', 'HuggingFace'];
  
  discoveries.forEach((result, index) => {
    const provider = providers[index];
    if (result.status === 'fulfilled') {
      results[provider] = result.value;
      console.log(`✅ ${provider}: Found ${result.value.length} models`);
    } else {
      console.error(`❌ ${provider} discovery failed:`, result.reason);
      results[provider] = []; // Empty array, no fallbacks
    }
  });

  const totalModels = Object.values(results).flat().length;
  const freeModels = Object.values(results).flat().filter(m => m.free).length;
  console.log(`✅ Model discovery completed: ${totalModels} total models (${freeModels} free)`);
  
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
