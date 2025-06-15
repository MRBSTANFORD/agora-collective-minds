
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from 'lucide-react';
import { ReportData } from '@/services/reportGenerator';
import BrandedReportHeader from './BrandedReportHeader';
import { REPORT_TYPES } from './reportTypes';

interface ReportPreviewSectionProps {
  generatedReports: Record<string, ReportData>;
  completedReportsCount: number;
  uniqueExpertCount: number;
  messageCount: number;
}

export const ReportPreviewSection: React.FC<ReportPreviewSectionProps> = ({
  generatedReports,
  completedReportsCount,
  uniqueExpertCount,
  messageCount
}) => {
  if (completedReportsCount === 0) {
    return (
      <Card className="border-indigo-100">
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Available</h3>
          <p className="text-gray-600">Generate reports from a completed discussion to see previews here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
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
                    messageCount={messageCount} 
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
  );
};
