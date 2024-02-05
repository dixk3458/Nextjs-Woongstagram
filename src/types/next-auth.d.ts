import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
    } & DefaultSession['user'];
  }
  interface AdapterUser {
    user: {
      username: string;
    } & DefaultSession['user'];
  }
}
