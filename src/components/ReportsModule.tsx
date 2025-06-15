
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText, BarChart3, Users, Lightbulb, Shield, History, User, CheckCircle } from 'lucide-react';
import { ReportGenerator, ReportData, ReportGenerationStatus } from '@/services/reportGenerator';
import { FileGenerator } from '@/services/fileGenerator';
import { DiscussionMessage } from '@/services/aiOrchestrator';
import { useToast } from "@/hooks/use-toast";
import { useAvailableModels } from "@/hooks/useAvailableModels";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import BrandedReportHeader from '@/components/reports/BrandedReportHeader';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { AIConfigurationPanel } from '@/components/reports/AIConfigurationPanel';
import { useReportAIConfig } from '@/hooks/useReportAIConfig';
import { ExpertConfig } from '@/components/ExpertCardList';

interface ReportsModuleProps {
  discussionMessages?: DiscussionMessage[];
  challenge?: string;
  isDiscussionComplete?: boolean;
  experts?: ExpertConfig[];
  currentRound?: number;
  maxRounds?: number;
}

// Memoized static report types configuration
const REPORT_TYPES = [{
  id: 'summary',
  title: 'Discussion Summary',
  description: 'Comprehensive overview of all expert perspectives and key insights',
  icon: FileText,
  color: 'bg-blue-100 text-blue-700'
}, {
  id: 'consensus',
  title: 'Consensus & Shared Ideas',
  description: 'Areas of agreement and common ground among experts',
  icon: Users,
  color: 'bg-green-100 text-green-700'
}, {
  id: 'divergent',
  title: 'Divergent & Dissenting Opinions',
  description: 'Contrasting viewpoints and creative tensions in the discussion',
  icon: BarChart3,
  color: 'bg-orange-100 text-orange-700'
}, {
  id: 'innovative',
  title: 'Innovative & Creative Solutions',
  description: 'Novel approaches and breakthrough ideas from the collective wisdom',
  icon: Lightbulb,
  color: 'bg-yellow-100 text-yellow-700'
}, {
  id: 'practical',
  title: 'Practical Recommendations',
  description: 'Actionable steps and implementation strategies',
  icon: CheckCircle,
  color: 'bg-indigo-100 text-indigo-700'
}, {
  id: 'ethical',
  title: 'Ethical & Societal Implications',
  description: 'Moral considerations and broader social impact analysis',
  icon: Shield,
  color: 'bg-purple-100 text-purple-700'
}, {
  id: 'historical',
  title: 'Historical & Contextual Analysis',
  description: 'Lessons from history and contextual frameworks',
  icon: History,
  color: 'bg-amber-100 text-amber-700'
}, {
  id: 'personal',
  title: 'Personalized Action Plan',
  description: 'Customized recommendations based on your specific context',
  icon: User,
  color: 'bg-pink-100 text-pink-700'
}];

const ReportsModule = React.memo<ReportsModuleProps>(({
  discussionMessages = [],
  challenge = 'Sample Challenge',
  isDiscussionComplete = false,
  experts = [],
  currentRound = 0,
  maxRounds = 5
}) => {
  usePerformanceMonitor('ReportsModule', 100);
  const {
    toast
  } = useToast();
  const [generatingReports, setGeneratingReports] = useState(false);
  const [reportStatuses, setReportStatuses] = useState<ReportGenerationStatus>({});
  const [generatedReports, setGeneratedReports] = useState<Record<string, ReportData>>({});
  const [reportGenerator, setReportGenerator] = useState<ReportGenerator | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Use the new AI configuration hook
  const {
    useExpertConfig,
    setUseExpertConfig,
    manualProvider,
    setManualProvider,
    manualModel,
    setManualModel,
    manualApiKeys,
    updateManualApiKey,
    expertAIAnalysis,
    getFinalConfig
  } = useReportAIConfig(experts);

  // Memoized calculations - moved before callbacks that use them
  const completedReportsCount = useMemo(() => 
    Object.values(reportStatuses).filter(status => status === 'completed').length, 
    [reportStatuses]
  );
  
  const uniqueExpertCount = useMemo(() => 
    new Set(discussionMessages.map(m => m.speaker)).size, 
    [discussionMessages]
  );
  
  const canGenerate = useMemo(() => 
    reportGenerator && isDiscussionComplete && !generatingReports, 
    [reportGenerator, isDiscussionComplete, generatingReports]
  );

  // Initialize report generator - memoized to prevent recreation
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

  const generateAllReports = useCallback(async () => {
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
  }, [reportGenerator, isDiscussionComplete, getFinalConfig, toast, reportStatuses]);

  // Enhanced download function with format-specific content preparation
  const downloadReport = useCallback(async (reportId: string, format: 'pdf' | 'html') => {
    const report = generatedReports[reportId];
    if (!report) {
      toast({
        title: "Report Not Available",
        description: "This report hasn't been generated yet.",
        variant: "destructive"
      });
      return;
    }

    try {
      let enhancedReport: typeof report;

      if (format === 'pdf') {
        // Create PDF-specific content with simple text branding
        const pdfBranding = FileGenerator.createPDFBrandingContent(
          report.title,
          report.generatedAt,
          uniqueExpertCount,
          discussionMessages.length,
          challenge
        );

        enhancedReport = {
          ...report,
          content: pdfBranding + report.content + '\n\n' + 
                   '--------------------\n' +
                   'Generated by AGORA - Collective Minds & Wisdom Platform\n' +
                   'Powered by AI Expert Collaboration Technology'
        };
      } else {
        // Create HTML-specific content with rich formatting
        const htmlBranding = FileGenerator.createHTMLBrandingContent(
          report.title,
          report.generatedAt,
          uniqueExpertCount,
          discussionMessages.length,
          challenge
        );

        enhancedReport = {
          ...report,
          content: htmlBranding + report.content + 
                   '<div style="margin-top: 40px; padding: 20px; background: #f8fafc; border-radius: 8px; text-align: center; font-size: 12px; color: #64748b;">' +
                   '<p style="margin: 0;">Generated by AGORA - Collective Minds & Wisdom Platform</p>' +
                   '<p style="margin: 5px 0 0 0;">Powered by AI Expert Collaboration Technology</p>' +
                   '</div>'
        };
      }

      let blob: Blob;
      if (format === 'pdf') {
        blob = await FileGenerator.generatePDF(enhancedReport);
      } else {
        blob = await FileGenerator.generateHTML(enhancedReport);
      }

      const filename = `AGORA_${report.title.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}`;
      FileGenerator.downloadFile(blob, filename, format);

      toast({
        title: "Download Started",
        description: `${report.title} is being downloaded as ${format.toUpperCase()}.`
      });
    } catch (error) {
      console.error(`💥 Error downloading report:`, error);
      toast({
        title: "Download Error",
        description: "Could not download the report. Please try again.",
        variant: "destructive"
      });
    }
  }, [generatedReports, discussionMessages, challenge, toast, uniqueExpertCount]);

  // Memoized status badge component
  const getStatusBadge = useCallback((reportId: string) => {
    const status = reportStatuses[reportId] || 'pending';
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'generating':
        return <Badge className="bg-yellow-100 text-yellow-700 animate-pulse">Generating...</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-700">Error</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  }, [reportStatuses]);

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Enhanced Header with Branding */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg border border-indigo-100 p-6 text-white">
          <BrandedReportHeader 
            title="Comprehensive Reports" 
            subtitle="AI-generated insights from expert discussions" 
            generatedAt={new Date()} 
            expertCount={uniqueExpertCount} 
            messageCount={discussionMessages.length} 
          />
          
          <div className="mt-6 flex flex-col gap-3">
            <Button 
              onClick={generateAllReports} 
              disabled={!canGenerate} 
              className="bg-white text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 w-full"
            >
              {generatingReports ? 'Generating AI-Enhanced Reports...' : 'Generate All Reports with AI'}
            </Button>
          </div>
        </div>

        {/* Enhanced Tabs with AI Configuration */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Reports Overview</TabsTrigger>
            <TabsTrigger value="ai-config">AI Configuration</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
            <TabsTrigger value="preview">Report Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-config" className="space-y-6">
            <AIConfigurationPanel
              useExpertConfig={useExpertConfig}
              setUseExpertConfig={setUseExpertConfig}
              manualProvider={manualProvider}
              setManualProvider={setManualProvider}
              manualModel={manualModel}
              setManualModel={setManualModel}
              manualApiKeys={manualApiKeys}
              updateManualApiKey={updateManualApiKey}
              expertAIAnalysis={expertAIAnalysis}
              experts={experts}
            />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            {!isDiscussionComplete && (
              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  Reports will be available after completing a discussion with experts.
                </p>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{REPORT_TYPES.length}</div>
                <div className="text-sm text-indigo-700">Report Types</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completedReportsCount}</div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{discussionMessages.length}</div>
                <div className="text-sm text-amber-700">Expert Messages</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{uniqueExpertCount}</div>
                <div className="text-sm text-purple-700">Expert Voices</div>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {REPORT_TYPES.map(report => {
                const IconComponent = report.icon;
                const status = reportStatuses[report.id] || 'pending';
                const isCompleted = status === 'completed';
                const reportData = generatedReports[report.id];

                return (
                  <Card key={report.id} className={`border border-indigo-100 hover:shadow-lg transition-all duration-300 ${isCompleted ? 'hover:border-indigo-300' : 'opacity-75'}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${report.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        {getStatusBadge(report.id)}
                      </div>
                      <CardTitle className="text-sm text-indigo-900 leading-tight">{report.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-xs text-gray-600 mb-4 leading-relaxed">
                        {report.description}
                      </CardDescription>
                      
                      {isCompleted && reportData ? (
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs border-indigo-200 hover:bg-indigo-50" 
                            onClick={() => downloadReport(report.id, 'pdf')}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            PDF
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs border-indigo-200 hover:bg-indigo-50" 
                            onClick={() => downloadReport(report.id, 'html')}
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            HTML
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-xs text-gray-400">
                            {status === 'generating' ? 'Generating...' : 
                             status === 'error' ? 'Generation failed' : 
                             'Available after generation'}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard 
              messages={discussionMessages} 
              experts={experts} 
              currentRound={currentRound} 
              maxRounds={maxRounds} 
            />
          </TabsContent>

          <TabsContent value="preview">
            {/* Report Preview */}
            {completedReportsCount > 0 ? (
              <Card className="border-indigo-100">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-900">Report Preview</CardTitle>
                  <CardDescription>Sample content from completed reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={Object.keys(generatedReports)[0] || 'summary'}>
                    <TabsList className="grid w-full grid-cols-2">
                      {Object.keys(generatedReports).slice(0, 2).map(reportId => (
                        <TabsTrigger key={reportId} value={reportId}>
                          {REPORT_TYPES.find(t => t.id === reportId)?.title || reportId}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {Object.entries(generatedReports).slice(0, 2).map(([reportId, report]) => (
                      <TabsContent key={reportId} value={reportId} className="mt-4">
                        <ScrollArea className="h-64 w-full border rounded-lg p-4">
                          <div className="prose prose-sm max-w-none">
                            <BrandedReportHeader 
                              title={report.title} 
                              generatedAt={report.generatedAt} 
                              expertCount={uniqueExpertCount} 
                              messageCount={discussionMessages.length} 
                            />
                            <div className="mt-4 whitespace-pre-line text-gray-700">
                              {report.content.slice(0, 1500)}...
                            </div>
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-indigo-100">
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Available</h3>
                  <p className="text-gray-600">Generate reports from a completed discussion to see previews here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
});

ReportsModule.displayName = 'ReportsModule';
export default ReportsModule;
