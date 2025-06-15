
import React from 'react';
import { Link } from 'react-router-dom';

const AgoraFooter = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" 
                alt="AGORA Logo" 
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-xl font-thin tracking-wider">AGORA</h3>
            </div>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              Where historical wisdom meets contemporary challenges through structured dialogue and collective intelligence.
            </p>
            <div className="text-xs text-slate-400">
              <div>🔒 100% Private & Secure</div>
              <div>🌟 No Data Collection</div>
              <div>⚡ Powered by Your API Keys</div>
            </div>
          </div>

          {/* Core Concepts */}
          <div>
            <h4 className="text-lg font-light text-amber-400 mb-4">Core Concepts</h4>
            <div className="space-y-2">
              <Link to="/eight-immortal-minds" className="block text-slate-300 hover:text-white text-sm transition-colors">
                The Eight Immortal Minds
              </Link>
              <Link to="/iterative-discourse" className="block text-slate-300 hover:text-white text-sm transition-colors">
                Iterative Discourse
              </Link>
              <Link to="/synthesis-of-wisdom" className="block text-slate-300 hover:text-white text-sm transition-colors">
                Synthesis of Wisdom
              </Link>
              <Link to="/transcendent-insights" className="block text-slate-300 hover:text-white text-sm transition-colors">
                Transcendent Insights
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-light text-amber-400 mb-4">Resources</h4>
            <div className="space-y-2">
              <Link to="/user-guide" className="block text-slate-300 hover:text-white text-sm transition-colors">
                User Guide
              </Link>
              <Link to="/api-setup-guide" className="block text-slate-300 hover:text-white text-sm transition-colors">
                API Setup Guide
              </Link>
              <Link to="/about" className="block text-slate-300 hover:text-white text-sm transition-colors">
                About AGORA
              </Link>
              <Link to="/faq" className="block text-slate-300 hover:text-white text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-lg font-light text-amber-400 mb-4">Legal & Support</h4>
            <div className="space-y-2">
              <Link to="/privacy-policy" className="block text-slate-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="block text-slate-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/security-privacy" className="block text-slate-300 hover:text-white text-sm transition-colors">
                Security & Privacy
              </Link>
              <a 
                href="https://www.razaofinal.com/contact-us" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-slate-300 hover:text-white text-sm transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm">
            © 2024 AGORA. All rights reserved.
          </div>
          <div className="text-slate-400 text-sm mt-4 md:mt-0">
            Built with privacy and wisdom in mind.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AgoraFooter;
