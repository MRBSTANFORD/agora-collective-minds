

# Add LLM7.io as Default AI Provider

## Summary
Adding LLM7.io as a new AI provider option and making it the default for all experts. LLM7.io is a unified API gateway that works without an API key for basic usage (free tier with rate limits), making it ideal as the default option.

## What is LLM7.io?
LLM7.io is a unified API gateway that provides access to multiple AI models through a single endpoint. Key features:
- Works WITHOUT API key for basic usage (free tier)
- OpenAI-compatible API at `https://api.llm7.io/v1`
- Offers "default", "fast", and "pro" model routing options
- Free tier: 100 requests/hour, 20/minute, 2/second
- Optional token from token.llm7.io for higher limits

## Files to Modify

### 1. Provider Configuration (`src/config/providerConfig.ts`)
- Add LLM7 as new provider with "Free (No Key Required)" label
- Position it at the TOP of the providers list
- Mark it with the free tier indicator

### 2. Default Experts (`src/config/defaultExperts.ts`)
- Change all 8 experts from "HuggingFace" to "LLM7" as their default provider
- Set default model to "default" (LLM7's balanced routing option)

### 3. AI Providers Service (`src/services/aiProviders.ts`)
- Add `callLLM7()` function to handle LLM7 API calls
- API endpoint: `https://api.llm7.io/v1/chat/completions`
- API key can be "unused" for free tier, or actual token for higher limits
- Support models: "default", "fast", "pro"

### 4. Model Discovery (`src/services/modelDiscovery.ts`)
- Add `discoverLLM7Models()` function
- Returns available models: default, fast, pro
- All marked as free and available (no API key required)
- Include in `discoverAllModels()` parallel discovery

### 5. Provider Discovery (`src/services/providerDiscovery.ts`)
- Add "LLM7" to `STANDARD_PROVIDERS` array
- Add connectivity test for LLM7
- Mark as not requiring API key (`requiresApiKey: false`)
- Mark as having free models available

### 6. Discussion Config Panel (`src/components/DiscussionConfigPanel.tsx`)
- Update default experts array to use "LLM7" provider
- Update documentation text to mention LLM7 as the default free option

### 7. API Setup Guide (`src/pages/ApiSetupGuide.tsx`)
- Add LLM7 as FIRST provider in the guide
- Explain it works without API key
- Include link to token.llm7.io for optional higher limits

### 8. AI Orchestrator (`src/services/aiOrchestrator.ts`)
- Update fallback provider from "HuggingFace" to "LLM7"

### 9. Response Generator (`src/services/responseGenerator.ts`)
- Add case for "LLM7" provider to call the new `callLLM7()` function

## Technical Details

### LLM7 API Integration
```text
Endpoint: https://api.llm7.io/v1/chat/completions
Method: POST
Headers:
  - Authorization: Bearer {token or "unused"}
  - Content-Type: application/json
Body:
  - model: "default" | "fast" | "pro"
  - messages: [{ role, content }]
  - max_tokens: 1000
  - temperature: 0.8
```

### Available Models
- **default**: First available model with balanced quality and speed
- **fast**: Routes to fastest available option for lower latency
- **pro**: Targets most capable models (may require paid token)

## User Impact
- All experts will work immediately without any API key setup
- Users can still configure other providers via BYOK approach
- Optional: users can get a token from token.llm7.io for higher rate limits
- Smooth fallback if LLM7 is temporarily unavailable

