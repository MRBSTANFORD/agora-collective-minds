
import React from 'react';
import { REPORT_TYPES } from './reportTypes';

interface ReportStatsGridProps {
  completedReportsCount: number;
  messageCount: number;
  uniqueExpertCount: number;
}

export const ReportStatsGrid: React.FC<ReportStatsGridProps> = ({
  completedReportsCount,
  messageCount,
  uniqueExpertCount
}) => {
  return (
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
        <div className="text-2xl font-bold text-amber-600">{messageCount}</div>
        <div className="text-sm text-amber-700">Expert Messages</div>
      </div>
      <div className="text-center p-4 bg-purple-50 rounded-lg">
        <div className="text-2xl font-bold text-purple-600">{uniqueExpertCount}</div>
        <div className="text-sm text-purple-700">Expert Voices</div>
      </div>
    </div>
  );
};
