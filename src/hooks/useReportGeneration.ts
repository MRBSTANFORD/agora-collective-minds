
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ReportGenerator, ReportData, ReportGenerationStatus } from '@/services/reportGenerator';
import { DiscussionMessage } from '@/services/aiOrchestrator';
import { useToast } from "@/hooks/use-toast";
import { REPORT_TYPES } from '@/components/reports/reportTypes';

export function useReportGeneration(
  discussionMessages: DiscussionMessage[],
  challenge: string,
  isDiscussionComplete: boolean
) {
  const { toast } = useToast();
  const [generatingReports, setGeneratingReports] = useState(false);
  const [reportStatuses, setReportStatuses] = useState<ReportGenerationStatus>({});
  const [generatedReports, setGeneratedReports] = useState<Record<string, ReportData>>({});
  const [reportGenerator, setReportGenerator] = useState<ReportGenerator | null>(null);

  // Initialize report generator
  const initializeReportGenerator = useCallback(() => {
    if (discussionMessages.length > 0 && challenge && !reportGenerator) {
      console.log('📊 Initializing ReportGenerator with discussion data');
      const generator = new ReportGenerator(discussionMessages, challenge);
      setReportGenerator(generator);

      // Reset statuses
      const initialStatuses: ReportGenerationStatus = {};
      REPORT_TYPES.forEach(type => {
        initialStatuses[type.id] = 'pending';
      });
      setReportStatuses(initialStatuses);
      setGeneratedReports({});
    }
  }, [discussionMessages, challenge, reportGenerator]);

  useEffect(() => {
    initializeReportGenerator();
  }, [initializeReportGenerator]);

  const generateAllReports = useCallback(async (getFinalConfig: () => any) => {
    if (!reportGenerator) {
      toast({
        title: "No Discussion Data",
        description: "Please complete a discussion first to generate reports.",
        variant: "destructive"
      });
      return;
    }

    if (!isDiscussionComplete) {
      toast({
        title: "Discussion Not Complete",
        description: "Please wait for the discussion to complete before generating reports.",
        variant: "destructive"
      });
      return;
    }

    const aiConfig = getFinalConfig();
    
    // Validate AI configuration
    if (!aiConfig.provider || (!aiConfig.apiKey && aiConfig.provider !== 'HuggingFace')) {
      toast({
        title: "AI Configuration Required",
        description: `Please configure AI settings. ${aiConfig.provider} requires an API key.`,
        variant: "destructive"
      });
      return;
    }

    setGeneratingReports(true);
    console.log('🔄 Starting report generation with AI config:', {
      provider: aiConfig.provider,
      model: aiConfig.model,
      useExpertConfig: aiConfig.useExpertConfig,
      hasApiKey: !!aiConfig.apiKey
    });

    try {
      // Generate reports with enhanced AI configuration
      for (const reportType of REPORT_TYPES) {
        setReportStatuses(prev => ({
          ...prev,
          [reportType.id]: 'generating'
        }));

        try {
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Report generation timeout')), 30000)
          );
          
          const reportPromise = reportGenerator.generateReport(reportType.id, {
            useAiEnhancement: true,
            model: aiConfig.model,
            provider: aiConfig.provider,
            apiKey: aiConfig.apiKey
          });
          
          const report = (await Promise.race([reportPromise, timeoutPromise])) as ReportData;
          
          setGeneratedReports(prev => ({
            ...prev,
            [reportType.id]: report
          }));
          
          setReportStatuses(prev => ({
            ...prev,
            [reportType.id]: 'completed'
          }));
          
          console.log(`✅ Generated ${reportType.title} successfully`);
        } catch (error) {
          console.error(`❌ Failed to generate ${reportType.title}:`, error);
          setReportStatuses(prev => ({
            ...prev,
            [reportType.id]: 'error'
          }));
          
          toast({
            title: "Report Generation Failed",
            description: `Failed to generate ${reportType.title}. ${error instanceof Error ? error.message : 'Unknown error'}`,
            variant: "destructive"
          });
        }

        // Small delay between reports
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const completedCount = Object.values(reportStatuses).filter(status => status === 'completed').length;
      toast({
        title: "Reports Generated",
        description: `Successfully generated ${completedCount} reports with AI enhancement.`
      });
    } catch (error) {
      console.error('💥 Error during report generation:', error);
      toast({
        title: "Generation Error",
        description: "Some reports could not be generated. Please check your AI configuration and try again.",
        variant: "destructive"
      });
    } finally {
      setGeneratingReports(false);
    }
  }, [reportGenerator, isDiscussionComplete, toast, reportStatuses]);

  const completedReportsCount = useMemo(() => 
    Object.values(reportStatuses).filter(status => status === 'completed').length, 
    [reportStatuses]
  );

  const canGenerate = useMemo(() => 
    reportGenerator && isDiscussionComplete && !generatingReports, 
    [reportGenerator, isDiscussionComplete, generatingReports]
  );

  return {
    generatingReports,
    reportStatuses,
    generatedReports,
    generateAllReports,
    completedReportsCount,
    canGenerate
  };
}
