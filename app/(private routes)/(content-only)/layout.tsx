interface ContentOnlyLayoutProps {
  children: React.ReactNode;
}

export default function ContentOnlyLayout({
  children,
}: ContentOnlyLayoutProps) {
  return <>{children}</>;
}
