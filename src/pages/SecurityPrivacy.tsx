
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Server, Key, HardDrive, Network, Check, X } from 'lucide-react';
import AgoraHeader from '@/components/AgoraHeader';
import AgoraFooter from '@/components/AgoraFooter';

const SecurityPrivacy = () => {
  const [activeTab, setActiveTab] = React.useState('security');

  const securityFeatures = [
    {
      icon: Shield,
      title: "Zero Data Collection",
      description: "AGORA never collects, stores, or processes your personal data or conversations.",
      details: [
        "No user registration required",
        "No conversation logging",
        "No behavioral tracking",
        "No analytics on your content"
      ]
    },
    {
      icon: HardDrive,
      title: "Local Storage Only",
      description: "All your data stays on your device using browser's local storage.",
      details: [
        "API keys stored locally in your browser",
        "Discussion history saved on your device",
        "No cloud synchronization",
        "Complete control over your data"
      ]
    },
    {
      icon: Key,
      title: "Your API Keys, Your Control",
      description: "You provide your own API keys directly to the AI providers.",
      details: [
        "Direct connection to AI providers",
        "No intermediary key storage",
        "Full billing transparency",
        "You control usage limits"
      ]
    },
    {
      icon: Network,
      title: "Direct API Communication",
      description: "Your requests go directly to AI providers without our servers.",
      details: [
        "No proxy servers",
        "End-to-end communication",
        "Reduced attack surface",
        "Faster response times"
      ]
    }
  ];

  const technicalSpecs = [
    {
      aspect: "Data Storage",
      implementation: "Browser LocalStorage API",
      security: "Client-side only, encrypted by browser"
    },
    {
      aspect: "API Communication",
      implementation: "Direct HTTPS to providers",
      security: "TLS 1.3 encryption, no intermediaries"
    },
    {
      aspect: "Authentication",
      implementation: "API key validation with providers",
      security: "Keys never transmitted to AGORA servers"
    },
    {
      aspect: "Session Management",
      implementation: "Local state management only",
      security: "No server-side session storage"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <AgoraHeader 
        activeTab="security" 
        setActiveTab={setActiveTab}
        discussionStarted={false}
      />
      
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mr-6">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-thin tracking-wider text-slate-800">
                Security & Privacy
              </h1>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mt-2"></div>
            </div>
          </div>
          
          <p className="text-xl text-slate-600 font-light max-w-4xl mx-auto leading-relaxed">
            AGORA is designed with privacy-first principles. Your data, conversations, and insights remain completely private and under your control.
          </p>
          
          <div className="flex justify-center mt-8">
            <Badge className="bg-green-100 text-green-800 border-green-300 px-6 py-3 text-lg">
              <Shield className="w-5 h-5 mr-2" />
              Zero Data Collection Guarantee
            </Badge>
          </div>
        </div>

        {/* Key Security Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-slate-800 text-center mb-12">
            Privacy-First Architecture
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-medium text-slate-800">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 mb-4 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-slate-800 text-center mb-12">
            Technical Implementation
          </h2>
          
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-slate-600" />
                <span>Security Specifications</span>
              </CardTitle>
              <CardDescription>
                Detailed technical approach to ensuring your privacy and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-4 font-medium text-slate-700">Aspect</th>
                      <th className="text-left p-4 font-medium text-slate-700">Implementation</th>
                      <th className="text-left p-4 font-medium text-slate-700">Security Measure</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicalSpecs.map((spec, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 font-medium text-slate-800">{spec.aspect}</td>
                        <td className="p-4 text-slate-600">{spec.implementation}</td>
                        <td className="p-4 text-slate-600">{spec.security}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Flow Diagram */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-slate-800 text-center mb-12">
            How Your Data Flows
          </h2>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-medium text-slate-800 mb-2">You Input Challenge</h3>
                <p className="text-sm text-slate-600">
                  Your challenge and settings stay in your browser's local storage
                </p>
                <div className="mt-4 bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-700 font-medium">✓ Stored locally only</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-medium text-slate-800 mb-2">Direct API Calls</h3>
                <p className="text-sm text-slate-600">
                  Your browser sends requests directly to AI providers using your API keys
                </p>
                <div className="mt-4 bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-700 font-medium">✓ No AGORA servers involved</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HardDrive className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="font-medium text-slate-800 mb-2">Results Stored Locally</h3>
                <p className="text-sm text-slate-600">
                  AI responses are saved in your browser for your reference only
                </p>
                <div className="mt-4 bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-700 font-medium">✓ Complete control</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                <X className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-sm text-red-700 font-medium">
                  AGORA servers never see your data
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison with Other Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-slate-800 text-center mb-12">
            Privacy Comparison
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">AGORA</CardTitle>
                <CardDescription className="text-green-700">
                  Privacy-First Design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-700">
                    <Check className="w-4 h-4 mr-2" />
                    Zero data collection
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <Check className="w-4 h-4 mr-2" />
                    Local storage only
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <Check className="w-4 h-4 mr-2" />
                    Your API keys
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <Check className="w-4 h-4 mr-2" />
                    No registration
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-8 h-8 text-slate-600" />
                </div>
                <CardTitle className="text-slate-800">Traditional AI Services</CardTitle>
                <CardDescription className="text-slate-600">
                  Server-Based Processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-600">
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    Data sent to servers
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    Conversation logging
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    Account required
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    Usage tracking
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">Consulting Services</CardTitle>
                <CardDescription className="text-blue-700">
                  Human-Based Processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-700">
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    Shared with teams
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    Document storage
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    NDAs required
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    Human access
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* RF Strategy Commitment */}
        <section className="bg-gradient-to-br from-slate-100 to-amber-100/50 rounded-2xl p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-slate-800 mb-4">
              RF Strategy's Privacy Commitment
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              As creators of AGORA, <a href="https://www.razaofinal.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-medium">RF Strategy</a> is committed to building tools that empower strategic thinking while respecting your privacy completely.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium text-slate-800 mb-4">Our Philosophy</h3>
                <div className="space-y-3 text-slate-600">
                  <p>• Your thoughts and strategies are your intellectual property</p>
                  <p>• Privacy should be the default, not an option</p>
                  <p>• Transparency in how technology works builds trust</p>
                  <p>• Strategic thinking tools should empower, not surveil</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-slate-800 mb-4">Technical Guarantee</h3>
                <div className="space-y-3 text-slate-600">
                  <p>• No backend servers process your conversations</p>
                  <p>• No user accounts or profiles are created</p>
                  <p>• No analytics track your usage patterns</p>
                  <p>• Open architecture for complete transparency</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-slate-600 italic">
                "True strategic advantage comes from deep thinking, not data harvesting."
              </p>
              <p className="text-sm text-slate-500 mt-2">— RF Strategy Team</p>
            </div>
          </div>
        </section>
      </main>
      
      <AgoraFooter />
    </div>
  );
};

export default SecurityPrivacy;
