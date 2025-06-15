
import { DiscussionMessage } from '@/services/aiOrchestrator';
import { generateAIResponse } from './responseGenerator';

export interface InsightMetrics {
  transcendenceScore: number;
  noveltyLevel: number;
  crossDisciplinaryConnections: number;
  paradigmShiftPotential: number;
  emergenceIndicators: string[];
}

export interface EvolutionNode {
  id: string;
  content: string;
  round: number;
  speaker: string;
  parentNodes: string[];
  transcendenceScore: number;
  connections: string[];
  timestamp: Date;
}

export interface TranscendentInsight {
  id: string;
  content: string;
  type: 'breakthrough' | 'synthesis' | 'emergence' | 'paradigm-shift';
  confidence: number;
  contributingExperts: string[];
  crossDisciplinaryConnections: string[];
  evolutionPath: string[];
  metrics: InsightMetrics;
  generatedAt: Date;
}

export interface WisdomSynthesis {
  collectiveIntelligence: string;
  emergentPatterns: string[];
  consensusAreas: string[];
  creativeSymbiosis: string[];
  transcendentMoments: TranscendentInsight[];
  wisdomEvolution: EvolutionNode[];
}

export class AdvancedReportGenerator {
  private messages: DiscussionMessage[];
  private challenge: string;
  private wisdomAccumulation: WisdomSynthesis;
  private insightEvolutionMap: Map<string, EvolutionNode>;

  constructor(messages: DiscussionMessage[], challenge: string) {
    this.messages = messages;
    this.challenge = challenge;
    this.wisdomAccumulation = this.initializeWisdomSynthesis();
    this.insightEvolutionMap = new Map();
    this.buildInsightEvolutionMap();
  }

  private initializeWisdomSynthesis(): WisdomSynthesis {
    return {
      collectiveIntelligence: '',
      emergentPatterns: [],
      consensusAreas: [],
      creativeSymbiosis: [],
      transcendentMoments: [],
      wisdomEvolution: []
    };
  }

  private buildInsightEvolutionMap(): void {
    this.messages.forEach((message, index) => {
      const node: EvolutionNode = {
        id: `node_${index}`,
        content: message.content,
        round: message.round,
        speaker: message.speaker,
        parentNodes: this.findParentNodes(message, index),
        transcendenceScore: this.calculateTranscendenceScore(message),
        connections: this.findCrossReferences(message),
        timestamp: message.timestamp
      };
      
      this.insightEvolutionMap.set(node.id, node);
      this.wisdomAccumulation.wisdomEvolution.push(node);
    });
  }

  private findParentNodes(message: DiscussionMessage, currentIndex: number): string[] {
    const parentNodes: string[] = [];
    const messageContent = message.content.toLowerCase();
    
    // Look for explicit references to previous experts
    this.messages.slice(0, currentIndex).forEach((prevMessage, prevIndex) => {
      if (this.hasSemanticConnection(messageContent, prevMessage.content.toLowerCase())) {
        parentNodes.push(`node_${prevIndex}`);
      }
    });
    
    return parentNodes;
  }

  private hasSemanticConnection(current: string, previous: string): boolean {
    // Simplified semantic connection detection
    const keywords = ['building on', 'as mentioned', 'expanding', 'connecting', 'synthesizing'];
    return keywords.some(keyword => current.includes(keyword)) ||
           this.getSharedConcepts(current, previous).length > 0;
  }

  private getSharedConcepts(text1: string, text2: string): string[] {
    const concepts1 = this.extractConcepts(text1);
    const concepts2 = this.extractConcepts(text2);
    return concepts1.filter(concept => concepts2.includes(concept));
  }

  private extractConcepts(text: string): string[] {
    // Extract meaningful concepts (simplified implementation)
    const words = text.split(' ').filter(word => word.length > 4);
    return [...new Set(words)];
  }

  private findCrossReferences(message: DiscussionMessage): string[] {
    const content = message.content.toLowerCase();
    const references: string[] = [];
    
    // Look for references to other experts or their ideas
    const expertNames = ['leonardo', 'curie', 'socrates', 'hypatia', 'einstein', 'confucius', 'lovelace', 'machiavelli'];
    expertNames.forEach(expert => {
      if (content.includes(expert) && expert !== message.speaker) {
        references.push(expert);
      }
    });
    
    return references;
  }

  private calculateTranscendenceScore(message: DiscussionMessage): number {
    const content = message.content.toLowerCase();
    let score = 0;
    
    // Innovation indicators
    const innovationWords = ['breakthrough', 'revolutionary', 'paradigm', 'unprecedented', 'transcend'];
    innovationWords.forEach(word => {
      if (content.includes(word)) score += 20;
    });
    
    // Synthesis indicators
    const synthesisWords = ['synthesis', 'integration', 'combining', 'merging', 'unifying'];
    synthesisWords.forEach(word => {
      if (content.includes(word)) score += 15;
    });
    
    // Cross-disciplinary indicators
    const crossWords = ['interdisciplinary', 'multifaceted', 'holistic', 'comprehensive'];
    crossWords.forEach(word => {
      if (content.includes(word)) score += 10;
    });
    
    // Complexity and depth
    score += Math.min(message.content.length / 50, 30);
    
    return Math.min(score, 100);
  }

  async generateAdvancedReport(
    reportType: string,
    options: {
      useAiEnhancement?: boolean;
      model?: string;
      provider?: string;
    } = {}
  ): Promise<{
    title: string;
    content: string;
    insights: TranscendentInsight[];
    synthesis: WisdomSynthesis;
    generatedAt: Date;
  }> {
    console.log(`🧠 Generating advanced AI-powered report: ${reportType}`);
    
    const transcendentInsights = await this.detectTranscendentInsights(options);
    const wisdomSynthesis = await this.performWisdomSynthesis(options);
    
    let content: string;
    if (options.useAiEnhancement && options.provider && options.model) {
      content = await this.generateAIEnhancedReport(reportType, transcendentInsights, wisdomSynthesis, options);
    } else {
      content = this.generateStructuredReport(reportType, transcendentInsights, wisdomSynthesis);
    }
    
    return {
      title: this.getReportTitle(reportType),
      content,
      insights: transcendentInsights,
      synthesis: wisdomSynthesis,
      generatedAt: new Date()
    };
  }

  private async detectTranscendentInsights(options: any): Promise<TranscendentInsight[]> {
    const insights: TranscendentInsight[] = [];
    
    // Analyze each message for transcendent qualities
    this.messages.forEach((message, index) => {
      const transcendenceScore = this.calculateTranscendenceScore(message);
      
      if (transcendenceScore > 60) { // Threshold for transcendence
        const insight: TranscendentInsight = {
          id: `insight_${index}`,
          content: message.content,
          type: this.classifyInsightType(message),
          confidence: transcendenceScore / 100,
          contributingExperts: [message.speaker],
          crossDisciplinaryConnections: this.findCrossReferences(message),
          evolutionPath: this.traceEvolutionPath(message, index),
          metrics: {
            transcendenceScore,
            noveltyLevel: this.calculateNoveltyLevel(message),
            crossDisciplinaryConnections: this.findCrossReferences(message).length,
            paradigmShiftPotential: this.calculateParadigmShiftPotential(message),
            emergenceIndicators: this.identifyEmergenceIndicators(message)
          },
          generatedAt: message.timestamp
        };
        
        insights.push(insight);
      }
    });
    
    return insights.sort((a, b) => b.confidence - a.confidence);
  }

  private classifyInsightType(message: DiscussionMessage): 'breakthrough' | 'synthesis' | 'emergence' | 'paradigm-shift' {
    const content = message.content.toLowerCase();
    
    if (content.includes('breakthrough') || content.includes('revolutionary')) {
      return 'breakthrough';
    } else if (content.includes('synthesis') || content.includes('combining')) {
      return 'synthesis';
    } else if (content.includes('emerge') || content.includes('transcend')) {
      return 'emergence';
    } else {
      return 'paradigm-shift';
    }
  }

  private calculateNoveltyLevel(message: DiscussionMessage): number {
    // Simplified novelty calculation based on unique concept density
    const concepts = this.extractConcepts(message.content);
    const uniqueConcepts = concepts.filter(concept => 
      this.messages.filter(m => m !== message && m.content.includes(concept)).length === 0
    );
    
    return Math.min((uniqueConcepts.length / concepts.length) * 100, 100);
  }

  private calculateParadigmShiftPotential(message: DiscussionMessage): number {
    const content = message.content.toLowerCase();
    const paradigmWords = ['paradigm', 'revolutionary', 'fundamental', 'transform', 'redefine'];
    let potential = 0;
    
    paradigmWords.forEach(word => {
      if (content.includes(word)) potential += 20;
    });
    
    return Math.min(potential, 100);
  }

  private identifyEmergenceIndicators(message: DiscussionMessage): string[] {
    const content = message.content.toLowerCase();
    const indicators: string[] = [];
    
    const emergencePatterns = [
      { pattern: 'emerge', indicator: 'Natural emergence detected' },
      { pattern: 'transcend', indicator: 'Transcendence signal found' },
      { pattern: 'synthesis', indicator: 'Synthesis capability identified' },
      { pattern: 'collective', indicator: 'Collective intelligence marker' },
      { pattern: 'interconnect', indicator: 'System interconnection noted' }
    ];
    
    emergencePatterns.forEach(({ pattern, indicator }) => {
      if (content.includes(pattern)) {
        indicators.push(indicator);
      }
    });
    
    return indicators;
  }

  private traceEvolutionPath(message: DiscussionMessage, currentIndex: number): string[] {
    const path: string[] = [];
    const messageContent = message.content.toLowerCase();
    
    // Find conceptual lineage
    this.messages.slice(0, currentIndex).forEach((prevMessage, prevIndex) => {
      if (this.hasSemanticConnection(messageContent, prevMessage.content.toLowerCase())) {
        path.push(`node_${prevIndex}`);
      }
    });
    
    return path;
  }

  private async performWisdomSynthesis(options: any): Promise<WisdomSynthesis> {
    const synthesis: WisdomSynthesis = {
      collectiveIntelligence: await this.synthesizeCollectiveIntelligence(options),
      emergentPatterns: this.identifyEmergentPatterns(),
      consensusAreas: this.findConsensusAreas(),
      creativeSymbiosis: this.detectCreativeSymbiosis(),
      transcendentMoments: await this.detectTranscendentInsights(options),
      wisdomEvolution: Array.from(this.insightEvolutionMap.values())
    };
    
    return synthesis;
  }

  private async synthesizeCollectiveIntelligence(options: any): Promise<string> {
    if (options.useAiEnhancement) {
      const prompt = this.buildCollectiveIntelligencePrompt();
      try {
        return await generateAIResponse(prompt, options.provider, '', 'collective_synthesizer');
      } catch (error) {
        console.warn('AI synthesis failed, using structured approach:', error);
      }
    }
    
    return this.performStructuredCollectiveIntelligenceSynthesis();
  }

  private buildCollectiveIntelligencePrompt(): string {
    return `
# Collective Intelligence Synthesis Task

Analyze this expert symposium discussion and identify the collective intelligence that emerged:

## Challenge:
${this.challenge}

## Expert Contributions:
${this.messages.map(m => `**${m.speaker}** (Round ${m.round}): ${m.content}`).join('\n\n')}

## Your Mission:
Synthesize the collective intelligence that emerged from this discussion. Look for:
1. Ideas that transcended individual expert perspectives
2. Emergent insights that arose from expert interactions
3. Collective wisdom that no single expert could have achieved alone
4. Synergistic breakthroughs created through intellectual symbiosis

Provide a comprehensive analysis of the collective intelligence phenomenon in this symposium.
    `;
  }

  private performStructuredCollectiveIntelligenceSynthesis(): string {
    const expertContributions = this.groupMessagesByExpert();
    const crossReferences = this.analyzeExpertInteractions();
    
    let synthesis = `# Collective Intelligence Analysis\n\n`;
    synthesis += `This symposium demonstrated remarkable collective intelligence through ${this.messages.length} expert contributions across ${Math.max(...this.messages.map(m => m.round))} rounds.\n\n`;
    
    synthesis += `## Emergent Collective Insights:\n`;
    synthesis += `- Multi-perspective synthesis across ${Object.keys(expertContributions).length} distinct domains\n`;
    synthesis += `- Cross-expert reference density: ${crossReferences.totalReferences} connections\n`;
    synthesis += `- Collective knowledge building through iterative refinement\n\n`;
    
    return synthesis;
  }

  private groupMessagesByExpert(): Record<string, DiscussionMessage[]> {
    return this.messages.reduce((acc, message) => {
      if (!acc[message.speaker]) acc[message.speaker] = [];
      acc[message.speaker].push(message);
      return acc;
    }, {} as Record<string, DiscussionMessage[]>);
  }

  private analyzeExpertInteractions(): { totalReferences: number; interactions: any[] } {
    let totalReferences = 0;
    const interactions: any[] = [];
    
    this.messages.forEach(message => {
      const references = this.findCrossReferences(message);
      totalReferences += references.length;
      if (references.length > 0) {
        interactions.push({
          speaker: message.speaker,
          references,
          round: message.round
        });
      }
    });
    
    return { totalReferences, interactions };
  }

  private identifyEmergentPatterns(): string[] {
    const patterns: string[] = [];
    const allContent = this.messages.map(m => m.content).join(' ').toLowerCase();
    
    const patternKeywords = [
      { pattern: 'systematic approach', frequency: (allContent.match(/systematic/g) || []).length },
      { pattern: 'interdisciplinary integration', frequency: (allContent.match(/interdisciplinary|integration/g) || []).length },
      { pattern: 'innovative solutions', frequency: (allContent.match(/innovative|novel/g) || []).length },
      { pattern: 'collaborative wisdom', frequency: (allContent.match(/collaborate|together/g) || []).length }
    ];
    
    patternKeywords
      .filter(p => p.frequency > 1)
      .sort((a, b) => b.frequency - a.frequency)
      .forEach(p => patterns.push(`${p.pattern} (${p.frequency} occurrences)`));
    
    return patterns;
  }

  private findConsensusAreas(): string[] {
    const consensusThemes: string[] = [];
    const expertPositions = this.analyzeExpertPositions();
    
    // Find themes mentioned by multiple experts
    const themeCount: Record<string, number> = {};
    
    Object.values(expertPositions).forEach(positions => {
      positions.forEach(theme => {
        themeCount[theme] = (themeCount[theme] || 0) + 1;
      });
    });
    
    Object.entries(themeCount)
      .filter(([_, count]) => count > 1)
      .sort(([, a], [, b]) => b - a)
      .forEach(([theme, count]) => {
        consensusThemes.push(`${theme} (${count} experts agree)`);
      });
    
    return consensusThemes;
  }

  private analyzeExpertPositions(): Record<string, string[]> {
    const positions: Record<string, string[]> = {};
    
    this.messages.forEach(message => {
      if (!positions[message.speaker]) positions[message.speaker] = [];
      
      // Extract key themes from each expert's contributions
      const themes = this.extractConcepts(message.content);
      positions[message.speaker].push(...themes);
    });
    
    return positions;
  }

  private detectCreativeSymbiosis(): string[] {
    const symbiosis: string[] = [];
    const expertInteractions = this.analyzeExpertInteractions();
    
    expertInteractions.interactions.forEach(interaction => {
      if (interaction.references.length > 1) {
        symbiosis.push(
          `${interaction.speaker} synthesized insights from ${interaction.references.join(', ')} in round ${interaction.round}`
        );
      }
    });
    
    return symbiosis;
  }

  private async generateAIEnhancedReport(
    reportType: string,
    insights: TranscendentInsight[],
    synthesis: WisdomSynthesis,
    options: any
  ): Promise<string> {
    const prompt = this.buildEnhancedReportPrompt(reportType, insights, synthesis);
    
    try {
      return await generateAIResponse(prompt, options.provider, options.apiKey || '', `report_${reportType}`);
    } catch (error) {
      console.warn('AI report generation failed, using structured approach:', error);
      return this.generateStructuredReport(reportType, insights, synthesis);
    }
  }

  private buildEnhancedReportPrompt(
    reportType: string,
    insights: TranscendentInsight[],
    synthesis: WisdomSynthesis
  ): string {
    return `
# AI-Enhanced Report Generation Task

Generate a comprehensive ${reportType} report from this expert symposium:

## Challenge: 
${this.challenge}

## Transcendent Insights Detected:
${insights.map(insight => `
- **${insight.type.toUpperCase()}**: ${insight.content.slice(0, 200)}...
  - Confidence: ${(insight.confidence * 100).toFixed(1)}%
  - Cross-connections: ${insight.crossDisciplinaryConnections.join(', ')}
  - Emergence indicators: ${insight.metrics.emergenceIndicators.join(', ')}
`).join('\n')}

## Collective Intelligence Synthesis:
${synthesis.collectiveIntelligence}

## Emergent Patterns:
${synthesis.emergentPatterns.join('\n- ')}

## Your Mission:
Create a sophisticated ${reportType} report that:
1. Synthesizes the collective wisdom authentically
2. Highlights transcendent insights and their significance
3. Traces the evolution of ideas across expert contributions
4. Demonstrates the emergent intelligence that arose from collaboration
5. Provides actionable wisdom that transcends individual expert capabilities

Make this a masterpiece of collective intelligence synthesis.
    `;
  }

  private generateStructuredReport(
    reportType: string,
    insights: TranscendentInsight[],
    synthesis: WisdomSynthesis
  ): string {
    let report = `# ${this.getReportTitle(reportType)}\n\n`;
    
    report += `## Executive Summary\n`;
    report += `This symposium generated ${insights.length} transcendent insights through collaborative dialogue among distinguished experts.\n\n`;
    
    report += `## Transcendent Insights Discovered\n`;
    insights.forEach((insight, index) => {
      report += `### ${index + 1}. ${insight.type.replace('-', ' ').toUpperCase()}\n`;
      report += `**Confidence:** ${(insight.confidence * 100).toFixed(1)}%\n`;
      report += `**Contributing Experts:** ${insight.contributingExperts.join(', ')}\n`;
      report += `**Cross-Disciplinary Connections:** ${insight.crossDisciplinaryConnections.join(', ')}\n`;
      report += `**Content:** ${insight.content.slice(0, 300)}...\n\n`;
    });
    
    report += `## Collective Intelligence Synthesis\n`;
    report += `${synthesis.collectiveIntelligence}\n\n`;
    
    report += `## Emergent Patterns\n`;
    synthesis.emergentPatterns.forEach(pattern => {
      report += `- ${pattern}\n`;
    });
    
    return report;
  }

  private getReportTitle(reportType: string): string {
    const titles: Record<string, string> = {
      summary: 'Collective Wisdom Synthesis',
      consensus: 'Emergent Consensus & Shared Transcendence',
      divergent: 'Creative Tensions & Divergent Insights',
      innovative: 'Transcendent Innovation & Breakthrough Solutions',
      practical: 'Actionable Wisdom from Collective Intelligence',
      ethical: 'Ethical Transcendence & Moral Emergence',
      historical: 'Historical Wisdom & Temporal Synthesis',
      personal: 'Personalized Transcendent Action Framework'
    };
    
    return titles[reportType] || 'Advanced Symposium Analysis';
  }
}
