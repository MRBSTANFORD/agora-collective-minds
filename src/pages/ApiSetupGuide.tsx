
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PROVIDER_GUIDES = [
  {
    provider: "HuggingFace",
    free: true,
    steps: [
      "Go to https://huggingface.co/join to create an account (optional, for higher limits).",
      "Once logged in, visit https://huggingface.co/settings/tokens.",
      "Click 'New token', choose 'Read', and copy your token.",
      "Paste the token in the Symposium Settings panel under API Key for HuggingFace.",
      "You can use free models without a token, but having one lifts rate limits for most models."
    ]
  },
  {
    provider: "Google Gemini",
    free: true,
    steps: [
      "Go to https://ai.google.dev/gemini-api/docs/quickstart.",
      "Sign in with your Google account.",
      "Generate an API Key under 'Get your API key'.",
      "Copy and paste it in the Symposium Settings panel for Gemini.",
      "Gemini 1.5 Flash is FREE (daily usage quotas apply)."
    ]
  },
  {
    provider: "Cohere",
    free: true,
    steps: [
      "Go to https://dashboard.cohere.com/signup to create an account.",
      "After verifying email, visit https://dashboard.cohere.com/api-keys.",
      "Click 'Create API key'. Copy and paste it into API Key for Cohere.",
      "Free tier allows 1000 requests/month."
    ]
  },
  {
    provider: "Groq",
    free: true,
    steps: [
      "Go to https://console.groq.com/ and sign up.",
      "In the dashboard, click 'API Keys'.",
      "Create and copy a key; paste into API Key input for Groq.",
      "Groq offers a free tier and is very fast!"
    ]
  },
  {
    provider: "Mistral AI",
    free: true,
    steps: [
      "Visit https://console.mistral.ai/ to sign up.",
      "In the console, click 'API keys' and generate a new key.",
      "Paste your token in the Symposium Settings panel for Mistral.",
      "Free usage available on small models."
    ]
  },
  {
    provider: "OpenAI",
    free: false,
    steps: [
      "Go to https://platform.openai.com/signup.",
      "Create an account and go to 'API Keys'.",
      "Create a new secret key and copy it.",
      "Paste in Symposium Settings for OpenAI.",
      "Note: OpenAI is paid-only."
    ]
  },
  {
    provider: "Anthropic",
    free: false,
    steps: [
      "Go to https://console.anthropic.com/ and sign up.",
      "In the dashboard, go to 'API keys', generate and copy.",
      "Paste into API Key for Anthropic.",
      "Anthropic is paid-only."
    ]
  },
  {
    provider: "Perplexity",
    free: false,
    steps: [
      "Sign up at https://labs.perplexity.ai/.",
      "In settings, navigate to 'API Keys' and generate one.",
      "Paste in Symposium Settings for Perplexity.",
      "Perplexity is paid-only."
    ]
  },
];

export default function ApiSetupGuide() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">🌟 API Setup Guide for Free & Paid LLM Providers</h1>
      <div className="mb-6 text-slate-700">
        This guide explains how to find and set up free API keys for the top LLM providers. Models labeled <span className="font-bold text-green-600">🆓 Free</span> can be used at zero cost (rate limits may apply). Paid providers are marked as <span className="font-bold text-amber-600">💎 Paid</span>.
      </div>
      <div className="space-y-8">
        {PROVIDER_GUIDES.map(({ provider, free, steps }) => (
          <Card key={provider}>
            <CardHeader>
              <CardTitle>
                {provider} <span className={free ? "text-green-600" : "text-amber-600"}>{free ? "🆓 Free" : "💎 Paid"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-1">
                {steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
