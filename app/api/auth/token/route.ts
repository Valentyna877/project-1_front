import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('auth/check-token', body);

    if (apiRes === undefined) throw new Error('server is dead');

    if (apiRes.status === 200) {
      return NextResponse.json(apiRes.data, { status: apiRes.status });
    } else {
      return NextResponse.json({ error: 'smth went wrong' }, { status: 401 });
    }
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      const statusCode = error.status || 500;
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: statusCode }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
