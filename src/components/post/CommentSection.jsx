import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
    getComments,
    addComment,
    deleteComment,
} from "../../services/postService";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import FormField, { inputClass } from "../ui/FormField";
import Spinner from "../ui/Spinner";

const CommentSection = ({ postId, isDraft }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [isCommentFocused, setIsCommentFocused] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    
    useEffect(() => {
        if (!postId || isDraft) return;

        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await getComments(postId);
                setComments(response.data);
            } catch {
                toast.error("Failed to fetch comments. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId, isDraft]);

    
  
    const handleCommentSubmit = async ({ comment }) => {
        if (isDraft) return;

        if (!comment?.trim()) return;

        const trimmedComment = comment.trim();
        setSubmitting(true);

        try {
            await addComment(postId, { comment: trimmedComment });

            const response = await getComments(postId);
            setComments(response.data);

            reset();
            setIsCommentFocused(false);
            toast.success("Comment added successfully");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to add comment. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Delete comment
    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(postId, commentId);
            setComments((prev) =>
                prev.filter((comment) => comment._id !== commentId)
            );
            toast.success("Comment deleted successfully");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to delete comment. Please try again."
            );
        }
    };

    if (isDraft) {
        return (
            <div className="py-8 border-t border-[#e8e6e1]">
                <p className="text-sm text-[#999]">
                    Comments are disabled for draft posts.
                </p>
            </div>
        );
    }

    return (
        <div className="py-8 border-t border-[#e8e6e1]">
            <h3 className="text-lg font-semibold text-[#111] mb-6">
                Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form
                onSubmit={handleSubmit(handleCommentSubmit)}
                className="mb-8 pb-8 border-b border-[#e8e6e1]"
            >
                <FormField label="Add a comment">
                    <textarea
                        id="comment"
                        placeholder="Share your thoughts..."
                        rows={isCommentFocused ? 4 : 2}
                        className={`${inputClass} resize-none`}
                        onFocus={() => setIsCommentFocused(true)}
                        {...register("comment")}
                    />
                </FormField>
                {isCommentFocused && (
                    <div className="flex gap-2 mt-3">
                        <Button type="submit" loading={submitting} size="sm">
                            Post Comment
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                reset();
                                setIsCommentFocused(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </form>

            {/* Comments List */}
            {loading ? (
                <div className="flex justify-center py-4">
                    <Spinner />
                </div>
            ) : comments.length === 0 ? (
                <p className="text-sm text-[#999]">
                    No comments yet. Be the first!
                </p>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="flex gap-3 pb-4 border-b border-[#e8e6e1] last:border-b-0"
                        >
                            <Avatar user={comment.user} size="sm" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-[#111]">
                                    {comment.user?.fullName ||
                                        comment.user?.username}
                                </p>
                                <p className="text-xs text-[#999] mb-2">
                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-[#333] break-words">
                                    {comment.content}
                                </p>
                                {comment.isOwner && (
                                    <button
                                        onClick={() =>
                                            handleDeleteComment(comment._id)
                                        }
                                        className="text-xs text-red-500 hover:text-red-600 mt-2 flex items-center gap-1 cursor-pointer"
                                    >
                                        <Trash2 size={12} /> Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentSection;
