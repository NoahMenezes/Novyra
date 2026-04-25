"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";

export function ContactSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="contact"
            className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.03)_0%,_transparent_60%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    {/* Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-white/40 text-sm tracking-widest uppercase mb-6">
                            Get In Touch
                        </div>
                        <h2 className="text-4xl md:text-6xl text-white tracking-tight mb-6">
                            Let&apos;s build the{" "}
                            <span className="font-serif italic text-white/60">future</span>
                        </h2>
                        <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
                            Ready to elevate your digital presence or automate your workflows?
                            Reach out directly to start the conversation.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="liquid-glass rounded-full p-3">
                                    <Mail className="w-4 h-4 text-white/80" />
                                </div>
                                <div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">
                                        Email
                                    </div>
                                    <a
                                        href="mailto:2006noahmenezes@gmail.com"
                                        className="text-white text-sm hover:text-white/80 transition-colors"
                                    >
                                        2006noahmenezes@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="liquid-glass rounded-full p-3">
                                    <MapPin className="w-4 h-4 text-white/80" />
                                </div>
                                <div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">
                                        Location
                                    </div>
                                    <span className="text-white text-sm">
                                        Margao, Goa, India
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side — Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <form
                            className="liquid-glass rounded-3xl p-8 md:p-10 space-y-6"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">
                                    Project Details
                                </label>
                                <textarea
                                    placeholder="Tell us about your project, goals, and timeline..."
                                    rows={6}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/30 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black rounded-full py-3.5 text-sm font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                Send Message
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
