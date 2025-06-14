import { ExpertConfig } from '@/components/ExpertCardList';
import { EXPERT_PROMPTS, applyCognitiveTraits } from './expertConfig';
import { generateAIResponse } from './responseGenerator';
import { generatePersonalizedFallbackResponse } from './fallbackResponses';

export interface DiscussionMessage {
  speaker: string;
  content: string;
  round: number;
  timestamp: Date;
}

export type { AIProvider } from './aiProviders';

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
