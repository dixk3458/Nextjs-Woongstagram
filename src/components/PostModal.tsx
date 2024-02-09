import CloseIcon from './ui/icon/CloseIcon';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="bg-neutral-900/70 flex justify-center items-center fixed top-0 left-0 w-full h-full z-50"
      onClick={event => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        onClick={() => onClose()}
        className="fixed top-0 right-0 p-8 text-white"
      >
        <CloseIcon />
      </button>
      {children}
    </section>
  );
}
