'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import css from '../Button/Button.module.css';

type ButtonVariant = 'normal' | 'cancel' | 'delete' | 'logout';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children'
> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

function ButtonLink({
  href,
  variant = 'normal',
  size = 'md',
  className,
  children,
  leftIcon,
  rightIcon,
  onClick,
  ...rest
}: ButtonLinkProps) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
  };

  return (
    <Link
      href={href}
      className={clsx(
        css.button,
        css[variant],
        css[size],
        'anim-button',
        className
      )}
      onClick={handleClick}
      {...rest}
    >
      {leftIcon ? (
        <span className={css.leftIcon} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}

      <span className={css.label}>{children}</span>

      {rightIcon ? (
        <span className={css.rightIcon} aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </Link>
  );
}

export default ButtonLink;