type Props = {
  image?: string | null;
  size?: 'small' | 'normal';
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'normal',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        className={`rounded-full  bg-white ${getImageSizeStyle(size)}`}
        src={image ?? undefined}
        alt="user profile"
      />
    </div>
  );
}

function getContainerStyle(size: string, highlight: boolean): string {
  //   p-[0.1rem]
  const baseStyle = 'rounded-full flex items-center justify-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-purple-300 via-indigo-500 to-purple-300'
    : '';
  const sizeStyle = size === 'small' ? 'w-10 h-10' : 'w-[68px] h-[68px]';

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: string): string {
  return size === 'small'
    ? 'w-[34px] h-[34px]  p-[0.1rem]'
    : 'w-16 h-16 p-[0.2rem]';
}
