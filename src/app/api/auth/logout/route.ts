import { NextResponse } from 'next/server';
import { TOKEN_TYPE } from 'src/shared/api/consts';

export const POST = async () => {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(TOKEN_TYPE.ACCESS);
  response.cookies.delete(TOKEN_TYPE.REFRESH);

  return response;
};
