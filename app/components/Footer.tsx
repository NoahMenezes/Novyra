"use client";

import { Globe } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 px-6 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Globe className="w-6 h-6 text-white" />
                            <span className="text-white font-semibold text-lg">Novyra</span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                            Founded by Noah Menezes. Premium software engineering services.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col md:items-end">
                        <h4 className="text-white text-sm font-medium mb-4 text-left md:text-right">Contact</h4>
                        <ul className="space-y-3 text-left md:text-right">
                            <li>
                                <a
                                    href="mailto:2006noahmenezes@gmail.com"
                                    className="text-white/40 text-sm hover:text-white/70 transition-colors"
                                >
                                    2006noahmenezes@gmail.com
                                </a>
                            </li>
                            <li className="text-white/40 text-sm">
                                Margao, Goa, India
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-xs">
                        © 2026 Novyra. Built by Noah Menezes.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-white/20 text-[10px] uppercase tracking-widest">
                            Margao, Goa
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
