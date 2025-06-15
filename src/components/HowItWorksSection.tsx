
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HowItWorksSection = () => {
  const phases = [
    {
      step: "Ι",
      title: "Challenge Analysis",
      desc: "Present your challenge to 8 AI-powered historical minds - from ancient philosophers to modern innovators. Each expert analyzes your problem through their unique lens and expertise.",
      examples: ["Aristotle applies logical frameworks", "Da Vinci explores creative solutions", "Jobs focuses on user experience"],
      gradient: "from-slate-600 to-slate-800"
    },
    {
      step: "ΙΙ",
      title: "Iterative Discussion",
      desc: "Watch as perspectives converge through structured rounds of discourse. Each expert builds on others' ideas, challenges assumptions, and refines solutions through collaborative thinking.",
      examples: ["Cross-pollination of ideas", "Constructive debate and refinement", "Synthesis of diverse viewpoints"],
      gradient: "from-amber-500 to-amber-600"
    },
    {
      step: "ΙΙΙ",
      title: "Actionable Insights",
      desc: "Receive comprehensive analysis with concrete next steps. The collective wisdom is distilled into clear recommendations, implementation strategies, and decision frameworks.",
      examples: ["Prioritized action items", "Risk assessment and mitigation", "Implementation roadmap"],
      gradient: "from-slate-600 to-amber-600"
    }
  ];

  const expertTypes = [
    { name: "Ancient Philosophers", focus: "Ethics & Logic" },
    { name: "Renaissance Masters", focus: "Creativity & Innovation" },
    { name: "Scientific Pioneers", focus: "Analysis & Method" },
    { name: "Modern Visionaries", focus: "Strategy & Implementation" }
  ];

  return (
    <section className="py-20 relative">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
            alt="AGORA Logo" 
            className="w-12 h-12 object-contain mr-4 opacity-80"
          />
          <h3 className="text-4xl font-thin tracking-wider text-slate-800">How It Works</h3>
        </div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
        <p className="text-slate-600 font-light text-lg max-w-3xl mx-auto">
          Experience structured collaboration with history's greatest minds through our AI-powered discussion platform
        </p>
      </div>

      {/* Expert Types Preview */}
      <div className="mb-16">
        <h4 className="text-center text-xl font-light text-slate-700 mb-8">Meet Your Think Tank</h4>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {expertTypes.map((type, index) => (
            <Badge key={index} variant="outline" className="px-4 py-2 bg-white/80 border-slate-300 text-slate-700">
              <span className="font-medium">{type.name}</span>
              <span className="text-xs text-slate-500 ml-2">• {type.focus}</span>
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-12">
        {phases.map((phase, index) => (
          <Card key={index} className="relative bg-white/90 backdrop-blur-sm border-slate-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            {/* Greek column effect */}
            <div className="absolute top-0 left-4 w-0.5 h-full bg-gradient-to-b from-slate-300 to-transparent opacity-30"></div>
            <div className="absolute top-0 right-4 w-0.5 h-full bg-gradient-to-b from-slate-300 to-transparent opacity-30"></div>
            
            <CardHeader className="text-center pb-6">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${phase.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <span className="text-3xl font-thin text-white tracking-wider">{phase.step}</span>
              </div>
              <CardTitle className="text-xl font-light tracking-wide text-slate-800">{phase.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-slate-600 leading-relaxed font-light mb-6">
                {phase.desc}
              </CardDescription>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide text-center">Examples:</p>
                {phase.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    <span className="text-sm text-slate-600 font-light">{example}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline indicator */}
      <div className="mt-16 text-center">
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
          <span>⏱️ Typical session: 15-45 minutes</span>
          <span>•</span>
          <span>📊 Get detailed reports and insights</span>
          <span>•</span>
          <span>🔄 Iterate and refine as needed</span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
