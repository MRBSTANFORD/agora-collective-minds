import { ExpertConfig } from '@/components/ExpertCardList';
import { generateAIResponse } from './responseGenerator';
import { generatePersonalizedFallbackResponse } from './fallbackResponses';
import { MetaPromptService } from './metaPromptService';

export interface DiscussionMessage {
  speaker: string;
  content: string;
  round: number;
  timestamp: Date;
}

export type { AIProvider } from './aiProviders';

// Main discussion orchestrator with enhanced prompting and dynamic round support
export class DiscussionOrchestrator {
  private experts: ExpertConfig[];
  private challenge: string;
  private maxRounds: number;
  private messages: DiscussionMessage[];
  private currentRound: number;
  private metaPromptService: MetaPromptService;

  constructor(experts: ExpertConfig[], challenge: string, maxRounds: number) {
    console.log('🏗️ Creating DiscussionOrchestrator with enhanced prompting:', { 
      experts: experts?.length || 0, 
      challenge: challenge?.slice(0, 50) || 'No challenge', 
      maxRounds 
    });
    
    // Log detailed expert configuration
    if (experts && experts.length > 0) {
      console.log('🏗️ Expert configurations:');
      experts.forEach(expert => {
        console.log(`  - ${expert.name} (${expert.id}): ${expert.provider}, API Key: ${expert.apiKey ? expert.apiKey.slice(0, 8) + '...' : 'none'}`);
      });
    }
    
    this.experts = experts || [];
    this.challenge = challenge || '';
    this.maxRounds = maxRounds || 5;
    this.messages = [];
    this.currentRound = 0;
    this.metaPromptService = new MetaPromptService();
    
    // Validate inputs
    if (!this.experts.length) {
      console.warn('⚠️ DiscussionOrchestrator created with no experts');
    }
    if (!this.challenge.trim()) {
      console.warn('⚠️ DiscussionOrchestrator created with empty challenge');
    }
    
    console.log(`✅ DiscussionOrchestrator created with ${maxRounds} rounds support`);
  }

  async generateRound(): Promise<DiscussionMessage[]> {
    console.log(`🎬 Starting round ${this.currentRound + 1} of ${this.maxRounds} with enhanced prompting`);
    this.currentRound++;
    const roundMessages: DiscussionMessage[] = [];

    if (!this.experts || this.experts.length === 0) {
      console.error('❌ No experts available for discussion');
      return [];
    }

    console.log(`👥 Processing ${this.experts.length} experts for round ${this.currentRound}`);

    // Process experts sequentially to avoid rate limiting
    for (let i = 0; i < this.experts.length; i++) {
      const expert = this.experts[i];
      console.log(`🎯 [${i + 1}/${this.experts.length}] Generating enhanced response for expert: ${expert.name} (${expert.id})`);
      console.log(`🔧 Expert config: Provider=${expert.provider}, API Key=${expert.apiKey ? expert.apiKey.slice(0, 8) + '...' : 'none'}`);
      
      try {
        // Use the new MetaPromptService for sophisticated prompt generation
        const expertPrompt = this.metaPromptService.generateExpertPrompt(
          expert,
          this.challenge,
          this.currentRound,
          this.maxRounds,
          this.messages.map(m => ({ speaker: m.speaker, content: m.content }))
        );
        
        console.log(`📝 Generated enhanced prompt for ${expert.name}: ${expertPrompt.slice(0, 100)}...`);
        
        // Validate expert configuration before making API call
        if (!expert.provider) {
          console.warn(`⚠️ Expert ${expert.name} has no provider, defaulting to HuggingFace`);
          expert.provider = 'HuggingFace';
        }
        
        // Add timeout wrapper for AI response generation
        const response = await Promise.race([
          generateAIResponse(
            expertPrompt,
            expert.provider || 'HuggingFace',
            expert.apiKey || '',
            expert.id
          ),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Response timeout')), 45000)
          )
        ]);

        if (!response || response.trim().length === 0) {
          throw new Error('Empty response received');
        }

        const message: DiscussionMessage = {
          speaker: expert.id,
          content: response,
          round: this.currentRound,
          timestamp: new Date(),
        };

        roundMessages.push(message);
        this.messages.push(message);
        console.log(`✅ Expert ${expert.name} enhanced response generated successfully: ${response.slice(0, 50)}...`);
        
        // Small delay between experts to avoid overwhelming APIs
        if (i < this.experts.length - 1) {
          console.log(`⏱️ Waiting 500ms before next expert...`);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`💥 Error generating response for expert ${expert.name} (${expert.provider}):`, error);
        
        // Add fallback message even on error to keep discussion flowing
        const fallbackContent = generatePersonalizedFallbackResponse(expert.id, this.challenge);
        const fallbackMessage: DiscussionMessage = {
          speaker: expert.id,
          content: fallbackContent,
          round: this.currentRound,
          timestamp: new Date(),
        };
        
        roundMessages.push(fallbackMessage);
        this.messages.push(fallbackMessage);
        console.log(`🔄 Added fallback response for expert ${expert.name}: ${fallbackContent.slice(0, 50)}...`);
      }
    }

    console.log(`🏁 Round ${this.currentRound} completed with ${roundMessages.length} messages`);
    
    if (roundMessages.length === 0) {
      console.error('❌ No messages generated in this round - this should not happen with fallbacks');
    }
    
    return roundMessages;
  }

  getMessages(): DiscussionMessage[] {
    return this.messages;
  }

  getCurrentRound(): number {
    return this.currentRound;
  }

  isComplete(): boolean {
    const complete = this.currentRound >= this.maxRounds;
    console.log(`🎯 Discussion complete check: ${complete} (round ${this.currentRound}/${this.maxRounds})`);
    return complete;
  }
}
