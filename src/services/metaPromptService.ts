
import { ExpertConfig } from '@/components/ExpertCardList';
import { EXPERT_PROMPTS } from './expertConfig';

export interface DiscussionPhase {
  name: string;
  description: string;
  expertRole: string;
  interactionStyle: string;
  responseGuidelines: string;
}

export interface ChallengeAnalysis {
  domain: string;
  complexity: 'low' | 'medium' | 'high';
  requiredExpertise: string[];
  keyThemes: string[];
  approachSuggestions: Record<string, string>;
}

export class MetaPromptService {
  private getDiscussionPhases(totalRounds: number): DiscussionPhase[] {
    if (totalRounds <= 5) {
      return [
        {
          name: 'Initial Analysis',
          description: 'Domain-specific initial analysis and unique perspectives',
          expertRole: 'Primary Domain Expert',
          interactionStyle: 'Independent analysis focusing on your area of expertise',
          responseGuidelines: 'Provide your unique perspective based on your domain knowledge. Be specific and insightful.'
        },
        {
          name: 'Cross-Dialogue',
          description: 'Cross-expert dialogue and building upon ideas',
          expertRole: 'Collaborative Contributor',
          interactionStyle: 'Build upon others\' ideas while maintaining your unique viewpoint',
          responseGuidelines: 'Reference other experts\' contributions and expand or connect them to your domain expertise.'
        },
        {
          name: 'Synthesis',
          description: 'Synthesis and solution formulation',
          expertRole: 'Solution Synthesizer',
          interactionStyle: 'Integrate multiple perspectives into actionable insights',
          responseGuidelines: 'Synthesize the discussion into practical solutions or deeper understanding.'
        }
      ];
    } else if (totalRounds <= 8) {
      return [
        {
          name: 'Domain Perspectives',
          description: 'Individual domain-specific analysis',
          expertRole: 'Domain Specialist',
          interactionStyle: 'Deep dive into your area of expertise',
          responseGuidelines: 'Provide comprehensive analysis from your domain perspective. Be thorough and specific.'
        },
        {
          name: 'Cross-Pollination',
          description: 'Cross-expert interaction and idea building',
          expertRole: 'Collaborative Thinker',
          interactionStyle: 'Connect with other experts\' ideas and build bridges',
          responseGuidelines: 'Reference and build upon previous contributions. Find connections between different domains.'
        },
        {
          name: 'Critical Analysis',
          description: 'Critical evaluation and refinement',
          expertRole: 'Critical Evaluator',
          interactionStyle: 'Constructively challenge and refine ideas',
          responseGuidelines: 'Critically evaluate proposed solutions. Identify strengths, weaknesses, and improvements.'
        },
        {
          name: 'Solution Synthesis',
          description: 'Collaborative synthesis and solutions',
          expertRole: 'Solution Architect',
          interactionStyle: 'Integrate insights into comprehensive solutions',
          responseGuidelines: 'Create comprehensive solutions that integrate multiple expert perspectives.'
        }
      ];
    } else {
      return [
        {
          name: 'Individual Analysis',
          description: 'Deep individual domain analysis',
          expertRole: 'Domain Authority',
          interactionStyle: 'Comprehensive analysis from your unique perspective',
          responseGuidelines: 'Provide deep, comprehensive analysis from your domain. Be thorough and insightful.'
        },
        {
          name: 'Initial Interaction',
          description: 'Initial cross-expert interaction',
          expertRole: 'Engaging Collaborator',
          interactionStyle: 'Begin connecting with other experts\' perspectives',
          responseGuidelines: 'Start building connections with other experts\' ideas while maintaining your unique viewpoint.'
        },
        {
          name: 'Deep Exploration',
          description: 'Deep exploration and idea development',
          expertRole: 'Idea Developer',
          interactionStyle: 'Develop and expand upon emerging themes',
          responseGuidelines: 'Develop complex ideas that emerged from the discussion. Add depth and nuance.'
        },
        {
          name: 'Critical Evaluation',
          description: 'Critical evaluation and refinement',
          expertRole: 'Critical Analyst',
          interactionStyle: 'Rigorously evaluate and refine proposals',
          responseGuidelines: 'Critically analyze proposed solutions. Identify potential issues and improvements.'
        },
        {
          name: 'Comprehensive Synthesis',
          description: 'Synthesis and comprehensive solutions',
          expertRole: 'Master Synthesizer',
          interactionStyle: 'Create comprehensive, integrated solutions',
          responseGuidelines: 'Synthesize all discussions into comprehensive, actionable solutions and insights.'
        }
      ];
    }
  }

  private getCurrentPhase(currentRound: number, totalRounds: number): DiscussionPhase {
    const phases = this.getDiscussionPhases(totalRounds);
    const progress = (currentRound - 1) / (totalRounds - 1);
    const phaseIndex = Math.min(Math.floor(progress * phases.length), phases.length - 1);
    return phases[phaseIndex];
  }

  private analyzeChallengeForExpert(challenge: string, expertId: string): ChallengeAnalysis {
    const expertDomains: Record<string, string[]> = {
      leonardo: ['art', 'engineering', 'anatomy', 'innovation', 'design'],
      curie: ['science', 'physics', 'chemistry', 'research', 'methodology'],
      socrates: ['philosophy', 'ethics', 'logic', 'questioning', 'wisdom'],
      hypatia: ['mathematics', 'astronomy', 'teaching', 'reasoning', 'equality'],
      einstein: ['physics', 'relativity', 'thought-experiments', 'innovation', 'creativity'],
      confucius: ['ethics', 'governance', 'social-harmony', 'relationships', 'virtue'],
      lovelace: ['mathematics', 'computing', 'algorithms', 'analytical-thinking', 'innovation'],
      machiavelli: ['politics', 'strategy', 'power-dynamics', 'pragmatism', 'human-nature']
    };

    const expertDomain = expertDomains[expertId] || ['general'];
    
    // Simple keyword-based analysis
    const challengeLower = challenge.toLowerCase();
    const complexity = challengeLower.length > 200 ? 'high' : challengeLower.length > 100 ? 'medium' : 'low';
    
    const keyThemes = expertDomain.filter(domain => 
      challengeLower.includes(domain) || 
      challengeLower.includes(domain.replace('-', ' '))
    );

    return {
      domain: expertDomain[0],
      complexity,
      requiredExpertise: expertDomain,
      keyThemes,
      approachSuggestions: {
        [expertId]: `Approach this challenge from your ${expertDomain[0]} expertise, focusing on ${keyThemes.length > 0 ? keyThemes.join(' and ') : 'core principles'}.`
      }
    };
  }

  private buildContextualPrompt(
    expert: ExpertConfig,
    challenge: string,
    currentRound: number,
    totalRounds: number,
    previousMessages: Array<{ speaker: string; content: string }>
  ): string {
    const basePrompt = EXPERT_PROMPTS[expert.id] || "You are a thoughtful expert providing insights on complex challenges.";
    const phase = this.getCurrentPhase(currentRound, totalRounds);
    const analysis = this.analyzeChallengeForExpert(challenge, expert.id);

    let contextualPrompt = `${basePrompt}\n\n`;

    // Add cognitive trait modifiers
    if (expert.cognitive.creativity > 70) {
      contextualPrompt += "You approach problems with exceptional creativity and unconventional thinking. ";
    }
    if (expert.cognitive.skepticism > 70) {
      contextualPrompt += "You maintain a healthy skepticism and rigorously question assumptions. ";
    }
    if (expert.cognitive.optimism > 70) {
      contextualPrompt += "You maintain an optimistic outlook while being realistic about challenges. ";
    }

    contextualPrompt += `\n=== CURRENT DISCUSSION CONTEXT ===\n`;
    contextualPrompt += `Challenge: ${challenge}\n`;
    contextualPrompt += `Discussion Round: ${currentRound} of ${totalRounds}\n`;
    contextualPrompt += `Discussion Phase: ${phase.name} - ${phase.description}\n`;
    contextualPrompt += `Your Role: ${phase.expertRole}\n`;
    contextualPrompt += `Interaction Style: ${phase.interactionStyle}\n\n`;

    // Add challenge analysis
    contextualPrompt += `=== CHALLENGE ANALYSIS ===\n`;
    contextualPrompt += `Primary Domain: ${analysis.domain}\n`;
    contextualPrompt += `Complexity Level: ${analysis.complexity}\n`;
    contextualPrompt += `Your Approach: ${analysis.approachSuggestions[expert.id]}\n\n`;

    // Add previous discussion context
    if (previousMessages.length > 0) {
      contextualPrompt += `=== PREVIOUS DISCUSSION ===\n`;
      const recentMessages = previousMessages.slice(-3);
      recentMessages.forEach(msg => {
        const speakerName = this.getExpertName(msg.speaker);
        contextualPrompt += `${speakerName}: ${msg.content}\n\n`;
      });
    }

    // Add specific instructions based on round
    contextualPrompt += `=== YOUR TASK ===\n`;
    contextualPrompt += `${phase.responseGuidelines}\n\n`;

    if (currentRound === 1) {
      contextualPrompt += `This is the opening round. Provide your initial expert analysis of the challenge from your unique perspective. Focus on insights that only you can provide based on your expertise and historical experience.\n\n`;
    } else if (currentRound === totalRounds) {
      contextualPrompt += `This is the final round. Synthesize the discussion into actionable conclusions or deeper understanding. Build upon the collective wisdom shared while maintaining your unique perspective.\n\n`;
    } else {
      contextualPrompt += `Build upon the ongoing discussion. Reference relevant points from other experts when appropriate, but maintain your unique perspective and expertise.\n\n`;
    }

    contextualPrompt += `RESPONSE GUIDELINES:\n`;
    contextualPrompt += `- Length: 2-4 thoughtful sentences\n`;
    contextualPrompt += `- Depth: Provide specific, actionable insights\n`;
    contextualPrompt += `- Style: Maintain your authentic voice and expertise\n`;
    contextualPrompt += `- Engagement: ${currentRound > 1 ? 'Reference other experts when relevant' : 'Focus on your unique contribution'}\n`;
    contextualPrompt += `- Value: Ensure your response adds meaningful value to the discussion\n\n`;

    return contextualPrompt;
  }

  private getExpertName(expertId: string): string {
    const names: Record<string, string> = {
      leonardo: 'Leonardo da Vinci',
      curie: 'Marie Curie',
      socrates: 'Socrates',
      hypatia: 'Hypatia of Alexandria',
      einstein: 'Albert Einstein',
      confucius: 'Confucius',
      lovelace: 'Ada Lovelace',
      machiavelli: 'Niccolò Machiavelli'
    };
    return names[expertId] || expertId;
  }

  public generateExpertPrompt(
    expert: ExpertConfig,
    challenge: string,
    currentRound: number,
    totalRounds: number,
    previousMessages: Array<{ speaker: string; content: string }>
  ): string {
    console.log(`🎯 MetaPromptService: Generating enhanced prompt for ${expert.name} (Round ${currentRound}/${totalRounds})`);
    
    const prompt = this.buildContextualPrompt(
      expert,
      challenge,
      currentRound,
      totalRounds,
      previousMessages
    );

    console.log(`📝 MetaPromptService: Generated prompt for ${expert.name}, length: ${prompt.length} characters`);
    return prompt;
  }
}
