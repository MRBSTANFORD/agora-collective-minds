
import { ExpertConfig } from '@/components/ExpertCardList';
import { EXPERT_PROMPTS, applyCognitiveTraits, getExpertPrompt } from './expertConfig';
import { DiscussionMessage } from './aiOrchestrator';

export interface DiscussionIntelligence {
  wisdomMomentum: number;
  transcendenceIndicators: string[];
  collectiveEmergence: string[];
  paradigmShiftPotential: number;
  crossDisciplinaryConnections: number;
  intellectualSymbiosis: string[];
}

export interface AdaptivePromptContext {
  discussionQuality: number;
  expertSynergy: number;
  emergentInsights: string[];
  challengeEvolution: string[];
  wisdomAccumulation: string[];
  transcendentMoments: string[];
}

export class EnhancedMetaPromptService {
  private discussionIntelligence: DiscussionIntelligence;
  private adaptiveContext: AdaptivePromptContext;

  constructor() {
    this.discussionIntelligence = this.initializeDiscussionIntelligence();
    this.adaptiveContext = this.initializeAdaptiveContext();
  }

  private initializeDiscussionIntelligence(): DiscussionIntelligence {
    return {
      wisdomMomentum: 0,
      transcendenceIndicators: [],
      collectiveEmergence: [],
      paradigmShiftPotential: 0,
      crossDisciplinaryConnections: 0,
      intellectualSymbiosis: []
    };
  }

  private initializeAdaptiveContext(): AdaptivePromptContext {
    return {
      discussionQuality: 0,
      expertSynergy: 0,
      emergentInsights: [],
      challengeEvolution: [],
      wisdomAccumulation: [],
      transcendentMoments: []
    };
  }

  public generateTranscendentPrompt(
    expert: ExpertConfig,
    challenge: string,
    currentRound: number,
    totalRounds: number,
    previousMessages: DiscussionMessage[]
  ): string {
    console.log(`🔮 Generating transcendent prompt for ${expert.name} (Round ${currentRound}/${totalRounds})`);
    
    // Update intelligence analysis
    this.updateDiscussionIntelligence(previousMessages);
    this.updateAdaptiveContext(previousMessages, currentRound, totalRounds);
    
    // Get enhanced base prompt
    const basePrompt = getExpertPrompt(expert.id) || "You are a transcendent expert.";
    const cognitivelyEnhanced = applyCognitiveTraits(basePrompt, expert.cognitive);
    
    return this.buildTranscendentPrompt(
      cognitivelyEnhanced,
      expert,
      challenge,
      currentRound,
      totalRounds,
      previousMessages
    );
  }

  private updateDiscussionIntelligence(messages: DiscussionMessage[]): void {
    const lastFewMessages = messages.slice(-6); // Analyze recent discussion flow
    
    // Calculate wisdom momentum
    this.discussionIntelligence.wisdomMomentum = this.calculateWisdomMomentum(lastFewMessages);
    
    // Detect transcendence indicators
    this.discussionIntelligence.transcendenceIndicators = this.detectTranscendenceIndicators(lastFewMessages);
    
    // Identify collective emergence
    this.discussionIntelligence.collectiveEmergence = this.identifyCollectiveEmergence(lastFewMessages);
    
    // Assess paradigm shift potential
    this.discussionIntelligence.paradigmShiftPotential = this.assessParadigmShiftPotential(lastFewMessages);
    
    // Count cross-disciplinary connections
    this.discussionIntelligence.crossDisciplinaryConnections = this.countCrossDisciplinaryConnections(lastFewMessages);
    
    // Detect intellectual symbiosis
    this.discussionIntelligence.intellectualSymbiosis = this.detectIntellectualSymbiosis(lastFewMessages);
  }

  private calculateWisdomMomentum(messages: DiscussionMessage[]): number {
    if (messages.length === 0) return 0;
    
    let momentum = 0;
    const avgLength = messages.reduce((sum, m) => sum + m.content.length, 0) / messages.length;
    
    // Complexity momentum
    momentum += Math.min(avgLength / 100, 30);
    
    // Reference momentum
    const totalReferences = messages.reduce((sum, m) => 
      sum + (m.content.match(/as .* mentioned|building on|expanding/gi) || []).length, 0);
    momentum += totalReferences * 10;
    
    // Innovation momentum
    const innovationWords = messages.reduce((sum, m) => 
      sum + (m.content.match(/breakthrough|revolutionary|transcend|emerge/gi) || []).length, 0);
    momentum += innovationWords * 15;
    
    return Math.min(momentum, 100);
  }

  private detectTranscendenceIndicators(messages: DiscussionMessage[]): string[] {
    const indicators: string[] = [];
    const allContent = messages.map(m => m.content).join(' ').toLowerCase();
    
    const transcendencePatterns = [
      { pattern: /transcend|transcendence/gi, indicator: 'Direct transcendence language detected' },
      { pattern: /paradigm.*shift|revolutionary.*change/gi, indicator: 'Paradigm shift signals identified' },
      { pattern: /collective.*intelligence|emergent.*wisdom/gi, indicator: 'Collective intelligence emergence noted' },
      { pattern: /synthesis.*breakthrough|synergistic.*innovation/gi, indicator: 'Synthesis breakthrough potential observed' },
      { pattern: /interconnect.*everything|holistic.*integration/gi, indicator: 'Holistic integration patterns emerging' }
    ];
    
    transcendencePatterns.forEach(({ pattern, indicator }) => {
      if (pattern.test(allContent)) {
        indicators.push(indicator);
      }
    });
    
    return indicators;
  }

  private identifyCollectiveEmergence(messages: DiscussionMessage[]): string[] {
    const emergence: string[] = [];
    
    // Look for building on previous ideas
    messages.forEach(message => {
      const content = message.content.toLowerCase();
      if (content.includes('building on') || content.includes('expanding')) {
        emergence.push(`${message.speaker} built upon collective wisdom in round ${message.round}`);
      }
      if (content.includes('synthesis') || content.includes('integration')) {
        emergence.push(`${message.speaker} contributed to synthesis in round ${message.round}`);
      }
    });
    
    return emergence.slice(0, 5); // Limit to most significant
  }

  private assessParadigmShiftPotential(messages: DiscussionMessage[]): number {
    let potential = 0;
    const allContent = messages.map(m => m.content).join(' ').toLowerCase();
    
    const shiftIndicators = ['paradigm', 'revolutionary', 'fundamental change', 'transform completely', 'redefine'];
    shiftIndicators.forEach(indicator => {
      const matches = (allContent.match(new RegExp(indicator, 'gi')) || []).length;
      potential += matches * 20;
    });
    
    return Math.min(potential, 100);
  }

  private countCrossDisciplinaryConnections(messages: DiscussionMessage[]): number {
    let connections = 0;
    
    messages.forEach(message => {
      const references = this.extractExpertReferences(message.content);
      if (references.length > 0 && !references.includes(message.speaker)) {
        connections += references.length;
      }
    });
    
    return connections;
  }

  private extractExpertReferences(content: string): string[] {
    const expertNames = ['leonardo', 'curie', 'socrates', 'hypatia', 'einstein', 'confucius', 'lovelace', 'machiavelli'];
    const lowerContent = content.toLowerCase();
    
    return expertNames.filter(name => lowerContent.includes(name));
  }

  private detectIntellectualSymbiosis(messages: DiscussionMessage[]): string[] {
    const symbiosis: string[] = [];
    
    messages.forEach(message => {
      const content = message.content.toLowerCase();
      const references = this.extractExpertReferences(content);
      
      if (references.length > 1) {
        symbiosis.push(`Multi-expert synthesis by ${message.speaker}: ${references.join(' + ')}`);
      }
      
      if (content.includes('synthesizing') && references.length > 0) {
        symbiosis.push(`Intellectual bridge by ${message.speaker} connecting ${references.join(', ')}`);
      }
    });
    
    return symbiosis;
  }

  private updateAdaptiveContext(messages: DiscussionMessage[], currentRound: number, totalRounds: number): void {
    this.adaptiveContext.discussionQuality = this.assessDiscussionQuality(messages);
    this.adaptiveContext.expertSynergy = this.calculateExpertSynergy(messages);
    this.adaptiveContext.emergentInsights = this.extractEmergentInsights(messages);
    this.adaptiveContext.challengeEvolution = this.trackChallengeEvolution(messages);
    this.adaptiveContext.wisdomAccumulation = this.trackWisdomAccumulation(messages);
    this.adaptiveContext.transcendentMoments = this.identifyTranscendentMoments(messages);
  }

  private assessDiscussionQuality(messages: DiscussionMessage[]): number {
    if (messages.length === 0) return 0;
    
    const avgComplexity = messages.reduce((sum, m) => sum + m.content.length, 0) / messages.length;
    const referenceDensity = messages.reduce((sum, m) => 
      sum + this.extractExpertReferences(m.content).length, 0) / messages.length;
    
    return Math.min((avgComplexity / 20) + (referenceDensity * 30), 100);
  }

  private calculateExpertSynergy(messages: DiscussionMessage[]): number {
    const expertInteractions = new Map<string, Set<string>>();
    
    messages.forEach(message => {
      const references = this.extractExpertReferences(message.content);
      if (!expertInteractions.has(message.speaker)) {
        expertInteractions.set(message.speaker, new Set());
      }
      references.forEach(ref => expertInteractions.get(message.speaker)?.add(ref));
    });
    
    const totalConnections = Array.from(expertInteractions.values())
      .reduce((sum, connections) => sum + connections.size, 0);
    
    return Math.min(totalConnections * 10, 100);
  }

  private extractEmergentInsights(messages: DiscussionMessage[]): string[] {
    const insights: string[] = [];
    
    messages.forEach(message => {
      const content = message.content.toLowerCase();
      if (content.includes('insight') || content.includes('realization') || content.includes('breakthrough')) {
        insights.push(`${message.speaker}: ${message.content.slice(0, 100)}...`);
      }
    });
    
    return insights.slice(0, 3);
  }

  private trackChallengeEvolution(messages: DiscussionMessage[]): string[] {
    const evolution: string[] = [];
    const challengeKeywords = ['challenge', 'problem', 'question', 'issue'];
    
    messages.forEach(message => {
      const content = message.content.toLowerCase();
      challengeKeywords.forEach(keyword => {
        if (content.includes(keyword)) {
          evolution.push(`Round ${message.round}: ${message.speaker} addressed ${keyword}`);
        }
      });
    });
    
    return evolution.slice(0, 5);
  }

  private trackWisdomAccumulation(messages: DiscussionMessage[]): string[] {
    const wisdom: string[] = [];
    
    messages.forEach(message => {
      if (message.content.length > 800) { // Substantial contributions
        wisdom.push(`Round ${message.round}: Deep wisdom from ${message.speaker}`);
      }
    });
    
    return wisdom;
  }

  private identifyTranscendentMoments(messages: DiscussionMessage[]): string[] {
    const moments: string[] = [];
    
    messages.forEach(message => {
      const transcendenceScore = this.calculateTranscendenceScore(message.content);
      if (transcendenceScore > 70) {
        moments.push(`Round ${message.round}: Transcendent moment by ${message.speaker} (${transcendenceScore}%)`);
      }
    });
    
    return moments;
  }

  private calculateTranscendenceScore(content: string): number {
    const lowerContent = content.toLowerCase();
    let score = 0;
    
    const transcendenceWords = ['transcend', 'breakthrough', 'paradigm', 'revolutionary', 'synthesis'];
    transcendenceWords.forEach(word => {
      if (lowerContent.includes(word)) score += 20;
    });
    
    if (content.length > 1000) score += 10; // Depth bonus
    if ((content.match(/\?/g) || []).length > 2) score += 10; // Inquiry bonus
    
    return Math.min(score, 100);
  }

  private buildTranscendentPrompt(
    basePrompt: string,
    expert: ExpertConfig,
    challenge: string,
    currentRound: number,
    totalRounds: number,
    previousMessages: DiscussionMessage[]
  ): string {
    let prompt = `${basePrompt}\n\n`;
    
    prompt += `=== TRANSCENDENT SYMPOSIUM CONTEXT ===\n`;
    prompt += `You are participating in an extraordinary symposium designed to generate transcendent insights and collective wisdom.\n\n`;
    
    prompt += `CHALLENGE FOR TRANSCENDENCE:\n`;
    prompt += `"${challenge}"\n\n`;
    
    prompt += `CURRENT SYMPOSIUM INTELLIGENCE:\n`;
    prompt += `• Round: ${currentRound} of ${totalRounds}\n`;
    prompt += `• Wisdom Momentum: ${this.discussionIntelligence.wisdomMomentum.toFixed(1)}%\n`;
    prompt += `• Paradigm Shift Potential: ${this.discussionIntelligence.paradigmShiftPotential.toFixed(1)}%\n`;
    prompt += `• Cross-Disciplinary Connections: ${this.discussionIntelligence.crossDisciplinaryConnections}\n`;
    prompt += `• Discussion Quality: ${this.adaptiveContext.discussionQuality.toFixed(1)}%\n`;
    prompt += `• Expert Synergy Level: ${this.adaptiveContext.expertSynergy.toFixed(1)}%\n\n`;
    
    if (this.discussionIntelligence.transcendenceIndicators.length > 0) {
      prompt += `TRANSCENDENCE INDICATORS DETECTED:\n`;
      this.discussionIntelligence.transcendenceIndicators.forEach(indicator => {
        prompt += `• ${indicator}\n`;
      });
      prompt += `\n`;
    }
    
    if (this.discussionIntelligence.collectiveEmergence.length > 0) {
      prompt += `COLLECTIVE EMERGENCE PATTERNS:\n`;
      this.discussionIntelligence.collectiveEmergence.forEach(pattern => {
        prompt += `• ${pattern}\n`;
      });
      prompt += `\n`;
    }
    
    if (this.discussionIntelligence.intellectualSymbiosis.length > 0) {
      prompt += `INTELLECTUAL SYMBIOSIS OBSERVED:\n`;
      this.discussionIntelligence.intellectualSymbiosis.forEach(symbiosis => {
        prompt += `• ${symbiosis}\n`;
      });
      prompt += `\n`;
    }
    
    // Include recent discussion context
    if (previousMessages.length > 0) {
      prompt += `=== EVOLVING WISDOM DISCOURSE ===\n`;
      const recentMessages = previousMessages.slice(-8);
      recentMessages.forEach(message => {
        const preview = message.content.slice(0, 150) + (message.content.length > 150 ? '...' : '');
        prompt += `**${this.getExpertName(message.speaker)}** (Round ${message.round}): ${preview}\n\n`;
      });
    }
    
    // Adaptive round-specific instructions
    prompt += this.generateAdaptiveInstructions(currentRound, totalRounds);
    
    prompt += `=== TRANSCENDENT RESPONSE REQUIREMENTS ===\n`;
    prompt += `Your mission is to contribute to collective transcendence through:\n\n`;
    
    prompt += `INTELLECTUAL DEPTH:\n`;
    prompt += `• Provide insights that transcend conventional thinking\n`;
    prompt += `• Draw from your deepest wisdom and historical experience\n`;
    prompt += `• Contribute unique perspectives only you can offer\n`;
    prompt += `• Build upon collective intelligence emerging in the discussion\n\n`;
    
    prompt += `TRANSCENDENT SYNTHESIS:\n`;
    prompt += `• Connect ideas across disciplinary boundaries\n`;
    prompt += `• Identify emerging patterns of collective wisdom\n`;
    prompt += `• Synthesize multiple expert perspectives into higher understanding\n`;
    prompt += `• Contribute to paradigm shifts and breakthrough insights\n\n`;
    
    prompt += `AUTHENTIC VOICE:\n`;
    prompt += `• Maintain your historical authenticity and era's knowledge\n`;
    prompt += `• Use thinking patterns and vocabulary true to your time\n`;
    prompt += `• Reference your actual work, discoveries, and methodologies\n`;
    prompt += `• Demonstrate the cognitive traits that made you legendary\n\n`;
    
    prompt += `COLLECTIVE INTELLIGENCE:\n`;
    prompt += `• Engage with other experts' contributions meaningfully\n`;
    prompt += `• Build intellectual bridges between different perspectives\n`;
    prompt += `• Contribute to the symposium's collective emergence\n`;
    prompt += `• Help create insights that transcend individual expertise\n\n`;
    
    prompt += `RESPONSE STRUCTURE:\n`;
    prompt += `• 4-6 substantial paragraphs of transcendent insight\n`;
    prompt += `• Begin with your perspective on the challenge's essence\n`;
    if (currentRound > 1) {
      prompt += `• Reference and build upon previous expert contributions\n`;
    }
    prompt += `• Develop your unique analytical framework\n`;
    prompt += `• Conclude with actionable wisdom or breakthrough insights\n\n`;
    
    prompt += `Remember: This symposium seeks to generate collective wisdom that transcends what any individual expert could achieve alone. Your contribution should embody the highest expression of your historical genius while contributing to our shared transcendent purpose.\n`;
    
    return prompt;
  }

  private generateAdaptiveInstructions(currentRound: number, totalRounds: number): string {
    let instructions = `=== ADAPTIVE ROUND GUIDANCE ===\n`;
    
    const progressRatio = currentRound / totalRounds;
    
    if (progressRatio <= 0.3) {
      instructions += `SYMPOSIUM OPENING PHASE:\n`;
      instructions += `• Establish your foundational wisdom and analytical framework\n`;
      instructions += `• Provide comprehensive domain expertise to build upon\n`;
      instructions += `• Set intellectual tone for transcendent discourse\n`;
      instructions += `• Create rich conceptual foundation for collective building\n\n`;
    } else if (progressRatio <= 0.7) {
      instructions += `COLLECTIVE BUILDING PHASE:\n`;
      instructions += `• Build meaningfully on emerging collective insights\n`;
      instructions += `• Create intellectual bridges between expert perspectives\n`;
      instructions += `• Synthesize multiple viewpoints into higher understanding\n`;
      instructions += `• Contribute to paradigm shifts and breakthrough moments\n\n`;
    } else {
      instructions += `TRANSCENDENT SYNTHESIS PHASE:\n`;
      instructions += `• Synthesize the collective wisdom into definitive insights\n`;
      instructions += `• Provide your masterful final contribution to the challenge\n`;
      instructions += `• Integrate multiple perspectives into actionable wisdom\n`;
      instructions += `• Create lasting transcendent insights for implementation\n\n`;
    }
    
    return instructions;
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
}
