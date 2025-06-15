
import React from 'react';

interface BrandedReportHeaderProps {
  title: string;
  subtitle?: string;
  generatedAt: Date;
  expertCount?: number;
  messageCount?: number;
}

const BrandedReportHeader: React.FC<BrandedReportHeaderProps> = ({
  title,
  subtitle,
  generatedAt,
  expertCount,
  messageCount
}) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">AGORA</h1>
            <p className="text-indigo-100 text-sm">Collective Minds & Wisdom</p>
          </div>
        </div>
        <div className="text-right text-sm text-indigo-100">
          <p>Generated: {generatedAt.toLocaleDateString()}</p>
          <p>{generatedAt.toLocaleTimeString()}</p>
        </div>
      </div>
      
      <div className="border-t border-indigo-300 pt-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-indigo-100 mb-3">{subtitle}</p>}
        
        <div className="flex space-x-6 text-sm">
          {expertCount && (
            <div>
              <span className="text-indigo-200">Expert Voices:</span>
              <span className="ml-1 font-semibold">{expertCount}</span>
            </div>
          )}
          {messageCount && (
            <div>
              <span className="text-indigo-200">Insights:</span>
              <span className="ml-1 font-semibold">{messageCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandedReportHeader;
