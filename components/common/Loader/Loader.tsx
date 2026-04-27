'use client';

import Lottie from 'lottie-react';
import clsx from 'clsx';

import boyAnimation from '@/public/animations/baby-boy.json';
import girlAnimation from '@/public/animations/baby-girl.json';
import defaultAnimation from '@/public/animations/baby-default.json';
import smallAnimation from '@/public/animations/loader-small.json';

import css from './Loader.module.css';

type LoaderTheme = 'boy' | 'girl' | 'default';
type LoaderVariant = 'global' | 'inline';

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

export default function Loader({
  theme = 'default',
  variant = 'global',
  text = 'Завантаження...',
}: LoaderProps) {
  const animationData =
    variant === 'inline' ? smallAnimation : globalAnimations[theme];

  return (
    <div
      className={clsx(
        css.loader,
        variant === 'global' && css.fullScreen,
        variant === 'inline' && css.inline
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