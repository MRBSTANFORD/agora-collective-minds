
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Eye, Link2, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TranscendentInsights = () => {
  const attributes = [
    {
      title: "It Reframes the Problem",
      description: "The most powerful insights do not solve the problem; they dissolve it by showing it was the wrong question to ask.",
      example: "A discussion about 'how to build better prisons' might yield a transcendent insight that reframes the challenge as 'how to design communities that make prisons obsolete.'",
      icon: Eye,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "It Connects the Unconnected",
      description: "A transcendent insight often emerges from a non-obvious connection between disparate fields.",
      example: "A principle from political philosophy that unlocks a bottleneck in software architecture, or an observation from biology that revolutionizes a model for social harmony.",
      icon: Link2,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "It is Emergent",
      description: "A true transcendent insight rarely comes from a single agent. It is an emergent property of the dialogue itself.",
      example: "An idea that could not have existed without the specific sequence of interactions, challenges, and integrations that preceded it.",
      icon: Sparkles,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "It Carries a Sense of Inevitability",
      description: "Once discovered, a transcendent insight often feels simple and obvious in hindsight.",
      example: "Leaving participants to wonder how they never saw it before, despite its profound implications.",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const mechanisms = [
    {
      title: "Forced Interdisciplinary Collision",
      description: "AGORA's primary mechanism for generating novel insights is the structured collision of its diverse expert agents. By placing a political realist, computational visionary, ethical harmonizer, and relentless empiricist in the same dialogue, the system ensures no idea remains within the safety of its home discipline.",
      icon: Zap
    },
    {
      title: "The 'Outsider' Perspective",
      description: "Breakthroughs often come from outsiders who are not burdened by a field's established dogma. In AGORA, every expert is an outsider to the other seven domains. Socrates can ask a 'naive' question about computing that exposes a core assumption Ada Lovelace takes for granted.",
      icon: Eye
    },
    {
      title: "The Iterative Amplifier",
      description: "The multi-round structure acts as an insight amplifier. A small, curious observation in Round 1 can be expanded in Round 2, integrated with a different concept in Round 3, and blossom into a fully-fledged transcendent insight by the final round.",
      icon: Sparkles
    },
    {
      title: "The Dialectic of Creativity and Rigor",
      description: "The panel balances agents who excel at visionary thinking with those who provide intellectual rigor. A speculative leap from Einstein, when questioned by Socrates and tested against Curie's demand for evidence, can be sculpted from a mere 'what if' into a viable solution.",
      icon: Link2
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
            <Sparkles className="w-8 h-8 text-amber-500 mr-4" />
            <h1 className="text-6xl font-thin tracking-wider text-slate-800">
              Transcendent Insights
            </h1>
            <Sparkles className="w-8 h-8 text-amber-500 ml-4" />
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            The Emergence of Truth
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
                Beyond the Boundaries of a Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Within any complex challenge lies the potential for a solution that does not merely answer the initial question but transforms it entirely. This is the nature of a <span className="font-medium text-amber-600">Transcendent Insight</span>.
              </p>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                It is a profound realization that rises above the conventional boundaries of a problem, revealing a simpler, more elegant, or more powerful path forward that was previously invisible. While Iterative Discourse provides the process and Synthesis of Wisdom provides the meaning, the pursuit of Transcendent Insights is the ultimate ambition of the AGORA platform.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Nature of Transcendent Insights */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            The Nature of a Transcendent Insight
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <p className="text-lg text-slate-600 font-light leading-relaxed text-center mb-12 max-w-4xl mx-auto">
            A Transcendent Insight is not simply a good idea or an incremental improvement. It is a qualitative leap in understanding, characterized by several key attributes:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {attributes.map((attribute, index) => (
              <Card key={index} className="relative h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${attribute.color}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${attribute.color} flex items-center justify-center mr-4 shadow-lg`}>
                      <attribute.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-light tracking-wide text-slate-800">
                      {attribute.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-600 leading-relaxed font-light">
                    {attribute.description}
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-amber-400">
                    <p className="text-slate-700 font-light italic leading-relaxed">
                      {attribute.example}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How AGORA Cultivates */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            How AGORA Cultivates Transcendent Insights
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <Card className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-0 shadow-lg mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-slate-600 font-light leading-relaxed text-center">
                Transcendent Insights cannot be forced, but one can create a fertile environment where they are more likely to emerge. AGORA is engineered to be precisely this environment.
              </p>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            {mechanisms.map((mechanism, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-light tracking-wide text-slate-800 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-400 mr-4"></div>
                    {mechanism.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {mechanism.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Capturing Insights */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            Capturing the Emergent Insight
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-light tracking-wide text-slate-800">
                  The "Innovative & Creative Solutions" Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed font-light">
                  Among the eight final reports, this one is specifically tasked with synthesizing the most novel and creative ideas that emerged from the discourse. It ensures that potential transcendent insights are not buried within the full transcript but are presented clearly to the user.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-light tracking-wide text-slate-800">
                  The "Idea Evolution Timeline" Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed font-light">
                  This report allows a user to perform intellectual archaeology on a transcendent insight. One can trace a breakthrough idea back to its origin, observing the precise chain of comments, challenges, and integrations across multiple rounds and agents that led to its emergence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Visualization */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            The Path to Transcendence
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <div className="relative">
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { title: "Collision", desc: "Diverse minds clash", color: "from-slate-500 to-slate-600" },
                { title: "Friction", desc: "Ideas challenged", color: "from-blue-500 to-purple-500" },
                { title: "Integration", desc: "Concepts merge", color: "from-purple-500 to-amber-500" },
                { title: "Amplification", desc: "Insights evolve", color: "from-amber-500 to-orange-500" },
                { title: "Emergence", desc: "Truth revealed", color: "from-orange-500 to-red-500" }
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-4`}>
                    <span className="text-lg font-thin text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-light text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 font-light">{step.desc}</p>
                  
                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent transform -translate-y-1/2 z-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #DAA520 20px, #DAA520 21px)`
            }}></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-thin tracking-wider mb-6">
              The Pinnacle of Collective Intelligence
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl font-light leading-relaxed text-slate-200">
                Transcendent Insights represent the pinnacle of what collective intelligence can achieve. They are not the product of a single mind, but the emergent result of a structured, multi-perspective dialogue where ideas are forced to collide, evolve, and ascend.
              </p>
              
              <p className="text-lg font-light leading-relaxed text-slate-300">
                AGORA is designed not merely to conduct a discussion, but to create the conditions for this emergence. By orchestrating a rigorous and iterative discourse among timeless minds, the platform provides a space where the boundaries of a problem can be broken, and a truly transformative understanding can be born.
              </p>
              
              <div className="mt-12 bg-slate-700/50 rounded-lg p-8 backdrop-blur-sm">
                <p className="text-xl font-light italic leading-relaxed text-amber-200">
                  "Within the crucible of disciplined discourse, where ancient wisdom meets contemporary challenge, the impossible becomes inevitable, and truth emerges not as answer, but as transformation."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscendentInsights;
