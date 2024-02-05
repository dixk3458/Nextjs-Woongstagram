type Props = {
  image?: string | null;
};

export default function Avatar({ image }: Props) {
  return (
    <div className="bg-gradient-to-bl from-purple-300 via-indigo-500 to-purple-300 rounded-full p-[0.1rem] w-10 h-10">
      <img
        className="rounded-full p-[0.1rem] bg-white"
        src={image ?? undefined}
        alt="user profile"
      />
    </div>
  );
}
