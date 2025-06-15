import { DiscussionMessage } from '@/services/aiOrchestrator';
import { TranscendentReportGenerator, TranscendentReport } from './transcendentReportGenerator';

export interface ReportData {
  title: string;
  content: string;
  generatedAt: Date;
  metadata?: {
    wordCount: number;
    expertCount: number;
    roundCount: number;
    transcendenceScore?: number;
  };
}

export type ReportGenerationStatus = Record<string, 'pending' | 'generating' | 'completed' | 'error'>;

export class ReportGenerator {
  private transcendentGenerator: TranscendentReportGenerator;
  private messages: DiscussionMessage[];
  private challenge: string;

  constructor(messages: DiscussionMessage[], challenge: string) {
    this.messages = messages;
    this.challenge = challenge;
    this.transcendentGenerator = new TranscendentReportGenerator(messages, challenge);
  }

  async generateReport(
    reportType: string,
    options: {
      useAiEnhancement?: boolean;
      model?: string;
      provider?: string;
      apiKey?: string;
    } = {}
  ): Promise<ReportData> {
    console.log(`📊 Generating ${options.useAiEnhancement ? 'AI-enhanced transcendent' : 'structured'} report: ${reportType}`);

    try {
      if (options.useAiEnhancement) {
        // Use the new transcendent report generator for AI-enhanced reports
        const transcendentReport = await this.transcendentGenerator.generateTranscendentReport(reportType, options);
        
        return {
          title: transcendentReport.title,
          content: transcendentReport.content,
          generatedAt: transcendentReport.generatedAt,
          metadata: {
            wordCount: transcendentReport.content.split(' ').length,
            expertCount: new Set(this.messages.map(m => m.speaker)).size,
            roundCount: Math.max(...this.messages.map(m => m.round), 0),
            transcendenceScore: transcendentReport.transcendenceMetrics.overallTranscendenceScore
          }
        };
      } else {
        // Use structured report generation for non-AI reports
        return this.generateStructuredReport(reportType);
      }
    } catch (error) {
      console.error(`❌ Report generation failed for ${reportType}:`, error);
      // Fallback to basic structured report
      return this.generateStructuredReport(reportType);
    }
  }

  private generateStructuredReport(reportType: string): ReportData {
    const title = this.getReportTitle(reportType);
    const content = this.buildStructuredContent(reportType);
    
    return {
      title,
      content,
      generatedAt: new Date(),
      metadata: {
        wordCount: content.split(' ').length,
        expertCount: new Set(this.messages.map(m => m.speaker)).size,
        roundCount: Math.max(...this.messages.map(m => m.round), 0)
      }
    };
  }

  private buildStructuredContent(reportType: string): string {
    switch (reportType) {
      case 'summary':
        return this.generateSummaryReport();
      case 'consensus':
        return this.generateConsensusReport();
      case 'divergent':
        return this.generateDivergentReport();
      case 'innovative':
        return this.generateInnovativeReport();
      case 'practical':
        return this.generatePracticalReport();
      case 'ethical':
        return this.generateEthicalReport();
      case 'historical':
        return this.generateHistoricalReport();
      case 'personal':
        return this.generatePersonalReport();
      default:
        return this.generateSummaryReport();
    }
  }

  private generateSummaryReport(): string {
    const expertCount = new Set(this.messages.map(m => m.speaker)).size;
    const roundCount = Math.max(...this.messages.map(m => m.round), 0);
    
    let report = `# Comprehensive Discussion Summary\n\n`;
    report += `This symposium brought together ${expertCount} distinguished experts across ${roundCount} rounds of discourse on the challenge: "${this.challenge}"\n\n`;
    
    // Group messages by expert
    const expertContributions = this.groupMessagesByExpert();
    
    report += `## Expert Contributions Overview\n\n`;
    Object.entries(expertContributions).forEach(([expert, messages]) => {
      report += `### ${this.getExpertName(expert)}\n`;
      report += `**Rounds participated:** ${messages.map(m => m.round).join(', ')}\n`;
      report += `**Key insights:** ${messages[0]?.content.slice(0, 200)}...\n\n`;
    });
    
    report += `## Discussion Evolution\n\n`;
    for (let round = 1; round <= roundCount; round++) {
      const roundMessages = this.messages.filter(m => m.round === round);
      if (roundMessages.length > 0) {
        report += `**Round ${round}:** ${roundMessages.length} contributions focusing on ${this.extractRoundThemes(roundMessages)}\n`;
      }
    }
    
    report += `\n## Collective Insights\n\n`;
    report += `The symposium generated substantial collective wisdom through expert collaboration, `;
    report += `with ${this.messages.length} total contributions averaging ${Math.round(this.messages.reduce((sum, m) => sum + m.content.length, 0) / this.messages.length)} characters per insight.\n\n`;
    
    return report;
  }

  private generateConsensusReport(): string {
    let report = `# Consensus & Shared Ideas Analysis\n\n`;
    
    const sharedThemes = this.identifySharedThemes();
    const agreementAreas = this.findAgreementAreas();
    
    report += `## Areas of Expert Consensus\n\n`;
    sharedThemes.forEach((theme, index) => {
      report += `${index + 1}. **${theme.concept}** - Mentioned by ${theme.expertCount} experts\n`;
      report += `   Key points: ${theme.examples.join(', ')}\n\n`;
    });
    
    report += `## Collaborative Agreement Patterns\n\n`;
    agreementAreas.forEach(area => {
      report += `- **${area.topic}**: ${area.description}\n`;
    });
    
    return report;
  }

  private generateDivergentReport(): string {
    let report = `# Divergent & Dissenting Opinions Analysis\n\n`;
    
    const contradictions = this.identifyContradictions();
    const uniquePerspectives = this.extractUniquePerspectives();
    
    report += `## Contrasting Viewpoints\n\n`;
    contradictions.forEach((contradiction, index) => {
      report += `### ${index + 1}. ${contradiction.topic}\n`;
      report += `**Different approaches identified:**\n`;
      contradiction.perspectives.forEach(perspective => {
        report += `- **${perspective.expert}**: ${perspective.viewpoint}\n`;
      });
      report += `\n`;
    });
    
    report += `## Unique Expert Perspectives\n\n`;
    uniquePerspectives.forEach(perspective => {
      report += `**${perspective.expert}**: ${perspective.uniqueContribution}\n\n`;
    });
    
    return report;
  }

  private generateInnovativeReport(): string {
    let report = `# Innovative & Creative Solutions\n\n`;
    
    const innovations = this.identifyInnovations();
    const creativeApproaches = this.extractCreativeApproaches();
    
    report += `## Breakthrough Ideas Identified\n\n`;
    innovations.forEach((innovation, index) => {
      report += `### ${index + 1}. ${innovation.title}\n`;
      report += `**Proposed by:** ${innovation.expert}\n`;
      report += `**Innovation:** ${innovation.description}\n`;
      report += `**Potential impact:** ${innovation.impact}\n\n`;
    });
    
    report += `## Creative Problem-Solving Approaches\n\n`;
    creativeApproaches.forEach(approach => {
      report += `- **${approach.method}** (${approach.expert}): ${approach.description}\n`;
    });
    
    return report;
  }

  private generatePracticalReport(): string {
    let report = `# Practical Recommendations\n\n`;
    
    const actionableItems = this.extractActionableItems();
    const implementationSteps = this.suggestImplementationSteps();
    
    report += `## Immediate Action Items\n\n`;
    actionableItems.forEach((item, index) => {
      report += `${index + 1}. **${item.action}**\n`;
      report += `   - Expert source: ${item.expert}\n`;
      report += `   - Implementation notes: ${item.notes}\n\n`;
    });
    
    report += `## Implementation Strategy\n\n`;
    implementationSteps.forEach((step, index) => {
      report += `### Phase ${index + 1}: ${step.phase}\n`;
      report += `${step.description}\n\n`;
    });
    
    return report;
  }

  private generateEthicalReport(): string {
    let report = `# Ethical & Societal Implications\n\n`;
    
    const ethicalConsiderations = this.identifyEthicalConsiderations();
    const societalImpacts = this.analyzeSocietalImpacts();
    
    report += `## Ethical Considerations Raised\n\n`;
    ethicalConsiderations.forEach(consideration => {
      report += `**${consideration.aspect}** (${consideration.expert})\n`;
      report += `${consideration.description}\n\n`;
    });
    
    report += `## Societal Impact Analysis\n\n`;
    societalImpacts.forEach(impact => {
      report += `- **${impact.area}**: ${impact.implications}\n`;
    });
    
    return report;
  }

  private generateHistoricalReport(): string {
    let report = `# Historical & Contextual Analysis\n\n`;
    
    const historicalParallels = this.identifyHistoricalParallels();
    const temporalInsights = this.extractTemporalInsights();
    
    report += `## Historical Parallels and Lessons\n\n`;
    historicalParallels.forEach(parallel => {
      report += `**${parallel.period}** (via ${parallel.expert})\n`;
      report += `${parallel.lesson}\n\n`;
    });
    
    report += `## Cross-Temporal Wisdom\n\n`;
    temporalInsights.forEach(insight => {
      report += `- **${insight.era}**: ${insight.wisdom}\n`;
    });
    
    return report;
  }

  private generatePersonalReport(): string {
    let report = `# Personalized Action Plan\n\n`;
    
    const personalRecommendations = this.createPersonalRecommendations();
    const customizedSteps = this.generateCustomizedSteps();
    
    report += `## Tailored Recommendations\n\n`;
    personalRecommendations.forEach((rec, index) => {
      report += `### ${index + 1}. ${rec.category}\n`;
      report += `**Recommendation:** ${rec.action}\n`;
      report += `**Rationale:** ${rec.reasoning}\n`;
      report += `**Expert insight:** ${rec.source}\n\n`;
    });
    
    report += `## Implementation Roadmap\n\n`;
    customizedSteps.forEach((step, index) => {
      report += `**Step ${index + 1}:** ${step.action}\n`;
      report += `Timeline: ${step.timeline}\n`;
      report += `Success metrics: ${step.metrics}\n\n`;
    });
    
    return report;
  }

  // Helper methods for data analysis
  private groupMessagesByExpert(): Record<string, DiscussionMessage[]> {
    return this.messages.reduce((acc, message) => {
      if (!acc[message.speaker]) acc[message.speaker] = [];
      acc[message.speaker].push(message);
      return acc;
    }, {} as Record<string, DiscussionMessage[]>);
  }

  private extractRoundThemes(messages: DiscussionMessage[]): string {
    const allContent = messages.map(m => m.content).join(' ').toLowerCase();
    const commonWords = ['approach', 'solution', 'method', 'strategy', 'innovation'];
    const foundThemes = commonWords.filter(word => allContent.includes(word));
    return foundThemes.length > 0 ? foundThemes.join(', ') : 'collaborative discourse';
  }

  private identifySharedThemes(): Array<{ concept: string; expertCount: number; examples: string[] }> {
    const themes: Array<{ concept: string; expertCount: number; examples: string[] }> = [];
    const conceptCounts: Record<string, { count: number; examples: string[] }> = {};
    
    this.messages.forEach(message => {
      const concepts = this.extractConcepts(message.content);
      concepts.forEach(concept => {
        if (!conceptCounts[concept]) {
          conceptCounts[concept] = { count: 0, examples: [] };
        }
        conceptCounts[concept].count++;
        conceptCounts[concept].examples.push(`${message.speaker}: ${concept}`);
      });
    });
    
    Object.entries(conceptCounts)
      .filter(([_, data]) => data.count > 1)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 5)
      .forEach(([concept, data]) => {
        themes.push({
          concept,
          expertCount: data.count,
          examples: data.examples.slice(0, 3)
        });
      });
    
    return themes;
  }

  private extractConcepts(text: string): string[] {
    // Simple concept extraction - in production would use NLP
    const words = text.toLowerCase().split(' ').filter(word => word.length > 4);
    return [...new Set(words)];
  }

  private findAgreementAreas(): Array<{ topic: string; description: string }> {
    // Simplified agreement detection
    return [
      { topic: 'Systematic Approach', description: 'Multiple experts emphasized structured methodology' },
      { topic: 'Collaborative Innovation', description: 'Consensus on the value of interdisciplinary cooperation' }
    ];
  }

  private identifyContradictions(): Array<{
    topic: string;
    perspectives: Array<{ expert: string; viewpoint: string }>
  }> {
    // Simplified contradiction detection
    return [
      {
        topic: 'Implementation Priority',
        perspectives: [
          { expert: 'Expert A', viewpoint: 'Focus on immediate practical solutions' },
          { expert: 'Expert B', viewpoint: 'Emphasize long-term strategic planning' }
        ]
      }
    ];
  }

  private extractUniquePerspectives(): Array<{ expert: string; uniqueContribution: string }> {
    return this.messages
      .filter(message => message.content.length > 500) // Substantial contributions
      .map(message => ({
        expert: this.getExpertName(message.speaker),
        uniqueContribution: message.content.slice(0, 150) + '...'
      }))
      .slice(0, 5);
  }

  private identifyInnovations(): Array<{
    title: string;
    expert: string;
    description: string;
    impact: string;
  }> {
    const innovations: Array<{ title: string; expert: string; description: string; impact: string }> = [];
    
    this.messages.forEach(message => {
      if (message.content.toLowerCase().includes('innovative') || 
          message.content.toLowerCase().includes('breakthrough')) {
        innovations.push({
          title: 'Innovation Identified',
          expert: this.getExpertName(message.speaker),
          description: message.content.slice(0, 200) + '...',
          impact: 'Potential for significant advancement'
        });
      }
    });
    
    return innovations.slice(0, 3);
  }

  private extractCreativeApproaches(): Array<{
    method: string;
    expert: string;
    description: string;
  }> {
    return [
      {
        method: 'Interdisciplinary Synthesis',
        expert: 'Multiple experts',
        description: 'Combining perspectives from different domains for novel solutions'
      }
    ];
  }

  private extractActionableItems(): Array<{
    action: string;
    expert: string;
    notes: string;
  }> {
    const actionable: Array<{ action: string; expert: string; notes: string }> = [];
    
    this.messages.forEach(message => {
      if (message.content.toLowerCase().includes('recommend') ||
          message.content.toLowerCase().includes('suggest') ||
          message.content.toLowerCase().includes('should')) {
        actionable.push({
          action: 'Implement Expert Recommendation',
          expert: this.getExpertName(message.speaker),
          notes: message.content.slice(0, 150) + '...'
        });
      }
    });
    
    return actionable.slice(0, 5);
  }

  private suggestImplementationSteps(): Array<{
    phase: string;
    description: string;
  }> {
    return [
      {
        phase: 'Planning and Preparation',
        description: 'Analyze expert recommendations and create detailed implementation strategy'
      },
      {
        phase: 'Initial Implementation',
        description: 'Begin with highest-priority recommendations from the symposium'
      },
      {
        phase: 'Evaluation and Refinement',
        description: 'Assess progress and refine approach based on expert insights'
      }
    ];
  }

  private identifyEthicalConsiderations(): Array<{
    aspect: string;
    expert: string;
    description: string;
  }> {
    const ethical: Array<{ aspect: string; expert: string; description: string }> = [];
    
    this.messages.forEach(message => {
      if (message.content.toLowerCase().includes('ethical') ||
          message.content.toLowerCase().includes('moral') ||
          message.content.toLowerCase().includes('responsibility')) {
        ethical.push({
          aspect: 'Ethical Consideration',
          expert: this.getExpertName(message.speaker),
          description: message.content.slice(0, 200) + '...'
        });
      }
    });
    
    return ethical.slice(0, 3);
  }

  private analyzeSocietalImpacts(): Array<{
    area: string;
    implications: string;
  }> {
    return [
      {
        area: 'Social Innovation',
        implications: 'Potential for positive societal transformation through expert collaboration'
      }
    ];
  }

  private identifyHistoricalParallels(): Array<{
    period: string;
    expert: string;
    lesson: string;
  }> {
    const historical: Array<{ period: string; expert: string; lesson: string }> = [];
    
    this.messages.forEach(message => {
      if (message.content.toLowerCase().includes('history') ||
          message.content.toLowerCase().includes('past') ||
          message.content.toLowerCase().includes('historically')) {
        historical.push({
          period: 'Historical Context',
          expert: this.getExpertName(message.speaker),
          lesson: message.content.slice(0, 200) + '...'
        });
      }
    });
    
    return historical.slice(0, 3);
  }

  private extractTemporalInsights(): Array<{
    era: string;
    wisdom: string;
  }> {
    return [
      {
        era: 'Cross-Temporal Analysis',
        wisdom: 'Integration of historical wisdom with contemporary challenges'
      }
    ];
  }

  private createPersonalRecommendations(): Array<{
    category: string;
    action: string;
    reasoning: string;
    source: string;
  }> {
    return [
      {
        category: 'Personal Development',
        action: 'Apply expert insights to your specific context',
        reasoning: 'Tailored application of collective wisdom',
        source: 'Synthesized from all expert contributions'
      }
    ];
  }

  private generateCustomizedSteps(): Array<{
    action: string;
    timeline: string;
    metrics: string;
  }> {
    return [
      {
        action: 'Review expert recommendations',
        timeline: 'Week 1',
        metrics: 'Complete analysis of all contributions'
      },
      {
        action: 'Implement priority actions',
        timeline: 'Weeks 2-4',
        metrics: 'Progress on key recommendations'
      }
    ];
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

  private getReportTitle(reportType: string): string {
    const titles: Record<string, string> = {
      summary: 'Discussion Summary',
      consensus: 'Consensus & Shared Ideas',
      divergent: 'Divergent & Dissenting Opinions',
      innovative: 'Innovative & Creative Solutions',
      practical: 'Practical Recommendations',
      ethical: 'Ethical & Societal Implications',
      historical: 'Historical & Contextual Analysis',
      personal: 'Personalized Action Plan'
    };
    
    return titles[reportType] || 'Symposium Analysis';
  }
}
