'use client';

import Lottie from 'lottie-react';
import clsx from 'clsx';

import boyAnimation from '@/public/animations/baby-boy.json';
import girlAnimation from '@/public/animations/baby-girl.json';
import defaultAnimation from '@/public/animations/baby-default.json';

import smallBoyAnimation from '@/public/animations/loader-small-boy.json';
import smallGirlAnimation from '@/public/animations/loader-small-girl.json';
import smallDefaultAnimation from '@/public/animations/loader-small-default.json';

import css from './Loader.module.css';

type LoaderTheme = 'boy' | 'girl' | 'default';
type LoaderVariant = 'global' | 'inline' | 'global-inline';

type LoaderProps = {
  theme?: LoaderTheme;
  variant?: LoaderVariant;
  text?: string;
};

const globalAnimations = {
  boy: boyAnimation,
  girl: girlAnimation,
  default: defaultAnimation,
};

const inlineAnimations = {
  boy: smallBoyAnimation,
  girl: smallGirlAnimation,
  default: smallDefaultAnimation,
};

export default function Loader({
  theme = 'default',
  variant = 'global',
  text = 'Завантаження...',
}: LoaderProps) {
  const animationData =
    variant === 'inline' ? inlineAnimations[theme] : globalAnimations[theme];

  return (
    <div
      className={clsx(
        css.loader,
        variant === 'global' && css.fullScreen,
        variant === 'inline' && css.inline,
        variant === 'global-inline' && css.inline
      )}
    >
      <div className={css.content}>
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className={clsx(
            css.animation,
            variant === 'inline' && css.inlineAnimation
          )}
        />

        {variant === 'global' && text && <p className={css.text}>{text}</p>}
      </div>
    </div>
  );
}
