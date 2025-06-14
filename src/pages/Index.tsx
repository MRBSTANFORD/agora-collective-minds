
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
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-amber-50">
      {/* Header */}
      <header className="border-b border-indigo-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-amber-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-indigo-900">AGORA</h1>
                <p className="text-sm text-indigo-600">The Timeless Space for Collective Wisdom</p>
              </div>
            </div>
            <nav className="flex space-x-6">
              <Button 
                variant={activeTab === 'home' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('home')}
                className="text-indigo-700 hover:text-indigo-900"
              >
                Home
              </Button>
              <Button 
                variant={activeTab === 'experts' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('experts')}
                className="text-indigo-700 hover:text-indigo-900"
              >
                Experts
              </Button>
              <Button 
                variant={activeTab === 'discussion' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('discussion')}
                className="text-indigo-700 hover:text-indigo-900"
                disabled={!discussionStarted}
              >
                Discussion
              </Button>
              <Button 
                variant={activeTab === 'reports' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('reports')}
                className="text-indigo-700 hover:text-indigo-900"
                disabled={!discussionStarted}
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
                  <h2 className="text-5xl font-bold text-indigo-900 mb-6 leading-tight">
                    Where Timeless Wisdom Meets
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-amber-500"> Modern Challenges</span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Engage 8 AI experts modeled after history's greatest minds in collaborative discussions 
                    to unlock innovative solutions to complex problems.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="secondary" className="px-4 py-2 bg-indigo-100 text-indigo-700">
                      <Brain className="w-4 h-4 mr-2" />
                      AI-Powered Insights
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 bg-amber-100 text-amber-700">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Collective Intelligence
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 bg-indigo-100 text-indigo-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Historical Wisdom
                    </Badge>
                  </div>
                </div>
              </section>

              {/* Challenge Input Section */}
              <section className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-8">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
                    Present Your Challenge
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="challenge-title" className="block text-sm font-medium text-gray-700 mb-2">
                        Challenge Title
                      </label>
                      <Input
                        id="challenge-title"
                        placeholder="e.g., Sustainable Urban Development in the 21st Century"
                        className="w-full border-indigo-200 focus:border-indigo-500"
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
                        className="w-full h-32 border-indigo-200 focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={handleStartDiscussion}
                        className="bg-gradient-to-r from-indigo-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 text-white px-8 py-3 text-lg font-medium"
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
                <h3 className="text-3xl font-bold text-indigo-900 mb-12 text-center">How AGORA Works</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">1</span>
                      </div>
                      <CardTitle className="text-indigo-900">Submit Challenge</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-gray-600">
                        Present your complex challenge or problem to our panel of AI experts
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-100 hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">2</span>
                      </div>
                      <CardTitle className="text-amber-700">Expert Discussion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-gray-600">
                        8 AI experts engage in iterative rounds of discussion, building on each other's ideas
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">3</span>
                      </div>
                      <CardTitle className="text-indigo-900">Comprehensive Reports</CardTitle>
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
      <footer className="bg-indigo-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">AGORA</h4>
              <p className="text-indigo-200">
                The Timeless Space for Collective Wisdom - Where history's greatest minds collaborate to solve today's challenges.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-indigo-200">
                <li>8 Historical AI Experts</li>
                <li>Iterative Discussions</li>
                <li>Comprehensive Reports</li>
                <li>Customizable Profiles</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Mission</h4>
              <p className="text-indigo-200">
                To enable transformative collective intelligence by merging timeless wisdom with AI innovation.
              </p>
            </div>
          </div>
          <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-200">
            <p>&copy; 2025 AGORA. Empowering wisdom through AI collaboration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
