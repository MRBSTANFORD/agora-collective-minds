
export const PROVIDERS_WITH_MODELS = {
  HuggingFace: {
    label: "HuggingFace (Free/Paid)",
    value: "HuggingFace",
    description: "Free & paid LLMs via HuggingFace Inference API.",
    tier: "🆓",
  },
  OpenAI: {
    label: "OpenAI (Paid)",
    value: "OpenAI",
    description: "GPT-4o, GPT-4, GPT-3.5-turbo (Paid)",
    tier: "💎",
  },
  Anthropic: {
    label: "Anthropic Claude (Paid)",
    value: "Anthropic",
    description: "Claude 3 & 4 (Paid)",
    tier: "💎",
  },
  GoogleGemini: {
    label: "Google Gemini (Freemium)",
    value: "GoogleGemini",
    description: "Gemini Pro & Flash models (Free tier available)",
    tier: "🆓",
  },
  Cohere: {
    label: "Cohere (Freemium)",
    value: "Cohere",
    description: "Command models with free tier",
    tier: "🆓",
  },
  MistralAI: {
    label: "Mistral AI (Freemium)",
    value: "MistralAI",
    description: "Open-source and commercial models",
    tier: "⚡",
  },
  Groq: {
    label: "Groq (Freemium)",
    value: "Groq",
    description: "Supports free API, fast inference (Premium for heavy use)",
    tier: "⚡",
  },
  Perplexity: {
    label: "Perplexity (Freemium)",
    value: "Perplexity",
    description: "Online search-powered responses with free tier",
    tier: "🆓",
  },
};

export const traitDocs = {
  creativity: "How divergent and imaginative the expert is. Higher values mean bolder, more inventive ideas and unconventional approaches.",
  skepticism: "How much the expert questions assumptions and challenges points. Higher values means more critical thinking and analytical rigor.",
  optimism: "How positively the expert frames possibilities and outcomes. Higher values mean a focus on hope, opportunity, and constructive solutions.",
  provider: "Choose which AI provider and model this expert uses for responses. Each provider and model has different strengths and API free/paid status.",
  apiKey: "Your personal API key for the selected provider. HuggingFace and Cohere offer free keys. See the API Setup Guide for how to get one.",
  model: "Select the AI model to use. Free models are labeled (Free). See the API Setup Guide for details.",
};
