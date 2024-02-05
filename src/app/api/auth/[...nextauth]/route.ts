import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    // providers 배열에 객체형태로 지원하는 Provider를 넣어주자.
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID ?? '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
