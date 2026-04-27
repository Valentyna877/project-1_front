export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../api";
import { cookies } from "next/headers";
import { logErrorResponse } from "../../../_utils/utils";
import { isAxiosError } from "axios";

export async function PATCH(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        const refreshToken = cookieStore.get('refreshToken')?.value;
        const sessionId = cookieStore.get('sessionId')?.value;
        const formData = await req.formData();

        const res = await api.patch("/users/me/avatar", formData, {
            headers: {
                Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`,
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
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}