import dynamic from 'next/dynamic';

type Props = {
  color?: string;
};

// Nextjs는 클라이언트 컴포넌트더라도 최대한 미리 만들 수 있는것은
// 서버상에서 준비를해준다.
// 그럴때 서버상에서 렌더링한 UI와 하이드레이션 이후 클라이언트 상의 UI가 달라 발생하는 에러를
// 해결하기위해 동적으로 import 하는것이다.

const BounceLoader = dynamic(
  () => import('react-spinners').then(lib => lib.BounceLoader),
  {
    ssr: false,
  }
);

export default function BounceSpinner({ color }: Props) {
  return <BounceLoader color={color} />;
}
