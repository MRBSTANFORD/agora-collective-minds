
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, BookOpen, Users, Clock, Target } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Large Background Logo - increased size to maintain balance */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <img 
            src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" 
            alt="AGORA Logo Background" 
            className="w-64 h-64 object-contain opacity-10 blur-sm"
          />
          <div className="absolute -inset-12 bg-gradient-to-r from-slate-200/10 via-amber-200/15 to-slate-200/10 rounded-full blur-2xl"></div>
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
        <div className="flex justify-center mb-16">
          <div className="relative">
            <img 
              src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png"
              alt="AGORA Logo" 
              className="w-96 h-96 object-contain drop-shadow-2xl"
            />
            <div className="absolute -inset-8 bg-gradient-to-r from-slate-200/20 via-amber-200/20 to-slate-200/20 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <h2 className="text-7xl font-thin tracking-wider mb-8 leading-tight" style={{ color: '#1e293b' }}>
          Collaborate with History's
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-amber-600 to-slate-700">
            Greatest Thinkers
          </span>
        </h2>
        
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
        
        <p className="text-2xl text-slate-600 mb-8 leading-relaxed font-light max-w-4xl mx-auto">
          Get 8 different expert perspectives on your challenges in minutes, not months. 
          <br />
          <span className="text-lg text-slate-500">
            From ancient philosophers to modern innovators, experience structured discussion that transforms complexity into clarity.
          </span>
        </p>

        {/* New benefits section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
            <Clock className="w-6 h-6 text-amber-600" />
            <span className="text-slate-700 font-medium">Minutes, not months</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
            <Users className="w-6 h-6 text-slate-600" />
            <span className="text-slate-700 font-medium">8 expert perspectives</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
            <Target className="w-6 h-6 text-amber-600" />
            <span className="text-slate-700 font-medium">Clear action plans</span>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6">
          {[
            { icon: Brain, label: 'Collective Intelligence', color: 'slate' },
            { icon: Lightbulb, label: 'Creative Solutions', color: 'amber' },
            { icon: BookOpen, label: 'Historical Wisdom', color: 'slate' }
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
