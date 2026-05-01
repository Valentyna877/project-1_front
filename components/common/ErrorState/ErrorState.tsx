'use client';

import Button from '@/components/common/Button/Button';
import css from './ErrorState.module.css';

type Props = {
  title?: string;
  description?: string;
  reset: () => void;
};

function ErrorState({
  title = 'Щось пішло не так',
  description = 'Не хвилюйся, ми вже розбираємось. Спробуй може повторити дію.',
  reset,
}: Props) {
  return (
    <section>
      <div className={css.card}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.desc}>{description}</p>

        <div className={css.actions}>
          <Button onClick={reset}>Спробувати знову</Button>
        </div>
      </div>
    </section>
  );
}

export default ErrorState;