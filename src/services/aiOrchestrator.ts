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

// Enhanced fallback responses based on expert personalities
const EXPERT_FALLBACK_RESPONSES: Record<string, string[]> = {
  leonardo: [
    "This challenge reminds me of the intricate mechanisms I've observed in nature - perhaps we should approach it as an artist would approach a canvas, with both precision and imagination.",
    "Like the flow of water carving through stone, this problem requires us to find the path of least resistance while maintaining our creative vision.",
    "I see connections between this challenge and the anatomical studies I've conducted - both require careful observation and systematic analysis."
  ],
  curie: [
    "We must approach this systematically, gathering evidence and testing our hypotheses rigorously before drawing conclusions.",
    "This problem requires the same methodical approach I used in my laboratory - careful observation, precise measurement, and persistent investigation.",
    "Like my work with radioactive elements, this challenge demands patience and careful attention to detail to reveal its true nature."
  ],
  socrates: [
    "But first, we must ask ourselves: do we truly understand what this challenge is asking of us? What assumptions are we making?",
    "I wonder if we have examined this problem from all angles. What questions have we not yet asked?",
    "This challenge presents an opportunity to examine our own thinking - are we seeking truth or merely confirming what we already believe?"
  ],
  hypatia: [
    "Let us apply mathematical reasoning to this challenge, seeking the elegant solution that balances all variables.",
    "This problem can be understood through the lens of geometry - finding the optimal path between multiple points of consideration.",
    "We must ensure our solution serves not just efficiency but also equity and the greater good of all involved."
  ],
  einstein: [
    "This challenge invites us to think beyond conventional frameworks - perhaps the solution lies in reimagining our fundamental assumptions.",
    "Like relativity teaches us, the perspective from which we view this problem will determine what solutions become visible to us.",
    "I find myself wondering what thought experiment might illuminate the hidden connections within this challenge."
  ],
  confucius: [
    "The path to solving this challenge lies in understanding how it affects the harmony between all stakeholders involved.",
    "Wisdom suggests we consider not just the immediate solution, but the long-term consequences for our community.",
    "True resolution comes when we balance practical necessities with moral responsibilities and social cohesion."
  ],
  lovelace: [
    "This challenge has the characteristics of a complex algorithm - we must break it down into logical steps and iterate toward the solution.",
    "I see patterns in this problem that suggest a systematic, computational approach could yield innovative results.",
    "The intersection of analytical thinking and creative vision will be key to unlocking this challenge's potential."
  ],
  machiavelli: [
    "We must examine the practical realities and competing interests at play in this challenge, not just the idealistic goals.",
    "Effective solutions require understanding the motivations and constraints of all parties involved - what they truly want versus what they claim to want.",
    "This challenge calls for strategic thinking that accounts for human nature and the real-world dynamics of power and influence."
  ]
};

// Generate enhanced fallback response based on expert personality
function generatePersonalizedFallbackResponse(expertId: string, prompt: string): string {
  const responses = EXPERT_FALLBACK_RESPONSES[expertId] || [
    "This presents an intriguing challenge that deserves careful consideration from multiple perspectives.",
    "I believe we need to examine this issue through the lens of my unique expertise and experience.",
    "The complexity of this challenge calls for a thoughtful and measured approach."
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  console.log(`Generated fallback response for ${expertId}: ${randomResponse.slice(0, 50)}...`);
  return randomResponse;
}

// Generate AI response with enhanced error handling and fallbacks
async function generateAIResponse(prompt: string, provider: string, apiKey: string, expertId: string): Promise<string> {
  console.log(`Generating response for expert ${expertId} using provider: ${provider}, has API key: ${apiKey ? 'yes' : 'no'}`);
  
  try {
    switch (provider) {
      case 'OpenAI':
        if (!apiKey) {
          console.log(`OpenAI requires API key, falling back for ${expertId}`);
          return generatePersonalizedFallbackResponse(expertId, prompt);
        }
        return await callOpenAI(prompt, apiKey);
      case 'Anthropic':
        if (!apiKey) {
          console.log(`Anthropic requires API key, falling back for ${expertId}`);
          return generatePersonalizedFallbackResponse(expertId, prompt);
        }
        return await callAnthropic(prompt, apiKey);
      case 'Perplexity':
        if (!apiKey) {
          console.log(`Perplexity requires API key, falling back for ${expertId}`);
          return generatePersonalizedFallbackResponse(expertId, prompt);
        }
        return await callPerplexity(prompt, apiKey);
      case 'Groq':
        if (!apiKey) {
          console.log(`Groq requires API key, falling back for ${expertId}`);
          return generatePersonalizedFallbackResponse(expertId, prompt);
        }
        return await callGroq(prompt, apiKey);
      case 'HuggingFace':
      default:
        return await callHuggingFaceWithFallback(prompt, expertId);
    }
  } catch (error) {
    console.error(`AI Provider ${provider} error for expert ${expertId}:`, error);
    return generatePersonalizedFallbackResponse(expertId, prompt);
  }
}

// Enhanced HuggingFace integration with multiple model fallbacks
async function callHuggingFaceWithFallback(prompt: string, expertId: string): Promise<string> {
  const models = [
    'microsoft/DialoGPT-medium',
    'facebook/blenderbot-400M-distill',
    'microsoft/DialoGPT-small'
  ];
  
  for (const model of models) {
    try {
      console.log(`Trying HuggingFace model ${model} for expert ${expertId}`);
      
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
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data && data[0]?.generated_text) {
          console.log(`Successfully generated response using ${model} for expert ${expertId}`);
          return data[0].generated_text.trim();
        }
      }
      
      console.warn(`Model ${model} did not return valid response for expert ${expertId}`);
    } catch (error) {
      console.warn(`HuggingFace model ${model} failed for expert ${expertId}:`, error);
    }
  }
  
  console.log(`All HuggingFace models failed for expert ${expertId}, using personalized fallback`);
  return generatePersonalizedFallbackResponse(expertId, prompt);
}

// Main discussion orchestrator with enhanced validation and error handling
export class DiscussionOrchestrator {
  private experts: ExpertConfig[];
  private challenge: string;
  private maxRounds: number;
  private messages: DiscussionMessage[];
  private currentRound: number;

  constructor(experts: ExpertConfig[], challenge: string, maxRounds: number) {
    console.log('Creating DiscussionOrchestrator with:', { 
      experts: experts?.length || 0, 
      challenge: challenge?.slice(0, 50) || 'No challenge', 
      maxRounds 
    });
    
    this.experts = experts || [];
    this.challenge = challenge || '';
    this.maxRounds = maxRounds || 5;
    this.messages = [];
    this.currentRound = 0;
    
    // Validate inputs
    if (!this.experts.length) {
      console.warn('DiscussionOrchestrator created with no experts');
    }
    if (!this.challenge.trim()) {
      console.warn('DiscussionOrchestrator created with empty challenge');
    }
  }

  async generateRound(): Promise<DiscussionMessage[]> {
    console.log(`Starting round ${this.currentRound + 1} of ${this.maxRounds}`);
    this.currentRound++;
    const roundMessages: DiscussionMessage[] = [];

    if (!this.experts || this.experts.length === 0) {
      console.error('No experts available for discussion');
      return [];
    }

    // Process experts sequentially to avoid rate limiting
    for (const expert of this.experts) {
      console.log(`Generating response for expert: ${expert.name} (${expert.id})`);
      try {
        const expertPrompt = this.buildExpertPrompt(expert);
        console.log(`Built prompt for ${expert.name}: ${expertPrompt.slice(0, 100)}...`);
        
        const response = await generateAIResponse(
          expertPrompt,
          expert.provider || 'HuggingFace',
          expert.apiKey || '',
          expert.id
        );

        const message: DiscussionMessage = {
          speaker: expert.id,
          content: response,
          round: this.currentRound,
          timestamp: new Date(),
        };

        roundMessages.push(message);
        this.messages.push(message);
        console.log(`Expert ${expert.name} response generated successfully: ${response.slice(0, 50)}...`);
        
        // Small delay between experts to avoid overwhelming APIs
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error generating response for expert ${expert.name}:`, error);
        
        // Add fallback message even on error to keep discussion flowing
        const fallbackMessage: DiscussionMessage = {
          speaker: expert.id,
          content: generatePersonalizedFallbackResponse(expert.id, this.challenge),
          round: this.currentRound,
          timestamp: new Date(),
        };
        
        roundMessages.push(fallbackMessage);
        this.messages.push(fallbackMessage);
        console.log(`Added fallback response for expert ${expert.name}`);
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
      contextPrompt += "This is the first round of discussion. Provide your initial perspective on this challenge in 2-3 sentences.";
    } else {
      contextPrompt += `This is round ${this.currentRound} of ${this.maxRounds}. Previous discussion:\n`;
      
      // Include last 3 messages for context
      const recentMessages = this.messages.slice(-3);
      for (const msg of recentMessages) {
        const speakerName = this.experts.find(e => e.id === msg.speaker)?.name || msg.speaker;
        contextPrompt += `${speakerName}: ${msg.content}\n\n`;
      }
      
      contextPrompt += "Build upon the previous discussion while maintaining your unique perspective. Reference other experts' ideas when relevant. Respond in 2-3 sentences.";
    }
    
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
