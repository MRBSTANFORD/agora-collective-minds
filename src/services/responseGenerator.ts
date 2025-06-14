
import { callOpenAI, callAnthropic, callPerplexity, callGroq, callHuggingFaceWithFallback } from './aiProviders';
import { generatePersonalizedFallbackResponse } from './fallbackResponses';

// Generate AI response with enhanced error handling and fallbacks
export async function generateAIResponse(prompt: string, provider: string, apiKey: string, expertId: string): Promise<string> {
  console.log(`🤖 Generating response for expert ${expertId} using provider: ${provider}, has API key: ${apiKey ? 'yes' : 'no'}`);
  
  const maxRetries = 2;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} for expert ${expertId}`);
      
      let response: string;
      
      switch (provider) {
        case 'OpenAI':
          if (!apiKey) {
            console.log(`🔑 OpenAI requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callOpenAI(prompt, apiKey);
          break;
        case 'Anthropic':
          if (!apiKey) {
            console.log(`🔑 Anthropic requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callAnthropic(prompt, apiKey);
          break;
        case 'Perplexity':
          if (!apiKey) {
            console.log(`🔑 Perplexity requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callPerplexity(prompt, apiKey);
          break;
        case 'Groq':
          if (!apiKey) {
            console.log(`🔑 Groq requires API key, falling back for ${expertId}`);
            return generatePersonalizedFallbackResponse(expertId, prompt);
          }
          response = await callGroq(prompt, apiKey);
          break;
        case 'HuggingFace':
        default:
          response = await callHuggingFaceWithFallback(prompt, expertId);
          break;
      }

      if (response && response.trim().length > 0) {
        console.log(`✅ Successfully generated response for ${expertId} on attempt ${attempt}: ${response.slice(0, 50)}...`);
        return response.trim();
      } else {
        throw new Error('Empty response received from AI provider');
      }
    } catch (error) {
      lastError = error as Error;
      console.warn(`⚠️ AI Provider ${provider} attempt ${attempt} failed for expert ${expertId}:`, error);
      
      if (attempt < maxRetries) {
        console.log(`🔄 Retrying in 1 second...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  console.error(`💥 All attempts failed for expert ${expertId}, using fallback response. Last error:`, lastError);
  return generatePersonalizedFallbackResponse(expertId, prompt);
}
