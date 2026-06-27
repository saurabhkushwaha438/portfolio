"use client";

import styles from './Dock.module.css';
import Image from 'next/image';

interface DockProps {
  onOpenFinder?: () => void;
  onOpenTerminal?: () => void;
  onOpenGallery?: () => void;
  onOpenContact?: () => void;
  onOpenSafari?: () => void;
  isFinderOpen?: boolean;
  isTerminalOpen?: boolean;
  isGalleryOpen?: boolean;
  isContactOpen?: boolean;
  isSafariOpen?: boolean;
}

export default function Dock({
  onOpenFinder, onOpenTerminal, onOpenGallery, onOpenContact, onOpenSafari,
  isFinderOpen, isTerminalOpen, isGalleryOpen, isContactOpen, isSafariOpen
}: DockProps) {
  const icons = [
    { name: 'Finder', icon: '/images/finder.png', isOpen: isFinderOpen },
    { name: 'Safari', icon: '/images/safari.png', isOpen: isSafariOpen },
    { name: 'Photos', icon: '/images/photos.png', isOpen: isGalleryOpen },
    { name: 'Contacts', icon: '/images/contact.png', isOpen: isContactOpen },
    { name: 'Terminal', icon: '/images/terminal.png', isOpen: isTerminalOpen },
    { name: 'Trash', icon: '/images/trash.png', isOpen: false }
  ];

  return (
    <div className={styles.dockContainer}>
      <div className={styles.dock}>
        {icons.map((item) => (
          <div key={item.name} className="relative flex flex-col items-center h-full">
            <div
              className={styles.dockItem}
              title={item.name}
              onClick={() => {
                if (item.name === 'Finder' && onOpenFinder) onOpenFinder();
                if (item.name === 'Terminal' && onOpenTerminal) onOpenTerminal();
                if (item.name === 'Photos' && onOpenGallery) onOpenGallery();
                if (item.name === 'Contacts' && onOpenContact) onOpenContact();
                if (item.name === 'Safari' && onOpenSafari) onOpenSafari();
              }}
            >
              <Image src={item.icon} alt={item.name} width={40} height={40} className={styles.iconImage} />
            </div>
            {/* Active indicator dot */}
            {item.isOpen && (
              <div className="absolute -bottom-[2px] w-1 h-1 rounded-full bg-white/70" style={{ boxShadow: "0 0 3px rgba(0,0,0,0.5)" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
