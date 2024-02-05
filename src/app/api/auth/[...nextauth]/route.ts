import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth/next';

const handler = NextAuth({
  providers: [
    // providers 배열에 객체형태로 지원하는 Provider를 넣어주자.
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID ?? '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET ?? '',
    }),
  ],
});

export { handler as GET, handler as POST };
