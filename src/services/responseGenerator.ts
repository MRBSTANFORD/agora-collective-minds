
import { callOpenAI, callAnthropic, callPerplexity, callGroq, callHuggingFaceWithFallback } from './aiProviders';
import { generatePersonalizedFallbackResponse } from './fallbackResponses';

// Generate AI response with enhanced error handling and fallbacks
export async function generateAIResponse(prompt: string, provider: string, apiKey: string, expertId: string): Promise<string> {
  console.log(`Generating response for expert ${expertId} using provider: ${provider}, has API key: ${apiKey ? 'yes' : 'no'}`);
  
  try {
    switch (provider) {
      case 'OpenAI':
        if (!apiKey) {
          console.log(`OpenAI requires API key, falling back for ${expertId}`);
          return generatePersonalizedFallbackResponse(expertId, prompt);
        }
        return await callOpenAI(prompt, apiKey);
      case 'Anthropic':
        if (!apiKey) {
          console.log(`Anthropic requires API key, falling back for ${expertId}`);
          return generatePersonalizedFallbackResponse(expertId, prompt);
        }
        return await callAnthropic(prompt, apiKey);
      case 'Perplexity':
        if (!apiKey) {
          console.log(`Perplexity requires API key, falling back for ${expertId}`);
          return generatePersonalizedFallbackResponse(expertId, prompt);
        }
        return await callPerplexity(prompt, apiKey);
      case 'Groq':
        if (!apiKey) {
          console.log(`Groq requires API key, falling back for ${expertId}`);
          return generatePersonalizedFallbackResponse(expertId, prompt);
        }
        return await callGroq(prompt, apiKey);
      case 'HuggingFace':
      default:
        return await callHuggingFaceWithFallback(prompt, expertId);
    }
  } catch (error) {
    console.error(`AI Provider ${provider} error for expert ${expertId}:`, error);
    return generatePersonalizedFallbackResponse(expertId, prompt);
  }
}
