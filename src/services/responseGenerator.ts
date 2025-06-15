
import { callOpenAI, callAnthropic, callPerplexity, callGroq, callHuggingFaceWithFallback, callGoogleGemini, callCohere, callMistralAI } from './aiProviders';
import { generatePersonalizedFallbackResponse } from './fallbackResponses';
import { getApiKeyStatus, validateKeyFormat, createSecureApiKeyLog } from '../utils/secureLogging';

// Clean API keys to fix malformed prefixes
const cleanApiKey = (apiKey: string): string => {
  if (!apiKey) return '';
  const cleaned = apiKey.trim();
  
  // Fix duplicate prefixes like "hf hf_"
  if (cleaned.startsWith('hf hf_')) {
    console.log(`🔧 Cleaning malformed API key format`);
    return cleaned.replace('hf ', '');
  }
  
  return cleaned;
};

// Validate API key format for different providers
const validateApiKey = (apiKey: string, provider: string): boolean => {
  if (!apiKey || apiKey.trim() === '') {
    return provider === 'HuggingFace';
  }
  
  const cleanKey = cleanApiKey(apiKey);
  return validateKeyFormat(cleanKey, provider) === 'VALID';
};

// Generate AI response with enhanced error handling and fallbacks
export async function generateAIResponse(prompt: string, provider: string, apiKey: string, expertId: string, model?: string): Promise<string> {
  console.log(`🤖 Generating response for expert ${expertId}:`, { 
    provider, 
    model,
    keyInfo: createSecureApiKeyLog(provider, apiKey)
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
      console.log(`🔄 Attempt ${attempt}/${maxRetries} for expert ${expertId} using ${provider}${model ? ` with model ${model}` : ''}`);
      
      let response: string;
      
      switch (provider) {
        case 'OpenAI':
          if (getApiKeyStatus(cleanedApiKey) === 'MISSING') {
            console.log(`🔑 OpenAI requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callOpenAI(prompt, cleanedApiKey);
          break;
          
        case 'Anthropic':
          if (getApiKeyStatus(cleanedApiKey) === 'MISSING') {
            console.log(`🔑 Anthropic requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callAnthropic(prompt, cleanedApiKey);
          break;

        case 'GoogleGemini':
          if (getApiKeyStatus(cleanedApiKey) === 'MISSING') {
            console.log(`🔑 Google Gemini requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callGoogleGemini(prompt, cleanedApiKey);
          break;

        case 'Cohere':
          if (getApiKeyStatus(cleanedApiKey) === 'MISSING') {
            console.log(`🔑 Cohere requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callCohere(prompt, cleanedApiKey);
          break;

        case 'MistralAI':
          if (getApiKeyStatus(cleanedApiKey) === 'MISSING') {
            console.log(`🔑 Mistral AI requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callMistralAI(prompt, cleanedApiKey);
          break;
          
        case 'Perplexity':
          if (getApiKeyStatus(cleanedApiKey) === 'MISSING') {
            console.log(`🔑 Perplexity requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callPerplexity(prompt, cleanedApiKey);
          break;
          
        case 'Groq':
          if (getApiKeyStatus(cleanedApiKey) === 'MISSING') {
            console.log(`🔑 Groq requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          console.log(`🟡 Calling Groq for ${expertId} with ${createSecureApiKeyLog('Groq', cleanedApiKey)}`);
          response = await callGroq(prompt, cleanedApiKey);
          break;
          
        case 'HuggingFace':
        default:
          response = await callHuggingFaceWithFallback(prompt, expertId, cleanedApiKey);
          break;
      }

      // Ensure response is meaningful (at least 50 characters)
      if (response && response.trim().length > 50) {
        console.log(`✅ Successfully generated response for ${expertId} using ${provider} on attempt ${attempt}: ${response.slice(0, 60)}...`);
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
