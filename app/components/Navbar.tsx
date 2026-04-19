"use client";

import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative z-20 px-6 py-6 w-full">
      <nav className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">Novyra</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 ml-8">
            <a
              href="/#services"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Services
            </a>
            <a
              href="/#portfolio"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Portfolio
            </a>
            <a
              href="/#pricing"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Pricing
            </a>
            <a
              href="/#contact"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignUpButton mode="redirect">
              <button className="hidden md:block text-white text-sm font-medium transition-colors hover:text-white/80 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
            <SignInButton mode="redirect">
              <button className="hidden md:block liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium cursor-pointer">
                Login
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="hidden md:block text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          </Show>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-6 right-6 liquid-glass rounded-2xl p-6 flex flex-col gap-4 z-50">
          <a
            href="/#services"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="/#portfolio"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Portfolio
          </a>
          <a
            href="/#pricing"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </a>
          <a
            href="/#contact"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
          <div className="h-px bg-white/10" />
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button className="text-white text-sm font-medium text-left cursor-pointer">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium cursor-pointer w-full">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
          </Show>
        </div>
      )}
    </div>
  );
}
