
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lightbulb, FileText, Users, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SynthesisOfWisdom = () => {
  const reports = [
    {
      title: "Executive Summary",
      description: "The most direct form of synthesis, condensing the entire dialogue into concise key points, high-level insights, and top recommendations.",
      icon: FileText,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Consensus Map",
      description: "Synthesizes areas of agreement, demonstrating where intellectually diverse minds converged and highlighting the most robust ideas.",
      icon: Users,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Divergence Report",
      description: "Synthesizes fundamental disagreements, explaining why and where experts differed—crucial for understanding core tensions and risks.",
      icon: TrendingUp,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Practical Action Plan",
      description: "Synthesizes the most actionable ideas from the entire discourse into concrete, strategic steps for implementation.",
      icon: Target,
      color: "from-amber-500 to-orange-500"
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
            <Lightbulb className="w-8 h-8 text-amber-500 mr-4" />
            <h1 className="text-6xl font-thin tracking-wider text-slate-800">
              Synthesis of Wisdom
            </h1>
            <Lightbulb className="w-8 h-8 text-amber-500 ml-4" />
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            The Alchemy of Insight
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
                From Dialogue to Distilled Wisdom
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                A discussion among brilliant minds, however stimulating, is merely a collection of disparate voices without a process to distill its meaning. The true value of such a discourse lies not in the volume of ideas generated, but in the coherent, actionable wisdom that can be extracted from their interplay.
              </p>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                This transformative process is the <span className="font-medium text-amber-600">Synthesis of Wisdom</span>. It is the intellectual alchemy that turns the raw material of debate—conflicts, agreements, questions, and insights—into the refined gold of genuine understanding.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Summary vs Synthesis */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            Beyond a Summary
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-light tracking-wide text-slate-800 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-slate-400 mr-3"></div>
                  A Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 font-light leading-relaxed">
                  Reports on what was said. It is a condensed record of the conversation, like a list of ingredients for a recipe.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-light tracking-wide text-slate-800 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-3"></div>
                  A Synthesis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 font-light leading-relaxed">
                  Explains what it means. It is the finished meal, where the ingredients have been combined, transformed, and balanced to create something new and more profound than the sum of its parts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mechanics of Synthesis */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            The Mechanics of Synthesis in AGORA
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <div className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-light tracking-wide text-slate-800">
                  Synthesis During Iteration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed font-light">
                  The act of synthesis begins within the iterative discourse itself. In each round, the AI agents are required to read all prior ideas and then refine, critique, or integrate them. When an agent combines two or more preceding ideas into a new, improved concept, it is performing a micro-act of synthesis.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-light tracking-wide text-slate-800">
                  The Multi-Report System: The Engine of Final Synthesis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed font-light mb-6">
                  The most powerful feature for achieving synthesis is AGORA's suite of eight complementary reports. These reports are explicitly designed to analyze the completed discourse from different angles:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {reports.map((report, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-6 border-l-4 border-l-amber-400">
                      <div className="flex items-center mb-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${report.color} flex items-center justify-center mr-3`}>
                          <report.icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-800">{report.title}</h3>
                      </div>
                      <p className="text-slate-600 font-light leading-relaxed">
                        {report.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User's Role */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-light tracking-wide text-slate-800 mb-4 text-center">
                The User's Role: The Final Synthesizer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-slate-600 font-light leading-relaxed max-w-4xl mx-auto">
                AGORA is designed to empower its users, not replace their judgment. The platform performs the immense task of organizing the debate and preparing a multi-faceted synthesis, but the final and most important act of synthesis rests with the human user.
              </p>
              
              <div className="mt-8 bg-amber-50 rounded-lg p-6 border border-amber-200">
                <p className="text-slate-700 font-light leading-relaxed">
                  By providing diverse reports, AGORA equips the decision-maker with structured, multi-faceted insight. The user can see the complete dialogue, the points of agreement and conflict, the evolution of ideas, and the recommended actions. This allows the user to perform the ultimate synthesis: integrating AGORA's output with their own experience, context, and judgment to make a truly informed decision.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Visualization */}
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-wider text-slate-800 mb-8 text-center">
            The Synthesis Process
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <div className="relative">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Raw Ideas", desc: "Diverse perspectives from eight minds", color: "from-slate-500 to-slate-600" },
                { title: "Iteration", desc: "Ideas refined through multiple rounds", color: "from-blue-500 to-purple-500" },
                { title: "Analysis", desc: "Multi-angle examination through reports", color: "from-purple-500 to-amber-500" },
                { title: "Wisdom", desc: "Synthesized, actionable understanding", color: "from-amber-500 to-orange-500" }
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-4`}>
                    <span className="text-2xl font-thin text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-light text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 font-light">{step.desc}</p>
                  
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent transform -translate-y-1/2 z-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          
          <div className="text-center">
            <h2 className="text-3xl font-thin tracking-wider mb-6">
              The Capstone of the AGORA Experience
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl font-light leading-relaxed text-slate-200 mb-8">
                Synthesis of Wisdom is the fulfillment of the platform's promise to be a "timeless space for collective wisdom". By moving beyond simple debate and leveraging a structured process of iteration and multi-angled analysis, AGORA transforms the conflicting voices of its brilliant agents into a coherent chorus of deep insight.
              </p>
              
              <p className="text-lg font-light italic leading-relaxed text-amber-200">
                It delivers not just a record of a conversation, but a synthesized, actionable, and profound understanding of the challenge at hand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynthesisOfWisdom;
