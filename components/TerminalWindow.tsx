"use client";
import { useState } from 'react';

import styles from './TerminalWindow.module.css';

interface TerminalWindowProps {
  onClose?: () => void;
}

export default function TerminalWindow({ onClose }: TerminalWindowProps) {
  const [dotsHovered, setDotsHovered] = useState(false);

  return (
    <div className={styles.terminal}>
      <div 
        className={`window-handle cursor-grab active:cursor-grabbing ${styles.titleBar}`}
        onMouseEnter={() => setDotsHovered(true)}
        onMouseLeave={() => setDotsHovered(false)}
      >
        <div className="flex gap-[7px] absolute left-3">
            <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center transition-all hover:brightness-110 active:brightness-75"
                title="Close"
                style={{ border: 'none', cursor: 'pointer' }}
            >
                {dotsHovered && (
                    <svg viewBox="0 0 6 6" fill="none" className="w-[7px] h-[7px]">
                        <path d="M1 1l4 4M5 1L1 5" stroke="#7a1f1f" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                )}
            </button>
            <button className="w-3 h-3 rounded-full bg-[#FEBC2E]" title="Minimize" style={{ border: 'none' }} />
            <button className="w-3 h-3 rounded-full bg-[#28C840]" title="Maximize" style={{ border: 'none' }} />
        </div>
        <div className={styles.title}>Tech Stack</div>
      </div>
      <div className={styles.content}>
        <div className={styles.prompt}>
          <span className={styles.user}>@Saurabh</span> % show tech stack
        </div>

        <table className={styles.techTable}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Technologies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.category}><span className={styles.check}>✓</span> Language</td>
              <td>Java, Javascript, Typescript</td>
            </tr>
            <tr>
              <td className={styles.category}><span className={styles.check}>✓</span> Frontend</td>
              <td>React.js, Next.js</td>
            </tr>
            <tr>
              <td className={styles.category}><span className={styles.check}>✓</span> Styling</td>
              <td>Tailwind CSS, Bootstrap, CSS</td>
            </tr>
            <tr>
              <td className={styles.category}><span className={styles.check}>✓</span> Backend</td>
              <td>Node.js, Express</td>
            </tr>
            <tr>
              <td className={styles.category}><span className={styles.check}>✓</span> Database</td>
              <td>MongoDB, PostgreSQL</td>
            </tr>
            <tr>
              <td className={styles.category}><span className={styles.check}>✓</span> Dev Tools</td>
              <td>Git, GitHub, Docker</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.status}>
          <div className={styles.success}>✓ 5 of 5 stacks loaded successfully (100%)</div>
          <div className={styles.renderTime}>⚑ Render time: 6ms</div>
        </div>
      </div>
    </div>
  );
}
