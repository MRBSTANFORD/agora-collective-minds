
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
    // Simple test: "Say hello as a world-class expert in one sentence."
    const prompt = "Say hello as a world-class expert in one sentence.";
    let response = "";
    switch (provider) {
      case "OpenAI":
        response = await (await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model || "gpt-4.1-2025-04-14",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 32,
            temperature: 0.6,
          }),
        })).text();
        break;
      case "Anthropic":
        response = await (await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: model || "claude-sonnet-4-20250514",
            max_tokens: 32,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.6,
          }),
        })).text();
        break;
      case "Perplexity":
        response = await (await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model || "llama-3.1-sonar-small-128k-online",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 32,
            temperature: 0.6,
          }),
        })).text();
        break;
      case "Groq":
        response = await (await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model || "mixtral-8x7b-32768",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 32,
            temperature: 0.6,
          }),
        })).text();
        break;
      case "Gemini":
        response = await (await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + (model || "gemini-pro") + ":generateContent?key=" + apiKey, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        })).text();
        break;
      case "Cohere":
        response = await (await fetch("https://api.cohere.ai/v1/chat", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model || "command-r",
            message: prompt,
            max_tokens: 32,
            temperature: 0.6,
          }),
        })).text();
        break;
      case "Mistral":
        response = await (await fetch("https://api.mistral.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model || "mistral-large-latest",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 32,
            temperature: 0.6,
          }),
        })).text();
        break;
      case "HuggingFace":
        // For free: no-key needed, just model selection
        response = await (await fetch(`https://api-inference.huggingface.co/models/${model}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "Authorization": "Bearer " + apiKey } : {})
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: { max_new_tokens: 32 },
            options: { wait_for_model: true },
          }),
        })).text();
        break;
      default:
        return { ok: false, message: "Unrecognized provider." };
    }
    if (response && response.length > 0) {
      return { ok: true, message: "Connection test successful!" };
    }
    return { ok: false, message: "No response received." };
  } catch (e: any) {
    return { ok: false, message: (e?.message || "Unknown error") };
  }
}
