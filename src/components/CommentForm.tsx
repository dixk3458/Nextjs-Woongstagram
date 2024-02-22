import { FormEvent, useState } from 'react';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length < 1;

  const handleSubmit = (e: FormEvent) => {
    // handleSubmit이 호출되면 업데이트를 처리해야한다.
    // 하지만 CommentForm내부적으로 필요한 정보가 없다.(postid)
    // 따라서 처리할수있는 함수를 외부에서 받아오자.
    e.preventDefault();
    onPostComment(comment);
  };
  return (
    <form
      onSubmit={e => handleSubmit(e)}
      className="flex items-center p-4 border-t"
    >
      <input
        className="w-full outline-none border-none "
        type="text"
        placeholder="Add a comment..."
        required
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ${
          buttonDisabled ? 'text-indigo-300' : 'text-indigo-600'
        }`}
      >
        Post
      </button>
    </form>
  );
}
