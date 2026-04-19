"use client";

import { Globe } from "lucide-react";

export function Navbar() {
  return (
    <div className="relative z-20 px-6 py-6 w-full">
      <nav className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">Novyra</span>
          </div>
          <div className="hidden md:flex items-center gap-8 ml-8">
            <a
              href="#"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              About
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white text-sm font-medium transition-colors hover:text-white/80">
            Sign Up
          </button>
          <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}
