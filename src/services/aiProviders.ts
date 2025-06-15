
export interface AIProvider {
  name: string;
  apiKey: string;
}

// API call functions for different providers
export async function callOpenAI(prompt: string, apiKey: string): Promise<string> {
  console.log('🔵 Calling OpenAI API...');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
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

export async function callAnthropic(prompt: string, apiKey: string): Promise<string> {
  console.log('🟣 Calling Anthropic API...');
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
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

export async function callGoogleGemini(prompt: string, apiKey: string): Promise<string> {
  console.log('🟡 Calling Google Gemini API...');
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
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

export async function callCohere(prompt: string, apiKey: string): Promise<string> {
  console.log('🔶 Calling Cohere API...');
  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'command',
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.8,
      p: 0.95,
      stop_sequences: []
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Cohere API error:', response.status, errorText);
    throw new Error(`Cohere API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.generations?.[0]?.text;
  if (!content) {
    throw new Error('No content in Cohere response');
  }
  return content.trim();
}

export async function callMistralAI(prompt: string, apiKey: string): Promise<string> {
  console.log('🟠 Calling Mistral AI API...');
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistral-large-latest',
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

export async function callPerplexity(prompt: string, apiKey: string): Promise<string> {
  console.log('🟢 Calling Perplexity API...');
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
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

export async function callGroq(prompt: string, apiKey: string): Promise<string> {
  console.log('🟡 Calling Groq API with key:', apiKey ? `${apiKey.slice(0, 8)}...` : 'NO KEY');
  
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
      model: 'mixtral-8x7b-32768',
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

// Enhanced HuggingFace integration with API key support and better models
export async function callHuggingFaceWithFallback(prompt: string, expertId: string, apiKey?: string): Promise<string> {
  console.log(`🤗 Calling HuggingFace API for expert ${expertId}, has API key: ${!!apiKey}`);
  
  // Upgraded to stronger, larger models that perform better for long-form text
  const models = [
    'microsoft/DialoGPT-large',
    'facebook/blenderbot-1B-distill',
    'HuggingFaceH4/zephyr-7b-beta',
    'meta-llama/Llama-2-7b-chat-hf',
    'microsoft/DialoGPT-medium'
  ];
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Add authorization if API key is provided
  if (apiKey && apiKey.trim() !== '') {
    headers['Authorization'] = `Bearer ${apiKey}`;
    console.log(`🔑 Using HuggingFace API key for expert ${expertId}`);
  } else {
    console.log(`🆓 Using free HuggingFace inference for expert ${expertId}`);
  }
  
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      console.log(`🔄 [${i + 1}/${models.length}] Trying HuggingFace model ${model} for expert ${expertId}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout
      
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 800, // WAS 150, now much more
            temperature: 0.8,
            top_p: 0.95,
            repetition_penalty: 1.2, // reduce repeating
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
        console.warn(`⚠️ HuggingFace model ${model} returned ${response.status}: ${errorText}`);
        
        // If we get a 503 (model loading), wait a bit longer for this model
        if (response.status === 503 && i < 2) {
          console.log(`⏳ Model ${model} is loading, waiting 5 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
          continue;
        }
        continue;
      }
      
      const data = await response.json();
      console.log(`🤗 HuggingFace response for ${model}:`, data);
      
      if (data.error) {
        console.warn(`⚠️ HuggingFace model ${model} returned error:`, data.error);
        continue;
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
      
      if (content.length > 10) { // Ensure we have meaningful content
        console.log(`✅ Successfully generated response using ${model} for expert ${expertId}: ${content.slice(0, 50)}...`);
        return content;
      }
      
      console.warn(`⚠️ Model ${model} returned insufficient content for expert ${expertId}:`, content);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn(`⏰ HuggingFace model ${model} timed out for expert ${expertId}`);
      } else {
        console.warn(`💥 HuggingFace model ${model} failed for expert ${expertId}:`, error);
      }
    }
  }
  
  console.error(`❌ All HuggingFace models failed for expert ${expertId}`);
  throw new Error('All HuggingFace models failed');
}
