"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Navbar } from "../components/Navbar";
import {
  Search,
  ShieldCheck,
  Zap,
  Mail,
  User,
  Phone,
  Loader2,
  Database,
  RefreshCw,
  TrendingUp,
  Copy,
  Check,
  Send,
  X,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Clock,
  DollarSign,
  Bookmark,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  intent: "High" | "Medium" | "Hot";
  source: string;
  budget: string;
  urgency: string;
}

// ──────────────────────────────────────────────────────────────
//  IMPROVED COLD-PITCH TEMPLATE  (personalised per lead)
// ──────────────────────────────────────────────────────────────
function buildPitch(lead: Lead): { subject: string; body: string } {
  const firstName = lead.name.split(/[\s_]/)[0];
  const subject = `Quick idea for your ${lead.description.split(" ").slice(0, 3).join(" ")} project — Novyra`;

  const body = `Hi ${firstName},

    I came across your petition regarding "${lead.description}" on ${lead.source} and wanted to reach out immediately.

    My name is Noah Menezes. At Novyra, we specialize in high-end software solutions and advanced AI integrations.

    Based on your requirements, I propose a custom-built solution centered around an intelligent AI Agent. This agent will automate your workflows, seamlessly integrate with your systems, and handle the heavy lifting of your data processes—dramatically cutting down operational overhead while ensuring top-tier performance.

    ${lead.budget && lead.budget !== "N/A" ? `Given your budget of ${lead.budget}, we can execute this effectively and within scope.\n\n` : ""}I'd love to discuss exactly how we can implement this AI-driven approach for your project.

    Please contact me back so we can discuss the next steps:
      • Email: 2006noahmenezes@gmail.com
      • WhatsApp: +91 9518346262
      • LinkedIn: www.linkedin.com/in/noah-menezes-26066a351

    Looking forward to building something incredible together.

    Noah Menezes
    Founder & Lead Engineer, Novyra`;

  return { subject, body };
}

// ──────────────────────────────────────────────────────────────
//  INTENT BADGE
// ──────────────────────────────────────────────────────────────
const INTENT_STYLES: Record<string, string> = {
  Hot: "bg-red-500/15 text-red-400 border-red-500/25",
  High: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  Medium: "bg-blue-500/15 text-blue-400 border-blue-500/25",
};

// ──────────────────────────────────────────────────────────────
//  PITCH MODAL
// ──────────────────────────────────────────────────────────────
function PitchModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const { subject, body } = buildPitch(lead);
  const [copied, setCopied] = useState<"subject" | "body" | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const copy = (text: string, which: "subject" | "body") => {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
    setEmailSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 24, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-xs font-medium uppercase tracking-widest">
                AI Cold Pitch
              </span>
            </div>
            <h2 className="text-white text-lg font-semibold">{lead.name}</h2>
            <p className="text-white/40 text-xs mt-0.5">{lead.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors mt-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subject line */}
        <div className="mx-6 mt-5 bg-white/[0.03] rounded-xl border border-white/5 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/30 text-[10px] uppercase tracking-widest">
              Subject Line
            </span>
            <button
              onClick={() => copy(subject, "subject")}
              className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
            >
              {copied === "subject" ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <p className="text-white text-sm font-medium">{subject}</p>
        </div>

        {/* Body */}
        <div className="mx-6 mt-3 mb-6 bg-white/[0.03] rounded-xl border border-white/5 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/30 text-[10px] uppercase tracking-widest">
              Email Body
            </span>
            <button
              onClick={() => copy(body, "body")}
              className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
            >
              {copied === "body" ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="text-white/70 text-xs leading-relaxed whitespace-pre-wrap font-sans max-h-64 overflow-y-auto">
            {body}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={handleSendEmail}
            className="flex-1 bg-white text-black rounded-2xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/90 active:scale-95 transition-all"
          >
            {emailSent ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Launching Email App…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send via Email App
              </>
            )}
          </button>
          <button
            onClick={() => copy(`Subject: ${subject}\n\n${body}`, "body")}
            className="bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-3 text-sm font-medium flex items-center gap-2 hover:bg-white/10 active:scale-95 transition-all"
          >
            <Copy className="w-4 h-4" />
            Copy All
          </button>
        </div>

        <div className="px-6 pb-5">
          <div className="flex items-start gap-2 bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-3">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400/70 mt-0.5 shrink-0" />
            <p className="text-yellow-400/70 text-[11px] leading-relaxed">
              To send directly from Python, set{" "}
              <code className="bg-white/5 px-1 rounded">NOVYRA_EMAIL</code> and{" "}
              <code className="bg-white/5 px-1 rounded">NOVYRA_PASSWORD</code>{" "}
              env vars and run{" "}
              <code className="bg-white/5 px-1 rounded">
                python scripts/hunt_leads.py
              </code>{" "}
              with{" "}
              <code className="bg-white/5 px-1 rounded">dry_run=False</code>.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
//  PETITION MODAL
// ──────────────────────────────────────────────────────────────
function PetitionModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 24, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-serif text-white">
              {lead.name}&apos;s Petition
            </h2>
            <p className="text-white/40 text-sm mt-1">
              Source: {lead.source} • {lead.intent} Intent
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors bg-white/5 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white/80 leading-relaxed text-lg italic font-serif">
          &ldquo;{lead.description}&rdquo;
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
//  DASHBOARD PAGE
// ──────────────────────────────────────────────────────────────
export default function Dashboard() {
  const convexLeads = useQuery(api.leads.get);
  const addBatch = useMutation(api.leads.addBatch);
  const leads: Lead[] = (convexLeads || []).map(
    (l, i) => ({ ...l, id: i + 1 }) as Lead,
  );

  const [isHunting, setIsHunting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [intentFilter, setIntentFilter] = useState<string>("All");
  const [savedLeads, setSavedLeads] = useState<Set<number>>(new Set());

  const toggleSave = (id: number) => {
    const newSaved = new Set(savedLeads);
    if (newSaved.has(id)) newSaved.delete(id);
    else newSaved.add(id);
    setSavedLeads(newSaved);
  };

  const fetchLeads = async () => {
    setIsHunting(true);
    try {
      const res = await fetch("/data/leads.json");
      if (res.ok) {
        const data = await res.json();
        await addBatch({ leads: data });
      }
    } catch (e) {
      console.error("Failed to sync leads", e);
    } finally {
      setTimeout(() => setIsHunting(false), 1500);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIntent = intentFilter === "All" || l.intent === intentFilter;
    return matchesSearch && matchesIntent;
  });

  const hotCount = leads.filter((l) => l.intent === "Hot").length;
  const highCount = leads.filter((l) => l.intent === "High").length;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navbar />

      <div className="pt-32 px-6 pb-20 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-500/20 rounded-full p-2">
                <Database className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-purple-400 text-xs font-medium uppercase tracking-widest italic">
                Live Lead Hunter
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
              Real-Time <span className="italic text-white/60">Harvest</span>
            </h1>
            <p className="text-white/40 text-sm mt-3 max-w-md">
              10 high-intent project petitions scraped and ready for outreach.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              disabled={isHunting}
              className="bg-white text-black rounded-full px-8 py-3.5 text-sm font-medium hover:bg-white/90 transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {isHunting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Hunting…
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Sync Live Data
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              icon: <TrendingUp className="w-5 h-5 text-green-400" />,
              value: leads.length,
              label: "Total Leads",
            },
            {
              icon: <Zap className="w-5 h-5 text-red-400" />,
              value: hotCount,
              label: "🔥 Hot Leads",
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-yellow-400" />,
              value: highCount,
              label: "High Intent",
            },
            {
              icon: <Mail className="w-5 h-5 text-purple-400" />,
              value: "LIVE",
              label: "Data Source",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="liquid-glass rounded-2xl p-5 border border-white/5"
            >
              {stat.icon}
              <div className="text-2xl font-semibold mt-3 mb-1">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Search & Filter ── */}
        <div className="liquid-glass rounded-2xl p-4 flex flex-col md:flex-row gap-3 mb-8 border border-white/5">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Filter by name or project description…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-white/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Hot", "High", "Medium"].map((f) => (
              <button
                key={f}
                onClick={() => setIntentFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${intentFilter === f ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Leads Table ── */}
        <div className="liquid-glass rounded-3xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-5 text-xs font-medium text-white/40 uppercase tracking-widest">
                    #
                  </th>
                  <th className="px-6 py-5 text-xs font-medium text-white/40 uppercase tracking-widest">
                    Customer
                  </th>
                  <th className="px-6 py-5 text-xs font-medium text-white/40 uppercase tracking-widest">
                    Project Petition
                  </th>
                  <th className="px-6 py-5 text-xs font-medium text-white/40 uppercase tracking-widest">
                    Contact
                  </th>
                  <th className="px-6 py-5 text-xs font-medium text-white/40 uppercase tracking-widest text-center">
                    Budget / Urgency
                  </th>
                  <th className="px-6 py-5 text-xs font-medium text-white/40 uppercase tracking-widest text-center">
                    Intent
                  </th>
                  <th className="px-6 py-5 text-xs font-medium text-white/40 uppercase tracking-widest text-right">
                    Outreach
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filteredLeads.map((lead, idx) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                      className="group hover:bg-white/[0.015] transition-colors"
                    >
                      {/* Index */}
                      <td className="px-6 py-5 text-white/20 text-sm font-mono">
                        {String(idx + 1).padStart(2, "0")}
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
                            <User className="w-3.5 h-3.5 text-purple-400/80" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                              {lead.name}
                            </div>
                            <div className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">
                              {lead.source}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Project Petition */}
                      <td
                        className="px-6 py-5 max-w-xs cursor-pointer group/petition"
                        onClick={() => setViewLead(lead)}
                        title="Click to view full petition"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-white/60 line-clamp-2 leading-relaxed italic group-hover/petition:text-white/90 transition-colors">
                            &ldquo;{lead.description}&rdquo;
                          </p>
                          <div className="opacity-0 group-hover/petition:opacity-100 flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-white/10 text-white/60 transition-all">
                            <span className="text-[10px] tracking-widest font-bold">
                              ...
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-purple-400/60 shrink-0" />
                            <span className="text-xs text-white/60 font-mono truncate max-w-[180px]">
                              {lead.email}
                            </span>
                          </div>
                          {lead.phone !== "N/A" && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-blue-400/60 shrink-0" />
                              <span className="text-xs text-white/60 font-mono">
                                {lead.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Budget / Urgency */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col items-center gap-1">
                          {lead.budget && lead.budget !== "N/A" && (
                            <div className="flex items-center gap-1 text-green-400/80 text-xs">
                              <DollarSign className="w-3 h-3" />
                              <span>{lead.budget}</span>
                            </div>
                          )}
                          {lead.urgency && lead.urgency !== "N/A" && (
                            <div className="flex items-center gap-1 text-orange-400/70 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>{lead.urgency}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Intent */}
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] border font-semibold uppercase tracking-widest ${INTENT_STYLES[lead.intent] ?? "bg-white/5 text-white/40 border-white/10"}`}
                        >
                          {lead.intent}
                        </span>
                      </td>

                      {/* Outreach — Send Button */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleSave(lead.id)}
                            className={`p-2 rounded-xl border transition-all ${
                              savedLeads.has(lead.id)
                                ? "bg-purple-500/20 border-purple-500/40 text-purple-400"
                                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white"
                            }`}
                            title={
                              savedLeads.has(lead.id)
                                ? "Unsave Lead"
                                : "Save Lead"
                            }
                          >
                            <Bookmark
                              className="w-4 h-4"
                              fill={
                                savedLeads.has(lead.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                          <button
                            onClick={() => setActiveLead(lead)}
                            className="flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 text-purple-300 rounded-2xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-purple-500/25 active:scale-95 transition-all group/btn"
                          >
                            <Send className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                            Pitch&nbsp;&amp;&nbsp;Send
                            <ChevronRight className="w-3 h-3 opacity-50" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredLeads.length === 0 && !isHunting && (
              <div className="text-center py-20 text-white/20">
                <Database className="w-8 h-8 mx-auto mb-4 opacity-30" />
                <p className="text-sm">No leads match your filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-4 text-white/20 text-[10px] uppercase tracking-[0.2em]">
          <div className="flex justify-between w-full">
            <div>Live Coverage: Active Python Scripting</div>
            <div>Target: Freelancing Portals &amp; Social Marketplaces</div>
          </div>
          <div className="text-white/40 border border-white/10 bg-white/5 p-4 rounded-xl w-full text-center normal-case tracking-normal">
            <h3 className="font-bold text-white mb-2 text-sm">
              Convex Backend Setup Guide
            </h3>
            <p className="mb-1">
              1. Run{" "}
              <code className="bg-black px-1 rounded">npx convex dev</code> in
              your terminal.
            </p>
            <p className="mb-1">
              2. Log in with your GitHub account and create a new project.
            </p>
            <p>
              3. Copy the{" "}
              <code className="bg-black px-1 rounded">
                NEXT_PUBLIC_CONVEX_URL
              </code>{" "}
              from the output to your{" "}
              <code className="bg-black px-1 rounded">.env.local</code> file.
            </p>
          </div>
        </div>
      </div>

      {/* ── Pitch Modal ── */}
      <AnimatePresence>
        {activeLead && (
          <PitchModal lead={activeLead} onClose={() => setActiveLead(null)} />
        )}
        {viewLead && (
          <PetitionModal lead={viewLead} onClose={() => setViewLead(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
