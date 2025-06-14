import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Users, Brain, Lightbulb, BookOpen } from 'lucide-react';
import ExpertProfiles from '@/components/ExpertProfiles';
import DiscussionInterface from '@/components/DiscussionInterface';
import ReportsModule from '@/components/ReportsModule';

const Index = () => {
  const [challenge, setChallenge] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [discussionStarted, setDiscussionStarted] = useState(false);

  const handleStartDiscussion = () => {
    if (challenge.trim()) {
      setDiscussionStarted(true);
      setActiveTab('discussion');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-amber-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                  alt="AGORA Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>AGORA</h1>
                <p className="text-sm" style={{ color: '#DAA520' }}>The Timeless Space for Collective Wisdom</p>
              </div>
            </div>
            <nav className="flex space-x-6">
              <Button 
                variant={activeTab === 'home' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('home')}
                className="text-slate-700 hover:text-slate-900"
                style={activeTab === 'home' ? { backgroundColor: '#1e293b', color: 'white' } : {}}
              >
                Home
              </Button>
              <Button 
                variant={activeTab === 'experts' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('experts')}
                className="text-slate-700 hover:text-slate-900"
                style={activeTab === 'experts' ? { backgroundColor: '#1e293b', color: 'white' } : {}}
              >
                Experts
              </Button>
              <Button 
                variant={activeTab === 'discussion' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('discussion')}
                className="text-slate-700 hover:text-slate-900"
                disabled={!discussionStarted}
                style={activeTab === 'discussion' ? { backgroundColor: '#1e293b', color: 'white' } : {}}
              >
                Discussion
              </Button>
              <Button 
                variant={activeTab === 'reports' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('reports')}
                className="text-slate-700 hover:text-slate-900"
                disabled={!discussionStarted}
                style={activeTab === 'reports' ? { backgroundColor: '#1e293b', color: 'white' } : {}}
              >
                Reports
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="mt-0">
            <div className="space-y-12">
              {/* Hero Section */}
              <section className="text-center py-16">
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-center mb-8">
                    <img 
                      src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                      alt="AGORA Logo" 
                      className="w-24 h-24 object-contain opacity-90"
                    />
                  </div>
                  <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ color: '#1e293b' }}>
                    Where Timeless Wisdom Meets
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-amber-500"> Modern Challenges</span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Engage 8 AI experts modeled after history's greatest minds in collaborative discussions 
                    to unlock innovative solutions to complex problems.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="secondary" className="px-4 py-2 bg-slate-100 text-slate-700">
                      <Brain className="w-4 h-4 mr-2" />
                      AI-Powered Insights
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 bg-amber-100 text-amber-700">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Collective Intelligence
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 bg-slate-100 text-slate-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Historical Wisdom
                    </Badge>
                  </div>
                </div>
              </section>

              {/* Challenge Input Section */}
              <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-center mb-6">
                    <img 
                      src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                      alt="AGORA Logo" 
                      className="w-8 h-8 object-contain mr-3 opacity-80"
                    />
                    <h3 className="text-2xl font-bold text-slate-800">
                      Present Your Challenge
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="challenge-title" className="block text-sm font-medium text-gray-700 mb-2">
                        Challenge Title
                      </label>
                      <Input
                        id="challenge-title"
                        placeholder="e.g., Sustainable Urban Development in the 21st Century"
                        className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="challenge-description" className="block text-sm font-medium text-gray-700 mb-2">
                        Detailed Description
                      </label>
                      <Textarea
                        id="challenge-description"
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        placeholder="Describe your challenge in detail. What are the key issues, constraints, and goals you want the experts to address?"
                        className="w-full h-32 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={handleStartDiscussion}
                        className="px-8 py-3 text-lg font-medium text-white"
                        style={{ backgroundColor: '#1e293b' }}
                        disabled={!challenge.trim()}
                      >
                        Begin Discussion
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* How It Works */}
              <section className="py-16">
                <div className="flex items-center justify-center mb-12">
                  <img 
                    src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                    alt="AGORA Logo" 
                    className="w-8 h-8 object-contain mr-3 opacity-80"
                  />
                  <h3 className="text-3xl font-bold text-slate-800">How AGORA Works</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1e293b' }}>
                        <span className="text-2xl font-bold text-white">1</span>
                      </div>
                      <CardTitle className="text-slate-800">Submit Challenge</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-gray-600">
                        Present your complex challenge or problem to our panel of AI experts
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#DAA520' }}>
                        <span className="text-2xl font-bold text-white">2</span>
                      </div>
                      <CardTitle style={{ color: '#DAA520' }}>Expert Discussion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-gray-600">
                        8 AI experts engage in iterative rounds of discussion, building on each other's ideas
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #DAA520 100%)' }}>
                        <span className="text-2xl font-bold text-white">3</span>
                      </div>
                      <CardTitle className="text-slate-800">Comprehensive Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-gray-600">
                        Receive 8 detailed reports offering diverse perspectives and actionable insights
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="experts" className="mt-0">
            <ExpertProfiles />
          </TabsContent>

          <TabsContent value="discussion" className="mt-0">
            <DiscussionInterface challenge={challenge} />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <ReportsModule />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="text-white py-12 mt-16" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                  alt="AGORA Logo" 
                  className="w-8 h-8 object-contain mr-3"
                />
                <h4 className="text-xl font-bold">AGORA</h4>
              </div>
              <p className="text-slate-300">
                The Timeless Space for Collective Wisdom - Where history's greatest minds collaborate to solve today's challenges.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-300">
                <li>8 Historical AI Experts</li>
                <li>Iterative Discussions</li>
                <li>Comprehensive Reports</li>
                <li>Customizable Profiles</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Mission</h4>
              <p className="text-slate-300">
                To enable transformative collective intelligence by merging timeless wisdom with AI innovation.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
            <p>&copy; 2025 AGORA. Empowering wisdom through AI collaboration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
