"use client";

import { useState } from "react";
import { Menu, X, Globe, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-white rounded-full p-1.5 group-hover:rotate-12 transition-transform">
              <Globe className="w-5 h-5 text-black" />
            </div>
            <span className="text-white font-semibold text-lg">Novyra</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 ml-8">
            <Link
              href="/dashboard"
              className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Leads Dashboard
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <div className="hidden md:flex items-center gap-4">
              <SignInButton mode="modal">
                <button className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center gap-4">
              <UserButton />
            </div>
          </Show>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-6 right-6 liquid-glass rounded-2xl p-6 flex flex-col gap-4 z-50 pointer-events-auto">
          <Link
            href="/dashboard"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LayoutDashboard className="w-4 h-4" />
            Leads Dashboard
          </Link>
          <div className="h-px bg-white/10" />
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button className="text-white text-sm font-medium text-left cursor-pointer">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors w-full cursor-pointer">
                Get Started
              </button>
            </SignUpButton>
          </Show>
        </div>
      )}
    </nav>
  );
}
