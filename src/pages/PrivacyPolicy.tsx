
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Check, AlertCircle, ExternalLink } from 'lucide-react';
import AgoraHeader from '@/components/AgoraHeader';
import AgoraFooter from '@/components/AgoraFooter';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <AgoraHeader
        activeTab="privacy"
        setActiveTab={() => {}}
        discussionStarted={false}
      />

      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-16 h-16 text-green-600 mr-4" />
            <h1 className="text-5xl font-thin tracking-wider text-slate-800">Privacy Policy</h1>
          </div>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            Your privacy is our priority. Here's how we protect it.
          </p>
        </div>

        {/* Privacy Guarantee */}
        <Card className="mb-12 bg-gradient-to-r from-green-50 to-slate-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-thin text-slate-800">
              <Check className="w-8 h-8 text-green-600 mr-4" />
              Our Privacy Guarantee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800">Zero Data Collection</h3>
                    <p className="text-slate-600 text-sm">We don't collect, store, or process any personal data</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800">Local Storage Only</h3>
                    <p className="text-slate-600 text-sm">All your discussions stay on your device</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800">No Registration Required</h3>
                    <p className="text-slate-600 text-sm">Start using AGORA immediately without creating accounts</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800">Your API Keys</h3>
                    <p className="text-slate-600 text-sm">You provide and control your own AI service keys</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800">No Intermediary Storage</h3>
                    <p className="text-slate-600 text-sm">Communications go directly from your browser to AI services</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800">Open Source Transparency</h3>
                    <p className="text-slate-600 text-sm">Our code is open for verification</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">How AGORA Protects Your Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-3">1. Local-First Architecture</h3>
                <p className="text-slate-600 leading-relaxed">
                  AGORA runs entirely in your web browser. Your challenges, discussions, and insights are stored 
                  locally on your device using browser storage. RF Strategy never sees or stores this information.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-3">2. Direct API Communication</h3>
                <p className="text-slate-600 leading-relaxed">
                  When you provide your own API keys for AI services (OpenAI, Anthropic, etc.), communications 
                  go directly from your browser to those services. RF Strategy is not involved in this communication 
                  and cannot access the content.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-3">3. No User Tracking</h3>
                <p className="text-slate-600 leading-relaxed">
                  We don't use cookies for tracking, don't collect analytics about your usage patterns, 
                  and don't build user profiles. We may use basic, anonymous analytics to understand 
                  general usage patterns for improvement purposes only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What We Don't Collect */}
        <Card className="mb-12 bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-thin text-slate-800">
              <AlertCircle className="w-8 h-8 text-red-600 mr-4" />
              What We DON'T Collect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-red-600 font-medium mb-2">Personal Information</div>
                <p className="text-sm text-slate-600">No names, emails, or contact details</p>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-medium mb-2">Discussion Content</div>
                <p className="text-sm text-slate-600">No challenges or expert responses</p>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-medium mb-2">Usage Patterns</div>
                <p className="text-sm text-slate-600">No detailed behavioral tracking</p>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-medium mb-2">API Keys</div>
                <p className="text-sm text-slate-600">Stored only in your browser</p>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-medium mb-2">Location Data</div>
                <p className="text-sm text-slate-600">No geographic tracking</p>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-medium mb-2">Device Information</div>
                <p className="text-sm text-slate-600">No device fingerprinting</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">Third-Party AI Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-medium text-blue-800 mb-3">Important Note About AI Providers</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                When you use your own API keys with services like OpenAI, Anthropic, or Google, your 
                interactions are subject to their respective privacy policies. RF Strategy recommends 
                reviewing these policies to understand how these services handle your data.
              </p>
            </div>
            <p className="text-slate-600 leading-relaxed">
              AGORA acts as a client interface to these services. We don't modify, store, or intercept 
              the communications between your browser and the AI providers you choose to use.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">Questions About Privacy?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6">
              If you have questions about this privacy policy or how AGORA handles data, 
              please contact RF Strategy through our official channels.
            </p>
            <div className="flex justify-center space-x-6">
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <a 
                  href="https://www.razaofinal.com/contact-us" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Contact RF Strategy
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/" className="flex items-center">
                  Back to AGORA
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500">
          <p>Last updated: December 2024</p>
          <p>Developed by RF Strategy • Privacy-First Design</p>
        </div>
      </main>

      <AgoraFooter />
    </div>
  );
};

export default PrivacyPolicy;
