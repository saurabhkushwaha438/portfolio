import styles from './TerminalWindow.module.css';

export default function TerminalWindow() {
  return (
    <div className={styles.terminal}>
      <div className={styles.titleBar}>
        <div className={styles.buttons}>
          <div className={styles.close}></div>
          <div className={styles.minimize}></div>
          <div className={styles.maximize}></div>
        </div>
        <div className={styles.title}>Tech Stack</div>
      </div>
      <div className={styles.content}>
        <div className={styles.prompt}>
          <span className={styles.user}>@adrian</span> % show tech stack
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
              <td className={styles.category}><span className={styles.check}>✓</span> Frontend</td>
              <td>React.js, Next.js, TypeScript</td>
            </tr>
            <tr>
              <td className={styles.category}><span className={styles.check}>✓</span> Mobile</td>
              <td>React Native, Expo</td>
            </tr>
            <tr>
              <td className={styles.category}><span className={styles.check}>✓</span> Styling</td>
              <td>Tailwind CSS, Sass, CSS</td>
            </tr>
            <tr>
              <td className={styles.category}><span className={styles.check}>✓</span> Backend</td>
              <td>Node.js, Express, NestJS, Hono</td>
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
