'use server';

import { cookies } from 'next/headers';

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(key)?.value;
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();

  cookieStore.delete(key);
};
