import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { addUser } from '@/service/user';

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
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      // user가 존재하지 않으면 신규 등록
      // user에는 username이 없어 가공을 하고 전달해줘야한다.

      // email이 없는 user는 계정 만들고싶지 않다.
      if (!email) {
        return false;
      }

      addUser({
        id: id,
        name: name ?? '',
        username: email.split('@')[0],
        email: email,
        image: image,
      });
      return true;
    },
    async session({ session, token }) {
      // 세션이 있다면, user정보를 수정해주자.
      const user = session.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          userid: token.id as string,
        };
      }
      return session;
    },

    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
