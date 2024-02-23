'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateProfileUser(username: string) {
  return revalidateTag(`profile/${username}`);
}
