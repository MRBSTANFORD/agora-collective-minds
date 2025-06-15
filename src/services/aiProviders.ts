import { getApiKeyStatus } from '../utils/secureLogging';

export interface AIProvider {
  name: string;
  apiKey: string;
}

// API call functions for different providers
export async function callOpenAI(prompt: string, apiKey: string, model: string = 'gpt-4o'): Promise<string> {
  console.log('🔵 Calling OpenAI API...');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.8,
      top_p: 0.95,
      presence_penalty: 0.2
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ OpenAI API error:', response.status, errorText);
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content in OpenAI response');
  }
  return content;
}

export async function callAnthropic(prompt: string, apiKey: string, model: string = 'claude-3-5-sonnet-20241022'): Promise<string> {
  console.log('🟣 Calling Anthropic API...');
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      top_p: 0.95
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Anthropic API error:', response.status, errorText);
    throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.content[0]?.text;
  if (!content) {
    throw new Error('No content in Anthropic response');
  }
  return content;
}

export async function callGoogleGemini(prompt: string, apiKey: string, model: string = 'gemini-1.5-pro'): Promise<string> {
  console.log('🟡 Calling Google Gemini API...');
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 1000,
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Google Gemini API error:', response.status, errorText);
    throw new Error(`Google Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    throw new Error('No content in Google Gemini response');
  }
  return content;
}

export async function callCohere(prompt: string, apiKey: string, model: string = 'command-r'): Promise<string> {
  console.log('🔶 Calling Cohere API...');
  const response = await fetch('https://api.cohere.ai/v1/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      message: prompt,
      temperature: 0.8,
      p: 0.95,
      max_tokens: 1000
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Cohere API error:', response.status, errorText);
    throw new Error(`Cohere API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.text;
  if (!content) {
    throw new Error('No content in Cohere response');
  }
  return content.trim();
}

export async function callMistralAI(prompt: string, apiKey: string, model: string = 'mistral-large-latest'): Promise<string> {
  console.log('🟠 Calling Mistral AI API...');
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.8,
      top_p: 0.95
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Mistral AI API error:', response.status, errorText);
    throw new Error(`Mistral AI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content in Mistral AI response');
  }
  return content;
}

export async function callPerplexity(prompt: string, apiKey: string, model: string = 'llama-3.1-sonar-small-128k-online'): Promise<string> {
  console.log('🟢 Calling Perplexity API...');
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.8,
      top_p: 0.95,
      presence_penalty: 0.2
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Perplexity API error:', response.status, errorText);
    throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content in Perplexity response');
  }
  return content;
}

export async function callGroq(prompt: string, apiKey: string, model: string = 'llama3-8b-8192'): Promise<string> {
  console.log('🟡 Calling Groq API with key status:', getApiKeyStatus(apiKey));
  
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Groq API key is required but not provided');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.8,
      top_p: 0.95,
      presence_penalty: 0.2
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Groq API error:', response.status, errorText);
    throw new Error(`Groq API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('🟡 Groq response structure:', Object.keys(data));
  
  const content = data.choices[0]?.message?.content;
  if (!content) {
    console.error('❌ Groq response missing content:', data);
    throw new Error('No content in Groq response');
  }
  
  console.log('✅ Groq response received:', content.slice(0, 50) + '...');
  return content;
}

// Enhanced HuggingFace integration with real model discovery
export async function callHuggingFaceWithFallback(prompt: string, expertId: string, apiKey?: string, model?: string): Promise<string> {
  console.log(`🤗 Calling HuggingFace API for expert ${expertId}, key status: ${getApiKeyStatus(apiKey)}, model: ${model}`);
  
  // Use the provided model or fallback to a working one
  const modelToUse = model || 'microsoft/DialoGPT-large';
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (apiKey && apiKey.trim() !== '') {
    headers['Authorization'] = `Bearer ${apiKey}`;
    console.log(`🔑 Using HuggingFace API key for expert ${expertId}`);
  } else {
    console.log(`🆓 Using free HuggingFace inference for expert ${expertId}`);
  }
  
  try {
    console.log(`🔄 Trying HuggingFace model ${modelToUse} for expert ${expertId}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout
    
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelToUse}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.8,
          top_p: 0.95,
          repetition_penalty: 1.2,
          return_full_text: false,
          do_sample: true,
        },
        options: {
          wait_for_model: true,
        }
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`⚠️ HuggingFace model ${modelToUse} returned ${response.status}: ${errorText}`);
      throw new Error(`HuggingFace API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`🤗 HuggingFace response for ${modelToUse}:`, data);
    
    if (data.error) {
      console.warn(`⚠️ HuggingFace model ${modelToUse} returned error:`, data.error);
      throw new Error(data.error);
    }
    
    // Handle different response formats
    let content = '';
    if (Array.isArray(data) && data[0]?.generated_text) {
      content = data[0].generated_text.trim();
    } else if (data.generated_text) {
      content = data.generated_text.trim();
    } else if (typeof data === 'string') {
      content = data.trim();
    }
    
    if (content.length > 10) {
      console.log(`✅ Successfully generated response using ${modelToUse} for expert ${expertId}: ${content.slice(0, 50)}...`);
      return content;
    }
    
    throw new Error('Insufficient content generated');
  } catch (error) {
    console.error(`❌ HuggingFace model ${modelToUse} failed for expert ${expertId}:`, error);
    throw error;
  }
}
