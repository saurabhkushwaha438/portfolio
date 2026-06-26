'use client'
import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
    id: number;
    icon: string;
    name: string;
    description: string;
    techs: string[];
    github?: string;
    live?: string;
}

interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    badge: "active" | "freelance";
}

// ─── Data — edit this section ────────────────────────────────────────────────

const PROJECTS: Project[] = [
    {
        id: 1,
        icon: "🛡️",
        name: "VulnScan CLI",
        description:
            "Automated vulnerability scanner for Node.js APIs with OWASP Top 10 checks built in. Detects injection, broken auth, and misconfiguration issues directly from the terminal.",
        techs: ["Node.js", "CLI", "OWASP", "Security"],
        github: "https://github.com/yourusername/vulnscan",
        live: "https://legaleyepartner.com",
    },
    {
        id: 2,
        icon: "📄",
        name: "LegalEye Portal",
        description:
            "Client-facing portal built for LegalEye Partners — handles case tracking, document uploads, appointment scheduling, and invoice management end to end.",
        techs: ["React", "TypeScript", "Prisma", "Freelance"],
        github: "https://github.com/yourusername/legaleye",
        live: "https://legaleyepartner.com",
    },
    {
        id: 3,
        icon: "⚙️",
        name: "DevBoard",
        description:
            "Real-time developer dashboard that aggregates GitHub activity, CI pipeline status, and open issues into one focused view. No more tab-switching.",
        techs: ["React", "Next.js", "WebSocket", "GitHub API"],
        github: "https://github.com/yourusername/devboard",
        live: "https://legaleyepartner.com",
    },
    {
        id: 4,
        icon: "🔒",
        name: "AuthKit",
        description:
            "Drop-in authentication library with JWT, OAuth2, and role-based access control. Works with any Express or Next.js app with a single import.",
        techs: ["TypeScript", "JWT", "OAuth2", "RBAC"],
        github: "https://github.com/yourusername/authkit",
        live: "https://legaleyepartner.com",
    },
    {
        id: 5,
        icon: "📊",
        name: "MetricsFlow",
        description:
            "Lightweight analytics SDK for Next.js — tracks page views and custom events at the edge with zero cookies and full GDPR compliance out of the box.",
        techs: ["Next.js", "Edge Runtime", "SQLite", "Privacy"],
        github: "https://github.com/yourusername/metricsflow",
        live: "https://legaleyepartner.com",
    },
    {
        id: 6,
        icon: "🌐",
        name: "OpenTrace",
        description:
            "Open source HTTP request tracer for debugging microservice latency. Instruments spans across services and visualises the call graph with Jaeger integration.",
        techs: ["Go", "gRPC", "Jaeger", "OpenTelemetry"],
        github: "https://github.com/yourusername/opentrace",
        live: "https://legaleyepartner.com",
    },
];

const EXPERIENCE: Experience[] = [
    {
        company: "OWASP SasanLabs",
        role: "Open Source Contributor",
        period: "2024 – Present",
        location: "Remote · Open Source",
        badge: "active",
    },
    {
        company: "LegalEye Partners",
        role: "Full Stack Developer",
        period: "2024 – Present",
        location: "Remote · Contract",
        badge: "freelance",
    },
];


// ─── Sub-components ──────────────────────────────────────────────────────────

function TitleBar({ onClose }: { onClose?: () => void }) {
    return (
        <div
            className="
            h-10
            flex
            items-center
            px-4
            relative
            border-b
            border-white/10
            backdrop-blur-[24px]
            bg-white/[0.06]
            "
            style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.18), 0 8px 30px rgba(0,0,0,.2)"
            }}
        >
            <div className="flex gap-[8px]">
                <div 
                    className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 cursor-pointer hover:bg-[#ff5f56]/80" 
                    onClick={onClose}
                />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 cursor-pointer hover:bg-[#ffbd2e]/80" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 cursor-pointer hover:bg-[#27c93f]/80" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 text-[12px] font-medium text-white/50 pointer-events-none tracking-wide flex items-center gap-1.5">
                <span className="text-[10px]">📁</span> yourname.dev
            </span>
        </div>
    );
}

function SectionHead({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-[12px] text-white/50 mb-2.5 ml-1" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
            {children}
        </h2>
    );
}

// ─── Project List (Stacked Vertically) ───────────────────────────────────────

function ProjectList({ projects }: { projects: Project[] }) {
    return (
        <div className="flex flex-col gap-3 mb-6">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="bg-white/[0.03] border border-white/[0.05] rounded-[12px] p-4 overflow-hidden hover:bg-white/[0.06] transition-colors"
                    style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.18), 0 8px 30px rgba(0,0,0,.2)" }}
                >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-3">
                        {/* App icon style */}
                        <div className="w-[42px] h-[42px] rounded-[10px] bg-white/[0.08] border border-white/10 flex items-center justify-center text-xl shrink-0 shadow-sm">
                            {project.icon}
                        </div>
                        <div className="flex gap-1.5">
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#28C840]/10 border border-[#28C840]/20 text-[#28C840] hover:bg-[#28C840]/20 hover:border-[#28C840]/40 hover:shadow-[0_0_12px_rgba(40,200,64,0.4)] transition-all"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] shadow-[0_0_6px_#28C840] animate-pulse"></span>
                                    Live
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] font-medium flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-white/[0.08] border border-white/[0.05] text-white/70 hover:bg-white/[0.12] hover:text-white transition-all shadow-sm"
                                >
                                    <span className="text-[10px] opacity-70">⌘</span> GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Name & desc */}
                    <h3 className="text-[14px] text-white/90 mb-1" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
                        {project.name}
                    </h3>
                    <p className="text-[13px] text-white/50 leading-relaxed mb-3.5" style={{ fontWeight: 450 }}>
                        {project.description}
                    </p>

                    {/* Tech pills - macOS subtle style */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.techs.map((t) => (
                            <span
                                key={t}
                                className="text-[10px] font-medium px-2 py-0.5 rounded-[5px] bg-white/[0.05] border border-white/[0.03] text-white/50"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Experience Card ──────────────────────────────────────────────────────────

function ExpCard({ exp }: { exp: Experience }) {
    return (
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-[12px] px-4 py-3.5 mb-2.5 hover:bg-white/[0.06] transition-colors flex items-center gap-4" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.18), 0 8px 30px rgba(0,0,0,.2)" }}>
            <div className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0">
                💼
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-0.5">
                    <span className="text-[14px] text-white/90 truncate" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>{exp.company}</span>
                    {exp.badge === "active" ? (
                        <span className="text-[10px] font-medium flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0A84FF]/15 text-[#0A84FF] border border-[#0A84FF]/30 shadow-[0_0_10px_rgba(10,132,255,0.25)] ml-2 shrink-0">
                            Active member
                        </span>
                    ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/10 ml-2 shrink-0">
                            Freelance
                        </span>
                    )}
                </div>
                <p className="text-[13px] text-white/60" style={{ fontWeight: 450 }}>{exp.role}</p>
                <div className="flex gap-3 mt-1 text-[11px] text-white/40">
                    <span>{exp.period}</span>
                    <span>{exp.location}</span>
                </div>
            </div>
        </div>
    );
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function Portfolio({ onClose }: { onClose?: () => void }) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            let h = now.getHours();
            const m = now.getMinutes();
            const ampm = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
            setTime(`${h}:${m.toString().padStart(2, "0")} ${ampm}`);
        };
        tick();
        const id = setInterval(tick, 5000);
        return () => clearInterval(id);
    }, []);


    return (
        <div
            className="
                w-[45%]
                mx-auto
                my-6
                overflow-hidden
                rounded-[20px]
                text-white
                antialiased
                shadow-[0_30px_90px_rgba(0,0,0,.55)]
                border border-white/10
                backdrop-blur-[30px]
                bg-white/[0.07]
            "
            style={{
                fontFamily: '-apple-system,"SF Pro Display",BlinkMacSystemFont,"Segoe UI",sans-serif',
                background:
                    "linear-gradient(180deg,#0a0a0f 0%,#12101a 100%)",
                boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,.18), 0 8px 30px rgba(0,0,0,.2), 0 30px 90px rgba(0,0,0,.55)",
            }}
        >
            <TitleBar onClose={onClose} />

            {/* Scrollable content */}
            <div
                className="px-8 py-7 overflow-y-auto max-h-[650px] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
            >
                {/* ── Hero (macOS Profile Style) ── */}
                <section id="hero" className="flex items-center gap-5 mb-6">
                    <div
                        className="
                            w-16
                            h-16
                            rounded-full
                            border
                            border-white/10
                            backdrop-blur-xl
                            bg-white/[0.07]
                            "
                        style={{
                            boxShadow:
                                "inset 0 1px 0 rgba(255,255,255,.18), 0 8px 30px rgba(0,0,0,.2)"
                        }}
                    >
                        <div className="w-full h-full rounded-full bg-[#1e1e1e] flex items-center justify-center text-[22px] font-semibold text-white/80 shrink-0">
                            YN
                        </div>
                    </div>
                    <div>
                        <h1 className="text-[22px] text-white/90 leading-tight" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
                            Your Name
                        </h1>
                        <p className="text-[13px] text-white/50 mt-1" style={{ fontWeight: 450 }}>
                            Full Stack Developer · Open Source Contributor
                        </p>
                    </div>
                </section>

                {/* Tags (macOS rounded pills) */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {["Full Stack", "React", "TypeScript", "Node.js", "Next.js", "Security"].map(
                        (tag, i) => (
                            <span
                                key={tag}
                                className={`text-[11px] font-medium flex items-center gap-1.5 px-3 py-1 rounded-full border ${i === 0
                                    ? "bg-[#0A84FF]/15 text-[#0A84FF] border-[#0A84FF]/30 shadow-[0_0_10px_rgba(10,132,255,0.25)]"
                                    : "bg-white/[0.05] text-white/70 border-white/[0.05] shadow-sm"
                                    }`}
                            >
                                {tag}
                            </span>
                        )
                    )}
                </div>

                {/* Bio */}
                <p className="text-[13px] text-white/60 leading-relaxed mb-6" style={{ fontWeight: 450 }}>
                    Building cool stuff and contributing to open source security tooling.
                    Member of OWASP SasanLabs — working on web security research and
                    developer tools that solve real problems.
                </p>

                {/* ── Experience ── */}
                <section id="experience" className="mb-8">
                    <SectionHead>Experience</SectionHead>
                    {EXPERIENCE.map((exp) => (
                        <ExpCard key={exp.company} exp={exp} />
                    ))}
                </section>

                {/* ── Projects ── */}
                <section id="projects" className="mb-2">
                    <SectionHead>Projects</SectionHead>
                    <ProjectList projects={PROJECTS} />
                </section>
            </div>
        </div>
    );
}