import React, { useState, useEffect } from 'react';
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

interface ReportsModuleProps {
  discussionMessages?: DiscussionMessage[];
  challenge?: string;
  isDiscussionComplete?: boolean;
}

const ReportsModule = ({ 
  discussionMessages = [], 
  challenge = 'Sample Challenge', 
  isDiscussionComplete = false 
}: ReportsModuleProps) => {
  const { toast } = useToast();
  const [generatingReports, setGeneratingReports] = useState(false);
  const [reportStatuses, setReportStatuses] = useState<ReportGenerationStatus>({});
  const [generatedReports, setGeneratedReports] = useState<Record<string, ReportData>>({});
  const [reportGenerator, setReportGenerator] = useState<ReportGenerator | null>(null);

  // AI Enhancement -- new logic
  const [useAiEnhancement, setUseAiEnhancement] = useState(false);
  const [selectedAiProvider, setSelectedAiProvider] = useState<string>('OpenAI');
  const [selectedAiModel, setSelectedAiModel] = useState<string>('');

  // For model selection dropdowns
  const { models: availableModels } = useAvailableModels([selectedAiProvider]);
  const modelOptionsForSelectedProvider =
    availableModels[selectedAiProvider]?.map(m => ({
      label: m.label + (m.free ? " (Free)" : " (Paid)"),
      value: m.value,
    })) || [];

  useEffect(() => {
    // Set a default model when provider changes
    if (modelOptionsForSelectedProvider.length && !modelOptionsForSelectedProvider.find(m => m.value === selectedAiModel)) {
      setSelectedAiModel(modelOptionsForSelectedProvider[0].value);
    }
    // eslint-disable-next-line
  }, [selectedAiProvider, availableModels]);

  const reportTypes = [
    {
      id: 'summary',
      title: 'Discussion Summary',
      description: 'Comprehensive overview of all expert perspectives and key insights',
      icon: FileText,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'consensus',
      title: 'Consensus & Shared Ideas',
      description: 'Areas of agreement and common ground among experts',
      icon: Users,
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 'divergent',
      title: 'Divergent & Dissenting Opinions',
      description: 'Contrasting viewpoints and creative tensions in the discussion',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-700',
    },
    {
      id: 'innovative',
      title: 'Innovative & Creative Solutions',
      description: 'Novel approaches and breakthrough ideas from the collective wisdom',
      icon: Lightbulb,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      id: 'practical',
      title: 'Practical Recommendations',
      description: 'Actionable steps and implementation strategies',
      icon: CheckCircle,
      color: 'bg-indigo-100 text-indigo-700',
    },
    {
      id: 'ethical',
      title: 'Ethical & Societal Implications',
      description: 'Moral considerations and broader social impact analysis',
      icon: Shield,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'historical',
      title: 'Historical & Contextual Analysis',
      description: 'Lessons from history and contextual frameworks',
      icon: History,
      color: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'personal',
      title: 'Personalized Action Plan',
      description: 'Customized recommendations based on your specific context',
      icon: User,
      color: 'bg-pink-100 text-pink-700',
    }
  ];

  // Initialize report generator when discussion data is available
  useEffect(() => {
    if (discussionMessages.length > 0 && challenge) {
      console.log('📊 Initializing ReportGenerator with discussion data:', {
        messages: discussionMessages.length,
        challenge: challenge.slice(0, 50)
      });
      setReportGenerator(new ReportGenerator(discussionMessages, challenge));
      
      // Reset statuses
      const initialStatuses: ReportGenerationStatus = {};
      reportTypes.forEach(type => {
        initialStatuses[type.id] = 'pending';
      });
      setReportStatuses(initialStatuses);
      setGeneratedReports({});
    }
  }, [discussionMessages, challenge]);

  const generateAllReports = async () => {
    if (!reportGenerator) {
      toast({
        title: "No Discussion Data",
        description: "Please complete a discussion first to generate reports.",
        variant: "destructive",
      });
      return;
    }

    if (!isDiscussionComplete) {
      toast({
        title: "Discussion Not Complete",
        description: "Please wait for the discussion to complete before generating reports.",
        variant: "destructive",
      });
      return;
    }

    setGeneratingReports(true);
    console.log('🔄 Starting report generation for all report types...');

    try {
      // Generate reports sequentially to avoid overwhelming the system
      for (const reportType of reportTypes) {
        console.log(`📊 Generating ${reportType.title} (${useAiEnhancement ? "AI-Enhanced" : "Analytical"})`);
        setReportStatuses(prev => ({ ...prev, [reportType.id]: 'generating' }));

        try {
          const report = await reportGenerator.generateReport(
            reportType.id,
            {
              useAiEnhancement,
              model: selectedAiModel,
              provider: selectedAiProvider,
            }
          );
          setGeneratedReports(prev => ({ ...prev, [reportType.id]: report }));
          setReportStatuses(prev => ({ ...prev, [reportType.id]: 'completed' }));
          console.log(`✅ ${reportType.title} generated successfully`);
        } catch (error) {
          console.error(`❌ Failed to generate ${reportType.title}:`, error);
          setReportStatuses(prev => ({ ...prev, [reportType.id]: 'error' }));
        }

        // Small delay between reports
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      toast({
        title: "Reports Generated",
        description: "All available reports have been generated successfully.",
      });
    } catch (error) {
      console.error('💥 Error during report generation:', error);
      toast({
        title: "Generation Error",
        description: "Some reports could not be generated. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingReports(false);
    }
  };

  const downloadReport = async (reportId: string, format: 'pdf' | 'html') => {
    const report = generatedReports[reportId];
    if (!report) {
      toast({
        title: "Report Not Available",
        description: "This report hasn't been generated yet.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log(`📥 Downloading ${reportId} as ${format}...`);
      
      let blob: Blob;
      if (format === 'pdf') {
        blob = await FileGenerator.generatePDF(report);
      } else {
        blob = await FileGenerator.generateHTML(report);
      }

      const filename = `${report.title.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}`;
      FileGenerator.downloadFile(blob, filename, format);

      toast({
        title: "Download Started",
        description: `${report.title} is being downloaded as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      console.error(`💥 Error downloading report:`, error);
      toast({
        title: "Download Error",
        description: "Could not download the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (reportId: string) => {
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
  };

  const completedReportsCount = Object.values(reportStatuses).filter(status => status === 'completed').length;
  const canGenerate = reportGenerator && isDiscussionComplete && !generatingReports;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-indigo-900">Comprehensive Reports</h2>
            <p className="text-gray-600 mt-1">AI-generated insights from expert discussions</p>
          </div>
          <Button 
            onClick={generateAllReports}
            disabled={!canGenerate}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {generatingReports ? 'Generating...' : 'Generate All Reports'}
          </Button>
        </div>

        {/* ===== AI Enhancement Controls ===== */}
        <div className="flex flex-col md:flex-row gap-3 items-center mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useAiEnhancement}
              onChange={e => setUseAiEnhancement(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm text-indigo-700 font-medium">Enable AI Enhancement</span>
          </label>

          {useAiEnhancement && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-700 font-medium">Provider:</span>
              <select
                className="text-sm border rounded px-2 py-1"
                value={selectedAiProvider}
                onChange={e => setSelectedAiProvider(e.target.value)}
              >
                {Object.keys(availableModels).map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
              <span className="text-xs text-slate-700 font-medium">Model:</span>
              <select
                className="text-sm border rounded px-2 py-1"
                value={selectedAiModel}
                onChange={e => setSelectedAiModel(e.target.value)}
              >
                {modelOptionsForSelectedProvider.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {!isDiscussionComplete && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              Reports will be available after completing a discussion with experts.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">{reportTypes.length}</div>
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
            <div className="text-2xl font-bold text-purple-600">
              {new Set(discussionMessages.map(m => m.speaker)).size}
            </div>
            <div className="text-sm text-purple-700">Expert Voices</div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => {
          const IconComponent = report.icon;
          const status = reportStatuses[report.id] || 'pending';
          const isCompleted = status === 'completed';
          const reportData = generatedReports[report.id];
          
          return (
            <Card 
              key={report.id} 
              className={`border border-indigo-100 hover:shadow-lg transition-all duration-300 ${
                isCompleted ? 'hover:border-indigo-300' : 'opacity-75'
              }`}
            >
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

      {/* Report Preview */}
      {completedReportsCount > 0 && (
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
                    {reportTypes.find(t => t.id === reportId)?.title || reportId}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(generatedReports).slice(0, 2).map(([reportId, report]) => (
                <TabsContent key={reportId} value={reportId} className="mt-4">
                  <ScrollArea className="h-64 w-full border rounded-lg p-4">
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-lg font-bold text-indigo-900 mb-3">
                        {report.title}
                      </h3>
                      <div className="whitespace-pre-line text-gray-700">
                        {report.content.slice(0, 1500)}...
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsModule;
