import css from "./layout.module.css";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";

interface PrivateRoutesLayoutProps {
  children: React.ReactNode;
}

export default function PrivateRoutesLayout({
  children,
}: PrivateRoutesLayoutProps) {
  return (
    <>
      {/* mobile */}
      <div className={css.mobile_only}>
        <Header />
      </div>

      {/* desktop */}
      <div className={css.layout}>
        <Sidebar />

        <main className={css.main}>
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </>
  );
}
