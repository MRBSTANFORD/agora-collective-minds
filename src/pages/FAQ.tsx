
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Shield, DollarSign, Zap, ExternalLink } from 'lucide-react';
import AgoraHeader from '@/components/AgoraHeader';
import AgoraFooter from '@/components/AgoraFooter';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'costs', label: 'Costs & API Keys', icon: DollarSign },
    { id: 'technical', label: 'Technical Questions', icon: HelpCircle }
  ];

  const faqs = {
    'getting-started': [
      {
        question: "What is AGORA and how does it work?",
        answer: "AGORA is a strategic thinking platform that brings together AI-powered versions of history's greatest minds to discuss your challenges. You present a problem, and 8 different experts (from Aristotle to Steve Jobs) engage in structured discussion to provide diverse perspectives and actionable insights."
      },
      {
        question: "Do I need to create an account?",
        answer: "No! AGORA works without registration. Simply visit the site, configure your API keys, enter your challenge, and start your discussion. All your data stays on your device."
      },
      {
        question: "How do I start my first discussion?",
        answer: "1) Get API keys from AI providers (OpenAI, Anthropic, etc.), 2) Enter your keys in the configuration panel, 3) Write your challenge or question, 4) Click 'Start Discussion' and watch the experts collaborate!"
      },
      {
        question: "What kind of challenges work best?",
        answer: "AGORA excels with strategic decisions, creative problems, ethical dilemmas, business challenges, and complex situations requiring multiple perspectives. Examples: 'How should I restructure my team?', 'What's the best go-to-market strategy?', 'How do I balance innovation with risk?'"
      },
      {
        question: "How long does a typical discussion take?",
        answer: "Most discussions complete in 15-45 minutes, depending on complexity and number of rounds. You can customize the number of discussion rounds (typically 3-7 rounds work well)."
      }
    ],
    'privacy': [
      {
        question: "Is my data really private?",
        answer: "Yes! AGORA uses a privacy-first architecture. All your discussions, challenges, and insights are stored locally in your browser. RF Strategy never sees, stores, or processes your personal data or discussion content."
      },
      {
        question: "Where are my API keys stored?",
        answer: "Your API keys are stored securely in your browser's local storage only. They never leave your device or get sent to RF Strategy's servers. Only you have access to them."
      },
      {
        question: "Can RF Strategy see my discussions?",
        answer: "No. Your discussions happen directly between your browser and the AI providers you choose (OpenAI, Anthropic, etc.). RF Strategy is not involved in these communications and cannot access the content."
      },
      {
        question: "What happens if I clear my browser data?",
        answer: "If you clear your browser data, you'll lose your stored API keys and discussion history. Make sure to back up any important discussions and note down your API keys before clearing browser data."
      },
      {
        question: "Do you use cookies or tracking?",
        answer: "We use minimal, functional cookies only for essential site operation. We don't track users, build profiles, or collect behavioral data. No third-party tracking services are used."
      }
    ],
    'costs': [
      {
        question: "Is AGORA free to use?",
        answer: "Yes, AGORA itself is completely free. However, you'll need your own API keys from AI providers (OpenAI, Anthropic, etc.), and you'll pay those providers directly for API usage based on your discussions."
      },
      {
        question: "How much do API calls typically cost?",
        answer: "Costs vary by provider and usage. A typical AGORA discussion might cost $0.50-$3.00 total, depending on length and complexity. OpenAI GPT-4: ~$0.01-0.06 per 1K tokens, Anthropic Claude: ~$0.008-0.024 per 1K tokens. You can monitor usage in your provider dashboards."
      },
      {
        question: "Which AI providers do you support?",
        answer: "Currently: OpenAI (GPT-4, GPT-3.5), Anthropic (Claude), Google (Gemini), and others. Each expert can use a different provider, so you can mix and match based on your preferences and budget."
      },
      {
        question: "Can I set spending limits?",
        answer: "Yes! Set spending limits directly in your AI provider accounts (OpenAI, Anthropic, etc.). We also recommend starting with smaller discussions to understand costs before tackling larger challenges."
      },
      {
        question: "What if I don't have API keys?",
        answer: "You can't run discussions without API keys, but you can explore the interface and see how AGORA works. Getting API keys is usually quick: create accounts with AI providers, add payment methods, and generate keys."
      }
    ],
    'technical': [
      {
        question: "What browsers are supported?",
        answer: "AGORA works in all modern browsers (Chrome, Firefox, Safari, Edge). We recommend using an up-to-date browser for the best experience."
      },
      {
        question: "Can I use AGORA on mobile?",
        answer: "Yes! AGORA is fully responsive and works on mobile devices. The interface adapts for smaller screens while maintaining full functionality."
      },
      {
        question: "What if an API call fails?",
        answer: "AGORA includes error handling and retry logic. If a call fails, you'll see an error message and can retry. Make sure your API keys are valid and you have sufficient credits with your AI providers."
      },
      {
        question: "Can I export my discussions?",
        answer: "Yes! AGORA includes report generation features that let you export discussions as formatted documents, including summaries, key insights, and action items."
      },
      {
        question: "Is there a limit to discussion length?",
        answer: "The main limits are: 1) Your API provider's token limits, 2) Your budget for API calls, 3) Browser performance for very long discussions. Most strategic discussions work well within these natural boundaries."
      },
      {
        question: "Can I customize the experts?",
        answer: "Currently, AGORA comes with 8 carefully curated expert personas. Each brings unique perspectives and expertise. Future versions may include customization options."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <AgoraHeader
        activeTab="faq"
        setActiveTab={() => {}}
        discussionStarted={false}
      />

      <main className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <HelpCircle className="w-16 h-16 text-amber-600 mr-4" />
            <h1 className="text-5xl font-thin tracking-wider text-slate-800">Frequently Asked Questions</h1>
          </div>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            Everything you need to know about using AGORA
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200 sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-medium text-slate-800 mb-4 text-center">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "ghost"}
                      className={`w-full justify-start text-left ${
                        activeCategory === category.id 
                          ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <category.icon className="w-4 h-4 mr-3" />
                      {category.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {(() => {
                    const category = categories.find(c => c.id === activeCategory);
                    return category ? <category.icon className="w-6 h-6 text-amber-600 mr-3" /> : null;
                  })()}
                  <h2 className="text-2xl font-thin text-slate-800">
                    {categories.find(c => c.id === activeCategory)?.label}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {faqs[activeCategory].map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border border-slate-200 rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-medium text-slate-800 hover:text-amber-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-amber-50 to-slate-50 border-amber-200 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-medium text-slate-800 mb-4">Still have questions?</h3>
              <p className="text-slate-600 mb-6">
                Can't find what you're looking for? Contact RF Strategy for personalized support.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild className="bg-amber-600 hover:bg-amber-700">
                  <a 
                    href="https://www.razaofinal.com/contact-us" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Contact Support
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/api-setup-guide">
                    API Setup Guide
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">
                    Try AGORA
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AgoraFooter />
    </div>
  );
};

export default FAQ;
