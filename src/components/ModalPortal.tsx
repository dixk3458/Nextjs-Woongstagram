import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

// 자식을 layout에서 정의한 portal div에 보여주는것이다.
export default function ModalPortal({ children }: Props) {
  if (typeof window === undefined) {
    return null;
  }

  const node = document.getElementById('portal') as HTMLElement;

  return createPortal(children, node);
}
