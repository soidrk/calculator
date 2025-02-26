// components/Layout.js
import Link from 'next/link';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mega Calculator</h1>
        <nav>
          <ul className={styles.navList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/conversions">Conversions</Link></li>
            <li><Link href="/calculus">Calculus</Link></li>
            <li><Link href="/financial">Financial</Link></li>
            <li><Link href="/statistics">Statistics</Link></li>
            <li><Link href="/trigonometry">Trigonometry</Link></li>
            <li><Link href="/geometry">Geometry</Link></li>
            <li><Link href="/algebra">Algebra</Link></li>
            <li><Link href="/arithmetic">Arithmetic</Link></li>
            <li><Link href="/matrices">Matrices</Link></li>
            <li><Link href="/graphing">Graphing</Link></li>
            <li><Link href="/recommendations">Recommendations</Link></li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Mega Calculator</p>
      </footer>
    </div>
  );
};

export default Layout;
