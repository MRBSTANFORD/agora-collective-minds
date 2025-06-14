
import { ExpertConfig } from '@/components/ExpertCardList';

export interface DiscussionMessage {
  speaker: string;
  content: string;
  round: number;
  timestamp: Date;
}

export interface AIProvider {
  name: string;
  apiKey: string;
}

// Expert personality prompts based on SDD specifications
const EXPERT_PROMPTS: Record<string, string> = {
  leonardo: `You are Leonardo da Vinci, a Renaissance polymath with a visionary and interdisciplinary mind. You explore challenges with insatiable curiosity, seeking harmony between art and science. Your thinking is analogical, imaginative yet precise, blending artistic vision with scientific rigor. Your language is poetic, rich in analogies, and you often reference nature, anatomy, and engineering principles. You approach problems by sketching connections between seemingly unrelated domains.`,
  
  curie: `You are Marie Curie, a pioneering scientist driven by empirical methodology and ethical integrity. You approach challenges with systematic rigor, demanding evidence and reproducible results. Your thinking is methodical, persistent, and cautious about innovation without proper validation. You speak with scientific precision, always grounding ideas in observable phenomena and measurable data. You champion the pursuit of truth through careful experimentation.`,
  
  socrates: `You are Socrates, the classical philosopher who seeks wisdom through questioning. You approach every challenge by examining assumptions, highlighting contradictions, and probing deeper meanings. Your method is dialectical - you ask penetrating questions rather than providing direct answers. You speak with humility about the limits of knowledge while relentlessly pursuing ethical understanding. You challenge others to think more deeply about their beliefs.`,
  
  hypatia: `You are Hypatia of Alexandria, a mathematician and philosopher who combines logical rigor with humanistic insight. You approach challenges through rational analysis and geometric thinking, seeking elegant mathematical solutions while advocating for equality and inclusiveness. Your language is precise yet accessible, often using mathematical metaphors and geometric analogies. You bridge abstract reasoning with practical human concerns.`,
  
  einstein: `You are Albert Einstein, a theoretical physicist who revolutionized our understanding of reality. You approach challenges with imaginative thought experiments while maintaining scientific rigor. Your thinking connects abstract concepts with practical implications, questioning fundamental assumptions about space, time, and causality. You speak with childlike wonder about the universe while providing profound insights through simple, elegant explanations.`,
  
  confucius: `You are Confucius, an ancient Chinese philosopher focused on practical wisdom and social harmony. You approach challenges by considering their impact on human relationships and societal balance. Your thinking emphasizes virtue, respect for tradition, and moral responsibility. You speak with measured wisdom, often using analogies from governance and family relationships. You seek solutions that promote social cohesion and ethical behavior.`,
  
  lovelace: `You are Ada Lovelace, a mathematician and early computing visionary. You approach challenges with analytical precision while envisioning technology's transformative potential. Your thinking is both logical and creative, seeing algorithmic solutions and computational possibilities others miss. You speak with technical accuracy about complex systems while maintaining enthusiasm for innovation and the marriage of art with mathematical precision.`,
  
  machiavelli: `You are Niccolò Machiavelli, a political philosopher with a pragmatic and strategic mind. You approach challenges by analyzing power dynamics, human motivations, and practical realities. Your thinking is clear-eyed about human nature, focused on what works rather than what should work in theory. You speak bluntly about political realities while offering strategic solutions that account for competing interests and real-world constraints.`
};

// Apply cognitive traits to modify expert responses
function applyCognitiveTraits(basePrompt: string, cognitive: { creativity: number; skepticism: number; optimism: number }): string {
  let traitModifiers = "";
  
  if (cognitive.creativity > 70) {
    traitModifiers += " You approach problems with high creativity, offering bold and unconventional solutions. You think outside established patterns and propose innovative approaches.";
  } else if (cognitive.creativity < 30) {
    traitModifiers += " You prefer proven, traditional approaches over experimental solutions. You value reliability and established methods.";
  }
  
  if (cognitive.skepticism > 70) {
    traitModifiers += " You are highly skeptical, questioning assumptions and challenging ideas rigorously. You demand strong evidence and point out potential flaws.";
  } else if (cognitive.skepticism < 30) {
    traitModifiers += " You are generally accepting of new ideas and tend to build upon others' suggestions rather than criticizing them.";
  }
  
  if (cognitive.optimism > 70) {
    traitModifiers += " You maintain an optimistic outlook, focusing on possibilities and positive outcomes. You frame challenges as opportunities.";
  } else if (cognitive.optimism < 30) {
    traitModifiers += " You tend toward pessimism, highlighting potential problems and obstacles. You focus on realistic limitations and difficulties.";
  }
  
  return basePrompt + traitModifiers;
}

// Generate AI response based on provider with better error handling
async function generateAIResponse(prompt: string, provider: string, apiKey: string): Promise<string> {
  console.log(`Generating response for provider: ${provider}, has API key: ${apiKey ? 'yes' : 'no'}`);
  
  try {
    switch (provider) {
      case 'OpenAI':
        if (!apiKey) throw new Error('OpenAI API key required');
        return await callOpenAI(prompt, apiKey);
      case 'Anthropic':
        if (!apiKey) throw new Error('Anthropic API key required');
        return await callAnthropic(prompt, apiKey);
      case 'Perplexity':
        if (!apiKey) throw new Error('Perplexity API key required');
        return await callPerplexity(prompt, apiKey);
      case 'Groq':
        if (!apiKey) throw new Error('Groq API key required');
        return await callGroq(prompt, apiKey);
      case 'HuggingFace':
      default:
        return await callHuggingFace(prompt);
    }
  } catch (error) {
    console.error(`AI Provider ${provider} error:`, error);
    // Return a fallback response instead of trying another provider
    return generateFallbackResponse(prompt);
  }
}

// Generate a simple fallback response when AI providers fail
function generateFallbackResponse(prompt: string): string {
  const responses = [
    "This is a fascinating challenge that requires careful consideration from multiple perspectives.",
    "I believe we need to examine this issue through the lens of my unique expertise and experience.",
    "This presents an interesting opportunity to apply fundamental principles to a modern problem.",
    "The complexity of this challenge calls for a thoughtful and measured approach.",
    "I find myself drawn to explore the deeper implications of this question."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

async function callOpenAI(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.8,
    }),
  });
  
  if (!response.ok) throw new Error(`OpenAI API error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0]?.message?.content || "I apologize, but I'm having difficulty responding right now.";
}

async function callAnthropic(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    }),
  });
  
  if (!response.ok) throw new Error(`Anthropic API error: ${response.statusText}`);
  const data = await response.json();
  return data.content[0]?.text || "I apologize, but I'm having difficulty responding right now.";
}

async function callPerplexity(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-large-128k-online',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.8,
    }),
  });
  
  if (!response.ok) throw new Error(`Perplexity API error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0]?.message?.content || "I apologize, but I'm having difficulty responding right now.";
}

async function callGroq(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.8,
    }),
  });
  
  if (!response.ok) throw new Error(`Groq API error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0]?.message?.content || "I apologize, but I'm having difficulty responding right now.";
}

async function callHuggingFace(prompt: string): Promise<string> {
  // Use a more reliable HuggingFace model
  const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.8,
        return_full_text: false,
      },
    }),
  });
  
  if (!response.ok) {
    console.warn(`HuggingFace API error: ${response.statusText}, using fallback`);
    return generateFallbackResponse(prompt);
  }
  
  const data = await response.json();
  return data[0]?.generated_text || generateFallbackResponse(prompt);
}

// Main discussion orchestrator
export class DiscussionOrchestrator {
  private experts: ExpertConfig[];
  private challenge: string;
  private maxRounds: number;
  private messages: DiscussionMessage[];
  private currentRound: number;

  constructor(experts: ExpertConfig[], challenge: string, maxRounds: number) {
    console.log('Creating DiscussionOrchestrator with:', { experts: experts.length, challenge: challenge.slice(0, 50), maxRounds });
    this.experts = experts || [];
    this.challenge = challenge || '';
    this.maxRounds = maxRounds || 5;
    this.messages = [];
    this.currentRound = 0;
  }

  async generateRound(): Promise<DiscussionMessage[]> {
    console.log(`Starting round ${this.currentRound + 1} of ${this.maxRounds}`);
    this.currentRound++;
    const roundMessages: DiscussionMessage[] = [];

    if (!this.experts || this.experts.length === 0) {
      console.error('No experts available for discussion');
      return [];
    }

    for (const expert of this.experts) {
      console.log(`Generating response for expert: ${expert.name}`);
      try {
        const expertPrompt = this.buildExpertPrompt(expert);
        const response = await generateAIResponse(
          expertPrompt,
          expert.provider || 'HuggingFace',
          expert.apiKey || ''
        );

        const message: DiscussionMessage = {
          speaker: expert.id,
          content: response,
          round: this.currentRound,
          timestamp: new Date(),
        };

        roundMessages.push(message);
        this.messages.push(message);
        console.log(`Expert ${expert.name} response generated successfully`);
      } catch (error) {
        console.error(`Error generating response for expert ${expert.name}:`, error);
        // Continue with other experts even if one fails
      }
    }

    console.log(`Round ${this.currentRound} completed with ${roundMessages.length} messages`);
    return roundMessages;
  }

  private buildExpertPrompt(expert: ExpertConfig): string {
    const basePrompt = EXPERT_PROMPTS[expert.id] || "You are a thoughtful expert providing insights on complex challenges.";
    const enhancedPrompt = applyCognitiveTraits(basePrompt, expert.cognitive);
    
    let contextPrompt = `${enhancedPrompt}\n\nChallenge: ${this.challenge}\n\n`;
    
    if (this.currentRound === 1) {
      contextPrompt += "This is the first round of discussion. Provide your initial perspective on this challenge.";
    } else {
      contextPrompt += `This is round ${this.currentRound} of ${this.maxRounds}. Previous discussion:\n`;
      
      // Include last 3 messages for context
      const recentMessages = this.messages.slice(-3);
      for (const msg of recentMessages) {
        const speakerName = this.experts.find(e => e.id === msg.speaker)?.name || msg.speaker;
        contextPrompt += `${speakerName}: ${msg.content}\n\n`;
      }
      
      contextPrompt += "Build upon the previous discussion while maintaining your unique perspective. Reference other experts' ideas when relevant.";
    }
    
    contextPrompt += "\n\nProvide a thoughtful response (2-3 sentences) that reflects your historical perspective and expertise.";
    
    return contextPrompt;
  }

  getMessages(): DiscussionMessage[] {
    return this.messages;
  }

  getCurrentRound(): number {
    return this.currentRound;
  }

  isComplete(): boolean {
    return this.currentRound >= this.maxRounds;
  }
}
