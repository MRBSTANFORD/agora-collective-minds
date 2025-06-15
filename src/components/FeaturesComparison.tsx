
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Shield, Clock, Users, DollarSign, Brain, Zap } from 'lucide-react';

const FeaturesComparison = () => {
  const comparisons = [
    {
      category: "Privacy & Data",
      items: [
        { feature: "No Data Collection", agora: true, traditional: false, other: false },
        { feature: "Local Storage Only", agora: true, traditional: false, other: false },
        { feature: "Your API Keys Stay Private", agora: true, traditional: false, other: false },
        { feature: "Zero Registration Required", agora: true, traditional: false, other: true }
      ]
    },
    {
      category: "Cost & Transparency",
      items: [
        { feature: "Pay Only for API Usage", agora: true, traditional: false, other: true },
        { feature: "No Monthly Subscriptions", agora: true, traditional: false, other: false },
        { feature: "Transparent Pricing", agora: true, traditional: false, other: true },
        { feature: "No Hidden Costs", agora: true, traditional: false, other: false }
      ]
    },
    {
      category: "Expert Quality",
      items: [
        { feature: "8 Diverse Expert Perspectives", agora: true, traditional: false, other: false },
        { feature: "Historical Wisdom Integration", agora: true, traditional: false, other: false },
        { feature: "Structured Collaborative Discussion", agora: true, traditional: true, other: false },
        { feature: "Real-time Iterative Refinement", agora: true, traditional: false, other: true }
      ]
    },
    {
      category: "Speed & Efficiency",
      items: [
        { feature: "Minutes vs Months", agora: true, traditional: false, other: true },
        { feature: "Instant Expert Access", agora: true, traditional: false, other: true },
        { feature: "Parallel Processing", agora: true, traditional: false, other: true },
        { feature: "24/7 Availability", agora: true, traditional: false, other: true }
      ]
    }
  ];

  const solutions = [
    {
      name: "AGORA",
      subtitle: "AI-Powered Historical Minds",
      color: "bg-gradient-to-br from-slate-700 to-amber-600",
      textColor: "text-white",
      icon: Brain,
      highlights: ["100% Private", "8 Expert Perspectives", "Historical Wisdom", "Pay-per-use"]
    },
    {
      name: "Traditional Consulting",
      subtitle: "Human Expert Teams",
      color: "bg-slate-100",
      textColor: "text-slate-700",
      icon: Users,
      highlights: ["High Cost", "Long Timeline", "Limited Availability", "Geographic Constraints"]
    },
    {
      name: "Other AI Tools",
      subtitle: "Single AI Assistants",
      color: "bg-blue-50",
      textColor: "text-blue-700",
      icon: Zap,
      highlights: ["Data Collection", "Single Perspective", "Subscription Model", "Privacy Concerns"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-thin tracking-wider text-slate-800 mb-6">
            Why Choose AGORA?
          </h3>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 font-light max-w-4xl mx-auto">
            Compare AGORA's unique approach to traditional consulting and other AI solutions
          </p>
        </div>

        {/* Solution Overview Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <Card key={index} className={`${solution.color} border-0 shadow-lg hover:shadow-xl transition-shadow`}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4`}>
                  <solution.icon className={`w-8 h-8 ${solution.textColor === 'text-white' ? 'text-white' : solution.textColor}`} />
                </div>
                <CardTitle className={`text-xl ${solution.textColor}`}>
                  {solution.name}
                </CardTitle>
                <CardDescription className={`${solution.textColor} opacity-90`}>
                  {solution.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {solution.highlights.map((highlight, idx) => (
                    <div key={idx} className={`text-sm ${solution.textColor} opacity-90 flex items-center`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60 mr-2"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Comparison */}
        <div className="space-y-12">
          {comparisons.map((comparison, categoryIndex) => (
            <div key={categoryIndex}>
              <h4 className="text-2xl font-light text-slate-800 mb-8 text-center">
                {comparison.category}
              </h4>
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-6 font-medium text-slate-700">Feature</th>
                      <th className="text-center p-6 font-medium text-slate-700">AGORA</th>
                      <th className="text-center p-6 font-medium text-slate-700">Traditional Consulting</th>
                      <th className="text-center p-6 font-medium text-slate-700">Other AI Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-t border-slate-100 hover:bg-slate-50/50">
                        <td className="p-6 text-slate-700">{item.feature}</td>
                        <td className="p-6 text-center">
                          {item.agora ? (
                            <div className="flex justify-center">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600" />
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <X className="w-5 h-5 text-red-600" />
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {item.traditional ? (
                            <div className="flex justify-center">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600" />
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <X className="w-5 h-5 text-red-600" />
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {item.other ? (
                            <div className="flex justify-center">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600" />
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <X className="w-5 h-5 text-red-600" />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Key Advantages Summary */}
        <div className="mt-16 bg-gradient-to-br from-slate-50 to-amber-50/30 rounded-2xl p-12">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-light text-slate-800 mb-4">
              AGORA's Unique Advantages
            </h4>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h5 className="font-medium text-slate-800 mb-2">100% Private</h5>
              <p className="text-sm text-slate-600">Your data never leaves your device</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h5 className="font-medium text-slate-800 mb-2">Instant Access</h5>
              <p className="text-sm text-slate-600">Minutes instead of months</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-slate-600" />
              </div>
              <h5 className="font-medium text-slate-800 mb-2">8 Expert Minds</h5>
              <p className="text-sm text-slate-600">Diverse historical perspectives</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h5 className="font-medium text-slate-800 mb-2">Pay Per Use</h5>
              <p className="text-sm text-slate-600">No subscriptions or hidden fees</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComparison;
