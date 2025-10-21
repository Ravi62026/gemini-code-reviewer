import React from "react";
import { CodeIcon } from "./icons/CodeIcon";

export const Header: React.FC = () => {
  return (
    <header className="relative z-20">
      <div className="glass-effect border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto p-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-coral to-neon-orange rounded-xl blur opacity-75"></div>
                <div className="relative bg-dark-900/90 p-3 rounded-xl border border-white/20">
                  <img src="../logo.png" alt="xalora" className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold gradient-text">
                  Xalora
                </h1>
                <p className="text-sm text-gray-300 font-medium">
                  AI-Powered Code Excellence Platform
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span>AI Ready</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-neon-coral/20 to-neon-orange/20 rounded-full border borderwhite/10 text-sm font-medium">
                ✨ Premium
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
