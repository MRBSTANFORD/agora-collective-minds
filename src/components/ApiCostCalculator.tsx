
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, DollarSign, Info, TrendingUp } from 'lucide-react';

const ApiCostCalculator = () => {
  const [rounds, setRounds] = useState([5]);
  const [challengeComplexity, setChallengeComplexity] = useState([2]); // 1-3 scale
  const [sessionsPerMonth, setSessionsPerMonth] = useState([4]);

  const providerCosts = {
    openai: { input: 0.0015, output: 0.002, name: "OpenAI GPT-4" },
    anthropic: { input: 0.003, output: 0.015, name: "Anthropic Claude" },
    google: { input: 0.00125, output: 0.00375, name: "Google Gemini" }
  };

  const complexityMultipliers = {
    1: { label: "Simple", factor: 1, description: "Clear, focused challenges" },
    2: { label: "Moderate", factor: 1.5, description: "Multi-faceted business issues" },
    3: { label: "Complex", factor: 2.2, description: "Strategic, multi-layered challenges" }
  };

  const calculateCost = (provider: keyof typeof providerCosts) => {
    const costs = providerCosts[provider];
    const complexity = complexityMultipliers[challengeComplexity[0] as keyof typeof complexityMultipliers];
    
    // Estimated tokens per expert per round
    const inputTokensPerExpert = 800 * complexity.factor;
    const outputTokensPerExpert = 400 * complexity.factor;
    
    // 8 experts
    const totalInputTokens = inputTokensPerExpert * 8 * rounds[0];
    const totalOutputTokens = outputTokensPerExpert * 8 * rounds[0];
    
    // Convert to thousands for pricing
    const inputCost = (totalInputTokens / 1000) * costs.input;
    const outputCost = (totalOutputTokens / 1000) * costs.output;
    
    const perSessionCost = inputCost + outputCost;
    const monthlyTotal = perSessionCost * sessionsPerMonth[0];
    
    return {
      perSession: perSessionCost,
      monthly: monthlyTotal,
      inputTokens: Math.round(totalInputTokens),
      outputTokens: Math.round(totalOutputTokens)
    };
  };

  const getComparisonData = () => {
    const traditionalConsulting = {
      perSession: 2500, // Conservative estimate for strategy consulting
      monthly: 2500 * sessionsPerMonth[0]
    };
    
    const subscriptionAI = {
      perSession: 20, // Fixed monthly subscription divided by usage
      monthly: 60 // Typical premium AI subscription
    };
    
    return { traditionalConsulting, subscriptionAI };
  };

  const comparison = getComparisonData();
  const openaiCost = calculateCost('openai');

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <Calculator className="w-12 h-12 text-blue-600 mr-4" />
            <h3 className="text-4xl font-thin tracking-wider text-slate-800">
              Cost Calculator
            </h3>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 font-light max-w-4xl mx-auto">
            Estimate your costs with complete transparency. You pay only for what you use.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Controls */}
          <div className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <span>Usage Parameters</span>
                </CardTitle>
                <CardDescription>
                  Adjust these settings to match your expected usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-slate-700">Discussion Rounds</label>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {rounds[0]} rounds
                    </Badge>
                  </div>
                  <Slider
                    value={rounds}
                    onValueChange={setRounds}
                    max={10}
                    min={3}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>3 (Quick)</span>
                    <span>10 (Deep)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-slate-700">Challenge Complexity</label>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      {complexityMultipliers[challengeComplexity[0] as keyof typeof complexityMultipliers].label}
                    </Badge>
                  </div>
                  <Slider
                    value={challengeComplexity}
                    onValueChange={setChallengeComplexity}
                    max={3}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-500 mt-2">
                    {complexityMultipliers[challengeComplexity[0] as keyof typeof complexityMultipliers].description}
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Simple</span>
                    <span>Complex</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-slate-700">Sessions per Month</label>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {sessionsPerMonth[0]} sessions
                    </Badge>
                  </div>
                  <Slider
                    value={sessionsPerMonth}
                    onValueChange={setSessionsPerMonth}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>1 (Occasional)</span>
                    <span>20 (Heavy)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card className="bg-slate-50/50 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Info className="w-5 h-5 text-slate-600" />
                  <span className="text-lg">How Costs Are Calculated</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-slate-600 space-y-2">
                  <p>• <strong>8 experts participate</strong> in each discussion</p>
                  <p>• <strong>Token usage scales</strong> with complexity and rounds</p>
                  <p>• <strong>Input tokens:</strong> Your challenge + conversation context</p>
                  <p>• <strong>Output tokens:</strong> Expert responses and analysis</p>
                  <p>• <strong>You pay directly</strong> to AI providers (OpenAI, Anthropic, etc.)</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-700 font-medium">
                    💡 Estimated tokens for current settings:
                  </p>
                  <div className="text-xs text-blue-600 mt-2 space-y-1">
                    <div>Input: ~{openaiCost.inputTokens.toLocaleString()} tokens</div>
                    <div>Output: ~{openaiCost.outputTokens.toLocaleString()} tokens</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Results */}
          <div className="space-y-8">
            {/* Provider Costs */}
            <div className="space-y-6">
              <h4 className="text-2xl font-light text-slate-800">Cost Estimates by Provider</h4>
              
              {Object.entries(providerCosts).map(([key, provider]) => {
                const cost = calculateCost(key as keyof typeof providerCosts);
                return (
                  <Card key={key} className="bg-white/95 backdrop-blur-sm border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-2xl font-light text-slate-800">
                            ${cost.perSession.toFixed(3)}
                          </div>
                          <div className="text-sm text-slate-600">per session</div>
                        </div>
                        <div>
                          <div className="text-2xl font-light text-slate-800">
                            ${cost.monthly.toFixed(2)}
                          </div>
                          <div className="text-sm text-slate-600">per month</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Comparison */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-green-800">
                  <TrendingUp className="w-6 h-6" />
                  <span>Cost Comparison</span>
                </CardTitle>
                <CardDescription className="text-green-700">
                  How AGORA compares to alternatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                    <span className="font-medium text-green-800">AGORA (OpenAI)</span>
                    <span className="text-xl font-light text-green-800">
                      ${openaiCost.monthly.toFixed(2)}/month
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-100 rounded-lg">
                    <span className="text-slate-700">Subscription AI Tools</span>
                    <span className="text-xl font-light text-slate-700">
                      ${comparison.subscriptionAI.monthly}/month
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-red-700">Traditional Consulting</span>
                    <span className="text-xl font-light text-red-700">
                      ${comparison.traditionalConsulting.monthly.toLocaleString()}/month
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white/60 rounded-lg">
                  <div className="text-sm text-green-700">
                    <strong>AGORA Advantages:</strong>
                  </div>
                  <div className="text-xs text-green-600 mt-2 space-y-1">
                    <div>• Pay only for what you use</div>
                    <div>• No monthly subscriptions</div>
                    <div>• Complete cost transparency</div>
                    <div>• {Math.round(comparison.traditionalConsulting.monthly / openaiCost.monthly)}x cheaper than consulting</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200">
          <h4 className="text-2xl font-light text-slate-800 mb-4">
            Ready to Get Started?
          </h4>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Set up your API keys and start accessing strategic insights for a fraction of traditional consulting costs.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-slate-700 to-amber-600 hover:from-slate-800 hover:to-amber-700">
            Set Up Your API Keys
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ApiCostCalculator;
