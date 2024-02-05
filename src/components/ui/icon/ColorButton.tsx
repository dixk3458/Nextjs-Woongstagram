type Props = {
  text: string;
  onClick: () => void;
  size?: 'small' | 'big';
};

export default function ColorButton({ text, onClick, size = 'small' }: Props) {
  return (
    <div
      className={`bg-gradient-to-bl from-purple-300 via-indigo-500 to-purple-300 rounded-md
      ${size === 'big' ? 'p-[0.3rem]' : 'p-[0.15rem]'}`}
    >
      <button
        className={`bg-blue-100 rounded-md hover:opacity-90 transition-opacity
        ${size === 'big' ? 'text-2xl p-4' : 'text-base p-[0.3rem]'}`}
        onClick={() => onClick()}
      >
        {text}
      </button>
    </div>
  );
}
