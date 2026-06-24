import styles from './Dock.module.css';
import Image from 'next/image';

export default function Dock() {
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
          <div key={item.name} className={styles.dockItem} title={item.name}>
            <Image src={item.icon} alt={item.name} width={40} height={40} className={styles.iconImage} />
          </div>
        ))}
      </div>
    </div>
  );
}
