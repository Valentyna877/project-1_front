import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "@/app/api/api";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const TOTAL_WEEKS = 40;

export default async function JourneyPage() {
  try {
    const cookieStore = await cookies();
    const res = await api.get("/users/me", {
      headers: { Cookie: cookieStore.toString() },
    });

    const dueDate = new Date(res.data.date).getTime();
    const today = Date.now();
    const weeksRemaining = Math.ceil((dueDate - today) / ONE_WEEK_MS);
    const currentWeek = Math.max(
      1,
      Math.min(TOTAL_WEEKS, TOTAL_WEEKS - weeksRemaining),
    );

    redirect(`/journey/${currentWeek}`);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      redirect("/auth/login");
    }
    throw error;
  }
}
