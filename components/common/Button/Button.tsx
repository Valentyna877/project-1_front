import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import css from './Button.module.css';
import { useTheme, Theme } from '@/hooks/useTheme';

type ButtonVariant = 'normal' | 'cancel' | 'delete' | 'logout';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'submit' | 'button' | 'reset';
  children?: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loadingText?: ReactNode;
  themeOverride?: Theme;
}

function Button({
  variant = 'normal',
  type = 'button',
  size = 'md',
  className,
  children,
  leftIcon,
  loadingText,
  rightIcon,
  isLoading = false,
  disabled,
  themeOverride,
  ...rest
}: ButtonProps) {
  const isDisabled = Boolean(disabled) || isLoading;
  const { themeClass: globalThemeClass } = useTheme();
  const themeClass = themeOverride ? `theme-${themeOverride}` : globalThemeClass;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx(
        css.button,
        css[variant],
        css[size],
        css[themeClass],
        'anim-button',
        isLoading && css.loading,
        className
      )}
      {...rest}
    >
      {isLoading ? <span className={css.spinner} aria-hidden="true" /> : null}

      {!isLoading && leftIcon ? (
        <span className={css.leftIcon} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}

      <span className={css.label}>
        {isLoading && loadingText ? loadingText : children}
      </span>

      {!isLoading && rightIcon ? (
        <span className={css.rightIcon} aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}

export default Button;