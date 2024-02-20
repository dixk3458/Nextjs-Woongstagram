import { IoIosHeart } from 'react-icons/io';

type Props = {
  className?: string;
};

export default function HeartFillIcon({ className }: Props) {
  return <IoIosHeart className={'w-6 h-6 fill-red-500' || className} />;
}
