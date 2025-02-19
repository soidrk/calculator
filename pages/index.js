import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>Welcome to the Mega Calculator Site!</h2>
      <p>Select a topic from the navigation menu above or choose one below:</p>
      <ul>
        <li><Link href="/conversions">Conversions</Link></li>
        <li><Link href="/calculus">Calculus</Link></li>
        <li><Link href="/financial">Financial</Link></li>
        <li><Link href="/statistics">Statistics</Link></li>
        <li><Link href="/trigonometry">Trigonometry</Link></li>
        <li><Link href="/geometry">Geometry</Link></li>
        <li><Link href="/algebra">Algebra</Link></li>
        <li><Link href="/arithmetic">Arithmetic</Link></li>
      </ul>
    </div>
  );
}
