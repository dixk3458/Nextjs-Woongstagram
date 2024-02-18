type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

type ImageSizeStyle = {
  container: string;
  image: string;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        className={`rounded-full bg-white ${getImageSizeStyle(size).image}`}
        src={image ?? undefined}
        alt="user profile"
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-purple-300 via-indigo-500 to-purple-300'
    : '';

  const { container } = getImageSizeStyle(size);

  return `${baseStyle} ${highlightStyle} ${container}`;
}

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case 'small':
      return { container: 'w-10 h-10', image: 'w-[34px] h-[34px] p-[0.1rem]' };
    case 'medium':
      return { container: 'w-[40px] h-[40px]', image: 'w-9 h-9 p-[0.1rem]' };
    case 'large':
      return { container: 'w-[68px] h-[68px]', image: 'w-16 h-16 p-[0.2rem]' };
    case 'xlarge':
      return { container: 'w-[142px] h-[142px]', image: 'w-[138px] h-[138px]' };
    default:
      throw new Error(`Unsupported Size type : ${size}`);
  }
}
