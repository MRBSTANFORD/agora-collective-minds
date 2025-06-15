
import { discoverAvailableProviders, ProviderStatus } from './providerDiscovery';
import { discoverOpenAIModels, discoverAnthropicModels, discoverGoogleGeminiModels, discoverCohereModels, discoverMistralModels, discoverGroqModels, discoverPerplexityModels, discoverHuggingFaceModels, DiscoveredModel } from './modelDiscovery';

export interface EnhancedDiscoveryResult {
  providers: Record<string, ProviderStatus>;
  models: Record<string, DiscoveredModel[]>;
  summary: {
    totalProviders: number;
    availableProviders: number;
    totalModels: number;
    freeModels: number;
  };
}

// Enhanced discovery that first checks provider availability, then queries models
export async function discoverProvidersAndModels(apiKeys: Record<string, string> = {}): Promise<EnhancedDiscoveryResult> {
  console.log('🚀 Starting enhanced provider and model discovery...');
  
  // Phase 1: Discover which providers are available
  const providerResults = await discoverAvailableProviders(apiKeys);
  const availableProviders = Object.entries(providerResults.providers)
    .filter(([_, status]) => status.available)
    .map(([name, _]) => name);
  
  console.log(`📡 Available providers: ${availableProviders.join(', ')}`);
  
  // Phase 2: Only query models from available providers
  const modelResults: Record<string, DiscoveredModel[]> = {};
  
  const modelDiscoveries = availableProviders.map(async (provider) => {
    const apiKey = apiKeys[provider];
    
    try {
      let models: DiscoveredModel[] = [];
      
      switch (provider) {
        case 'OpenAI':
          if (apiKey) models = await discoverOpenAIModels(apiKey);
          break;
        case 'Anthropic':
          if (apiKey) models = await discoverAnthropicModels(apiKey);
          break;
        case 'GoogleGemini':
          if (apiKey) models = await discoverGoogleGeminiModels(apiKey);
          break;
        case 'Cohere':
          if (apiKey) models = await discoverCohereModels(apiKey);
          break;
        case 'MistralAI':
          if (apiKey) models = await discoverMistralModels(apiKey);
          break;
        case 'Groq':
          if (apiKey) models = await discoverGroqModels(apiKey);
          break;
        case 'Perplexity':
          if (apiKey) models = await discoverPerplexityModels(apiKey);
          break;
        case 'HuggingFace':
          models = await discoverHuggingFaceModels(apiKey); // Works with or without key
          break;
      }
      
      modelResults[provider] = models;
      console.log(`📋 ${provider}: Found ${models.length} models`);
      
    } catch (error) {
      console.error(`❌ Model discovery failed for ${provider}:`, error);
      modelResults[provider] = [];
    }
  });
  
  await Promise.allSettled(modelDiscoveries);
  
  // Calculate summary
  const totalModels = Object.values(modelResults).flat().length;
  const freeModels = Object.values(modelResults).flat().filter(m => m.free).length;
  
  console.log(`✅ Enhanced discovery completed: ${providerResults.totalAvailable} providers, ${totalModels} models (${freeModels} free)`);
  
  return {
    providers: providerResults.providers,
    models: modelResults,
    summary: {
      totalProviders: Object.keys(providerResults.providers).length,
      availableProviders: providerResults.totalAvailable,
      totalModels,
      freeModels
    }
  };
}
