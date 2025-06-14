
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText, BarChart3, Users, Lightbulb, Shield, History, User, CheckCircle } from 'lucide-react';

const ReportsModule = () => {
  const [generatingReports, setGeneratingReports] = useState(false);
  const [completedReports, setCompletedReports] = useState([]);

  const reportTypes = [
    {
      id: 'summary',
      title: 'Discussion Summary',
      description: 'Comprehensive overview of all expert perspectives and key insights',
      icon: FileText,
      color: 'bg-blue-100 text-blue-700',
      status: 'completed'
    },
    {
      id: 'consensus',
      title: 'Consensus & Shared Ideas',
      description: 'Areas of agreement and common ground among experts',
      icon: Users,
      color: 'bg-green-100 text-green-700',
      status: 'completed'
    },
    {
      id: 'divergent',
      title: 'Divergent & Dissenting Opinions',
      description: 'Contrasting viewpoints and creative tensions in the discussion',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-700',
      status: 'completed'
    },
    {
      id: 'innovative',
      title: 'Innovative & Creative Solutions',
      description: 'Novel approaches and breakthrough ideas from the collective wisdom',
      icon: Lightbulb,
      color: 'bg-yellow-100 text-yellow-700',
      status: 'completed'
    },
    {
      id: 'practical',
      title: 'Practical Recommendations',
      description: 'Actionable steps and implementation strategies',
      icon: CheckCircle,
      color: 'bg-indigo-100 text-indigo-700',
      status: 'generating'
    },
    {
      id: 'ethical',
      title: 'Ethical & Societal Implications',
      description: 'Moral considerations and broader social impact analysis',
      icon: Shield,
      color: 'bg-purple-100 text-purple-700',
      status: 'generating'
    },
    {
      id: 'historical',
      title: 'Historical & Contextual Analysis',
      description: 'Lessons from history and contextual frameworks',
      icon: History,
      color: 'bg-amber-100 text-amber-700',
      status: 'pending'
    },
    {
      id: 'personal',
      title: 'Personalized Action Plan',
      description: 'Customized recommendations based on your specific context',
      icon: User,
      color: 'bg-pink-100 text-pink-700',
      status: 'pending'
    }
  ];

  const sampleReportContent = {
    summary: {
      title: "Executive Summary: Sustainable Urban Development",
      content: `
## Key Insights from Expert Panel

The eight-member expert panel engaged in a comprehensive 5-round discussion on sustainable urban development, yielding rich insights from diverse historical perspectives.

### Primary Themes Identified:
1. **Biomimetic Design**: Leonardo da Vinci's emphasis on learning from nature's patterns
2. **Data-Driven Approaches**: Marie Curie's call for empirical methodology
3. **Philosophical Foundations**: Socrates' questioning of sustainability definitions
4. **Technological Innovation**: Ada Lovelace's vision for computational solutions

### Cross-Cutting Principles:
- Integration of artistic beauty with functional efficiency
- Emphasis on measurable outcomes and scientific rigor
- Importance of ethical frameworks in urban planning
- Balance between innovation and practical implementation

### Expert Synthesis:
The discussion revealed how historical wisdom can inform modern challenges, with each expert bringing unique methodological approaches while finding common ground in the pursuit of human flourishing through thoughtful urban design.
      `
    },
    consensus: {
      title: "Areas of Expert Agreement",
      content: `
## Unanimous Agreements

### 1. Holistic Systems Thinking
All experts agreed that urban sustainability requires integrated thinking across multiple domains:
- Environmental systems
- Social structures  
- Economic frameworks
- Technological infrastructure

### 2. Human-Centered Design
Despite different approaches, all experts emphasized that sustainable cities must serve human flourishing:
- **Leonardo**: Beauty and functionality for human well-being
- **Curie**: Scientific rigor to improve human health
- **Socrates**: Ethical considerations for all citizens
- **Einstein**: Imaginative solutions that connect with human experience

### 3. Long-term Perspective
Strong consensus on the need for intergenerational thinking:
- Planning beyond current political cycles
- Considering impacts on future generations
- Building adaptive capacity for changing conditions

### 4. Evidence-Based Decision Making
Agreement on the importance of data and measurement:
- Quantifiable sustainability metrics
- Regular monitoring and adjustment
- Learning from both successes and failures
      `
    }
  };

  const generateReports = () => {
    setGeneratingReports(true);
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReports(false);
      setCompletedReports(reportTypes.map(r => r.id));
    }, 3000);
  };

  const downloadReport = (reportId, format) => {
    // In a real app, this would generate and download the actual report
    console.log(`Downloading ${reportId} in ${format} format`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'generating':
        return <Badge className="bg-yellow-100 text-yellow-700 animate-pulse">Generating...</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };

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
            onClick={generateReports}
            disabled={generatingReports}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {generatingReports ? 'Generating...' : 'Generate All Reports'}
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">8</div>
            <div className="text-sm text-indigo-700">Report Types</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedReports.length}</div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">5</div>
            <div className="text-sm text-amber-700">Discussion Rounds</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">24</div>
            <div className="text-sm text-purple-700">Expert Insights</div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => {
          const IconComponent = report.icon;
          const isCompleted = completedReports.includes(report.id) || report.status === 'completed';
          
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
                  {getStatusBadge(isCompleted ? 'completed' : report.status)}
                </div>
                <CardTitle className="text-sm text-indigo-900 leading-tight">{report.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs text-gray-600 mb-4 leading-relaxed">
                  {report.description}
                </CardDescription>
                
                {isCompleted ? (
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
                      View
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Available after generation</div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Report Preview */}
      {completedReports.length > 0 && (
        <Card className="border-indigo-100">
          <CardHeader>
            <CardTitle className="text-lg text-indigo-900">Report Preview</CardTitle>
            <CardDescription>Sample content from completed reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Discussion Summary</TabsTrigger>
                <TabsTrigger value="consensus">Consensus Areas</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-4">
                <ScrollArea className="h-64 w-full border rounded-lg p-4">
                  <div className="prose prose-sm max-w-none">
                    <h3 className="text-lg font-bold text-indigo-900 mb-3">
                      {sampleReportContent.summary.title}
                    </h3>
                    <div className="whitespace-pre-line text-gray-700">
                      {sampleReportContent.summary.content}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="consensus" className="mt-4">
                <ScrollArea className="h-64 w-full border rounded-lg p-4">
                  <div className="prose prose-sm max-w-none">
                    <h3 className="text-lg font-bold text-indigo-900 mb-3">
                      {sampleReportContent.consensus.title}
                    </h3>
                    <div className="whitespace-pre-line text-gray-700">
                      {sampleReportContent.consensus.content}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsModule;
