import css from './layout.module.css';

interface PrivateRoutesLayoutProps {
  children: React.ReactNode;
}

export default function PrivateRoutesLayout({
  children,
}: PrivateRoutesLayoutProps) {
  return (
    <>
      <div className={css.wrapper}>{children}</div>
    </>
  );
}
