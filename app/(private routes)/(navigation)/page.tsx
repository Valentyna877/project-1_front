import DashboardMainClient from "@/components/dashboard/DashboardMainClient/DashboardMainClient";
import AuthProvider from "@/components/layout/AuthProvider/AuthProvider";
import "@/styles/container.css";

export default function Page() {
  return (
    <div className="container">
      <AuthProvider>
        <DashboardMainClient />
      </AuthProvider>
    </div>
  );
}
