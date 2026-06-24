import styles from './MenuBar.module.css';
import Image from 'next/image';

export default function MenuBar() {
  const timeString = new Date().toLocaleTimeString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className={styles.menuBar}>
      <div className={styles.left}>
        <span className={styles.appleLogo}>
          <Image src="/images/logo.svg" alt="Apple" width={19} height={19} />
        </span>
        <span className={styles.brand}><h4>Saurabh's Portfolio</h4></span>
        <span className={styles.menuItem}>Projects</span>
        <span className={styles.menuItem}>Contact</span>
        <span className={styles.menuItem}>Resume</span>
      </div>
      <div className={styles.right}>
        <span className={styles.icon}>
          <Image src="/icons/wifi.svg" alt="Wifi" width={19} height={19} />
        </span>
        <span className={styles.icon}>
          <Image src="/icons/search.svg" alt="Search" width={19} height={19} />
        </span>
        <span className={styles.icon}>
          <Image src="/icons/info.svg" alt="Info" width={19} height={19} />
        </span>
        <span className={styles.time}>{timeString}</span>
      </div>
    </div>
  );
}
