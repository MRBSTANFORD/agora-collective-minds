
import React, { useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from 'lucide-react';
import { ReportData } from '@/services/reportGenerator';

interface ReportCardProps {
  report: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
  };
  status: string;
  reportData?: ReportData;
  onDownload: (reportId: string, format: 'pdf' | 'html') => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  status,
  reportData,
  onDownload
}) => {
  const getStatusBadge = useCallback(() => {
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
  }, [status]);

  const IconComponent = report.icon;
  const isCompleted = status === 'completed';

  return (
    <Card className={`border border-indigo-100 hover:shadow-lg transition-all duration-300 ${isCompleted ? 'hover:border-indigo-300' : 'opacity-75'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${report.color}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          {getStatusBadge()}
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
              onClick={() => onDownload(report.id, 'pdf')}
            >
              <Download className="w-3 h-3 mr-1" />
              PDF
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 text-xs border-indigo-200 hover:bg-indigo-50" 
              onClick={() => onDownload(report.id, 'html')}
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
};
