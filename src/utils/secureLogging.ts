
/**
 * Secure logging utilities that provide debugging information without exposing sensitive data
 */

export type ApiKeyStatus = 'PROVIDED' | 'MISSING';
export type KeyFormatStatus = 'VALID' | 'INVALID' | 'UNKNOWN';

/**
 * Get API key status without exposing the actual key
 */
export function getApiKeyStatus(apiKey?: string): ApiKeyStatus {
  return apiKey && apiKey.trim() !== '' ? 'PROVIDED' : 'MISSING';
}

/**
 * Validate API key format for different providers without exposing the key
 */
export function validateKeyFormat(apiKey: string, provider: string): KeyFormatStatus {
  if (!apiKey || apiKey.trim() === '') {
    return provider === 'HuggingFace' ? 'VALID' : 'INVALID';
  }
  
  const cleanKey = apiKey.trim();
  
  switch (provider) {
    case 'OpenAI':
      return cleanKey.startsWith('sk-') ? 'VALID' : 'INVALID';
    case 'Anthropic':
      return cleanKey.startsWith('sk-ant-') ? 'VALID' : 'INVALID';
    case 'GoogleGemini':
      return cleanKey.length > 10 ? 'VALID' : 'INVALID';
    case 'Cohere':
      return cleanKey.length > 10 ? 'VALID' : 'INVALID';
    case 'MistralAI':
      return cleanKey.length > 10 ? 'VALID' : 'INVALID';
    case 'HuggingFace':
      return cleanKey.startsWith('hf_') || cleanKey === '' ? 'VALID' : 'INVALID';
    case 'Groq':
      return cleanKey.startsWith('gsk_') ? 'VALID' : 'INVALID';
    case 'Perplexity':
      return cleanKey.startsWith('pplx-') ? 'VALID' : 'INVALID';
    default:
      return 'UNKNOWN';
  }
}

/**
 * Get secure provider key information for debugging
 */
export function getProviderKeyInfo(provider: string, apiKey?: string): {
  provider: string;
  status: ApiKeyStatus;
  format: KeyFormatStatus;
} {
  const status = getApiKeyStatus(apiKey);
  const format = status === 'PROVIDED' ? validateKeyFormat(apiKey!, provider) : 'INVALID';
  
  return {
    provider,
    status,
    format
  };
}

/**
 * Create a secure logging message for API key debugging
 */
export function createSecureApiKeyLog(provider: string, apiKey?: string): string {
  const info = getProviderKeyInfo(provider, apiKey);
  return `Provider: ${info.provider}, Key Status: ${info.status}, Format: ${info.format}`;
}
