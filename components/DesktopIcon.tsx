"use client";

import Image from 'next/image';
import styles from './DesktopIcon.module.css';

interface DesktopIconProps {
  label: string;
  iconPath?: string;
  onClick?: () => void;
}

export default function DesktopIcon({ label, iconPath = '/images/folder.png', onClick }: DesktopIconProps) {
  return (
    <div className={styles.iconContainer} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <Image src={iconPath} alt={label} width={70} height={70} className={styles.iconImage} />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
