
import { callOpenAI, callAnthropic, callPerplexity, callGroq, callHuggingFaceWithFallback } from './aiProviders';
import { generatePersonalizedFallbackResponse } from './fallbackResponses';

// Generate AI response with enhanced error handling and fallbacks
export async function generateAIResponse(prompt: string, provider: string, apiKey: string, expertId: string): Promise<string> {
  console.log(`🤖 Generating response for expert ${expertId}:`, { 
    provider, 
    hasApiKey: !!apiKey && apiKey.trim() !== '', 
    apiKeyPrefix: apiKey ? apiKey.slice(0, 8) + '...' : 'none'
  });
  
  const maxRetries = 2;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} for expert ${expertId} using ${provider}`);
      
      let response: string;
      
      switch (provider) {
        case 'OpenAI':
          if (!apiKey || apiKey.trim() === '') {
            console.log(`🔑 OpenAI requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callOpenAI(prompt, apiKey);
          break;
          
        case 'Anthropic':
          if (!apiKey || apiKey.trim() === '') {
            console.log(`🔑 Anthropic requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callAnthropic(prompt, apiKey);
          break;
          
        case 'Perplexity':
          if (!apiKey || apiKey.trim() === '') {
            console.log(`🔑 Perplexity requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callPerplexity(prompt, apiKey);
          break;
          
        case 'Groq':
          if (!apiKey || apiKey.trim() === '') {
            console.log(`🔑 Groq requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          console.log(`🟡 Calling Groq for ${expertId} with API key: ${apiKey.slice(0, 8)}...`);
          response = await callGroq(prompt, apiKey);
          break;
          
        case 'HuggingFace':
        default:
          // HuggingFace can work with or without API key
          response = await callHuggingFaceWithFallback(prompt, expertId, apiKey);
          break;
      }

      if (response && response.trim().length > 0) {
        console.log(`✅ Successfully generated response for ${expertId} using ${provider} on attempt ${attempt}: ${response.slice(0, 50)}...`);
        return response.trim();
      } else {
        throw new Error('Empty response received from AI provider');
      }
    } catch (error) {
      lastError = error as Error;
      console.warn(`⚠️ AI Provider ${provider} attempt ${attempt} failed for expert ${expertId}:`, error);
      
      // For API key errors, don't retry
      if (error instanceof Error && (
        error.message.includes('API key') || 
        error.message.includes('unauthorized') || 
        error.message.includes('authentication')
      )) {
        console.error(`🔑 API authentication failed for ${expertId} with ${provider}, using fallback`);
        break;
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
