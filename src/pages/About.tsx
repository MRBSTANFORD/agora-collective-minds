
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Shield, Users, Target, Heart } from 'lucide-react';
import AgoraHeader from '@/components/AgoraHeader';
import AgoraFooter from '@/components/AgoraFooter';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <AgoraHeader
        activeTab="about"
        setActiveTab={() => {}}
        discussionStarted={false}
      />

      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png"
              alt="AGORA Logo" 
              className="w-16 h-16 object-contain mr-4 opacity-80"
            />
            <h1 className="text-5xl font-thin tracking-wider text-slate-800">About AGORA</h1>
          </div>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            Where timeless wisdom meets modern challenges
          </p>
        </div>

        {/* Our Story */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardContent className="p-8">
            <h2 className="text-3xl font-thin text-slate-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                AGORA was created by <strong>RF Strategy</strong>, a strategic consulting firm dedicated to 
                empowering people's thinking and decision-making capabilities. Born from our mission to make 
                strategic thinking accessible to everyone, AGORA represents the intersection of ancient wisdom 
                and modern technology.
              </p>
              <p>
                At RF Strategy, we believe that the best solutions emerge when diverse perspectives converge. 
                AGORA embodies this philosophy by bringing together history's greatest minds in a digital 
                symposium, democratizing access to strategic thinking that was once available only to a select few.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* RF Strategy Mission Alignment */}
        <Card className="mb-12 bg-gradient-to-r from-amber-50 to-slate-50 border-amber-200">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-amber-600 mr-4" />
              <h2 className="text-3xl font-thin text-slate-800">Mission Alignment</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium text-slate-800 mb-4">RF Strategy's Vision</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Empowering strategic thinking for individuals and organizations</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Making complex decision-making accessible to everyone</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Building tools that respect privacy and user autonomy</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-800 mb-4">AGORA's Role</h3>
                <p className="text-slate-600 leading-relaxed">
                  AGORA serves as the digital manifestation of RF Strategy's core belief: that everyone 
                  deserves access to diverse, high-quality strategic thinking. By combining AI technology 
                  with historical wisdom, we've created a platform that democratizes access to the kind 
                  of multi-perspective analysis that drives breakthrough solutions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy-First Approach */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-slate-600 mr-4" />
              <h2 className="text-3xl font-thin text-slate-800">Privacy-First Philosophy</h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-green-800 mb-3">100% Private by Design</h3>
              <ul className="space-y-2 text-green-700">
                <li>• No data collection or storage by RF Strategy</li>
                <li>• All discussions remain on your device</li>
                <li>• You control your own AI API keys</li>
                <li>• No registration required</li>
              </ul>
            </div>
            <p className="text-slate-600 leading-relaxed">
              This approach reflects RF Strategy's commitment to user autonomy and data sovereignty. 
              We believe powerful tools shouldn't come at the cost of your privacy.
            </p>
          </CardContent>
        </Card>

        {/* Learn More */}
        <div className="text-center">
          <h2 className="text-2xl font-thin text-slate-800 mb-6">Learn More About RF Strategy</h2>
          <div className="flex justify-center space-x-6">
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <a href="https://www.razaofinal.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Visit RF Strategy
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/" className="flex items-center">
                Back to AGORA
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <AgoraFooter />
    </div>
  );
};

export default About;
