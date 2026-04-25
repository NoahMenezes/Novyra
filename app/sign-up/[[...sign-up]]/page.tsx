"use client";

import { SignUp } from "@clerk/nextjs";
import { CheckCircle2, Rocket, Stars } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";

export default function SignUpPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col overflow-hidden">
            {/* Global Navbar */}
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
                                Start your <span className="italic text-white/40">journey</span> with us.
                            </h1>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-white/10 rounded-full p-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-white/80" />
                                    </div>
                                    <div>
                                        <h3 className="text-white text-sm font-medium">Free Consultation</h3>
                                        <p className="text-white/40 text-xs mt-1">Every new account gets a dedicated strategy session.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-white/10 rounded-full p-1.5">
                                        <Rocket className="w-4 h-4 text-white/80" />
                                    </div>
                                    <div>
                                        <h3 className="text-white text-sm font-medium">Instant Dashboard</h3>
                                        <p className="text-white/40 text-xs mt-1">Get immediate access to your project management tools.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                        <p className="text-white/20 text-xs uppercase tracking-widest">© 2026 Novyra Agency</p>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -mr-64 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />
                </div>

                {/* Right Side: Sign Up Form */}
                <div className="flex-1 flex flex-col relative bg-black">
                    <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                        <div className="w-full max-w-[440px] py-10">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="mb-10 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                        <Stars className="w-5 h-5 text-blue-400" />
                                        <span className="text-blue-400 text-xs font-medium uppercase tracking-widest">New Member</span>
                                    </div>
                                    <h2 className="text-4xl text-white tracking-tight mb-3">
                                        Create <span className="font-serif italic text-white/60">account</span>
                                    </h2>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        Join our elite circle of clients today.
                                    </p>
                                </div>

                                <div className="flex justify-center 
                  [&_.cl-rootBox]:w-full 
                  [&_.cl-card]:bg-transparent 
                  [&_.cl-card]:shadow-none 
                  [&_.cl-card]:p-0 
                  [&_.cl-headerTitle]:text-white!
                  [&_.cl-headerSubtitle]:text-white/60!
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
                  [&_.cl-footerActionLink]:text-blue-400!
                  [&_.cl-footerActionText]:text-white/50
                  [&_.cl-identityPreviewText]:text-white
                  [&_.cl-dividerLine]:bg-white/10
                  [&_.cl-dividerText]:text-white/40
                  [&_.cl-formFieldErrorText]:text-red-400
                ">
                                    <SignUp
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

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
                </div>
            </div>
        </main>
    );
}
