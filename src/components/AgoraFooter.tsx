
import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="grid md:grid-cols-3 gap-12">
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
            <p className="text-slate-300 leading-relaxed font-light">
              The eternal marketplace of ideas where wisdom transcends time, 
              connecting ancient insight with modern innovation.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-light tracking-wide mb-6 text-amber-300">User Resources</h4>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>
                <Link to="/user-guide" className="hover:text-amber-300 transition-colors">
                  AGORA User Guide
                </Link>
              </li>
              <li>
                <Link to="/eight-immortal-minds" className="hover:text-amber-300 transition-colors">
                  Eight Immortal Minds
                </Link>
              </li>
              <li>
                <Link to="/iterative-discourse" className="hover:text-amber-300 transition-colors">
                  Iterative Discourse
                </Link>
              </li>
              <li>
                <Link to="/synthesis-of-wisdom" className="hover:text-amber-300 transition-colors">
                  Synthesis of Wisdom
                </Link>
              </li>
              <li>
                <Link to="/transcendent-insights" className="hover:text-amber-300 transition-colors">
                  Transcendent Insights
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-light tracking-wide mb-6 text-amber-300">Our Purpose</h4>
            <p className="text-slate-300 leading-relaxed font-light">
              To bridge the eternal and the immediate, where timeless wisdom 
              illuminates the path through contemporary complexity.
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4"></div>
          <p className="text-slate-400 font-light tracking-wide">
            © 2025 AGORA. Where wisdom endures through the ages.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AgoraFooter;
