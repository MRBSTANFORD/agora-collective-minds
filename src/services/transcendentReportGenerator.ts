
import { DiscussionMessage } from '@/services/aiOrchestrator';
import { AdvancedReportGenerator, TranscendentInsight, WisdomSynthesis } from './advancedReportGenerator';
import { generateAIResponse } from './responseGenerator';

export interface TranscendentReport {
  id: string;
  title: string;
  content: string;
  insights: TranscendentInsight[];
  synthesis: WisdomSynthesis;
  transcendenceMetrics: {
    overallTranscendenceScore: number;
    collectiveIntelligenceLevel: number;
    paradigmShiftPotential: number;
    emergentWisdomIndex: number;
    crossDisciplinaryIntegration: number;
  };
  generatedAt: Date;
}

export class TranscendentReportGenerator extends AdvancedReportGenerator {
  private transcendenceThreshold: number = 70;

  constructor(messages: DiscussionMessage[], challenge: string) {
    super(messages, challenge);
  }

  async generateTranscendentReport(
    reportType: string,
    options: {
      useAiEnhancement?: boolean;
      model?: string;
      provider?: string;
      apiKey?: string;
    } = {}
  ): Promise<TranscendentReport> {
    console.log(`🌟 Generating transcendent report: ${reportType}`);

    const advancedReport = await this.generateAdvancedReport(reportType, options);
    const transcendenceMetrics = this.calculateTranscendenceMetrics(advancedReport.insights, advancedReport.synthesis);

    const transcendentReport: TranscendentReport = {
      id: `transcendent_${reportType}_${Date.now()}`,
      title: this.getTranscendentTitle(reportType),
      content: await this.enhanceWithTranscendentAnalysis(advancedReport.content, advancedReport.insights, options),
      insights: advancedReport.insights,
      synthesis: advancedReport.synthesis,
      transcendenceMetrics,
      generatedAt: new Date()
    };

    return transcendentReport;
  }

  private calculateTranscendenceMetrics(insights: TranscendentInsight[], synthesis: WisdomSynthesis) {
    const overallTranscendenceScore = this.calculateOverallTranscendence(insights);
    const collectiveIntelligenceLevel = this.assessCollectiveIntelligence(synthesis);
    const paradigmShiftPotential = this.assessParadigmShiftPotential(insights);
    const emergentWisdomIndex = this.calculateEmergentWisdomIndex(synthesis);
    const crossDisciplinaryIntegration = this.assessCrossDisciplinaryIntegration(insights);

    return {
      overallTranscendenceScore,
      collectiveIntelligenceLevel,
      paradigmShiftPotential,
      emergentWisdomIndex,
      crossDisciplinaryIntegration
    };
  }

  private calculateOverallTranscendence(insights: TranscendentInsight[]): number {
    if (insights.length === 0) return 0;
    
    const avgConfidence = insights.reduce((sum, insight) => sum + insight.confidence, 0) / insights.length;
    const avgTranscendenceScore = insights.reduce((sum, insight) => sum + insight.metrics.transcendenceScore, 0) / insights.length;
    
    return (avgConfidence * 50) + (avgTranscendenceScore * 50);
  }

  private assessCollectiveIntelligence(synthesis: WisdomSynthesis): number {
    let score = 0;
    
    // Bonus for emergent patterns
    score += Math.min(synthesis.emergentPatterns.length * 15, 40);
    
    // Bonus for creative symbiosis
    score += Math.min(synthesis.creativeSymbiosis.length * 10, 30);
    
    // Bonus for wisdom evolution complexity
    score += Math.min(synthesis.wisdomEvolution.length * 2, 30);
    
    return Math.min(score, 100);
  }

  private assessParadigmShiftPotential(insights: TranscendentInsight[]): number {
    const paradigmShiftInsights = insights.filter(insight => 
      insight.type === 'paradigm-shift' || insight.metrics.paradigmShiftPotential > 60
    );
    
    if (paradigmShiftInsights.length === 0) return 0;
    
    const avgPotential = paradigmShiftInsights.reduce((sum, insight) => 
      sum + insight.metrics.paradigmShiftPotential, 0) / paradigmShiftInsights.length;
    
    return avgPotential;
  }

  private calculateEmergentWisdomIndex(synthesis: WisdomSynthesis): number {
    let index = 0;
    
    // Base score from collective intelligence
    if (synthesis.collectiveIntelligence.length > 0) index += 30;
    
    // Emergent patterns bonus
    index += Math.min(synthesis.emergentPatterns.length * 10, 30);
    
    // Transcendent moments bonus
    index += Math.min(synthesis.transcendentMoments.length * 8, 40);
    
    return Math.min(index, 100);
  }

  private assessCrossDisciplinaryIntegration(insights: TranscendentInsight[]): number {
    const totalConnections = insights.reduce((sum, insight) => 
      sum + insight.crossDisciplinaryConnections.length, 0);
    
    const avgConnections = insights.length > 0 ? totalConnections / insights.length : 0;
    
    return Math.min(avgConnections * 25, 100);
  }

  private async enhanceWithTranscendentAnalysis(
    content: string,
    insights: TranscendentInsight[],
    options: any
  ): Promise<string> {
    if (!options.useAiEnhancement || !options.provider) {
      return this.addTranscendentAnalysisStructured(content, insights);
    }

    const enhancementPrompt = this.buildTranscendentEnhancementPrompt(content, insights);
    
    try {
      const enhancement = await generateAIResponse(
        enhancementPrompt,
        options.provider,
        options.apiKey || '',
        'transcendent_enhancer'
      );
      
      return `${content}\n\n## Transcendent Analysis\n\n${enhancement}`;
    } catch (error) {
      console.warn('Transcendent enhancement failed, using structured approach:', error);
      return this.addTranscendentAnalysisStructured(content, insights);
    }
  }

  private buildTranscendentEnhancementPrompt(content: string, insights: TranscendentInsight[]): string {
    return `
# Transcendent Analysis Enhancement Task

Transform this symposium report into a transcendent analysis that reveals the deeper wisdom and emergent intelligence:

## Current Report Content:
${content}

## Transcendent Insights Detected:
${insights.map(insight => `
- **${insight.type.toUpperCase()}** (Confidence: ${(insight.confidence * 100).toFixed(1)}%)
  Content: ${insight.content.slice(0, 200)}...
  Cross-connections: ${insight.crossDisciplinaryConnections.join(', ')}
  Paradigm potential: ${insight.metrics.paradigmShiftPotential}%
`).join('\n')}

## Your Mission:
Enhance this report with transcendent analysis that:
1. Reveals the deeper patterns of collective intelligence that emerged
2. Identifies moments where the discussion transcended individual expert capabilities
3. Highlights paradigm shifts and breakthrough insights
4. Demonstrates how the symposium achieved collective transcendence
5. Provides profound insights into the nature of collaborative wisdom

Create a masterful transcendent analysis that captures the essence of collective intelligence emergence.
    `;
  }

  private addTranscendentAnalysisStructured(content: string, insights: TranscendentInsight[]): string {
    let enhancement = content + '\n\n## Transcendent Analysis\n\n';
    
    enhancement += `### Collective Transcendence Assessment\n`;
    enhancement += `This symposium achieved remarkable collective transcendence through ${insights.length} identified transcendent insights.\n\n`;
    
    if (insights.length > 0) {
      enhancement += `### Breakthrough Insights\n`;
      insights.forEach((insight, index) => {
        enhancement += `**${index + 1}. ${insight.type.replace('-', ' ').toUpperCase()}**\n`;
        enhancement += `- Transcendence Confidence: ${(insight.confidence * 100).toFixed(1)}%\n`;
        enhancement += `- Paradigm Shift Potential: ${insight.metrics.paradigmShiftPotential}%\n`;
        enhancement += `- Cross-Disciplinary Integration: ${insight.crossDisciplinaryConnections.length} connections\n`;
        enhancement += `- Emergence Indicators: ${insight.metrics.emergenceIndicators.join(', ')}\n\n`;
      });
    }
    
    enhancement += `### Collective Intelligence Emergence\n`;
    enhancement += `The symposium demonstrated authentic collective intelligence through:\n`;
    enhancement += `- Multi-expert synthesis and cross-referencing\n`;
    enhancement += `- Emergent insights that transcended individual capabilities\n`;
    enhancement += `- Paradigm shifts arising from collaborative dialogue\n`;
    enhancement += `- Wisdom accumulation across multiple rounds of discourse\n\n`;
    
    return enhancement;
  }

  private getTranscendentTitle(reportType: string): string {
    const transcendentTitles: Record<string, string> = {
      summary: 'Transcendent Collective Wisdom Synthesis',
      consensus: 'Emergent Consensus & Transcendent Unity',
      divergent: 'Creative Transcendence Through Divergent Wisdom',
      innovative: 'Breakthrough Innovation & Transcendent Solutions',
      practical: 'Transcendent Wisdom Applied: Actionable Insights',
      ethical: 'Moral Transcendence & Ethical Emergence',
      historical: 'Temporal Transcendence: Historical Wisdom Synthesis',
      personal: 'Personal Transcendence: Individualized Wisdom Framework'
    };
    
    return transcendentTitles[reportType] || 'Transcendent Symposium Analysis';
  }

  async generateAllTranscendentReports(options: any = {}): Promise<TranscendentReport[]> {
    console.log('🌟 Generating complete transcendent report portfolio...');
    
    const reportTypes = ['summary', 'consensus', 'divergent', 'innovative', 'practical', 'ethical', 'historical', 'personal'];
    const reports: TranscendentReport[] = [];
    
    for (const reportType of reportTypes) {
      try {
        const report = await this.generateTranscendentReport(reportType, options);
        reports.push(report);
        console.log(`✨ Generated transcendent ${reportType} report`);
      } catch (error) {
        console.error(`❌ Failed to generate transcendent ${reportType} report:`, error);
      }
    }
    
    return reports;
  }
}
