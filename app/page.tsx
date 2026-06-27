"use client";

import { useState } from "react";
import Image from "next/image";
import MenuBar from "@/components/MenuBar";
import Dock from "@/components/Dock";
import DesktopIcon from "@/components/DesktopIcon";
import TerminalWindow from "@/components/TerminalWindow";
import styles from "./page.module.css";
import BubbleText from "@/components/BubbleText";
import ContactCard from "@/components/Contactcard";
import Gallery from '@/components/Gallery';
import SafariWindow from '@/components/SafariWindow';
import { Lacquer, Aubrey } from "next/font/google";
import Portfolio from "@/components/Portfolio";
import { useRouter } from "next/navigation";

const lacquer = Lacquer({
  subsets: ["latin"],
  weight: "400",
});

const aubrey = Aubrey({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const router = useRouter();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSafariOpen, setIsSafariOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  return (
    <main className={styles.main}>
      <style>{`
        @keyframes windowFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .window-animate {
          animation: windowFadeIn 0.25s cubic-bezier(0.34, 1.3, 0.64, 1) forwards;
        }
      `}</style>

      <Image
        src="/images/wallpaper.png"
        alt="macOS Wallpaper"
        fill
        className={styles.wallpaper}
        priority
        onClick={() => setIsPortfolioOpen(true)}
      />
      <MenuBar />

      <div className={styles.desktopArea}>
        <div className={styles.iconGrid}>
          <DesktopIcon label="AnyDrop" onClick={() => { window.open("https://anydrop-chi.vercel.app/", "_blank") }} />
          <DesktopIcon label="CoinInsight Dashboard" onClick={() => { window.open("https://coininsight.vercel.app/", "_blank") }} />
          <DesktopIcon label="Food Delivery App" onClick={() => { window.open("https://saurabhkushwaha438.github.io/Frog-Soar-Sky-Safari/", "_blank") }} />
          <DesktopIcon label="Resume.pdf" iconPath="/images/pdf.png" onClick={() => { window.open("/files/resume.pdf", "_blank") }} />
        </div>

        <div className={styles.windowArea} style={{ position: 'relative' }}>
          {/* Welcome Text in background - slightly dims when a window is focused/open */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            opacity: (isTerminalOpen || isGalleryOpen || isContactOpen || isSafariOpen || isPortfolioOpen) ? 0.25 : 1,
            transform: (isTerminalOpen || isGalleryOpen || isContactOpen || isSafariOpen || isPortfolioOpen) ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <BubbleText className={aubrey.className} style={{ fontSize: '2rem', margin: 0 }}>Hey, I'm Saurabh! welcome to my</BubbleText>
            <BubbleText className={lacquer.className} style={{ fontSize: '7rem', margin: -20, padding: 0 }}>portfolio</BubbleText>
          </div>

          {/* Floating Terminal Window */}
          {isTerminalOpen && (
            <div className="window-animate" style={{ position: 'absolute', zIndex: 50 }}>
              <TerminalWindow onClose={() => setIsTerminalOpen(false)} />
            </div>
          )}

          {/* Floating Gallery Window */}
          {isGalleryOpen && (
            <div className="window-animate" style={{ position: 'absolute', zIndex: 40 }}>
              <Gallery onClose={() => setIsGalleryOpen(false)} />
            </div>
          )}

          {/* Floating Contact Window */}
          {isContactOpen && (
            <div className="window-animate" style={{ position: 'absolute', zIndex: 45 }}>
              <ContactCard onClose={() => setIsContactOpen(false)} />
            </div>
          )}

          {/* Floating Safari Window */}
          {isSafariOpen && (
            <div className="window-animate" style={{ position: 'absolute', zIndex: 35 }}>
              <SafariWindow onClose={() => setIsSafariOpen(false)} />
            </div>
          )}

          {/* Floating Portfolio Window */}
          {isPortfolioOpen && (
            <div className="window-animate" style={{ position: 'absolute', zIndex: 60, width: '100%' }}>
              <Portfolio onClose={() => setIsPortfolioOpen(false)} />
            </div>
          )}
        </div>
      </div>

      <Dock
        onOpenFinder={() => setIsPortfolioOpen((prev) => !prev)}
        onOpenTerminal={() => setIsTerminalOpen((prev) => !prev)}
        onOpenGallery={() => setIsGalleryOpen((prev) => !prev)}
        onOpenContact={() => setIsContactOpen((prev) => !prev)}
        onOpenSafari={() => setIsSafariOpen((prev) => !prev)}
        isFinderOpen={isPortfolioOpen}
        isTerminalOpen={isTerminalOpen}
        isGalleryOpen={isGalleryOpen}
        isContactOpen={isContactOpen}
        isSafariOpen={isSafariOpen}
      />
    </main>
  );
}
