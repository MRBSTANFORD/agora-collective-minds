
import { useState, useMemo, useCallback } from 'react';
import { ExpertConfig } from '@/components/ExpertCardList';

export interface ReportAIConfig {
  useExpertConfig: boolean;
  provider: string;
  model: string;
  apiKey: string;
}

export interface ExpertAIAnalysis {
  mostUsedProvider: string;
  mostUsedModel: string;
  availableApiKey: string;
  providerCounts: Record<string, number>;
  modelCounts: Record<string, number>;
}

export function useReportAIConfig(experts: ExpertConfig[] = []) {
  const [useExpertConfig, setUseExpertConfig] = useState(true);
  const [manualProvider, setManualProvider] = useState('OpenAI');
  const [manualModel, setManualModel] = useState('');
  const [manualApiKeys, setManualApiKeys] = useState<Record<string, string>>({});

  // Analyze expert AI configurations
  const expertAIAnalysis = useMemo((): ExpertAIAnalysis => {
    const providerCounts: Record<string, number> = {};
    const modelCounts: Record<string, number> = {};
    let availableApiKey = '';

    experts.forEach(expert => {
      if (expert.provider) {
        providerCounts[expert.provider] = (providerCounts[expert.provider] || 0) + 1;
      }
      if (expert.model) {
        modelCounts[expert.model] = (modelCounts[expert.model] || 0) + 1;
      }
      if (expert.apiKey && expert.apiKey.trim() && !availableApiKey) {
        availableApiKey = expert.apiKey;
      }
    });

    const mostUsedProvider = Object.entries(providerCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'OpenAI';
    
    const mostUsedModel = Object.entries(modelCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

    return {
      mostUsedProvider,
      mostUsedModel,
      availableApiKey,
      providerCounts,
      modelCounts
    };
  }, [experts]);

  // Get final configuration for report generation
  const getFinalConfig = useCallback((): ReportAIConfig => {
    if (useExpertConfig) {
      return {
        useExpertConfig: true,
        provider: expertAIAnalysis.mostUsedProvider,
        model: expertAIAnalysis.mostUsedModel,
        apiKey: expertAIAnalysis.availableApiKey
      };
    } else {
      return {
        useExpertConfig: false,
        provider: manualProvider,
        model: manualModel,
        apiKey: manualApiKeys[manualProvider] || ''
      };
    }
  }, [useExpertConfig, expertAIAnalysis, manualProvider, manualModel, manualApiKeys]);

  const updateManualApiKey = useCallback((provider: string, apiKey: string) => {
    setManualApiKeys(prev => ({
      ...prev,
      [provider]: apiKey
    }));
  }, []);

  return {
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
  };
}
