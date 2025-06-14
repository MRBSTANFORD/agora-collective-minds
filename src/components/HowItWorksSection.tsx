
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorksSection = () => {
  const phases = [
    {
      step: "Ι",
      title: "Invocation",
      desc: "Present your challenge to the assembled minds, each bringing millennia of wisdom",
      gradient: "from-slate-600 to-slate-800"
    },
    {
      step: "ΙΙ",
      title: "Dialectic",
      desc: "Watch as eight perspectives converge in iterative rounds of philosophical discourse",
      gradient: "from-amber-500 to-amber-600"
    },
    {
      step: "ΙΙΙ",
      title: "Synthesis",
      desc: "Receive comprehensive insights that transcend individual thought through collective wisdom",
      gradient: "from-slate-600 to-amber-600"
    }
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
          <h3 className="text-4xl font-thin tracking-wider text-slate-800">The Sacred Process</h3>
        </div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
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
              <CardDescription className="text-center text-slate-600 leading-relaxed font-light">
                {phase.desc}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
