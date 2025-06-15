
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Users, Settings } from 'lucide-react';
import { ExpertConfig } from '@/components/ExpertCardList';
import { useAvailableModels } from "@/hooks/useAvailableModels";
import { ExpertAIAnalysis } from '@/hooks/useReportAIConfig';

interface AIConfigurationPanelProps {
  useExpertConfig: boolean;
  setUseExpertConfig: (value: boolean) => void;
  manualProvider: string;
  setManualProvider: (provider: string) => void;
  manualModel: string;
  setManualModel: (model: string) => void;
  manualApiKeys: Record<string, string>;
  updateManualApiKey: (provider: string, apiKey: string) => void;
  expertAIAnalysis: ExpertAIAnalysis;
  experts: ExpertConfig[];
}

export const AIConfigurationPanel: React.FC<AIConfigurationPanelProps> = ({
  useExpertConfig,
  setUseExpertConfig,
  manualProvider,
  setManualProvider,
  manualModel,
  setManualModel,
  manualApiKeys,
  updateManualApiKey,
  expertAIAnalysis,
  experts
}) => {
  const { models: availableModels } = useAvailableModels([manualProvider]);
  
  const modelOptionsForProvider = availableModels[manualProvider]?.map(m => ({
    label: m.label + (m.free ? " (Free)" : " (Paid)"),
    value: m.value
  })) || [];

  const hasExpertAIConfig = experts.some(expert => expert.provider && expert.apiKey);

  return (
    <Card className="border-indigo-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          <Bot className="w-5 h-5" />
          AI Enhancement Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Expert Configuration Option */}
        {hasExpertAIConfig && (
          <div className="space-y-3">
            <Button
              onClick={() => setUseExpertConfig(!useExpertConfig)}
              variant={useExpertConfig ? "default" : "outline"}
              className="w-full justify-start"
            >
              <Users className="w-4 h-4 mr-2" />
              Use Expert AI Configuration
              {useExpertConfig && <Badge className="ml-2 bg-green-100 text-green-700">Active</Badge>}
            </Button>
            
            {useExpertConfig && (
              <div className="p-3 bg-indigo-50 rounded-lg space-y-2">
                <div className="text-sm text-indigo-800">
                  <strong>Inherited from Experts:</strong>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline">
                    Provider: {expertAIAnalysis.mostUsedProvider}
                  </Badge>
                  {expertAIAnalysis.mostUsedModel && (
                    <Badge variant="outline">
                      Model: {expertAIAnalysis.mostUsedModel}
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    API Key: {expertAIAnalysis.availableApiKey ? 'Available' : 'Missing'}
                  </Badge>
                </div>
                <div className="text-xs text-indigo-600">
                  Using the most common AI configuration from your experts
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manual Configuration Option */}
        <div className="space-y-3">
          <Button
            onClick={() => setUseExpertConfig(false)}
            variant={!useExpertConfig ? "default" : "outline"}
            className="w-full justify-start"
          >
            <Settings className="w-4 h-4 mr-2" />
            Manual AI Configuration
            {!useExpertConfig && <Badge className="ml-2 bg-blue-100 text-blue-700">Active</Badge>}
          </Button>

          {!useExpertConfig && (
            <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
              {/* Provider Selection */}
              <div className="space-y-1">
                <Label htmlFor="report-provider" className="text-sm font-medium">
                  AI Provider
                </Label>
                <select
                  id="report-provider"
                  className="w-full text-sm border rounded px-3 py-2"
                  value={manualProvider}
                  onChange={(e) => setManualProvider(e.target.value)}
                >
                  {Object.keys(availableModels).map(provider => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>

              {/* Model Selection */}
              {modelOptionsForProvider.length > 0 && (
                <div className="space-y-1">
                  <Label htmlFor="report-model" className="text-sm font-medium">
                    Model
                  </Label>
                  <select
                    id="report-model"
                    className="w-full text-sm border rounded px-3 py-2"
                    value={manualModel}
                    onChange={(e) => setManualModel(e.target.value)}
                  >
                    <option value="">Select a model...</option>
                    {modelOptionsForProvider.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* API Key Input */}
              <div className="space-y-1">
                <Label htmlFor="report-api-key" className="text-sm font-medium">
                  API Key for {manualProvider}
                </Label>
                <Input
                  id="report-api-key"
                  type="password"
                  placeholder={`Enter your ${manualProvider} API key`}
                  value={manualApiKeys[manualProvider] || ''}
                  onChange={(e) => updateManualApiKey(manualProvider, e.target.value)}
                  className="text-sm"
                />
                <div className="text-xs text-gray-500">
                  This key is only stored temporarily and not saved permanently
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expert AI Summary */}
        {experts.length > 0 && (
          <div className="p-3 bg-amber-50 rounded-lg">
            <div className="text-sm font-medium text-amber-800 mb-2">
              Expert AI Usage Summary
            </div>
            <div className="space-y-1 text-xs text-amber-700">
              <div>Total Experts: {experts.length}</div>
              <div>Using AI: {experts.filter(e => e.provider).length}</div>
              <div>
                Providers: {Object.entries(expertAIAnalysis.providerCounts)
                  .map(([provider, count]) => `${provider} (${count})`)
                  .join(', ') || 'None configured'}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
