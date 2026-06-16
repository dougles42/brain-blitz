'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/solo', label: 'Solo' },
  { href: '/daily', label: 'Daily' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/multiplayer', label: 'Duel' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-zinc-950/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent"
        >
          Pitch Perfect
        </Link>
        <div className="flex items-center gap-2">
          <ul className="flex gap-1">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400'
                        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
