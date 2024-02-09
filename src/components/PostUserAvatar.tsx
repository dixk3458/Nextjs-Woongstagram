import Avatar from './Avatar';

type Props = {
  userImage: string;
  username: string;
};

export default function PostUserAvatar({ userImage, username }: Props) {
  return (
    <div className="flex items-center">
      <Avatar image={userImage} highlight={true} size="medium" />
      <p className="font-bold ml-2 text-sm">{username}</p>
    </div>
  );
}
