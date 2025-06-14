
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Heart, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const EightImmortalMinds = () => {
  const experts = [
    {
      name: 'Leonardo da Vinci',
      era: '1452–1519',
      title: 'The Polymath Visionary',
      quote: 'The noblest pleasure is the joy of understanding.',
      description: 'Leonardo da Vinci represents the ultimate synthesis of art and science. More than a painter, he was a relentless observer driven by an insatiable curiosity that knew no disciplinary bounds.',
      values: ['Interdisciplinary Synthesis', 'Visionary Curiosity', 'Pragmatic Invention'],
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Marie Curie',
      era: '1867–1934',
      title: 'The Relentless Empiricist',
      quote: 'Nothing in life is to be feared, it is only to be understood.',
      description: 'Marie Curie was a pioneering scientist of unparalleled rigor and perseverance whose research on radioactivity changed the course of science.',
      values: ['Unyielding Perseverance', 'Scientific Rigor', 'Ethical Service'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Socrates',
      era: 'c. 470–399 BCE',
      title: 'The Critical Inquirer',
      quote: 'The unexamined life is not worth living.',
      description: 'Socrates is the foundational figure of Western philosophy, who shifted its focus toward ethics and self-examination through persistent questioning.',
      values: ['Dialectical Questioning', 'Intellectual Humility', 'Ethical Inquiry'],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'Hypatia of Alexandria',
      era: 'c. 360–415 CE',
      title: 'The Rational Thinker',
      quote: 'Reserve your right to think, for even to think wrongly is better than not to think at all.',
      description: 'A brilliant mathematician, astronomer, and philosopher who championed rational thought and intellectual courage in times of turmoil.',
      values: ['Rational Inquiry', 'Intellectual Honesty', 'Inclusiveness and Equality'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Albert Einstein',
      era: '1879–1955',
      title: 'The Conceptual Rebel',
      quote: 'Imagination is more important than knowledge.',
      description: 'Einstein revolutionized our understanding of space, time, and gravity, becoming the icon of modern scientific genius and humanistic responsibility.',
      values: ['Thought Experiments', 'Pursuit of Simplicity', 'Humanistic Responsibility'],
      color: 'from-violet-500 to-purple-500'
    },
    {
      name: 'Confucius',
      era: '551–479 BCE',
      title: 'The Ethical Harmonizer',
      quote: 'The superior man is modest in his speech, but exceeds in his actions.',
      description: 'A philosopher whose insights on ethics, governance, and social harmony have profoundly shaped civilizations through practical moral wisdom.',
      values: ['Social Harmony', 'Relational Ethics', 'Practical Wisdom'],
      color: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Ada Lovelace',
      era: '1815–1852',
      title: 'The Computational Visionary',
      quote: 'The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.',
      description: 'Considered the world\'s first computer programmer, Ada possessed unique foresight into the creative potential of machines.',
      values: ['Poetic Science', 'Systems Thinking', 'Visionary Foresight'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Niccolò Machiavelli',
      era: '1469-1527',
      title: 'The Pragmatic Realist',
      quote: 'It is better to be feared than loved, if you cannot be both.',
      description: 'A Florentine diplomat whose clear-eyed analysis of power and politics founded modern political science with unflinching realism.',
      values: ['Pragmatism and Realism', 'Strategic Analysis of Power', 'Separation of Morality'],
      color: 'from-red-500 to-pink-500'
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
            <Star className="w-8 h-8 text-amber-500 mr-4" />
            <h1 className="text-6xl font-thin tracking-wider text-slate-800">
              The Eight Immortal Minds
            </h1>
            <Star className="w-8 h-8 text-amber-500 ml-4" />
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            A Confluence of Timeless Wisdom
          </p>
          <p className="text-lg text-slate-600 font-light leading-relaxed mt-6 max-w-3xl mx-auto">
            At the heart of AGORA lies a council of eight immortal minds, each an archetype of thinking and a pillar of human history whose ideas have irrevocably shaped our world. Their inclusion is a testament to the timeless relevance of their intellectual and moral contributions.
          </p>
        </div>
      </div>

      {/* Experts Grid */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {experts.map((expert, index) => (
            <Card key={index} className="relative h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Decorative gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${expert.color}`}></div>
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-light tracking-wide text-slate-800 mb-2">
                      {expert.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 font-light mb-2">
                      {expert.era}
                    </Badge>
                    <CardDescription className="text-base font-medium text-amber-600">
                      {expert.title}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-amber-400">
                  <p className="text-slate-700 italic font-light leading-relaxed">
                    "{expert.quote}"
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-slate-600 leading-relaxed font-light">
                  {expert.description}
                </p>
                
                <div>
                  <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Core Values & Approach
                  </h4>
                  <div className="space-y-2">
                    {expert.values.map((value, valueIndex) => (
                      <div key={valueIndex} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-400 mr-3"></div>
                        <span className="text-sm text-slate-700 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why This Panel Section */}
        <div className="mt-20 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-2xl p-12 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-thin tracking-wider text-slate-800 mb-4">
              Why This Panel Was Chosen
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 font-light max-w-3xl mx-auto">
              The selection of these eight minds was a deliberate act of intellectual design to create a balanced, dynamic, and comprehensive think tank.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Cross-Disciplinary Power",
                description: "Uniting science, philosophy, politics, mathematics, and artful synthesis for multi-faceted analysis."
              },
              {
                icon: Zap,
                title: "Idealism vs. Realism",
                description: "Powerful tension between visionary idealists and pragmatic realists tests every solution."
              },
              {
                icon: Heart,
                title: "Critical Inquiry",
                description: "With Socrates present, no assumption goes unchallenged, ensuring logical soundness."
              },
              {
                icon: Star,
                title: "Timeless Relevance",
                description: "Each member's core ideas remain profoundly influential across centuries."
              }
            ].map((strength, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-amber-50 flex items-center justify-center shadow-lg mb-4">
                  <strength.icon className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-light text-slate-800 mb-3 tracking-wide">{strength.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">{strength.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-slate-700 font-light italic leading-relaxed max-w-4xl mx-auto">
              This carefully selected panel is not designed for easy consensus. It is engineered for a robust, challenging, and intellectually honest debate that uncovers deeper truths by forcing opposing worldviews to contend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EightImmortalMinds;
