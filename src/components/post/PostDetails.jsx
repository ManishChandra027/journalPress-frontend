import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Heart, Eye, Timer } from "lucide-react";
import { PostContext } from "../../context/PostContext";
import { toast } from "sonner";
import {
    getPostBySlug,
    softDeletePost,
    toggleLikePost,
    checkPostLiked,
    updatePostStatus,
} from "../../services/postService";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import PostMeta from "./PostMeta";
import CommentSection from "./CommentSection";
import FormattedDate from "../ui/FormattedDate";

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const { userData } = useContext(PostContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [isPublishing, setIsPublishing] = useState(false);

    const isAuthor = post?.author?._id === userData?._id;
    const isDraft = post?.status === "draft";

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                if (!slug) {
                    navigate("/");
                    return;
                }

                const res = await getPostBySlug(slug);
                setPost(res.data);
                setLikesCount(res.data.likesCount);
            } catch (requestError) {
                setError(
                    requestError.message ||
                        "Failed to load post details. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug, navigate]);

    // Check if user has liked this post
    useEffect(() => {
        if (!post?._id || isDraft) return;

        const checkLike = async () => {
            try {
                const res = await checkPostLiked(post._id);
                setIsLiked(res.data.isLiked);
            } catch {
                toast.error("Failed to fetch like status. Please try again.");
            }
        };

        checkLike();
    }, [post?._id, isDraft]);

    const handleLike = async (postId) => {
        if (isDraft) return;

        const previousLiked = isLiked;
        setIsLiked(!previousLiked);
        setLikesCount((prev) => (previousLiked ? prev - 1 : prev + 1));
        if (!previousLiked) {
            toast.success("Post liked");
        }

        try {
            await toggleLikePost(postId);
        } catch {
            setIsLiked(previousLiked);
            setLikesCount((prev) => (previousLiked ? prev + 1 : prev - 1));
            toast.error("Failed to update like status. Please try again.");
        }
    };

    const handleDeletePost = async () => {
        try {
            await softDeletePost(post._id);
            navigate("/");
        } catch (err) {
            setError(err?.message || "Failed to delete post.");
        }
    };

    const handlePublish = async () => {
        setIsPublishing(true);
        try {
            await updatePostStatus({ status: "published" }, post._id);
            setPost((prev) => ({ ...prev, status: "published" }));
            toast.success("Post published successfully!");
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                    "Failed to publish post. Please try again."
            );
        } finally {
            setIsPublishing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!loading && error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-red-500 text-center">{error}</p>
                <Button onClick={() => navigate("/")} size="sm">
                    Back to Home
                </Button>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-red-500">Post not found</p>
                <Button onClick={() => navigate("/")} size="sm">
                    Back to Home
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-4 sm:px-0">
            {/* Back Button */}
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm text-[#999] hover:text-[#111] transition-colors mb-8 cursor-pointer bg-transparent border-none"
            >
                ← Back to Home
            </button>

            {/* Post Meta (Title, Author, Actions) */}
            <PostMeta
                post={post}
                isAuthor={isAuthor}
                isDraft={isDraft}
                isLiked={isLiked}
                likesCount={likesCount}
                onEdit={() => navigate(`/edit-post/${post.slug}`)}
                onDelete={handleDeletePost}
                onPublish={handlePublish}
                isPublishing={isPublishing}
            />

            {/* Cover Image */}
            {post?.coverImage?.url && (
                <div className="w-full h-72 rounded-2xl overflow-hidden mb-8 bg-[#f0ede8]">
                    <img
                        className="w-full h-full object-cover"
                        src={post.coverImage.url}
                        alt={post.title}
                    />
                </div>
            )}

            {/* Post Content */}
            {post?.content && (
                <div className="prose max-w-none text-[#666] leading-loose mb-8">
                    {parse(post.content)}
                </div>
            )}

            {/* Post Meta Info (Dates, Views, etc) */}
            <div className="flex flex-wrap justify-between items-center gap-4 py-6 border-t border-b border-[#e8e6e1]">
                <div className="flex gap-4 text-xs text-[#999]">
                    <FormattedDate
                        date={post?.publishedAt}
                        label="Published:"
                    />
                    <FormattedDate
                        date={post?.updatedAt}
                        label="Updated:"
                    />
                   
                </div>

                {/* Like, Views, Reading Time */}
                {!isDraft && (
                    <div className="flex gap-6 text-xs text-[#777]">
                        <button
                            onClick={() => handleLike(post._id)}
                            className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors bg-transparent border-none"
                        >
                            <Heart
                                size={18}
                                strokeWidth={2.5}
                                className={`transition-all ${
                                    isLiked
                                        ? "fill-red-500 text-red-500"
                                        : "text-gray-500"
                                }`}
                            />
                            {likesCount}
                        </button>
                        <div className="flex items-center gap-1">
                            <Eye size={18} strokeWidth={2.5} />
                            {post.views || 0}
                        </div>
                        {post.readingTime && (
                            <div className="flex items-center gap-1">
                                <Timer size={18} strokeWidth={2.5} />
                                {post.readingTime} min
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Comments Section */}
            <CommentSection postId={post._id} isDraft={isDraft} />
        </div>
    );
};

export default PostDetails;
