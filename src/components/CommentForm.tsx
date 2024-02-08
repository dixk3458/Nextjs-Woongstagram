export default function CommentForm() {
  return (
    <form className="flex items-center p-4 border-t">
      <input
        className="w-full outline-none border-none "
        type="text"
        placeholder="Add a comment..."
      />
      <button className="font-bold text-indigo-600">Post</button>
    </form>
  );
}
