"use client";

import styles from './Dock.module.css';
import Image from 'next/image';

interface DockProps {
  onOpenTerminal?: () => void;
  onOpenGallery?: () => void;
  onOpenContact?: () => void;
  onOpenSafari?: () => void;
}

export default function Dock({ onOpenTerminal, onOpenGallery, onOpenContact, onOpenSafari }: DockProps) {
  const icons = [
    { name: 'Finder', icon: '/images/finder.png' },
    { name: 'Safari', icon: '/images/safari.png' },
    { name: 'Photos', icon: '/images/photos.png' },
    { name: 'Contacts', icon: '/images/contact.png' },
    { name: 'Terminal', icon: '/images/terminal.png' },
    { name: 'Trash', icon: '/images/trash.png' }
  ];

  return (
    <div className={styles.dockContainer}>
      <div className={styles.dock}>
        {icons.map((item) => (
          <div
            key={item.name}
            className={styles.dockItem}
            title={item.name}
            onClick={() => {
              if (item.name === 'Terminal' && onOpenTerminal) onOpenTerminal();
              if (item.name === 'Photos' && onOpenGallery) onOpenGallery();
              if (item.name === 'Contacts' && onOpenContact) onOpenContact();
              if (item.name === 'Safari' && onOpenSafari) onOpenSafari();
            }}
          >
            <Image src={item.icon} alt={item.name} width={40} height={40} className={styles.iconImage} />
          </div>
        ))}
      </div>
    </div>
  );
}
