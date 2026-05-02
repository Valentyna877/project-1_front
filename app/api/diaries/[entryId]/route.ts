import { cookies } from "next/headers";
import { api } from "../../api";
import { logErrorResponse } from "../../_utils/utils";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ entryId: string }>;
};

export async function DELETE(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { entryId } = await params;

    const res = await api.delete(`/diaries/${entryId}`, {
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
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { entryId } = await params;
    const body = await request.json();

    const res = await api.patch(`/diaries/${entryId}`, body, {
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
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



