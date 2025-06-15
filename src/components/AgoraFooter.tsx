
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, Zap, Lightbulb, Brain } from 'lucide-react';

const AgoraFooter: React.FC = () => {
  return (
    <footer className="mt-20 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 60px, #DAA520 60px, #DAA520 61px)`
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-5 gap-12">
          {/* AGORA Brand */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" 
                alt="AGORA Logo" 
                className="w-12 h-12 object-contain mr-4"
              />
              <div>
                <h4 className="text-2xl font-thin tracking-wider">AGORA</h4>
                <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-1"></div>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed font-light mb-6">
              The eternal marketplace of ideas where wisdom transcends time, 
              connecting ancient insight with modern innovation.
            </p>
            
            {/* Privacy Badge in Footer */}
            <div className="bg-green-900/50 border border-green-700 rounded-lg p-4">
              <div className="text-green-300 font-medium mb-2">Privacy-First Design</div>
              <div className="text-green-200 text-sm space-y-1">
                <div>• No data collection</div>
                <div>• Local storage only</div>
                <div>• Your API keys stay secure</div>
              </div>
            </div>
          </div>
          
          {/* Core Concepts */}
          <div>
            <h4 className="text-lg font-light tracking-wide mb-6 text-amber-300">Core Concepts</h4>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>
                <Link to="/eight-immortal-minds" className="hover:text-amber-300 transition-colors flex items-center">
                  <Star className="w-4 h-4 mr-2 text-amber-400" />
                  Eight Immortal Minds
                </Link>
              </li>
              <li>
                <Link to="/iterative-discourse" className="hover:text-amber-300 transition-colors flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-blue-400" />
                  Iterative Discourse
                </Link>
              </li>
              <li>
                <Link to="/synthesis-of-wisdom" className="hover:text-amber-300 transition-colors flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-green-400" />
                  Synthesis of Wisdom
                </Link>
              </li>
              <li>
                <Link to="/transcendent-insights" className="hover:text-amber-300 transition-colors flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-purple-400" />
                  Transcendent Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-light tracking-wide mb-6 text-amber-300">Navigation</h4>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">
                  About AGORA
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-300 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/api-setup-guide" className="hover:text-amber-300 transition-colors">
                  API Setup Guide
                </Link>
              </li>
              <li>
                <Link to="/user-guide" className="hover:text-amber-300 transition-colors">
                  User Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 className="text-lg font-light tracking-wide mb-6 text-amber-300">Legal & Security</h4>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>
                <Link to="/security-privacy" className="hover:text-amber-300 transition-colors">
                  Security & Privacy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-amber-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.razaofinal.com/contact-us" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center"
                >
                  Contact Us
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* RF Strategy */}
          <div>
            <h4 className="text-lg font-light tracking-wide mb-6 text-amber-300">Developed by RF Strategy</h4>
            <p className="text-slate-300 leading-relaxed font-light mb-6">
              AGORA is created by RF Strategy in alignment with our mission to 
              empower strategic thinking and decision-making for everyone.
            </p>
            <div className="space-y-3">
              <a 
                href="https://www.razaofinal.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-300 hover:text-amber-200 transition-colors font-medium"
              >
                Visit RF Strategy
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <div className="text-slate-400 text-sm">
                Strategic consulting • Business transformation • Thought leadership
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4"></div>
          <div className="text-center space-y-2">
            <p className="text-slate-400 font-light tracking-wide">
              © 2025 RF Strategy. AGORA - Where wisdom endures through the ages.
            </p>
            <p className="text-slate-500 text-sm">
              Proudly privacy-first • No data collection • Your insights remain yours
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AgoraFooter;
