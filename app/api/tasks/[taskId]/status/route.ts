import { logErrorResponse } from "@/app/api/_utils/utils";
import { api } from "@/app/api/api";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ taskId: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { taskId } = await params;
    const body = await request.json();

    const res = await api.patch(`/tasks/${taskId}/status`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
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
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}