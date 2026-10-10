import { useNavigate } from "react-router-dom";
import { Heart, Eye, Timer } from "lucide-react";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

const PostMeta = ({
    post,
    isAuthor,
    isDraft,
    isLiked,
    likesCount,
    onEdit,
    onDelete,
    onPublish,
    isPublishing,
}) => {
    const navigate = useNavigate();

    return (
        <div className="mb-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-[#333333] leading-snug mb-5">
                {post?.title}
            </h1>

            {/* Draft Badge */}
            {isDraft && (
                <p className="mb-5 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    Draft — only you can see this post
                </p>
            )}

            {/* Author & Meta Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#e8e6e1]">
                <div
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate(`/${post.author.username}`)}
                >
                    <Avatar user={post?.author} size="md" />
                    <div>
                        <p className="text-sm font-medium text-[#111]">
                            {post?.author?.fullName}
                        </p>
                        <p className="text-xs text-[#999]">
                            @{post?.author?.username}
                        </p>
                    </div>
                </div>

                {/* Author Actions */}
                {isAuthor && (
                    <div className="flex items-center gap-2">
                        {isDraft && (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => onPublish()}
                                loading={isPublishing}
                            >
                                Publish
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit()}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete()}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            {/* Stats Row */}
            {!isDraft && (
                <div className="flex flex-wrap gap-6 text-xs text-[#999] mb-6">
                    <div className="flex items-center gap-1.5">
                        <Heart
                            size={14}
                            className={
                                isLiked ? "fill-red-500 text-red-500" : ""
                            }
                        />
                        <span>{likesCount} likes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Eye size={14} />
                        <span>{post?.views || 0} views</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Timer size={14} />
                        <span>
                            {new Date(post?.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostMeta;
