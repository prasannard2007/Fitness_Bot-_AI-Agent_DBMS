import Link from 'next/link';

const items = [
  ['Onboarding', '/auth/onboarding'],
  ['Dashboard', '/dashboard'],
  ['Workouts', '/workouts'],
  ['AI Chat', '/chat']
];

export default function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
      {items.map(([label, href]) => (
        <Link key={href} href={href} style={{ color: '#38bdf8' }}>{label}</Link>
      ))}
    </nav>
  );
}
