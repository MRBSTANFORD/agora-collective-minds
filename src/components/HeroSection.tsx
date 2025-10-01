
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, BookOpen, Users, Clock, Target, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Large Background Logo - responsive sizing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <img 
            src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" 
            alt="AGORA Logo Background" 
            className="w-32 h-32 md:w-64 md:h-64 object-contain opacity-10 blur-sm"
          />
          <div className="absolute -inset-6 md:-inset-12 bg-gradient-to-r from-slate-200/10 via-amber-200/15 to-slate-200/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Geometric Greek patterns */}
      <div className="absolute inset-0 opacity-5 z-10">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        <div className="absolute left-1/6 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
        <div className="absolute right-1/6 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
      </div>

      <div className="relative z-20 text-center max-w-5xl mx-auto px-4">
        <div className="flex justify-center mb-8 md:mb-16">
          <div className="relative">
            <img 
              src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png"
              alt="AGORA Logo" 
              className="w-48 h-48 md:w-96 md:h-96 object-contain drop-shadow-2xl"
            />
            <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-slate-200/20 via-amber-200/20 to-slate-200/20 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <h2 className="text-4xl md:text-7xl font-thin tracking-wider mb-6 md:mb-8 leading-tight px-2" style={{ color: '#1e293b' }}>
          Collaborate with History's
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-amber-600 to-slate-700">
            Greatest Thinkers
          </span>
        </h2>
        
        <div className="w-20 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6 md:mb-8"></div>
        
        <p className="text-lg md:text-2xl text-slate-600 mb-6 md:mb-8 leading-relaxed font-light max-w-4xl mx-auto px-4">
          Get 8 different expert perspectives on your challenges in minutes, not months. 
          <br className="hidden md:block" />
          <span className="text-base md:text-lg text-slate-500 block mt-2 md:inline md:mt-0">
            From ancient philosophers to modern innovators, experience structured discussion that transforms complexity into clarity.
          </span>
        </p>

        {/* Enhanced Privacy-First Badge - responsive */}
        <div className="mb-6 md:mb-8">
          <Badge className="bg-green-100 text-green-800 border-green-300 px-4 md:px-8 py-2 md:py-4 text-base md:text-xl font-medium shadow-lg">
            <Shield className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-3" />
            <span className="hidden sm:inline">100% Private • Zero Data Collection • Your Insights Stay Yours</span>
            <span className="sm:hidden">100% Private • Zero Collection</span>
          </Badge>
        </div>

        {/* Enhanced benefits section - responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-3 bg-white/90 backdrop-blur-sm rounded-lg p-3 md:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Clock className="w-5 h-5 md:w-7 md:h-7 text-amber-600" />
            <span className="text-slate-700 font-medium text-sm md:text-lg text-center md:text-left">Minutes, not months</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-3 bg-white/90 backdrop-blur-sm rounded-lg p-3 md:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-5 h-5 md:w-7 md:h-7 text-slate-600" />
            <span className="text-slate-700 font-medium text-sm md:text-lg text-center md:text-left">8 expert perspectives</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-3 bg-white/90 backdrop-blur-sm rounded-lg p-3 md:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Target className="w-5 h-5 md:w-7 md:h-7 text-amber-600" />
            <span className="text-slate-700 font-medium text-sm md:text-lg text-center md:text-left">BYOK - Test any model</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-3 bg-green-50 backdrop-blur-sm rounded-lg p-3 md:p-5 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <Shield className="w-5 h-5 md:w-7 md:h-7 text-green-600" />
            <span className="text-green-700 font-medium text-sm md:text-lg text-center md:text-left">Privacy-first design</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-6 px-4">
          {[
            { icon: Brain, label: 'Collective Intelligence', color: 'slate' },
            { icon: Lightbulb, label: 'Creative Solutions', color: 'amber' },
            { icon: BookOpen, label: 'Historical Wisdom', color: 'slate' }
          ].map((feature, index) => (
            <Badge key={index} variant="secondary" className={`px-4 md:px-6 py-2 md:py-3 bg-${feature.color}-50 text-${feature.color}-700 border border-${feature.color}-200 font-light tracking-wide hover:shadow-md transition-shadow`}>
              <feature.icon className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              <span className="text-sm md:text-base">{feature.label}</span>
            </Badge>
          ))}
        </div>

        {/* Enhanced RF Strategy Attribution - responsive */}
        <div className="mt-12 md:mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-200 shadow-lg mx-4 md:mx-0">
          <div className="text-center">
            <p className="text-slate-600 text-base md:text-lg mb-4">
              Developed by <a href="https://www.razaofinal.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold">RF Strategy</a>
            </p>
            <p className="text-slate-500 text-sm md:text-base">
              Empowering strategic thinking for everyone • Trusted by businesses worldwide
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 mt-6 text-xs md:text-sm text-slate-500">
              <div className="flex items-center">
                <Shield className="w-3 h-3 md:w-4 md:h-4 mr-2 text-green-600" />
                Privacy-first approach
              </div>
              <div className="flex items-center">
                <Target className="w-3 h-3 md:w-4 md:h-4 mr-2 text-amber-600" />
                Strategic consulting expertise
              </div>
              <div className="flex items-center">
                <Brain className="w-3 h-3 md:w-4 md:h-4 mr-2 text-slate-600" />
                AI innovation leadership
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
