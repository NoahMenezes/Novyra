"use client";

import { SignIn } from "@clerk/nextjs";
import { Globe, ArrowLeft, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";

export default function SignInPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col overflow-hidden">
            {/* Navbar stays at the top */}
            <Navbar />

            <div className="flex-1 flex flex-col md:flex-row">
                {/* Left Side: Aesthetic Brand Panel */}
                <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-[#050505] relative flex-col justify-end p-12 border-r border-white/5">
                    <div className="relative z-10 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl lg:text-7xl text-white tracking-tight leading-[1.1] font-serif mb-8">
                                Elevating <span className="italic text-white/40">digital</span> standards.
                            </h1>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-white/10 rounded-full p-1.5">
                                        <ShieldCheck className="w-4 h-4 text-white/80" />
                                    </div>
                                    <div>
                                        <h3 className="text-white text-sm font-medium">Secure Access</h3>
                                        <p className="text-white/40 text-xs mt-1">Enterprise-grade security for your data and projects.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-white/10 rounded-full p-1.5">
                                        <Zap className="w-4 h-4 text-white/80" />
                                    </div>
                                    <div>
                                        <h3 className="text-white text-sm font-medium">Fast Management</h3>
                                        <p className="text-white/40 text-xs mt-1">Manage your services with lightning speed and precision.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                        <p className="text-white/20 text-xs uppercase tracking-widest">© 2026 Novyra Agency</p>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -mr-64 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />
                </div>

                {/* Right Side: Sign In Form */}
                <div className="flex-1 flex flex-col relative bg-black">
                    <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                        <div className="w-full max-w-[440px]">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="mb-10 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                        <Sparkles className="w-5 h-5 text-purple-400" />
                                        <span className="text-purple-400 text-xs font-medium uppercase tracking-widest">Client Portal</span>
                                    </div>
                                    <h2 className="text-4xl text-white tracking-tight mb-3">
                                        Welcome <span className="font-serif italic text-white/60">back</span>
                                    </h2>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        Log in to manage your digital assets.
                                    </p>
                                </div>

                                <div className="flex justify-center 
                  [&_.cl-rootBox]:w-full 
                  [&_.cl-card]:bg-transparent 
                  [&_.cl-card]:shadow-none 
                  [&_.cl-card]:p-0 
                  [&_.cl-headerTitle]:text-white 
                  [&_.cl-headerSubtitle]:text-white/60
                  [&_.cl-main]:gap-6
                  [&_.cl-formFieldLabel]:text-white/70!
                  [&_.cl-formFieldLabel]:text-[10px]
                  [&_.cl-formFieldLabel]:uppercase
                  [&_.cl-formFieldLabel]:tracking-widest
                  [&_.cl-formFieldInput]:bg-white/[0.05]!
                  [&_.cl-formFieldInput]:border-white/10!
                  [&_.cl-formFieldInput]:rounded-xl!
                  [&_.cl-formFieldInput]:text-white!
                  [&_.cl-formButtonPrimary]:bg-white!
                  [&_.cl-formButtonPrimary]:text-black!
                  [&_.cl-formButtonPrimary]:hover:bg-white/90!
                  [&_.cl-socialButtonsBlockButton]:bg-white/[0.05]!
                  [&_.cl-socialButtonsBlockButton]:border-white/10!
                  [&_.cl-socialButtonsBlockButtonText]:text-white!
                  [&_.cl-socialButtonsBlockButtonArrow]:text-white/40
                  [&_.cl-footerActionLink]:text-purple-400!
                  [&_.cl-footerActionText]:text-white/50
                  [&_.cl-identityPreviewText]:text-white
                  [&_.cl-userButtonPopoverActionButtonText]:text-white
                  [&_.cl-internal-b3fm6y]:text-white/40
                  [&_.cl-dividerLine]:bg-white/10
                  [&_.cl-dividerText]:text-white/40
                ">
                                    <SignIn
                                        appearance={{
                                            elements: {
                                                rootBox: "w-full",
                                                card: "w-full",
                                                headerTitle: "text-white text-2xl tracking-tight text-center",
                                                headerSubtitle: "text-white/50 text-sm text-center",
                                            },
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Global ambient glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
                </div>
            </div>
        </main>
    );
}
