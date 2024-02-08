type AvatarSize = 'small' | 'medium' | 'large';

type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        className={`rounded-full bg-white ${getImageSizeStyle(size)}`}
        src={image ?? undefined}
        alt="user profile"
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = 'rounded-full flex items-center justify-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-purple-300 via-indigo-500 to-purple-300'
    : '';
  const sizeStyle = getContainerSizeStyle(size);

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getContainerSizeStyle(size: AvatarSize): string {
  switch (size) {
    case 'small':
      return 'w-10 h-10 ';
    case 'medium':
      return 'w-[44px] h-[44px]';
    case 'large':
      return 'w-[68px] h-[68px]';
  }
}

function getImageSizeStyle(size: AvatarSize): string {
  switch (size) {
    case 'small':
      return 'w-[34px] h-[34px]  p-[0.1rem]';
    case 'medium':
      return 'w-11 h-11 p-[0.1rem]';
    case 'large':
      return 'w-16 h-16 p-[0.2rem]';
  }
}
