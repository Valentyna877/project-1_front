import DashboardMainClient from "@/components/dashboard/DashboardMainClient/DashboardMainClient";
import AuthProvider from "@/components/layout/AuthProvider/AuthProvider";

export default function Page() {
  return (
    <>
      <AuthProvider>
        <DashboardMainClient />
      </AuthProvider>
    </>
  );
}
