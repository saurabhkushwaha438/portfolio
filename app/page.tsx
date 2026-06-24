import Image from "next/image";
import MenuBar from "@/components/MenuBar";
import Dock from "@/components/Dock";
import DesktopIcon from "@/components/DesktopIcon";
import TerminalWindow from "@/components/TerminalWindow";
import styles from "./page.module.css";
import BubbleText from "@/components/BubbleText";

import { Lacquer, Aubrey } from "next/font/google";

const lacquer = Lacquer({
  subsets: ["latin"],
  weight: "400",
});

const aubrey = Aubrey({
  subsets: ["latin"],
  weight: "400",
});
export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        src="/images/wallpaper.jpg"
        alt="macOS Wallpaper"
        fill
        className={styles.wallpaper}
        priority
      />
      <MenuBar />

      <div className={styles.desktopArea}>
        <div className={styles.iconGrid}>
          <DesktopIcon label="Nike Ecommerce Website Application" />
          <DesktopIcon label="AI Resume Analyzer" />
          <DesktopIcon label="Food Delivery App" />
          <DesktopIcon label="Resume.pdf" iconPath="/images/pdf.png" />
        </div>

        <div className={styles.windowArea}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <BubbleText className={aubrey.className} style={{ fontSize: '2rem', margin: 0, color: "white" }}>Hey, I'm Saurabh! welcome to my</BubbleText>
            <BubbleText className={lacquer.className} style={{ fontSize: '7rem', margin: -20, padding: 0 }}>portfolio</BubbleText>
          </div>
        </div>
      </div>

      <Dock />
    </main>
  );
}
