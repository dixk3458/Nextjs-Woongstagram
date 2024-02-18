import Signin from '@/components/Signin';
import { authOptions } from '@/util/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signup or Login to Woongstagram',
};

export default async function SignInPage({
  searchParams: { callbackUrl },
}: Props) {
  // 기본적으로 Server 컴포넌트이기때문에 서버측에서 사용자 유무를 확인한 후에 providers를 받아
  // client 컴포넌트에 provider는 이용해 렌더하라고 전달

  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};
  return (
    <section className="flex justify-center items-center">
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
