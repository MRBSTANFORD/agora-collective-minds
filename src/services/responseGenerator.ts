
import { callOpenAI, callAnthropic, callPerplexity, callGroq, callHuggingFaceWithFallback, callGoogleGemini, callCohere, callMistralAI } from './aiProviders';
import { generatePersonalizedFallbackResponse } from './fallbackResponses';

// Clean API keys to fix malformed prefixes
const cleanApiKey = (apiKey: string): string => {
  if (!apiKey) return '';
  const cleaned = apiKey.trim();
  
  // Fix duplicate prefixes like "hf hf_"
  if (cleaned.startsWith('hf hf_')) {
    console.log(`🔧 Cleaning malformed API key: ${cleaned.slice(0, 10)}... -> ${cleaned.replace('hf ', '').slice(0, 10)}...`);
    return cleaned.replace('hf ', '');
  }
  
  // Remove any leading/trailing whitespace
  return cleaned;
};

// Validate API key format for different providers
const validateApiKey = (apiKey: string, provider: string): boolean => {
  if (!apiKey || apiKey.trim() === '') {
    return provider === 'HuggingFace'; // HuggingFace can work without API key
  }
  
  const cleanKey = cleanApiKey(apiKey);
  
  switch (provider) {
    case 'OpenAI':
      return cleanKey.startsWith('sk-');
    case 'Anthropic':
      return cleanKey.startsWith('sk-ant-');
    case 'GoogleGemini':
      return cleanKey.length > 10; // Google API keys are typically long strings
    case 'Cohere':
      return cleanKey.length > 10; // Cohere API keys are typically long strings
    case 'MistralAI':
      return cleanKey.length > 10; // Mistral API keys are typically long strings
    case 'HuggingFace':
      return cleanKey.startsWith('hf_') || cleanKey === '';
    case 'Groq':
      return cleanKey.startsWith('gsk_');
    case 'Perplexity':
      return cleanKey.startsWith('pplx-');
    default:
      return true; // Allow unknown providers
  }
};

// Check if response is likely a fallback
const isFallbackResponse = (response: string): boolean => {
  const fallbackIndicators = [
    "This challenge reminds me",
    "We must approach this systematically",
    "But first, we must ask ourselves",
    "Let us apply mathematical reasoning",
    "This challenge invites us to think",
    "The path to solving this challenge",
    "This challenge has the characteristics",
    "We must examine the practical realities"
  ];
  
  return fallbackIndicators.some(indicator => response.includes(indicator));
};

// Generate AI response with enhanced error handling and fallbacks
export async function generateAIResponse(prompt: string, provider: string, apiKey: string, expertId: string): Promise<string> {
  console.log(`🤖 Generating response for expert ${expertId}:`, { 
    provider, 
    hasApiKey: !!apiKey && apiKey.trim() !== '', 
    apiKeyPrefix: apiKey ? apiKey.slice(0, 8) + '...' : 'none'
  });
  
  // Clean the API key first
  const cleanedApiKey = cleanApiKey(apiKey);
  
  // Validate API key format
  if (!validateApiKey(cleanedApiKey, provider)) {
    console.warn(`🔑 Invalid API key format for ${provider}, using fallback for ${expertId}`);
    return generatePersonalizedFallbackResponse(expertId, prompt);
  }
  
  const maxRetries = 2;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} for expert ${expertId} using ${provider}`);
      
      let response: string;
      
      switch (provider) {
        case 'OpenAI':
          if (!cleanedApiKey || cleanedApiKey.trim() === '') {
            console.log(`🔑 OpenAI requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callOpenAI(prompt, cleanedApiKey);
          break;
          
        case 'Anthropic':
          if (!cleanedApiKey || cleanedApiKey.trim() === '') {
            console.log(`🔑 Anthropic requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callAnthropic(prompt, cleanedApiKey);
          break;

        case 'GoogleGemini':
          if (!cleanedApiKey || cleanedApiKey.trim() === '') {
            console.log(`🔑 Google Gemini requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callGoogleGemini(prompt, cleanedApiKey);
          break;

        case 'Cohere':
          if (!cleanedApiKey || cleanedApiKey.trim() === '') {
            console.log(`🔑 Cohere requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callCohere(prompt, cleanedApiKey);
          break;

        case 'MistralAI':
          if (!cleanedApiKey || cleanedApiKey.trim() === '') {
            console.log(`🔑 Mistral AI requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callMistralAI(prompt, cleanedApiKey);
          break;
          
        case 'Perplexity':
          if (!cleanedApiKey || cleanedApiKey.trim() === '') {
            console.log(`🔑 Perplexity requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callPerplexity(prompt, cleanedApiKey);
          break;
          
        case 'Groq':
          if (!cleanedApiKey || cleanedApiKey.trim() === '') {
            console.log(`🔑 Groq requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          console.log(`🟡 Calling Groq for ${expertId} with cleaned API key: ${cleanedApiKey.slice(0, 8)}...`);
          response = await callGroq(prompt, cleanedApiKey);
          break;
          
        case 'HuggingFace':
        default:
          // HuggingFace can work with or without API key
          response = await callHuggingFaceWithFallback(prompt, expertId, cleanedApiKey);
          break;
      }

      // Ensure response is meaningful (at least 50 characters)
      if (response && response.trim().length > 50) {
        console.log(`✅ Successfully generated response for ${expertId} using ${provider} on attempt ${attempt}: ${response.slice(0, 60)}...`);
        
        // Log if this was a fallback response even though API call succeeded
        if (isFallbackResponse(response)) {
          console.warn(`⚠️ Detected fallback-like response from ${provider} for ${expertId}`);
        }
        
        return response.trim();
      } else {
        throw new Error(`AI response too short: ${response?.length || 0} characters`);
      }
    } catch (error) {
      lastError = error as Error;
      console.warn(`⚠️ AI Provider ${provider} attempt ${attempt} failed for expert ${expertId}:`, error);
      
      // Check for specific API errors that indicate we should stop retrying
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('api key') || 
            errorMessage.includes('unauthorized') || 
            errorMessage.includes('authentication') ||
            errorMessage.includes('invalid_api_key') ||
            errorMessage.includes('credits') ||
            errorMessage.includes('quota') ||
            errorMessage.includes('billing')) {
          console.error(`🔑 API authentication/billing failed for ${expertId} with ${provider}, using fallback`);
          break;
        }
      }
      
      if (attempt < maxRetries) {
        console.log(`🔄 Retrying in 1 second...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  console.error(`💥 All attempts failed for expert ${expertId} with ${provider}, using fallback response. Last error:`, lastError);
  return generatePersonalizedFallbackResponse(expertId, prompt);
}
