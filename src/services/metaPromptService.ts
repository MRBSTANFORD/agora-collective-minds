
import { ExpertConfig } from '@/components/ExpertCardList';
import { EXPERT_PROMPTS, applyCognitiveTraits, getExpertPrompt } from './expertConfig';

export interface DiscussionPhase {
  name: string;
  description: string;
  expertRole: string;
  interactionStyle: string;
  responseGuidelines: string;
  depthRequirement: string;
}

export interface ChallengeAnalysis {
  domain: string;
  complexity: 'low' | 'medium' | 'high';
  requiredExpertise: string[];
  keyThemes: string[];
  historicalParallels: string[];
  innovationPotential: number;
  implementationChallenges: string[];
  stakeholders: string[];
  ethicalConsiderations: string[];
}

export class MetaPromptService {
  private getDiscussionPhases(totalRounds: number): DiscussionPhase[] {
    if (totalRounds <= 3) {
      return [
        {
          name: 'Foundation & Initial Analysis',
          description: 'Establish foundational understanding and provide initial expert analysis',
          expertRole: 'Domain Authority & Foundational Analyst',
          interactionStyle: 'Deep individual analysis from your unique historical and disciplinary perspective',
          responseGuidelines: 'Provide comprehensive initial analysis drawing from your core expertise. Establish the foundational framework for understanding this challenge through your disciplinary lens.',
          depthRequirement: '4-5 substantive paragraphs with specific historical and methodological references'
        },
        {
          name: 'Synthesis & Integration',
          description: 'Integrate perspectives and develop comprehensive solutions',
          expertRole: 'Collaborative Synthesizer & Solution Architect',
          interactionStyle: 'Build meaningfully on other experts\' contributions while maintaining your unique perspective',
          responseGuidelines: 'Reference and expand upon previous contributions. Integrate multiple perspectives into more comprehensive understanding and actionable solutions.',
          depthRequirement: '3-4 paragraphs with explicit connections to other experts\' insights'
        }
      ];
    } else if (totalRounds <= 5) {
      return [
        {
          name: 'Initial Domain Analysis',
          description: 'Domain-specific initial analysis and unique perspectives',
          expertRole: 'Primary Domain Expert & Historical Authority',
          interactionStyle: 'Independent deep analysis focusing on your area of expertise and historical experience',
          responseGuidelines: 'Provide your unique perspective based on domain knowledge and historical experience. Be specific, insightful, and draw from your actual work and methodologies.',
          depthRequirement: '4-5 substantive paragraphs with rich historical context and specific examples'
        },
        {
          name: 'Cross-Perspective Dialogue',
          description: 'Cross-expert dialogue and collaborative idea building',
          expertRole: 'Collaborative Contributor & Perspective Bridge',
          interactionStyle: 'Engage meaningfully with other experts\' ideas while maintaining your distinctive viewpoint',
          responseGuidelines: 'Reference other experts\' contributions and expand or connect them to your domain expertise. Build bridges between perspectives while maintaining your authentic voice.',
          depthRequirement: '3-4 paragraphs with explicit engagement with previous contributions'
        },
        {
          name: 'Solution Synthesis & Integration',
          description: 'Synthesis and comprehensive solution formulation',
          expertRole: 'Master Synthesizer & Wisdom Integrator',
          interactionStyle: 'Integrate multiple perspectives into actionable insights and comprehensive solutions',
          responseGuidelines: 'Synthesize the discussion into practical solutions or deeper understanding. Provide your final wisdom on how to proceed, integrating insights from all perspectives.',
          depthRequirement: '4 paragraphs focusing on integration, synthesis, and actionable wisdom'
        }
      ];
    } else if (totalRounds <= 8) {
      return [
        {
          name: 'Deep Domain Exploration',
          description: 'Comprehensive individual domain-specific analysis',
          expertRole: 'Domain Specialist & Historical Authority',
          interactionStyle: 'Profound dive into your area of expertise with historical context',
          responseGuidelines: 'Provide comprehensive analysis from your domain perspective. Be thorough, specific, and draw extensively from your historical work and methodologies.',
          depthRequirement: '5-6 paragraphs with extensive historical references and methodological depth'
        },
        {
          name: 'Cross-Pollination & Connection',
          description: 'Cross-expert interaction and interdisciplinary bridge-building',
          expertRole: 'Collaborative Thinker & Disciplinary Bridge',
          interactionStyle: 'Connect meaningfully with other experts\' ideas and build intellectual bridges',
          responseGuidelines: 'Reference and build upon previous contributions. Find connections between different domains and historical periods. Create intellectual bridges.',
          depthRequirement: '4 paragraphs with substantial cross-referencing and connection-building'
        },
        {
          name: 'Critical Analysis & Refinement',
          description: 'Critical evaluation, challenge, and solution refinement',
          expertRole: 'Critical Evaluator & Solution Refiner',
          interactionStyle: 'Constructively challenge, evaluate, and refine emerging ideas',
          responseGuidelines: 'Critically evaluate proposed solutions. Identify strengths, weaknesses, and improvements. Challenge assumptions and refine approaches.',
          depthRequirement: '3-4 paragraphs of rigorous critical analysis and constructive refinement'
        },
        {
          name: 'Comprehensive Solution Architecture',
          description: 'Collaborative synthesis and comprehensive solution development',
          expertRole: 'Solution Architect & Wisdom Synthesizer',
          interactionStyle: 'Integrate insights into comprehensive, actionable solutions',
          responseGuidelines: 'Create comprehensive solutions that integrate multiple expert perspectives. Provide your final wisdom and practical guidance.',
          depthRequirement: '4-5 paragraphs of comprehensive synthesis and actionable guidance'
        }
      ];
    } else {
      return [
        {
          name: 'Foundational Analysis',
          description: 'Deep individual domain analysis with historical foundation',
          expertRole: 'Domain Authority & Historical Foundation',
          interactionStyle: 'Comprehensive analysis from your unique perspective and historical experience',
          responseGuidelines: 'Provide deep, comprehensive analysis from your domain and historical period. Establish the foundational understanding from your perspective.',
          depthRequirement: '5-6 paragraphs with extensive historical context and domain expertise'
        },
        {
          name: 'Initial Cross-Engagement',
          description: 'Initial cross-expert interaction and perspective sharing',
          expertRole: 'Engaging Collaborator & Perspective Contributor',
          interactionStyle: 'Begin connecting with other experts\' perspectives while maintaining authenticity',
          responseGuidelines: 'Start building connections with other experts\' ideas while maintaining your unique viewpoint and historical authenticity.',
          depthRequirement: '4 paragraphs with initial cross-expert engagement and perspective sharing'
        },
        {
          name: 'Deep Collaborative Exploration',
          description: 'Deep exploration and collaborative idea development',
          expertRole: 'Collaborative Idea Developer & Innovation Catalyst',
          interactionStyle: 'Develop and expand upon emerging themes through collaboration',
          responseGuidelines: 'Develop complex ideas that emerged from the discussion. Add depth, nuance, and innovative thinking to evolving themes.',
          depthRequirement: '4-5 paragraphs of deep collaborative development and innovation'
        },
        {
          name: 'Rigorous Critical Evaluation',
          description: 'Critical evaluation, testing, and rigorous analysis',
          expertRole: 'Critical Analyst & Solution Tester',
          interactionStyle: 'Rigorously evaluate, test, and analyze emerging proposals',
          responseGuidelines: 'Critically analyze proposed solutions. Test assumptions, identify potential issues, and suggest improvements with rigorous analysis.',
          depthRequirement: '3-4 paragraphs of thorough critical analysis and testing'
        },
        {
          name: 'Master Synthesis & Wisdom Integration',
          description: 'Synthesis and comprehensive solution architecture',
          expertRole: 'Master Synthesizer & Wisdom Architect',
          interactionStyle: 'Create comprehensive, integrated solutions drawing from all perspectives',
          responseGuidelines: 'Synthesize all discussions into comprehensive, actionable solutions and insights. Provide your masterful final contribution.',
          depthRequirement: '5-6 paragraphs of comprehensive synthesis and masterful integration'
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
    const challengeLower = challenge.toLowerCase();
    
    // Enhanced domain mapping with more sophisticated analysis
    const expertDomains: Record<string, {
      primary: string[],
      secondary: string[],
      methodologies: string[],
      historicalContext: string[],
      modernRelevance: string[]
    }> = {
      leonardo: {
        primary: ['innovation', 'design', 'engineering', 'art', 'anatomy'],
        secondary: ['systems-thinking', 'observation', 'experimentation', 'interdisciplinary'],
        methodologies: ['empirical-observation', 'analogical-reasoning', 'visual-thinking', 'systematic-investigation'],
        historicalContext: ['renaissance', 'artistic-revolution', 'scientific-method', 'mechanical-engineering'],
        modernRelevance: ['innovation-management', 'design-thinking', 'interdisciplinary-collaboration', 'creative-problem-solving']
      },
      curie: {
        primary: ['science', 'research', 'methodology', 'physics', 'chemistry'],
        secondary: ['persistence', 'evidence-based', 'systematic-investigation', 'breakthrough-discovery'],
        methodologies: ['scientific-method', 'empirical-research', 'systematic-experimentation', 'rigorous-analysis'],
        historicalContext: ['scientific-revolution', 'gender-barriers', 'academic-breakthrough', 'nobel-prize'],
        modernRelevance: ['scientific-research', 'evidence-based-decision', 'systematic-methodology', 'breakthrough-innovation']
      },
      socrates: {
        primary: ['philosophy', 'ethics', 'wisdom', 'questioning', 'logic'],
        secondary: ['critical-thinking', 'moral-reasoning', 'dialectical-method', 'self-knowledge'],
        methodologies: ['socratic-method', 'dialectical-inquiry', 'philosophical-questioning', 'logical-analysis'],
        historicalContext: ['ancient-philosophy', 'athenian-democracy', 'moral-philosophy', 'philosophical-foundation'],
        modernRelevance: ['critical-thinking', 'ethical-analysis', 'decision-making', 'moral-leadership']
      },
      hypatia: {
        primary: ['mathematics', 'astronomy', 'philosophy', 'education', 'logic'],
        secondary: ['geometric-thinking', 'systematic-analysis', 'inclusive-education', 'rational-discourse'],
        methodologies: ['mathematical-analysis', 'geometric-reasoning', 'systematic-teaching', 'logical-proof'],
        historicalContext: ['alexandria-library', 'ancient-mathematics', 'women-in-science', 'philosophical-education'],
        modernRelevance: ['mathematical-modeling', 'systematic-analysis', 'educational-innovation', 'inclusive-leadership']
      },
      einstein: {
        primary: ['physics', 'relativity', 'theoretical-thinking', 'innovation', 'creativity'],
        secondary: ['thought-experiments', 'fundamental-questions', 'mathematical-beauty', 'conceptual-breakthrough'],
        methodologies: ['thought-experiments', 'theoretical-analysis', 'mathematical-modeling', 'conceptual-innovation'],
        historicalContext: ['modern-physics', 'scientific-revolution', 'theoretical-breakthrough', 'paradigm-shift'],
        modernRelevance: ['theoretical-innovation', 'paradigm-thinking', 'creative-analysis', 'fundamental-research']
      },
      confucius: {
        primary: ['ethics', 'governance', 'social-harmony', 'education', 'virtue'],
        secondary: ['moral-leadership', 'social-systems', 'character-development', 'practical-wisdom'],
        methodologies: ['moral-example', 'systematic-education', 'social-analysis', 'virtue-cultivation'],
        historicalContext: ['ancient-china', 'confucian-philosophy', 'governmental-reform', 'educational-philosophy'],
        modernRelevance: ['leadership-development', 'organizational-culture', 'social-responsibility', 'ethical-governance']
      },
      lovelace: {
        primary: ['mathematics', 'computation', 'algorithms', 'innovation', 'technology'],
        secondary: ['analytical-thinking', 'systematic-programming', 'visionary-thinking', 'logical-design'],
        methodologies: ['algorithmic-thinking', 'systematic-analysis', 'computational-design', 'logical-programming'],
        historicalContext: ['early-computing', 'mathematical-innovation', 'technological-vision', 'analytical-engine'],
        modernRelevance: ['computational-thinking', 'algorithmic-design', 'technological-innovation', 'systematic-programming']
      },
      machiavelli: {
        primary: ['politics', 'strategy', 'governance', 'power-dynamics', 'realism'],
        secondary: ['strategic-thinking', 'human-nature', 'practical-effectiveness', 'political-analysis'],
        methodologies: ['strategic-analysis', 'political-observation', 'practical-assessment', 'power-analysis'],
        historicalContext: ['renaissance-politics', 'florentine-republic', 'political-theory', 'diplomatic-experience'],
        modernRelevance: ['strategic-planning', 'organizational-politics', 'leadership-effectiveness', 'change-management']
      }
    };

    const expertProfile = expertDomains[expertId] || expertDomains['socrates'];
    
    // Sophisticated complexity analysis
    const wordCount = challenge.split(' ').length;
    const technicalTerms = ['technology', 'system', 'process', 'method', 'strategy', 'implementation'].filter(term => 
      challengeLower.includes(term)
    ).length;
    const stakeholderTerms = ['people', 'team', 'organization', 'community', 'society', 'stakeholder'].filter(term =>
      challengeLower.includes(term)
    ).length;
    
    let complexity: 'low' | 'medium' | 'high';
    if (wordCount > 50 || technicalTerms > 2 || stakeholderTerms > 2) {
      complexity = 'high';
    } else if (wordCount > 20 || technicalTerms > 0 || stakeholderTerms > 0) {
      complexity = 'medium';
    } else {
      complexity = 'low';
    }

    // Identify key themes present in the challenge
    const keyThemes = [...expertProfile.primary, ...expertProfile.secondary].filter(theme => 
      challengeLower.includes(theme.replace('-', ' ')) || 
      challengeLower.includes(theme)
    );

    // Historical parallels identification
    const historicalParallels = expertProfile.historicalContext.filter(context =>
      keyThemes.some(theme => context.includes(theme.split('-')[0]))
    );

    // Innovation potential assessment
    const innovationKeywords = ['new', 'innovative', 'creative', 'breakthrough', 'novel', 'revolutionary'];
    const innovationPotential = Math.min(10, innovationKeywords.filter(keyword => 
      challengeLower.includes(keyword)
    ).length * 2 + (complexity === 'high' ? 3 : complexity === 'medium' ? 2 : 1));

    // Implementation challenges identification
    const implementationChallenges = [
      complexity === 'high' ? 'High complexity requires careful phase planning' : '',
      stakeholderTerms > 1 ? 'Multiple stakeholder coordination needed' : '',
      technicalTerms > 1 ? 'Technical implementation complexity' : '',
      challengeLower.includes('change') ? 'Change management requirements' : '',
      challengeLower.includes('resource') ? 'Resource allocation challenges' : ''
    ].filter(Boolean);

    // Stakeholder identification
    const stakeholders = [
      stakeholderTerms > 0 ? 'Primary stakeholders' : '',
      challengeLower.includes('team') ? 'Team members' : '',
      challengeLower.includes('organization') ? 'Organizational leaders' : '',
      challengeLower.includes('community') || challengeLower.includes('society') ? 'Community members' : '',
      challengeLower.includes('customer') || challengeLower.includes('user') ? 'End users' : ''
    ].filter(Boolean);

    // Ethical considerations
    const ethicalKeywords = ['ethical', 'moral', 'responsibility', 'impact', 'consequence', 'value'];
    const ethicalConsiderations = [
      ethicalKeywords.some(keyword => challengeLower.includes(keyword)) ? 'Direct ethical implications mentioned' : '',
      stakeholderTerms > 1 ? 'Multiple stakeholder impact considerations' : '',
      challengeLower.includes('society') || challengeLower.includes('community') ? 'Societal impact considerations' : '',
      challengeLower.includes('future') || challengeLower.includes('long-term') ? 'Long-term consequence evaluation' : ''
    ].filter(Boolean);

    return {
      domain: expertProfile.primary[0],
      complexity,
      requiredExpertise: expertProfile.primary,
      keyThemes,
      historicalParallels,
      innovationPotential,
      implementationChallenges,
      stakeholders,
      ethicalConsiderations
    };
  }

  private buildEnhancedContextualPrompt(
    expert: ExpertConfig,
    challenge: string,
    currentRound: number,
    totalRounds: number,
    previousMessages: Array<{ speaker: string; content: string }>
  ): string {
    // Get base expert prompt and apply cognitive traits
    const basePrompt = getExpertPrompt(expert.id) || "You are a thoughtful expert providing insights on complex challenges.";
    const enhancedBasePrompt = applyCognitiveTraits(basePrompt, expert.cognitive);
    
    const phase = this.getCurrentPhase(currentRound, totalRounds);
    const analysis = this.analyzeChallengeForExpert(challenge, expert.id);

    let contextualPrompt = `${enhancedBasePrompt}\n\n`;

    contextualPrompt += `=== SYMPOSIUM CONTEXT & YOUR MISSION ===\n`;
    contextualPrompt += `You are participating in an intellectual symposium addressing this challenge:\n`;
    contextualPrompt += `"${challenge}"\n\n`;
    
    contextualPrompt += `CURRENT DISCUSSION PARAMETERS:\n`;
    contextualPrompt += `• Round: ${currentRound} of ${totalRounds}\n`;
    contextualPrompt += `• Discussion Phase: ${phase.name}\n`;
    contextualPrompt += `• Your Role: ${phase.expertRole}\n`;
    contextualPrompt += `• Required Depth: ${phase.depthRequirement}\n\n`;

    // Enhanced challenge analysis section
    contextualPrompt += `=== CHALLENGE ANALYSIS FOR YOUR EXPERTISE ===\n`;
    contextualPrompt += `Primary Domain Relevance: ${analysis.domain}\n`;
    contextualPrompt += `Complexity Assessment: ${analysis.complexity} (requires ${analysis.complexity === 'high' ? 'comprehensive' : analysis.complexity === 'medium' ? 'moderate' : 'focused'} analysis)\n`;
    contextualPrompt += `Key Themes Aligned with Your Expertise: ${analysis.keyThemes.join(', ')}\n`;
    contextualPrompt += `Historical Parallels from Your Era: ${analysis.historicalParallels.join(', ')}\n`;
    contextualPrompt += `Innovation Potential: ${analysis.innovationPotential}/10\n`;
    contextualPrompt += `Implementation Considerations: ${analysis.implementationChallenges.join('; ')}\n`;
    if (analysis.ethicalConsiderations.length > 0) {
      contextualPrompt += `Ethical Dimensions: ${analysis.ethicalConsiderations.join('; ')}\n`;
    }
    contextualPrompt += `\n`;

    // Previous discussion context with sophisticated analysis
    if (previousMessages.length > 0) {
      contextualPrompt += `=== ONGOING SYMPOSIUM DISCOURSE ===\n`;
      contextualPrompt += `The discussion has evolved through ${Math.max(...previousMessages.map((_, i) => Math.floor(i / 8) + 1))} rounds of expert discourse.\n\n`;
      
      // Include the most recent and relevant messages with enhanced context
      const recentMessages = previousMessages.slice(-Math.min(12, previousMessages.length));
      const messagesByRound = recentMessages.reduce((acc, msg, index) => {
        const round = Math.floor((previousMessages.length - recentMessages.length + index) / 8) + 1;
        if (!acc[round]) acc[round] = [];
        acc[round].push(msg);
        return acc;
      }, {} as Record<number, Array<{ speaker: string; content: string }>>);

      Object.entries(messagesByRound).forEach(([round, messages]) => {
        if (messages.length > 0) {
          contextualPrompt += `Round ${round} Contributions:\n`;
          messages.forEach(msg => {
            const speakerName = this.getExpertName(msg.speaker);
            const preview = msg.content.length > 200 ? msg.content.slice(0, 200) + '...' : msg.content;
            contextualPrompt += `• ${speakerName}: ${preview}\n`;
          });
          contextualPrompt += `\n`;
        }
      });

      // Add analytical insights about the discussion evolution
      contextualPrompt += `DISCUSSION EVOLUTION INSIGHTS:\n`;
      contextualPrompt += `• Total expert contributions so far: ${previousMessages.length}\n`;
      contextualPrompt += `• Participating experts: ${[...new Set(previousMessages.map(m => this.getExpertName(m.speaker)))].join(', ')}\n`;
      contextualPrompt += `• Emerging consensus areas: ${this.identifyEmergingConsensus(previousMessages)}\n`;
      contextualPrompt += `• Areas needing further exploration: ${this.identifyGaps(previousMessages, analysis)}\n\n`;
    }

    // Sophisticated round-specific instructions
    contextualPrompt += `=== YOUR SPECIFIC MISSION FOR THIS ROUND ===\n`;
    contextualPrompt += `${phase.responseGuidelines}\n\n`;

    if (currentRound === 1) {
      contextualPrompt += `OPENING ROUND INSTRUCTIONS:\n`;
      contextualPrompt += `This is the symposium's opening. Establish your authoritative voice and provide comprehensive foundational analysis. Draw extensively from your historical work, methods, and discoveries. Set the intellectual tone for your domain's contribution to this challenge.\n\n`;
      contextualPrompt += `Your response should:\n`;
      contextualPrompt += `• Demonstrate deep domain expertise with specific historical references\n`;
      contextualPrompt += `• Establish your unique analytical framework for approaching this challenge\n`;
      contextualPrompt += `• Provide substantive insights that only you can offer based on your historical experience\n`;
      contextualPrompt += `• Create intellectual foundation that other experts can build upon\n\n`;
    } else if (currentRound === totalRounds) {
      contextualPrompt += `SYMPOSIUM CONCLUSION INSTRUCTIONS:\n`;
      contextualPrompt += `This is your final contribution to the symposium. Synthesize the collective wisdom while providing your definitive perspective. Offer your most profound insights and practical guidance based on the entire discussion.\n\n`;
      contextualPrompt += `Your response should:\n`;
      contextualPrompt += `• Synthesize key insights from the entire discussion\n`;
      contextualPrompt += `• Provide your definitive wisdom on the challenge\n`;
      contextualPrompt += `• Offer specific, actionable guidance based on collective insights\n`;
      contextualPrompt += `• Conclude with your most important contribution to the solution\n\n`;
    } else {
      contextualPrompt += `ONGOING DISCOURSE INSTRUCTIONS:\n`;
      contextualPrompt += `Build meaningfully on the evolving discussion. ${phase.interactionStyle} Reference specific contributions from other experts where relevant, but maintain your authentic historical voice and perspective.\n\n`;
      contextualPrompt += `Your response should:\n`;
      contextualPrompt += `• Build on specific points raised by other experts\n`;
      contextualPrompt += `• Introduce new dimensions from your expertise\n`;
      contextualPrompt += `• Develop ideas that bridge different expert perspectives\n`;
      contextualPrompt += `• Advance the discussion toward practical solutions\n\n`;
    }

    // Enhanced response formatting requirements
    contextualPrompt += `=== RESPONSE REQUIREMENTS & STANDARDS ===\n`;
    contextualPrompt += `AUTHENTIC VOICE: Maintain your historical authenticity and speak as the actual historical figure with your era's knowledge and perspective.\n\n`;
    contextualPrompt += `SUBSTANTIAL DEPTH: ${phase.depthRequirement}\n\n`;
    contextualPrompt += `SPECIFIC REQUIREMENTS:\n`;
    contextualPrompt += `• Reference your actual historical work, discoveries, and methods\n`;
    contextualPrompt += `• Use vocabulary and thinking patterns authentic to your era and expertise\n`;
    contextualPrompt += `• Provide specific, actionable insights rather than generalities\n`;
    contextualPrompt += `• Include concrete examples or analogies from your experience\n`;
    contextualPrompt += `• Demonstrate deep engagement with the challenge's complexity\n`;
    if (currentRound > 1) {
      contextualPrompt += `• Make explicit connections to at least one other expert's contribution\n`;
    }
    contextualPrompt += `• Ensure your response adds unique value that only you can provide\n\n`;

    contextualPrompt += `STRUCTURAL GUIDANCE:\n`;
    contextualPrompt += `• Begin with your perspective on the core challenge\n`;
    contextualPrompt += `• Develop your analysis with specific examples and methods\n`;
    if (currentRound > 1) {
      contextualPrompt += `• Connect to relevant points from other experts\n`;
    }
    contextualPrompt += `• Conclude with actionable insights or recommendations\n\n`;

    contextualPrompt += `Remember: You are contributing to a sophisticated intellectual symposium. Your fellow experts are equally distinguished historical figures. Engage at the highest level of intellectual discourse while remaining authentic to your historical identity and expertise.\n`;

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

  private identifyEmergingConsensus(messages: Array<{ speaker: string; content: string }>): string {
    // Simple analysis for emerging themes - in production would use NLP
    const allContent = messages.map(m => m.content).join(' ').toLowerCase();
    const consensusWords = ['systematic', 'practical', 'evidence', 'collaboration', 'method'];
    const foundThemes = consensusWords.filter(word => allContent.includes(word));
    return foundThemes.length > 0 ? foundThemes.slice(0, 3).join(', ') : 'systematic approaches';
  }

  private identifyGaps(messages: Array<{ speaker: string; content: string }>, analysis: ChallengeAnalysis): string {
    // Simple gap analysis - in production would be more sophisticated
    const discussedThemes = messages.map(m => m.content).join(' ').toLowerCase();
    const gaps = [];
    
    if (!discussedThemes.includes('implement') && !discussedThemes.includes('practical')) {
      gaps.push('implementation strategies');
    }
    if (!discussedThemes.includes('risk') && !discussedThemes.includes('challenge')) {
      gaps.push('risk assessment');
    }
    if (analysis.ethicalConsiderations.length > 0 && !discussedThemes.includes('ethical')) {
      gaps.push('ethical implications');
    }
    if (analysis.stakeholders.length > 0 && !discussedThemes.includes('stakeholder')) {
      gaps.push('stakeholder considerations');
    }
    
    return gaps.length > 0 ? gaps.slice(0, 2).join(' and ') : 'technical details';
  }

  public generateExpertPrompt(
    expert: ExpertConfig,
    challenge: string,
    currentRound: number,
    totalRounds: number,
    previousMessages: Array<{ speaker: string; content: string }>
  ): string {
    console.log(`🎯 MetaPromptService: Generating sophisticated prompt for ${expert.name} (Round ${currentRound}/${totalRounds})`);
    
    const prompt = this.buildEnhancedContextualPrompt(
      expert,
      challenge,
      currentRound,
      totalRounds,
      previousMessages
    );

    console.log(`📝 MetaPromptService: Generated enhanced prompt for ${expert.name}, length: ${prompt.length} characters`);
    return prompt;
  }
}
