import { IoIosHeartEmpty } from 'react-icons/io';

export default function HeartIcon({ className }: { className?: string }) {
  return <IoIosHeartEmpty className={className || 'w-6 h-6'} />;
}
