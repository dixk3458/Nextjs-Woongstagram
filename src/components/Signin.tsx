'use client';

import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import ColorButton from './ui/icon/ColorButton';

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | {};
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  // 서버측으로부터 받은 providers를 매핑하면서 버튼 형태로 보여줄것
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={id}
          text={`Sign in with ${name}`}
          onClick={() =>
            signIn(id, { callbackUrl: callbackUrl }, { prompt: 'login' })
          }
          size="big"
        />
      ))}
    </>
  );
}
