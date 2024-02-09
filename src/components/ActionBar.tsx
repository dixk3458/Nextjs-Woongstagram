import parseDate from '@/util/time';
import BookmarkIconn from './ui/icon/BookmarkIcon';
import HeartIcon from './ui/icon/HeartIcon';

type Props = {
  likes: string[];
  username: string;
  text?: string;
  createdAt: string;
};

export default function ActionBar({ likes, username, text, createdAt }: Props) {
  return (
    <>
      <div className="flex justify-between items-center px-4 py-2">
        <HeartIcon />
        <BookmarkIconn />
      </div>
      <div className="px-4">
        <p className="font-bold text-sm">{`${likes?.length ?? 0}${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p className="mt-1">
            <span className="text-sm font-bold mr-2">{username}</span>
            {text}
          </p>
        )}
        <p className="my-1 mb-2 text-neutral-500 text-xs uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
