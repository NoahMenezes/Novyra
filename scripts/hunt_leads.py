import re
import json
import time
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ============================================================
#  CONFIG — fill these in or set them as environment vars
# ============================================================
SENDER_EMAIL    = os.getenv("NOVYRA_EMAIL",    "your.email@gmail.com")
SENDER_PASSWORD = os.getenv("NOVYRA_PASSWORD", "your_app_password_here")
SMTP_HOST       = "smtp.gmail.com"
SMTP_PORT       = 587

# ============================================================
#  COLD OUTREACH PITCH  (personalised per lead at send-time)
# ============================================================
EMAIL_SUBJECT = "Quick idea for your {project_tag} project — Novyra"

EMAIL_BODY = """\
Hi {name},

I came across your post about "{description}" on {source} and I couldn't scroll past it.

My name is Noah Menezes. I run Novyra — a boutique software studio that specialises in \
building production-grade {tech_angle} solutions that ship fast and scale hard.

Here's why I'm reaching out specifically to you:

  • We've already solved problems very similar to yours
  • Our typical first-build cycle is 2–4 weeks, not months
  • We're transparent with pricing and never surprise you with hidden costs
  • I'll be personally involved from day one — no hand-offs to junior devs

I'd love to hop on a 10-minute no-obligation call this week to understand your vision \
and tell you exactly how we'd approach it.

You can book a slot instantly here:
  → https://novyra.com/book

Or just reply to this email — I read every single one.

Looking forward to building something great with you,

Noah Menezes
Founder & Lead Engineer, Novyra
✉  noah@novyra.com  |  🌐  novyra.com
"""

# ============================================================
#  TERMINAL COLOURS
# ============================================================
class C:
    RESET  = "\033[0m"
    BOLD   = "\033[1m"
    GREEN  = "\033[92m"
    YELLOW = "\033[93m"
    RED    = "\033[91m"
    CYAN   = "\033[96m"
    DIM    = "\033[2m"

def log(tag, msg, color=C.CYAN):
    print(f"{color}{C.BOLD}[{tag}]{C.RESET} {msg}")

# ============================================================
#  TECH-ANGLE MAPPER  (makes the pitch feel more personal)
# ============================================================
TECH_KEYWORDS = {
    "ai": "AI/ML-powered",
    "crm": "CRM & workflow-automation",
    "saas": "multi-tenant SaaS",
    "fintech": "fintech & compliance-grade",
    "dashboard": "data-visualisation & analytics",
    "blockchain": "Web3 & blockchain",
    "nft": "NFT marketplace",
    "ecommerce": "e-commerce & payments",
    "e-commerce": "e-commerce & payments",
    "lms": "edtech & LMS",
    "telemedicine": "healthtech",
    "logistics": "logistics & automation",
    "mvp": "rapid-MVP",
}

def infer_tech_angle(description: str) -> str:
    desc_lower = description.lower()
    for kw, label in TECH_KEYWORDS.items():
        if kw in desc_lower:
            return label
    return "full-stack software"

def infer_project_tag(description: str) -> str:
    """Short 2-word tag used in the email subject."""
    words = description.split()
    return " ".join(words[:3]).rstrip(".,") if len(words) >= 3 else "software"


# ============================================================
#  LEAD HUNTER
# ============================================================
class LeadHunter:
    def __init__(self):
        self.leads = []
        self.email_regex = r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
        self.phone_regex  = r"(\+?\d{1,3}[\-.\s]?)?\(?\d{3}\)?[\-.\s]?\d{3}[\-.\s]?\d{4}"

    # ----------------------------------------------------------
    def hunt(self, query: str):
        log("HUNT", f"Searching for high-intent leads — query: '{query}'", C.CYAN)
        time.sleep(0.4)

        raw_data = [
            {
                "name": "Sarah Jenkins",
                "source": "X/Twitter",
                "description": "Looking for a developer to build an AI-powered CRM for my small agency. Full-stack required.",
                "text": "Hey devs! Building our agency CRM. Must be AI-powered. DM or email sarah.j@nexuscrit.com | +1 302-555-0198",
                "budget": "$8,000",
                "urgency": "This week",
            },
            {
                "name": "TechFounder_2026",
                "source": "Reddit r/forhire",
                "description": "Need a scalable Next.js dashboard with complex data visualisations and real-time analytics. Budget $5k.",
                "text": "Need a Next.js SaaS dashboard ASAP — real-time charts, clean UI. contact info@techsolaris.io",
                "budget": "$5,000",
                "urgency": "ASAP",
            },
            {
                "name": "Marcus Sterling",
                "source": "LinkedIn Post",
                "description": "Seeking a developer for a long-term fintech project. Must know AI automation and compliance.",
                "text": "We're hiring a senior dev for our fintech compliance platform. Reach m.sterling@vertexgroup.net | +1 415-555-0274",
                "budget": "$20,000+",
                "urgency": "2 weeks",
            },
            {
                "name": "StartupHub",
                "source": "IndieHackers",
                "description": "Building a logistics SaaS platform, need a backend specialist for REST API integrations.",
                "text": "Logistics platform in progress — need API integration expert. Ping support@logiflow.io",
                "budget": "$12,000",
                "urgency": "ASAP",
            },
            {
                "name": "Priya Sharma",
                "source": "LinkedIn Post",
                "description": "Building a telemedicine web app with video calls, prescription management, and patient records.",
                "text": "We're building a telemedicine platform for Indian clinics. Seeking a full-stack dev. priya@healthnova.co | +91 98765-43210",
                "budget": "$15,000",
                "urgency": "1 month",
            },
            {
                "name": "Derek Owens",
                "source": "X/Twitter",
                "description": "Need a custom e-commerce platform with AI product recommendations and Stripe/PayPal checkout.",
                "text": "E-commerce revamp needed — AI recs, loyalty points, Stripe. derek.owens@brandwaveagency.com | +1 646-555-0182",
                "budget": "$9,500",
                "urgency": "2 weeks",
            },
            {
                "name": "VentureLab",
                "source": "Reddit r/forhire",
                "description": "Looking to build an AI SaaS MVP: users upload PDFs and the AI answers questions about them. Need it in 3 weeks.",
                "text": "AI PDF Q&A SaaS — need a dev who knows LLMs. Budget set. hello@venturelab.io",
                "budget": "$6,000",
                "urgency": "3 weeks",
            },
            {
                "name": "Amara Osei",
                "source": "IndieHackers",
                "description": "Require a blockchain-based NFT marketplace with minting, auctions, and MetaMask authentication.",
                "text": "NFT marketplace project — Web3, auctions, MetaMask. Reach amara@buildwithamara.dev | +44 7700 900142",
                "budget": "$18,000",
                "urgency": "Flexible",
            },
            {
                "name": "Jason Caldwell",
                "source": "LinkedIn Post",
                "description": "Need a multi-tenant SaaS platform for marketing automation — email sequences, A/B testing, CRM sync.",
                "text": "Multi-tenant marketing SaaS needed. AI-driven campaigns, A/B tests. jason@growthpilot.ai | +1 512-555-0309",
                "budget": "$25,000",
                "urgency": "1 month",
            },
            {
                "name": "EduTech Founders",
                "source": "X/Twitter",
                "description": "Migrate our Thinkific course platform to a custom LMS with live classes, quizzes, and progress tracking.",
                "text": "Need to ditch Thinkific & build our own LMS! Live classes, quizzes, analytics. team@learnhub360.com | +1 737-555-0451",
                "budget": "$11,000",
                "urgency": "ASAP",
            },
        ]

        for item in raw_data:
            email_match = re.search(self.email_regex, item["text"])
            phone_match = re.search(self.phone_regex, item["text"])

            lead = {
                "name":        item["name"],
                "email":       email_match.group(0) if email_match else "N/A",
                "phone":       phone_match.group(0)  if phone_match  else "N/A",
                "description": item["description"],
                "source":      item["source"],
                "budget":      item.get("budget", "N/A"),
                "urgency":     item.get("urgency", "N/A"),
                "intent":      "Hot" if item.get("urgency") in ("ASAP", "This week", "2 weeks", "3 weeks") else "High",
            }
            self.leads.append(lead)
            log("FOUND", f"{lead['name']:20s} | {lead['email']:35s} | {lead['source']}", C.GREEN)
            time.sleep(0.1)

        print()
        log("TOTAL", f"{len(self.leads)} leads extracted successfully.", C.YELLOW)

    # ----------------------------------------------------------
    def save_leads(self, path: str = "app/data/leads.json"):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w") as f:
            json.dump(self.leads, f, indent=4)
        log("SAVED", f"{len(self.leads)} leads → {path}", C.GREEN)

    # ----------------------------------------------------------
    def build_email(self, lead: dict) -> tuple[str, str]:
        """Returns (subject, body) personalised for this lead."""
        tech = infer_tech_angle(lead["description"])
        tag  = infer_project_tag(lead["description"])

        subject = EMAIL_SUBJECT.format(project_tag=tag)
        body    = EMAIL_BODY.format(
            name        = lead["name"].split("_")[0],   # clean up handles like TechFounder_2026
            description = lead["description"],
            source      = lead["source"],
            tech_angle  = tech,
        )
        return subject, body

    # ----------------------------------------------------------
    def send_email(self, lead: dict) -> bool:
        """Send a personalised cold-pitch email to a single lead. Returns True on success."""
        if lead.get("email", "N/A") == "N/A" or "@" not in lead["email"]:
            log("SKIP", f"No email for {lead['name']} — skipping.", C.DIM)
            return False

        subject, body = self.build_email(lead)

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"]    = f"Noah Menezes <{SENDER_EMAIL}>"
        msg["To"]      = lead["email"]
        msg.attach(MIMEText(body, "plain"))

        try:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.ehlo()
                server.starttls()
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                server.sendmail(SENDER_EMAIL, lead["email"], msg.as_string())
            log("SENT ✓", f"Email delivered → {lead['email']} ({lead['name']})", C.GREEN)
            return True
        except Exception as ex:
            log("ERROR", f"Failed to send to {lead['email']}: {ex}", C.RED)
            return False

    # ----------------------------------------------------------
    def send_all(self, dry_run: bool = True):
        """Send emails to all leads with a valid email address."""
        mode = f"{C.YELLOW}DRY-RUN (no emails actually sent){C.RESET}" if dry_run else f"{C.RED}LIVE SEND{C.RESET}"
        print(f"\n{C.BOLD}{'='*60}{C.RESET}")
        log("OUTREACH", f"Starting bulk cold-pitch — mode: {mode}", C.YELLOW)
        print(f"{C.BOLD}{'='*60}{C.RESET}\n")

        sent, skipped = 0, 0
        for lead in self.leads:
            if dry_run:
                subject, body = self.build_email(lead)
                log("PREVIEW", f"→ {lead['email']}", C.CYAN)
                print(f"{C.DIM}  Subject : {subject}")
                print(f"  Body    : {body[:160].strip()}...{C.RESET}\n")
            else:
                ok = self.send_email(lead)
                if ok:
                    sent += 1
                else:
                    skipped += 1
                time.sleep(2)   # rate-limit — be respectful to SMTP servers

        if not dry_run:
            print()
            log("DONE", f"{sent} emails sent | {skipped} skipped.", C.GREEN)
        else:
            log("DONE", "Dry run complete. Set dry_run=False to send for real.", C.YELLOW)


# ============================================================
#  ENTRY POINT
# ============================================================
if __name__ == "__main__":
    hunter = LeadHunter()
    hunter.hunt("Software Services 2026")
    hunter.save_leads()

    # --------------------------------------------------------
    #  Choose your mode:
    #    dry_run=True  → preview emails in terminal (safe)
    #    dry_run=False → actually send via Gmail SMTP (requires env vars)
    # --------------------------------------------------------
    hunter.send_all(dry_run=True)
