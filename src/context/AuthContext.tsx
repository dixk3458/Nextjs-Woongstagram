'use client';

import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) {
  // layout 파일에서 직접적으로 SessionProvider를 이용할수있겠지만,
  // 한단계 더 추상화를 해 변경사항이 생겼을때 AuthContext 파일에서만 수정할수있도록 해주었다.
  // 그리고 외부 라이브러리이기때문에 감싸주었다.
  // layout파일에서 AuthContext로 감싸주기만 하면 내부의 ReactNode들이 결국 SessionProvider로 감싸지는것으로
  // 애플리케이션 전반적으로 로그인 사용자의 상태를 가진다.
  return <SessionProvider>{children}</SessionProvider>;
}
