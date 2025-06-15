import { getApiKeyStatus } from '../utils/secureLogging';

export type ProviderApiStatus = 'idle' | 'testing' | 'success' | 'error';

export async function testApiConnection({
  provider,
  model,
  apiKey,
}: {
  provider: string;
  model: string;
  apiKey: string;
}): Promise<{ ok: boolean; message: string }> {
  try {
    console.log(`🧪 Testing API connection for ${provider} with key status: ${getApiKeyStatus(apiKey)}`);
    
    // Clean and validate API key
    const cleanApiKey = apiKey?.trim() || '';
    
    // Remove duplicate prefixes (like "hf hf_")
    const finalApiKey = cleanApiKey.startsWith('hf hf_') ? cleanApiKey.replace('hf ', '') : cleanApiKey;
    
    // Simple test prompt
    const prompt = "Say hello as a world-class expert in one sentence.";
    let response: Response;
    let requestBody: any;
    let headers: Record<string, string>;

    switch (provider) {
      case "OpenAI":
        if (!finalApiKey) {
          return { ok: false, message: "OpenAI requires an API key" };
        }
        headers = {
          "Authorization": `Bearer ${finalApiKey}`,
          "Content-Type": "application/json",
        };
        requestBody = {
          model: model || "gpt-4.1-2025-04-14",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 32,
          temperature: 0.6,
        };
        response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });
        break;

      case "Anthropic":
        if (!finalApiKey) {
          return { ok: false, message: "Anthropic requires an API key" };
        }
        headers = {
          "x-api-key": finalApiKey,
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
        };
        requestBody = {
          model: model || "claude-sonnet-4-20250514",
          max_tokens: 32,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.6,
        };
        response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });
        break;

      case "Perplexity":
        if (!finalApiKey) {
          return { ok: false, message: "Perplexity requires an API key" };
        }
        headers = {
          "Authorization": `Bearer ${finalApiKey}`,
          "Content-Type": "application/json",
        };
        requestBody = {
          model: model || "llama-3.1-sonar-small-128k-online",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 32,
          temperature: 0.6,
        };
        response = await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });
        break;

      case "Groq":
        if (!finalApiKey) {
          return { ok: false, message: "Groq requires an API key" };
        }
        headers = {
          "Authorization": `Bearer ${finalApiKey}`,
          "Content-Type": "application/json",
        };
        requestBody = {
          model: model || "mixtral-8x7b-32768",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 32,
          temperature: 0.6,
        };
        response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });
        break;

      case "GoogleGemini":  // Fixed: was "Gemini"
        if (!finalApiKey) {
          return { ok: false, message: "GoogleGemini requires an API key" };
        }
        headers = {
          "Content-Type": "application/json",
        };
        requestBody = {
          contents: [{ parts: [{ text: prompt }] }]
        };
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model || "gemini-pro"}:generateContent?key=${finalApiKey}`, {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });
        break;

      case "Cohere":
        if (!finalApiKey) {
          return { ok: false, message: "Cohere requires an API key" };
        }
        headers = {
          "Authorization": `Bearer ${finalApiKey}`,
          "Content-Type": "application/json",
        };
        requestBody = {
          model: model || "command-r",
          message: prompt,
          max_tokens: 32,
          temperature: 0.6,
        };
        response = await fetch("https://api.cohere.ai/v1/chat", {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });
        break;

      case "MistralAI":  // Fixed: was "Mistral"
        if (!finalApiKey) {
          return { ok: false, message: "MistralAI requires an API key" };
        }
        headers = {
          "Authorization": `Bearer ${finalApiKey}`,
          "Content-Type": "application/json",
        };
        requestBody = {
          model: model || "mistral-large-latest",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 32,
          temperature: 0.6,
        };
        response = await fetch("https://api.mistral.ai/v1/chat/completions", {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });
        break;

      case "HuggingFace":
        headers = {
          "Content-Type": "application/json",
          ...(finalApiKey ? { "Authorization": `Bearer ${finalApiKey}` } : {})
        };
        requestBody = {
          inputs: prompt,
          parameters: { max_new_tokens: 32 },
          options: { wait_for_model: true },
        };
        response = await fetch(`https://api-inference.huggingface.co/models/${model || "microsoft/DialoGPT-large"}`, {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });
        break;

      default:
        return { ok: false, message: "Unrecognized provider." };
    }

    console.log(`📊 API Response Status: ${response.status} ${response.statusText}`);

    // First check: HTTP status code
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ HTTP Error ${response.status}:`, errorText);
      
      // Parse common error messages
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) {
          const errorMsg = typeof errorJson.error === 'string' ? errorJson.error : errorJson.error.message || JSON.stringify(errorJson.error);
          return { ok: false, message: `HTTP ${response.status}: ${errorMsg}` };
        }
      } catch (e) {
        // Not JSON, return raw error
      }
      
      return { ok: false, message: `HTTP ${response.status}: ${errorText || response.statusText}` };
    }

    // Parse JSON response
    let data: any;
    try {
      const responseText = await response.text();
      console.log(`📋 Raw Response: ${responseText.slice(0, 200)}...`);
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Failed to parse JSON response:', e);
      return { ok: false, message: "Invalid JSON response from API" };
    }

    // Provider-specific validation
    switch (provider) {
      case "OpenAI":
      case "Perplexity":
      case "Groq":
      case "MistralAI":  // Fixed: was "Mistral"
        if (data.error) {
          return { ok: false, message: data.error.message || JSON.stringify(data.error) };
        }
        if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
          return { ok: false, message: "No choices in response" };
        }
        if (!data.choices[0].message?.content) {
          return { ok: false, message: "No content in response" };
        }
        break;

      case "Anthropic":
        if (data.error) {
          return { ok: false, message: data.error.message || JSON.stringify(data.error) };
        }
        if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
          return { ok: false, message: "No content array in response" };
        }
        if (!data.content[0].text) {
          return { ok: false, message: "No text in content" };
        }
        break;

      case "GoogleGemini":  // Fixed: was "Gemini"
        if (data.error) {
          return { ok: false, message: data.error.message || JSON.stringify(data.error) };
        }
        if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
          return { ok: false, message: "No candidates in response" };
        }
        break;

      case "Cohere":
        if (data.error) {
          return { ok: false, message: data.error || JSON.stringify(data) };
        }
        if (!data.text) {
          return { ok: false, message: "No text in response" };
        }
        break;

      case "HuggingFace":
        if (data.error) {
          return { ok: false, message: data.error };
        }
        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
          // Valid response format
          break;
        }
        if (data.generated_text) {
          // Alternative valid format
          break;
        }
        return { ok: false, message: "Unexpected response format" };

      default:
        break;
    }

    console.log(`✅ API test successful for ${provider}`);
    return { ok: true, message: "Connection test successful!" };

  } catch (e: any) {
    console.error(`💥 API test failed for ${provider}:`, e);
    return { ok: false, message: e?.message || "Network error occurred" };
  }
}
