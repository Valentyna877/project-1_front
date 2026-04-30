'use server';

import { cookies } from 'next/headers';

export async function deleteCookies() {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('sessionId');
}
