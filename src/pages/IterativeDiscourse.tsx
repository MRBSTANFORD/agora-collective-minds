
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Layers, RefreshCw, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const IterativeDiscourse = () => {
  const pillars = [
    {
      step: "1",
      title: "Formulation",
      description: "In the initial round, each of the eight AI agents analyzes the challenge and contributes ideas independently, colored by their unique personality, values, and thinking style.",
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "2",
      title: "Synthesis & Reflection",
      description: "At the beginning of every subsequent round, each agent is required to read and process all ideas from the previous rounds, preventing good ideas from being lost.",
      icon: RefreshCw,
      color: "from-purple-500 to-indigo-500"
    },
    {
      step: "3",
      title: "Refinement & Integration",
      description: "Armed with collective knowledge, agents comment on, refine, and integrate existing ideas. Leonardo might merge a technical proposal from Ada with an ethical concern from Confucius.",
      icon: Layers,
      color: "from-amber-500 to-orange-500"
    },
    {
      step: "4",
      title: "Divergence & Challenge",
      description: "Iteration clarifies disagreement. Machiavelli might challenge the practicality of Einstein's solution, forcing the group to address potential weaknesses.",
      icon: RotateCcw,
      color: "from-red-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="flex items-center space-x-2 text-slate-600 hover:text-slate-800">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Agora</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                alt="AGORA Logo" 
                className="w-12 h-12 object-contain"
              />
              <h1 className="text-2xl font-thin tracking-wider text-slate-800">AGORA</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
          <div className="flex items-center justify-center mb-8">
            <RotateCcw className="w-8 h-8 text-amber-500 mr-4" />
            <h1 className="text-6xl font-thin tracking-wider text-slate-800">
              Iterative Discourse
            </h1>
            <RotateCcw className="w-8 h-8 text-amber-500 ml-4" />
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            The Engine of AGORA's Collective Wisdom
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 pb-20">
        {/* Introduction */}
        <div className="mb-16">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-light tracking-wide text-slate-800 mb-4">
                The Sculpting of Great Ideas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Great ideas are rarely born of a single flash of brilliance. Like magnificent sculptures, they begin as rough blocks of potential and are shaped through a painstaking process of chipping away the superfluous, refining the contours, and polishing the essential form.
              </p>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                This act of intellectual sculpting is the essence of <span className="font-medium text-amber-600">Iterative Discourse</span>. It is a methodology grounded in the belief that true insight emerges not from a monologue, but from a structured, multi-layered dialogue where ideas are progressively challenged, integrated, and strengthened.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Definition Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            Defining Iterative Discourse
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <Card className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  Iterative Discourse is a formal process of discussion that unfolds in discrete, sequential rounds:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-400">
                    <h3 className="text-lg font-medium text-slate-800 mb-3">Round 1</h3>
                    <p className="text-slate-600 font-light">Generates initial perspectives and foundational ideas from all participants.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-amber-400">
                    <h3 className="text-lg font-medium text-slate-800 mb-3">Subsequent Rounds</h3>
                    <p className="text-slate-600 font-light">Participants refine, critique, expand, or integrate existing ideas rather than stating new, disconnected thoughts.</p>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                  <p className="text-lg text-slate-700 font-light italic leading-relaxed">
                    This process transforms a linear debate into a spiral of deepening insight. The conversation continuously loops back on itself, but each time at a higher level of synthesis and complexity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Four Pillars */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            The Four Pillars of the Iterative Process
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <Card key={index} className="relative h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${pillar.color}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-4 shadow-lg`}>
                      <pillar.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-light tracking-wide text-slate-800">
                        {pillar.step}. {pillar.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Purpose-Built Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            How AGORA is Purpose-Built for Iterative Discourse
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <div className="space-y-8">
            {[
              {
                title: "The Multi-Round Structure",
                description: "The core mechanic of AGORA is the user-defined number of interaction rounds. This mechanism is the very framework of the iterative process, giving ideas the necessary time and space to evolve from raw concepts into refined strategies."
              },
              {
                title: "Diverse Agent Personas",
                description: "Each AI agent is conditioned with a detailed personality profile, distinct thinking style, and core values. This intellectual diversity is the fuel for iteration—friction between different worldviews forces ideas to be examined from every angle."
              },
              {
                title: "Cumulative Memory and Context",
                description: "The system ensures perfect, cumulative memory. Each agent begins a new round with the complete transcript of what came before, preventing conversational drift and ensuring continuous building upon the foundation."
              },
              {
                title: "Structured Reporting",
                description: "AGORA's final output includes eight different reports designed to make the iterative journey transparent, showing how collective wisdom was generated through the process."
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-light tracking-wide text-slate-800 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mr-4"></div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          
          <div className="text-center">
            <h2 className="text-3xl font-thin tracking-wider mb-6">
              From Brainstorming to Actionable Wisdom
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg font-light leading-relaxed text-slate-200">
                The goal of employing iterative discourse within AGORA is to guide users from a wide array of initial possibilities to a set of clear, strategic, and pressure-tested recommendations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  "Filters for Robustness: Weak or superficial ideas are quickly exposed and discarded.",
                  "Uncovers Deeper Insights: Second and third-order implications that are not obvious in a single round are brought to the surface.",
                  "Builds Consensus and Clarifies Dissent: The process reveals where diverse minds converge and diverge, providing a clear intellectual map."
                ].map((outcome, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
                    <p className="text-slate-200 font-light leading-relaxed">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
              
              <p className="text-xl font-light italic leading-relaxed text-amber-200 mt-12">
                Iterative Discourse is the fundamental operating principle of AGORA—the mechanism that elevates discussion into a powerful engine for discovery, transforming timeless wisdom into modern, actionable solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IterativeDiscourse;
