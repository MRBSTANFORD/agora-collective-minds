
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, BookOpen } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Large Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <img 
            src="/lovable-uploads/7c086ec5-9c76-4818-bcd0-24ba342a765b.png" 
            alt="AGORA Logo Background" 
            className="w-40 h-40 object-contain opacity-10 blur-sm"
          />
          <div className="absolute -inset-8 bg-gradient-to-r from-slate-200/10 via-amber-200/15 to-slate-200/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Geometric Greek patterns */}
      <div className="absolute inset-0 opacity-5 z-10">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        <div className="absolute left-1/6 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
        <div className="absolute right-1/6 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
      </div>

      <div className="relative z-20 text-center max-w-5xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="relative">
            <img 
              src="/lovable-uploads/7c086ec5-9c76-4818-bcd0-24ba342a765b.png" 
              alt="AGORA Logo" 
              className="w-32 h-32 object-contain drop-shadow-2xl"
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-slate-200/20 via-amber-200/20 to-slate-200/20 rounded-full blur-lg"></div>
          </div>
        </div>
        
        <h2 className="text-7xl font-thin tracking-wider mb-8 leading-tight" style={{ color: '#1e293b' }}>
          Where Timeless Wisdom
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-amber-600 to-slate-700">
            Illuminates Tomorrow
          </span>
        </h2>
        
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
        
        <p className="text-2xl text-slate-600 mb-12 leading-relaxed font-light max-w-4xl mx-auto">
          Convene with eight immortal minds in the sacred space of dialectic, 
          where collective wisdom transforms complexity into clarity.
        </p>
        
        <div className="flex justify-center space-x-6">
          {[
            { icon: Brain, label: 'Collective Intelligence', color: 'slate' },
            { icon: Lightbulb, label: 'Timeless Insights', color: 'amber' },
            { icon: BookOpen, label: 'Eternal Wisdom', color: 'slate' }
          ].map((feature, index) => (
            <Badge key={index} variant="secondary" className={`px-6 py-3 bg-${feature.color}-50 text-${feature.color}-700 border border-${feature.color}-200 font-light tracking-wide`}>
              <feature.icon className="w-5 h-5 mr-3" />
              {feature.label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
