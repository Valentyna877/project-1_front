'use client';

import { usePathname } from 'next/navigation';
import css from './NavItem.module.css';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';

interface NavItemProps {
  href: string;
  realHref: string;
  label: string;
  icon: string;
  onClick?: () => void;
}

export function NavItem({
  href,
  realHref,
  label,
  icon,
  onClick,
}: NavItemProps) {
  const pathname = usePathname();
  const { themeClass } = useTheme();
  const isActive = pathname === realHref || pathname.startsWith(realHref + '/');

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${css.nav_item} ${css[themeClass]} ${isActive ? css.nav_item_active : ''}`}
    >
      <svg width="24" height="24">
        <use href={`/sprite.svg#${icon}`} />
      </svg>

      <span className={css.nav_item_label}>{label}</span>
    </Link>
  );
}
