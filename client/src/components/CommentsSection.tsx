import { SignInButton, useAuth } from "@clerk/react";
import { useState } from "react";
import { useCreateComment, useDeleteComment } from "../hooks/useComments";
import { LogInIcon, MessageSquareIcon, SendIcon, TrashIcon } from "lucide-react";
import type {Comment} from "../types/product.types"



const CommentsSection = ({ productId, comments = [], currentUserId }:{productId: string, comments:Comment[], currentUserId: string}) => {
  const { isSignedIn } = useAuth();
  const [content, setContent] = useState("");
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment(productId);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment.mutate(
      { productId, content },
      {
        onSuccess: () => setContent(""),
      },
    );
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquareIcon className="size-5 text-primary" />
        <h3 className="font-bold">Comments</h3>
        <span className="badge badge-neutral badge-sm">{comments.length}</span>
      </div>
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="input input-bordered input-sm flex-1 bg-base-200"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createComment.isPending}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm btn-square"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-base-200 rounded-lg p-3">
          <span className="text-sm text-base-content/60">
            Sign in to join the discussion
          </span>
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-sm gap-1">
              <LogInIcon className="size-4" />
              Sign In
            </button>
          </SignInButton>
        </div>
      )}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">
            <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No comments yet. Be first!</p>
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-6 rounded-full ring-1 ring-primary">
                  <img src={c.user?.imageUrl} alt={c.user?.name || ""} />
                </div>
              </div>
              <div className="chat-header text-xs opacity-70 mb-2">
                {c.user?.name}
                <time className="ml-2 text-xs opacity-50">
                  {new Date(c.createdAt).toLocaleString()}
                </time>
              </div>

              <div className="chat-bubble chat-bubble-neutral text-sm">
                {c.content}
              </div>
              {c.userId === currentUserId && (
                <div className="chat-footer">
                  <button 
                  onClick={() => confirm("Are you sure?") && deleteComment.mutate({commentId:c.id})}
                  className="btn btn-ghost btn-xs text-error"
                  disabled={deleteComment.isPending}
                  >
                    {deleteComment.isPending ? (
                        <span className="loading loading-spinner loading-xs" />
                    ):(
                        <TrashIcon className="size-3" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
