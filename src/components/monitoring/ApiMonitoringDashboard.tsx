
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Zap, Wifi, WifiOff } from 'lucide-react';
import { testApiConnection, ProviderApiStatus } from '@/services/apiTester';
import { ExpertConfig } from '@/components/ExpertCardList';

interface ApiMonitoringDashboardProps {
  experts: ExpertConfig[];
}

interface ApiHealth {
  provider: string;
  status: ProviderApiStatus;
  responseTime: number;
  lastChecked: Date;
  successRate: number;
  errorMessage?: string;
}

const ApiMonitoringDashboard: React.FC<ApiMonitoringDashboardProps> = ({ experts }) => {
  const [apiHealthData, setApiHealthData] = useState<Record<string, ApiHealth>>({});
  const [isMonitoring, setIsMonitoring] = useState(false);

  const uniqueProviders = [...new Set(experts.map(e => e.provider || 'HuggingFace'))];

  const checkApiHealth = async (provider: string, apiKey?: string) => {
    const startTime = Date.now();
    try {
      const result = await testApiConnection({
        provider,
        model: 'default',
        apiKey: apiKey || ''
      });
      
      const responseTime = Date.now() - startTime;
      
      setApiHealthData(prev => ({
        ...prev,
        [provider]: {
          provider,
          status: result.ok ? 'success' : 'error',
          responseTime,
          lastChecked: new Date(),
          successRate: prev[provider] ? 
            (prev[provider].successRate * 0.9 + (result.ok ? 10 : 0)) : 
            (result.ok ? 100 : 0),
          errorMessage: result.ok ? undefined : result.message
        }
      }));
    } catch (error) {
      const responseTime = Date.now() - startTime;
      setApiHealthData(prev => ({
        ...prev,
        [provider]: {
          provider,
          status: 'error',
          responseTime,
          lastChecked: new Date(),
          successRate: prev[provider] ? prev[provider].successRate * 0.9 : 0,
          errorMessage: error instanceof Error ? error.message : 'Unknown error'
        }
      }));
    }
  };

  const runHealthCheck = async () => {
    setIsMonitoring(true);
    for (const provider of uniqueProviders) {
      const expert = experts.find(e => e.provider === provider);
      await checkApiHealth(provider, expert?.apiKey);
      // Small delay between checks
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setIsMonitoring(false);
  };

  useEffect(() => {
    // Initial health check
    runHealthCheck();
    
    // Set up periodic monitoring
    const interval = setInterval(runHealthCheck, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [experts]);

  const getStatusIcon = (status: ProviderApiStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'testing':
        return <Clock className="w-5 h-5 text-yellow-600 animate-spin" />;
      default:
        return <Wifi className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: ProviderApiStatus) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-700">Healthy</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'testing':
        return <Badge className="bg-yellow-100 text-yellow-700">Testing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const overallHealth = Object.values(apiHealthData).reduce((sum, api) => {
    return sum + (api.status === 'success' ? 1 : 0);
  }, 0) / Math.max(Object.keys(apiHealthData).length, 1) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              API Health Overview
            </CardTitle>
            <Button 
              onClick={runHealthCheck} 
              disabled={isMonitoring}
              variant="outline"
              size="sm"
            >
              {isMonitoring ? 'Checking...' : 'Run Health Check'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(apiHealthData).filter(api => api.status === 'success').length}
              </div>
              <div className="text-sm text-gray-600">Healthy APIs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(apiHealthData).filter(api => api.status === 'error').length}
              </div>
              <div className="text-sm text-gray-600">Failed APIs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(apiHealthData).length > 0 ? 
                  Math.round(Object.values(apiHealthData).reduce((sum, api) => sum + api.responseTime, 0) / Object.values(apiHealthData).length) : 0
                }ms
              </div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm">
              <span>Overall Health</span>
              <span>{Math.round(overallHealth)}%</span>
            </div>
            <Progress value={overallHealth} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Individual Provider Status */}
      <div className="grid gap-4">
        {uniqueProviders.map(provider => {
          const health = apiHealthData[provider];
          const expert = experts.find(e => e.provider === provider);
          
          return (
            <Card key={provider}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(health?.status || 'idle')}
                    <div>
                      <h3 className="font-medium">{provider}</h3>
                      <p className="text-sm text-gray-600">
                        {expert?.apiKey ? 'API Key Configured' : 'No API Key'}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(health?.status || 'idle')}
                </div>
                
                {health && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Response Time:</span>
                      <div className="font-medium">{health.responseTime}ms</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Success Rate:</span>
                      <div className="font-medium">{Math.round(health.successRate)}%</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Checked:</span>
                      <div className="font-medium">{health.lastChecked.toLocaleTimeString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Experts Using:</span>
                      <div className="font-medium">
                        {experts.filter(e => e.provider === provider).length}
                      </div>
                    </div>
                  </div>
                )}
                
                {health?.errorMessage && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    <strong>Error:</strong> {health.errorMessage}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ApiMonitoringDashboard;
