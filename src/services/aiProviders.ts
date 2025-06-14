
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
      max_tokens: 150,
      temperature: 0.8,
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
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
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
      max_tokens: 150,
      temperature: 0.8,
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
  console.log('🟡 Calling Groq API...');
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Groq API error:', response.status, errorText);
    throw new Error(`Groq API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content in Groq response');
  }
  return content;
}

// Enhanced HuggingFace integration with multiple model fallbacks
export async function callHuggingFaceWithFallback(prompt: string, expertId: string): Promise<string> {
  console.log(`🤗 Calling HuggingFace API for expert ${expertId}...`);
  
  const models = [
    'microsoft/DialoGPT-medium',
    'facebook/blenderbot-400M-distill',
    'microsoft/DialoGPT-small'
  ];
  
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      console.log(`🔄 [${i + 1}/${models.length}] Trying HuggingFace model ${model} for expert ${expertId}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.8,
            return_full_text: false,
            do_sample: true,
          },
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`⚠️ HuggingFace model ${model} returned ${response.status}: ${errorText}`);
        continue;
      }
      
      const data = await response.json();
      
      if (data.error) {
        console.warn(`⚠️ HuggingFace model ${model} returned error:`, data.error);
        continue;
      }
      
      if (data && data[0]?.generated_text) {
        const content = data[0].generated_text.trim();
        if (content.length > 10) { // Ensure we have meaningful content
          console.log(`✅ Successfully generated response using ${model} for expert ${expertId}: ${content.slice(0, 50)}...`);
          return content;
        }
      }
      
      console.warn(`⚠️ Model ${model} did not return valid response for expert ${expertId}`, data);
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
