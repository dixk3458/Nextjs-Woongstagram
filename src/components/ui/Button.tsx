type Props = {
  text: string;
  disabled?: boolean;
  onClick: () => void;
  red?: boolean;
};

export default function Button({
  text,
  disabled = false,
  onClick,
  red,
}: Props) {
  return (
    <button
      onClick={() => onClick()}
      disabled={disabled}
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${
        red ? 'bg-red-500' : 'bg-sky-500'
      } ${disabled && 'opacity-80'}`}
    >
      {text}
    </button>
  );
}
