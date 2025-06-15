
// Dynamic provider discovery service that first checks availability, then queries models
export interface ProviderStatus {
  name: string;
  available: boolean;
  requiresApiKey: boolean;
  freeModelsAvailable: boolean;
  error?: string;
  responseTime?: number;
  lastChecked: Date;
}

export interface ProviderDiscoveryResult {
  providers: Record<string, ProviderStatus>;
  totalAvailable: number;
  freeProviders: number;
}

// Standardized provider names (fixing inconsistencies)
export const STANDARD_PROVIDERS = [
  'OpenAI',
  'Anthropic', 
  'GoogleGemini',
  'Cohere',
  'MistralAI',
  'Groq',
  'Perplexity',
  'HuggingFace'
] as const;

export type StandardProvider = typeof STANDARD_PROVIDERS[number];

// Simple connectivity test for each provider (without full API calls)
async function testProviderConnectivity(provider: StandardProvider, apiKey?: string): Promise<{ available: boolean; error?: string; responseTime: number }> {
  const startTime = Date.now();
  
  try {
    let response: Response;
    
    switch (provider) {
      case 'OpenAI':
        // Test with models endpoint
        response = await fetch('https://api.openai.com/v1/models', {
          method: 'GET',
          headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {},
        });
        break;
        
      case 'Anthropic':
        // Test with minimal request
        response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { 'x-api-key': apiKey } : {}),
          },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 1,
            messages: [{ role: 'user', content: 'test' }]
          })
        });
        break;
        
      case 'GoogleGemini':
        if (apiKey) {
          response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        } else {
          return { available: false, error: 'API key required', responseTime: Date.now() - startTime };
        }
        break;
        
      case 'Groq':
        response = await fetch('https://api.groq.com/openai/v1/models', {
          headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {},
        });
        break;
        
      case 'HuggingFace':
        // HuggingFace works without API key
        response = await fetch('https://huggingface.co/api/models?task=text-generation&limit=1');
        break;
        
      case 'Perplexity':
        if (!apiKey) {
          return { available: false, error: 'API key required', responseTime: Date.now() - startTime };
        }
        response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [{ role: 'user', content: 'test' }],
            max_tokens: 1
          })
        });
        break;
        
      case 'Cohere':
        response = await fetch('https://api.cohere.ai/v1/models', {
          headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {},
        });
        break;
        
      case 'MistralAI':
        response = await fetch('https://api.mistral.ai/v1/models', {
          headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {},
        });
        break;
        
      default:
        return { available: false, error: 'Unknown provider', responseTime: Date.now() - startTime };
    }
    
    const responseTime = Date.now() - startTime;
    
    // Consider 401/403 as "available but needs auth", not completely unavailable
    if (response.status === 401 || response.status === 403) {
      return { available: true, error: 'Authentication required', responseTime };
    }
    
    return { 
      available: response.ok || response.status < 500, 
      error: response.ok ? undefined : `HTTP ${response.status}`,
      responseTime 
    };
    
  } catch (error) {
    return { 
      available: false, 
      error: error instanceof Error ? error.message : 'Network error',
      responseTime: Date.now() - startTime 
    };
  }
}

// Discover available providers first, then only query working ones for models
export async function discoverAvailableProviders(apiKeys: Record<string, string> = {}): Promise<ProviderDiscoveryResult> {
  console.log('🔍 Starting dynamic provider discovery...');
  
  const results: Record<string, ProviderStatus> = {};
  
  // Test each provider in parallel
  const providerTests = STANDARD_PROVIDERS.map(async (provider) => {
    const apiKey = apiKeys[provider];
    const { available, error, responseTime } = await testProviderConnectivity(provider, apiKey);
    
    // Determine if provider offers free models
    const freeModelsAvailable = provider === 'HuggingFace' || (provider === 'Groq' && apiKey);
    
    results[provider] = {
      name: provider,
      available,
      requiresApiKey: !['HuggingFace'].includes(provider),
      freeModelsAvailable,
      error,
      responseTime,
      lastChecked: new Date()
    };
    
    console.log(`${available ? '✅' : '❌'} ${provider}: ${available ? 'Available' : error}`);
  });
  
  await Promise.allSettled(providerTests);
  
  const totalAvailable = Object.values(results).filter(p => p.available).length;
  const freeProviders = Object.values(results).filter(p => p.available && p.freeModelsAvailable).length;
  
  console.log(`🎯 Provider discovery completed: ${totalAvailable}/${STANDARD_PROVIDERS.length} available (${freeProviders} with free models)`);
  
  return {
    providers: results,
    totalAvailable,
    freeProviders
  };
}
