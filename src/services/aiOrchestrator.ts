import { ExpertConfig } from '@/components/ExpertCardList';
import { generateAIResponse } from './responseGenerator';
import { generatePersonalizedFallbackResponse } from './fallbackResponses';
import { EnhancedMetaPromptService } from './enhancedMetaPromptService';

export interface DiscussionMessage {
  speaker: string;
  content: string;
  round: number;
  timestamp: Date;
}

export type { AIProvider } from './aiProviders';

// Main discussion orchestrator with enhanced error handling and state management
export class DiscussionOrchestrator {
  private experts: ExpertConfig[];
  private challenge: string;
  private maxRounds: number;
  private messages: DiscussionMessage[];
  private currentRound: number; // Track current round (0 = not started, 1-N = active rounds)
  private enhancedMetaPromptService: EnhancedMetaPromptService;

  constructor(experts: ExpertConfig[], challenge: string, maxRounds: number) {
    console.log('🏗️ Creating DiscussionOrchestrator:', { 
      experts: experts?.length || 0, 
      challenge: challenge?.slice(0, 50) || 'No challenge', 
      maxRounds 
    });
    
    // Validate and log expert configurations
    if (experts && experts.length > 0) {
      console.log('🏗️ Expert configurations:');
      experts.forEach(expert => {
        const keyStatus = expert.apiKey ? 
          (expert.apiKey.trim() ? `${expert.apiKey.slice(0, 8)}...` : 'empty') : 
          'none';
        console.log(`  - ${expert.name} (${expert.id}): ${expert.provider}, API Key: ${keyStatus}`);
      });
    }
    
    this.experts = experts || [];
    this.challenge = challenge || '';
    this.maxRounds = maxRounds || 5;
    this.messages = [];
    this.currentRound = 0; // Start at 0, increment when starting each round
    this.enhancedMetaPromptService = new EnhancedMetaPromptService();
    
    // Validate inputs
    if (!this.experts.length) {
      console.warn('⚠️ DiscussionOrchestrator created with no experts');
    }
    if (!this.challenge.trim()) {
      console.warn('⚠️ DiscussionOrchestrator created with empty challenge');
    }
    
    console.log(`✅ DiscussionOrchestrator created for ${maxRounds} rounds`);
  }

  async generateRound(): Promise<DiscussionMessage[]> {
    if (this.isComplete()) {
      console.log('🏁 Discussion already complete, no more rounds to generate');
      return [];
    }

    // Increment round counter at the START of round generation
    this.currentRound++;
    console.log(`🎬 Starting round ${this.currentRound} of ${this.maxRounds}`);
    
    const roundMessages: DiscussionMessage[] = [];

    if (!this.experts || this.experts.length === 0) {
      console.error('❌ No experts available for discussion');
      // Decrement on failure
      this.currentRound--;
      return [];
    }

    console.log(`👥 Processing ${this.experts.length} experts for round ${this.currentRound}`);

    try {
      // Process experts sequentially to avoid rate limiting
      for (let i = 0; i < this.experts.length; i++) {
        const expert = this.experts[i];
        console.log(`🔮 [${i + 1}/${this.experts.length}] Generating response for expert: ${expert.name} (${expert.id}) - Round ${this.currentRound}`);
        console.log(`🔧 Expert config: Provider=${expert.provider}, API Key=${expert.apiKey ? expert.apiKey.slice(0, 8) + '...' : 'none'}`);
        
        try {
          // Use the enhanced MetaPromptService for prompt generation
          const transcendentPrompt = this.enhancedMetaPromptService.generateTranscendentPrompt(
            expert,
            this.challenge,
            this.currentRound,
            this.maxRounds,
            this.messages
          );
          
          console.log(`🌟 Generated prompt for ${expert.name} (Round ${this.currentRound}): ${transcendentPrompt.slice(0, 100)}...`);
          
          // Validate expert configuration before making API call
          if (!expert.provider) {
            console.warn(`⚠️ Expert ${expert.name} has no provider, defaulting to HuggingFace`);
            expert.provider = 'HuggingFace';
          }
          
          // Add timeout wrapper for AI response generation (30 seconds)
          const response = await Promise.race([
            generateAIResponse(
              transcendentPrompt,
              expert.provider || 'HuggingFace',
              expert.apiKey || '',
              expert.id
            ),
            new Promise<string>((_, reject) => 
              setTimeout(() => reject(new Error('Response timeout after 30 seconds')), 30000)
            )
          ]);

          if (!response || response.trim().length === 0) {
            throw new Error('Empty response received from AI provider');
          }

          const message: DiscussionMessage = {
            speaker: expert.id,
            content: response,
            round: this.currentRound, // Use the current round number
            timestamp: new Date(),
          };

          roundMessages.push(message);
          this.messages.push(message);
          console.log(`✨ Expert ${expert.name} response generated successfully for Round ${this.currentRound} (${response.length} chars): ${response.slice(0, 50)}...`);
          
          // Delay between experts to avoid overwhelming APIs
          if (i < this.experts.length - 1) {
            console.log(`⏱️ Waiting 1 second before next expert...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
        } catch (error) {
          console.error(`💥 Error generating response for expert ${expert.name} (${expert.provider}) in Round ${this.currentRound}:`, error);
          
          // Generate fallback message to keep discussion flowing
          const fallbackContent = generatePersonalizedFallbackResponse(expert.id, this.challenge);
          const fallbackMessage: DiscussionMessage = {
            speaker: expert.id,
            content: fallbackContent,
            round: this.currentRound,
            timestamp: new Date(),
          };
          
          roundMessages.push(fallbackMessage);
          this.messages.push(fallbackMessage);
          console.log(`🔄 Added fallback response for expert ${expert.name} in Round ${this.currentRound}: ${fallbackContent.slice(0, 50)}...`);
        }
      }

      console.log(`🏁 Round ${this.currentRound} completed with ${roundMessages.length} messages`);
      
      if (roundMessages.length === 0) {
        console.error(`❌ No messages generated in Round ${this.currentRound} - this should not happen with fallbacks`);
        // Decrement round on failure
        this.currentRound--;
      }
      
    } catch (error) {
      console.error(`💥 Critical error in Round ${this.currentRound}:`, error);
      // Decrement round on critical failure
      this.currentRound--;
      throw error;
    }
    
    return roundMessages;
  }

  getMessages(): DiscussionMessage[] {
    return this.messages;
  }

  getCurrentRound(): number {
    return this.currentRound;
  }

  getMaxRounds(): number {
    return this.maxRounds;
  }

  isComplete(): boolean {
    const complete = this.currentRound >= this.maxRounds;
    console.log(`🎯 Discussion complete check: ${complete} (current round ${this.currentRound}/${this.maxRounds})`);
    return complete;
  }

  // Get progress as percentage
  getProgress(): number {
    return Math.round((this.currentRound / this.maxRounds) * 100);
  }

  // Reset the orchestrator state
  reset(): void {
    console.log('🔄 Resetting DiscussionOrchestrator state');
    this.messages = [];
    this.currentRound = 0;
  }
}
