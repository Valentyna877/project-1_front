export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "../../../api";
import { logErrorResponse } from "../../../_utils/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ weekNumber: string }> },
) {
  try {
    const cookieStore = await cookies();
    const { weekNumber } = await params;
    const res = await api.get(`/weeks/mom/${weekNumber}`, {
      headers: { Cookie: cookieStore.toString() },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
