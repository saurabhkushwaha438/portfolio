'use client'
import { useState, useEffect } from "react";

const NAV_ITEMS = [
    {
        label: "Library",
        icon: (
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="7" height="7" rx="1.5" />
                <rect x="11" y="2" width="7" height="7" rx="1.5" />
                <rect x="2" y="11" width="7" height="7" rx="1.5" />
                <rect x="11" y="11" width="7" height="7" rx="1.5" />
            </svg>
        ),
    },
    {
        label: "Memories",
        icon: (
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
                <circle cx="10" cy="10" r="7.5" />
                <path d="M10 6v4l2.5 2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Places",
        icon: (
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
                <path d="M10 2a5.5 5.5 0 0 1 5.5 5.5c0 3.5-5.5 10.5-5.5 10.5S4.5 11 4.5 7.5A5.5 5.5 0 0 1 10 2z" />
                <circle cx="10" cy="7.5" r="1.8" />
            </svg>
        ),
    },
    {
        label: "People",
        icon: (
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
                <circle cx="10" cy="6.5" r="3" />
                <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Favorites",
        icon: (
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
                <path
                    d="M10 3.5l1.854 3.756 4.146.602-3 2.924.708 4.128L10 12.77l-3.708 1.94.708-4.128L4 7.858l4.146-.602L10 3.5z"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

const PHOTOS = [
    {
        id: 1,
        src: "/images/g1.jpeg",
        alt: "Tech conference",
        span: "col-span-2 row-span-2",
    },
    {
        id: 2,
        src: "/images/g4.jpeg",
        alt: "JavaScript code",
        span: "col-span-1 row-span-2",
    },
    {
        id: 3,
        src: "/images/g2.jpeg",
        alt: "Team meeting",
        span: "col-span-1 row-span-1",
    },
    {
        id: 4,
        src: "/images/g3.jpeg",
        alt: "Conference talk",
        span: "col-span-1 row-span-1",
    },
];

const SMALL_PHOTOS = [
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
    "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=400&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
];

interface GalleryProps {
    onClose?: () => void;
}

export default function PhotosApp({ onClose }: GalleryProps) {
    const [active, setActive] = useState("Library");
    const [loaded, setLoaded] = useState(false);
    const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [dotsHovered, setDotsHovered] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 80);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (lightbox !== null) setLightbox(null);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightbox]);

    return (
        <>
            <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes zoomIn  {
          from { opacity: 0; transform: scale(0.92) }
          to   { opacity: 1; transform: scale(1) }
        }
      `}</style>

            <div
                className="rounded-xl border border-white/10 bg-[#1c1c1e] select-none relative"
                style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
                    width: 680,
                }}
            >
                {/* ── Title bar ── */}
                <div
                    className="relative flex items-center justify-between px-4 py-[10px] bg-[#2a2a2c] border-b border-white/[0.07]"
                    onMouseEnter={() => setDotsHovered(true)}
                    onMouseLeave={() => setDotsHovered(false)}
                >
                    {/* Traffic lights */}
                    <div className="flex items-center gap-[7px]">
                        {/* 🔴 Close */}
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

                        {/* 🟡 Minimize (Disabled) */}
                        <button

                            className="w-3 h-3 rounded-full bg-[#FEBC2E] "
                            title="Minimize"
                        />

                        {/* 🟢 Maximize (Disabled) */}
                        <button

                            className="w-3 h-3 rounded-full bg-[#28C840] "
                            title="Maximize"
                        />
                    </div>

                    {/* Window title */}
                    <span className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-white/50 tracking-wide pointer-events-none">
                        Photos
                    </span>

                    {/* Toolbar icons */}
                    <div className="flex items-center gap-3">
                        <button className="text-white/40 hover:text-white/70 transition-colors">
                            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
                                <rect x="2" y="3" width="16" height="12" rx="1.5" />
                                <path d="M6 18h8M10 15v3" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button className="text-white/40 hover:text-white/70 transition-colors">
                            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
                                <circle cx="9" cy="9" r="6" />
                                <path d="M14 14l3.5 3.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── App body ── */}
                <div
                    style={{
                        display: "flex",
                        height: 340,
                        overflow: "hidden",
                    }}
                >
                    {/* ── Sidebar ── */}
                    <div
                        className="flex-shrink-0 overflow-hidden"
                        style={{
                            width: 150,
                        }}
                    >
                        <div className="w-[150px] h-full bg-[#242426] border-r border-white/[0.06] pt-4 pb-6 flex flex-col">
                            <p className="px-5 text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-2">
                                Photos
                            </p>
                            <nav className="flex flex-col gap-0.5 px-2">
                                {NAV_ITEMS.map(({ label, icon }) => (
                                    <button
                                        key={label}
                                        onClick={() => setActive(label)}
                                        className={`flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-[13.5px] font-medium transition-all duration-150 w-full text-left ${active === label
                                            ? "bg-white/10 text-white"
                                            : "text-white/50 hover:text-white/75 hover:bg-white/[0.05]"
                                            }`}
                                    >
                                        <span className={`transition-colors ${active === label ? "text-[#4FC3F7]" : "text-white/35"}`}>
                                            {icon}
                                        </span>
                                        {label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* ── Photo grid ── */}
                    <div className="flex-1 overflow-y-auto bg-[#1c1c1e] p-3" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.12) transparent" }}>
                        <p
                            className={`text-[13px] font-semibold text-white/40 px-1 mb-2 transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                                }`}
                        >
                            June 2026
                        </p>

                        <div
                            className="grid gap-1.5 mb-4"
                            style={{ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "140px 120px" }}
                        >
                            {PHOTOS.map((photo, i) => (
                                <div
                                    key={photo.id}
                                    className={`${photo.span} relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
                                        }`}
                                    style={{ transitionDelay: `${i * 60}ms` }}
                                    onMouseEnter={() => setHoveredPhoto(photo.id)}
                                    onMouseLeave={() => setHoveredPhoto(null)}
                                    onClick={() => setLightbox(photo.id)}
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        className={`w-full h-full object-cover transition-transform duration-500 ease-out ${hoveredPhoto === photo.id ? "scale-105" : "scale-100"
                                            }`}
                                        loading="lazy"
                                    />
                                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-200 ${hoveredPhoto === photo.id ? "opacity-100" : "opacity-0"}`} />
                                    <button
                                        className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${hoveredPhoto === photo.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                                            }`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="white" strokeWidth="1.5">
                                            <path d="M8 13.5S1.5 9.5 1.5 5.5A3.5 3.5 0 0 1 8 3.3 3.5 3.5 0 0 1 14.5 5.5C14.5 9.5 8 13.5 8 13.5z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <p
                            className={`text-[13px] font-semibold text-white/40 px-1 mb-2 transition-all duration-500 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                                }`}
                        >
                            May 2026
                        </p>

                        <div className="grid grid-cols-4 gap-1.5">
                            {SMALL_PHOTOS.map((src, i) => (
                                <div
                                    key={src}
                                    className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
                                        }`}
                                    style={{ height: 76, transitionDelay: `${(i + 5) * 60}ms` }}
                                    onMouseEnter={() => setHoveredPhoto(100 + i)}
                                    onMouseLeave={() => setHoveredPhoto(null)}
                                >
                                    <img
                                        src={src}
                                        alt="photo"
                                        className={`w-full h-full object-cover transition-transform duration-500 ease-out ${hoveredPhoto === 100 + i ? "scale-105" : "scale-100"
                                            }`}
                                        loading="lazy"
                                    />
                                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-200 ${hoveredPhoto === 100 + i ? "opacity-100" : "opacity-0"}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Lightbox ── */}
                {lightbox !== null && (
                    <div
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md rounded-xl"
                        onClick={() => setLightbox(null)}
                        style={{ animation: "fadeIn 0.2s ease" }}
                    >
                        <div
                            className="relative max-w-[80%] max-h-[80%] rounded-xl overflow-hidden shadow-2xl"
                            style={{ animation: "zoomIn 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={PHOTOS.find((p) => p.id === lightbox)?.src}
                                alt="full"
                                className="max-w-full max-h-[75vh] object-contain"
                            />
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all"
                            >
                                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                    <path d="M1 1l14 14M15 1L1 15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}