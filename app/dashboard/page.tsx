"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Globe, ArrowRight, Layout, FileText, Settings, CreditCard } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    const quickActions = [
        {
            icon: Layout,
            title: "My Projects",
            description: "View and manage your active website projects.",
            href: "#",
        },
        {
            icon: FileText,
            title: "Invoices",
            description: "View billing history and download invoices.",
            href: "#",
        },
        {
            icon: CreditCard,
            title: "Subscription",
            description: "Manage your plan and payment methods.",
            href: "#",
        },
        {
            icon: Settings,
            title: "Settings",
            description: "Update your account and notification preferences.",
            href: "#",
        },
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Nav */}
            <div className="px-6 py-6 w-full border-b border-white/5">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Globe className="w-6 h-6 text-white" />
                        <span className="text-white font-semibold text-lg">Novyra</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-white/60 hover:text-white text-sm transition-colors"
                        >
                            Home
                        </Link>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9",
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl text-white tracking-tight mb-3">
                        Welcome back,{" "}
                        <span className="font-serif italic text-white/60">
                            {user?.firstName || "there"}
                        </span>
                    </h1>
                    <p className="text-white/50 text-base">
                        Manage your projects, invoices, and account from your personal
                        dashboard.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <a
                                key={action.title}
                                href={action.href}
                                className="liquid-glass rounded-2xl p-6 md:p-8 group hover:bg-white/[0.02] transition-colors flex items-start gap-5"
                            >
                                <div className="liquid-glass rounded-xl p-3 shrink-0">
                                    <Icon className="w-5 h-5 text-white/80" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-medium mb-1 flex items-center gap-2">
                                        {action.title}
                                        <ArrowRight className="w-4 h-4 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h3>
                                    <p className="text-white/50 text-sm">{action.description}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="liquid-glass rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl md:text-3xl text-white tracking-tight mb-4">
                        Ready to start a new project?
                    </h2>
                    <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
                        Tell us about your vision and we'll craft a proposal tailored to
                        your needs within 24 hours.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-3 text-sm font-medium hover:bg-white/90 transition-colors group"
                    >
                        Start a Project
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
