import { COOKIE_KEYS } from '@shared/consts/storage';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(COOKIE_KEYS.ACCESS);
  response.cookies.delete(COOKIE_KEYS.REFRESH);

  return response;
};
