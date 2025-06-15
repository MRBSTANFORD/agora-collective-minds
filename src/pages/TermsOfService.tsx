
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scroll, AlertTriangle, ExternalLink } from 'lucide-react';
import AgoraHeader from '@/components/AgoraHeader';
import AgoraFooter from '@/components/AgoraFooter';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <AgoraHeader
        activeTab="terms"
        setActiveTab={() => {}}
        discussionStarted={false}
      />

      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <Scroll className="w-16 h-16 text-slate-600 mr-4" />
            <h1 className="text-5xl font-thin tracking-wider text-slate-800">Terms of Service</h1>
          </div>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-slate-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            Simple, fair terms for using AGORA
          </p>
        </div>

        {/* Agreement to Terms */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 leading-relaxed mb-4">
              By accessing and using AGORA, you agree to be bound by these Terms of Service and all 
              applicable laws and regulations. If you do not agree with any of these terms, you are 
              prohibited from using this service.
            </p>
            <p className="text-slate-600 leading-relaxed">
              AGORA is provided by RF Strategy as a free tool to democratize access to strategic thinking. 
              These terms ensure fair use and protect both users and our mission.
            </p>
          </CardContent>
        </Card>

        {/* Service Description */}
        <Card className="mb-12 bg-gradient-to-r from-amber-50 to-slate-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">Service Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-slate-800 mb-2">What AGORA Provides</h3>
                <ul className="space-y-2 text-slate-600 ml-4">
                  <li>• A platform for conducting structured discussions with AI-powered historical experts</li>
                  <li>• Tools for organizing and analyzing complex challenges</li>
                  <li>• Report generation and insight synthesis capabilities</li>
                  <li>• A privacy-first, local-storage approach to data handling</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-2">What You Provide</h3>
                <ul className="space-y-2 text-slate-600 ml-4">
                  <li>• Your own API keys for AI services (OpenAI, Anthropic, etc.)</li>
                  <li>• The challenges and questions you want to explore</li>
                  <li>• Responsible use of the platform</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Responsibilities */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-3">API Key Management</h3>
                <ul className="space-y-2 text-slate-600 ml-4">
                  <li>• You are responsible for obtaining and maintaining your own AI service API keys</li>
                  <li>• You are responsible for all costs associated with your API usage</li>
                  <li>• Keep your API keys secure and don't share them with others</li>
                  <li>• Monitor your usage to avoid unexpected charges from AI providers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-3">Acceptable Use</h3>
                <ul className="space-y-2 text-slate-600 ml-4">
                  <li>• Use AGORA for legitimate strategic thinking and problem-solving purposes</li>
                  <li>• Don't attempt to reverse engineer or exploit the platform</li>
                  <li>• Don't use the service for illegal activities or to generate harmful content</li>
                  <li>• Respect the intellectual property of others in your discussions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-3">Content Responsibility</h3>
                <ul className="space-y-2 text-slate-600 ml-4">
                  <li>• You retain ownership of the challenges and content you input</li>
                  <li>• You are responsible for the accuracy and appropriateness of your inputs</li>
                  <li>• AI-generated responses are for informational purposes only</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Limitations */}
        <Card className="mb-12 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-thin text-slate-800">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mr-4" />
              Service Limitations & Disclaimers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">AI-Generated Content</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  All expert responses are AI-generated interpretations and should not be considered as 
                  actual advice from historical figures. Use insights as starting points for your own thinking.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">Service Availability</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  AGORA depends on third-party AI services. We cannot guarantee 100% uptime or 
                  availability of these external services.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">No Professional Advice</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  AGORA is a thinking tool, not a replacement for professional advice. For critical 
                  decisions, consult qualified professionals in relevant fields.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-slate-800 mb-2">AGORA Platform</h3>
                <p className="text-slate-600 leading-relaxed">
                  The AGORA platform, including its design, functionality, and underlying code, 
                  is the intellectual property of RF Strategy. The platform is provided as a free service.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-2">Your Content</h3>
                <p className="text-slate-600 leading-relaxed">
                  You retain all rights to the challenges, questions, and original content you input into AGORA. 
                  Since we don't store your data, we make no claims to your content.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-2">AI-Generated Content</h3>
                <p className="text-slate-600 leading-relaxed">
                  AI-generated responses are created based on your inputs and are provided for your use. 
                  However, be aware that similar responses might be generated for similar inputs by other users.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 leading-relaxed mb-4">
              You may stop using AGORA at any time. Since no account is required and no data is stored 
              on our servers, simply closing your browser session ends your use of the service.
            </p>
            <p className="text-slate-600 leading-relaxed">
              RF Strategy reserves the right to terminate or restrict access to AGORA for users who 
              violate these terms or use the service inappropriately.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 leading-relaxed">
              RF Strategy reserves the right to modify these terms at any time. Changes will be posted 
              on this page with an updated "Last Modified" date. Continued use of AGORA after changes 
              constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-thin text-slate-800">Questions About These Terms?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6">
              If you have questions about these Terms of Service, please contact RF Strategy.
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
          <p>Developed by RF Strategy</p>
        </div>
      </main>

      <AgoraFooter />
    </div>
  );
};

export default TermsOfService;
