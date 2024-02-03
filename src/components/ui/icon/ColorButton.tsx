type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className="bg-gradient-to-bl from-purple-300 via-indigo-500 to-purple-300 p-[0.15rem] rounded-md">
      <button
        className="bg-blue-100 rounded-md text-base p-[0.3rem] hover:opacity-90 transition-opacity"
        onClick={() => onClick()}
      >
        {text}
      </button>
    </div>
  );
}
