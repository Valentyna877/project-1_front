import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "@/app/api/api";
import { WeekInfo } from "@/types/weeks";

export default async function JourneyPage() {
  try {
    const cookieStore = await cookies();
    const res = await api.get<WeekInfo>("/weeks", {
      headers: { Cookie: cookieStore.toString() },
    });
    redirect(`/journey/${res.data.weeks}`);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      redirect("/auth/login");
    }
    throw error;
  }
}
