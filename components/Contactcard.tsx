'use client'


import { useState } from "react";

const socialLinks = [
    {
        label: "Github",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
        ),
        bg: "bg-[#E05C5C]",
        hoverBg: "hover:bg-[#C94F4F]",
        href: "https://github.com/saurabhkushwaha438",
    },
    {
        label: "Leetcode",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M9 9h6M9 12h6M9 15h4" />
            </svg>
        ),
        bg: "bg-[#3DBE6E]",
        hoverBg: "hover:bg-[#2EA85E]",
        href: "https://leetcode.com/u/saurabhkushwaha917/",
    },
    {
        label: "Twitter/X",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        bg: "bg-[#F07B5A]",
        hoverBg: "hover:bg-[#D96B4A]",
        href: "https://x.com/_100rbh_",
    },
    {
        label: "LinkedIn",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        bg: "bg-[#29B6E8]",
        hoverBg: "hover:bg-[#1FA4D4]",
        href: "https://www.linkedin.com/in/saurabhkushwaha438/",
    },
];

interface ContactCardProps {
    onClose?: () => void;
}

export default function ContactCard({ onClose }: ContactCardProps) {
    const [activeBtn, setActiveBtn] = useState<string | null>(null);
    const [dotsHovered, setDotsHovered] = useState(false);

    return (
        <div className="h-96 w-125 rounded-xl overflow-hidden shadow-2xl border border-white/10"
            style={{ background: "#1e1e1e", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>

            {/* Title bar */}
            <div className="flex items-center justify-center relative px-4 py-3 "
                style={{ background: "#2a2a2a", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={() => setDotsHovered(true)}
                onMouseLeave={() => setDotsHovered(false)}
            >
                {/* Traffic lights */}
                <div className="absolute left-4 flex items-center gap-[7px]">
                    <button
                        onClick={onClose}
                        className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center transition-all hover:brightness-110 active:brightness-75"
                        title="Close"
                    >
                        {dotsHovered && (
                            <svg viewBox="0 0 6 6" fill="none" className="w-[7px] h-[7px]">
                                <path d="M1 1l4 4M5 1L1 5" stroke="#7a1f1f" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>
                    <button className="w-3 h-3 rounded-full bg-[#FEBC2E]" title="Minimize" />
                    <button className="w-3 h-3 rounded-full bg-[#28C840]" title="Maximize" />
                </div>
                <span className="text-sm font-medium text-white/60 tracking-wide select-none">
                    Contact Me
                </span>
            </div>

            {/* Content */}
            <div className="px-7 pt-7 pb-8 mt-0">
                {/* Avatar */}
                <div className="mb-6 mb-0">
                    <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-white/10">
                        <img
                            src="/images/dp.jpeg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-white text-2xl font-semibold mb-2 tracking-tight">
                    Let's Connect
                </h2>
                <p className="text-white/50 text-sm mb-7 leading-relaxed">
                    Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
                </p>

                {/* Social buttons grid */}
                <div className="grid grid-cols-4 gap-3">
                    {socialLinks.map(({ label, icon, bg, hoverBg, href }) => (
                        <a
                            key={label}
                            href={href}
                            onMouseDown={() => setActiveBtn(label)}
                            onMouseUp={() => setActiveBtn(null)}
                            onMouseLeave={() => setActiveBtn(null)}
                            className={`
                  ${bg} ${hoverBg}
                  flex flex-col items-start justify-between
                  rounded-xl px-3 pt-3 pb-3
                  transition-all duration-150 cursor-pointer
                  text-white no-underline
                  ${activeBtn === label ? "scale-95 brightness-90" : "scale-100"}
                `}
                            style={{ minHeight: "84px" }}
                        >
                            <span className="opacity-90">{icon}</span>
                            <span className="text-sm font-semibold mt-3 leading-none">{label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}