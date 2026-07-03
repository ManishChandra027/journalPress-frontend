import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import parse from "html-react-parser";
import { BlogContext } from "../../context/BlogContext";
import {
    getBlogBySlug,
    softDeleteBlog,
    toggleLikeBlog,
    addComment
} from "../../services/postService";
import { Heart, Eye, Timer } from "lucide-react";
const PostDetails = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const { userData } = useContext(BlogContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const isAuthor = post?.author?._id === userData?._id;
    // console.log(post)
    const {register,handleSubmit}=useForm();

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                if (!slug) {
                    navigate("/");
                    return;
                }
                const res = await getBlogBySlug(slug);
                if (res) {
                    setPost(res.data);
                    console.log(res.data.isLiked)
                    setLikesCount(res.data.likesCount);
                    setIsLiked(res.data.isLiked);
                }
            } catch (err) {
                console.error(err);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug, navigate]);
                  

    const handleLike = async (blogId) => {
        // e.stopPropagation();

        // save previous state for rollback
        const previousLiked = isLiked;

        // optimistic update
        setIsLiked(!previousLiked);

        setLikesCount((prev) => (previousLiked ? prev - 1 : prev + 1));

        try {
            await toggleLikeBlog(blogId);
        } catch (error) {
            // rollback
            setIsLiked(previousLiked);

            setLikesCount((prev) => (previousLiked ? prev + 1 : prev - 1));
        }
    };

    const addComment=async(commentData)=>{
        // try {
        //     const res=await addComment(post._id,commentData)
            
        // } catch (error) {
            
        // }
       
    }

    const deletePost = async () => {
        try {
            const isDeleted = await softDeleteBlog(post._id);
            if (isDeleted) {
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-[#e8e6e1] border-t-[#0891B2] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-10">
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm text-[#999] hover:text-[#111] transition-colors mb-8 cursor-pointer bg-transparent border-none"
            >
                ← Back to Home
            </button>

            <h1 className="text-2xl font-bold text-[#333333] leading-snug mb-5">
                {post?.title}
            </h1>

            {/* Byline */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#e8e6e1]">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate(`/${post.author.username}`)}
                >
                    {post?.author?.avatar ? (
                        <img
                            src={post?.author?.avatar?.url}
                            className="w-8 h-8 rounded-full object-cover"
                            alt={post?.author?.fullName}
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-[#0891B2] text-white text-xs font-medium flex items-center justify-center">
                            {post?.author?.fullName?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium text-[#111]">
                            {post?.author?.fullName}
                        </p>
                    </div>
                </div>

                {isAuthor && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate(`/edit-post/${post.slug}`)}
                            className="text-xs px-3 py-1.5 border border-[#ddd] text-[#666] rounded-lg hover:border-[#0891B2] hover:text-[#0891B2] transition-colors cursor-pointer bg-transparent"
                        >
                            Edit
                        </button>
                        <button
                            onClick={deletePost}
                            className="text-xs px-3 py-1.5 border border-[#ddd] text-[#666] rounded-lg hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer bg-transparent"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Cover Image */}
            {post?.coverImage && (
                <div className="w-full h-72 rounded-2xl overflow-hidden mb-8 bg-[#f0ede8]">
                    <img
                        className="w-full h-full object-cover"
                        src={post?.coverImage?.url}
                        alt={post?.title}
                    />
                </div>
            )}

            {/* Body */}
            <div className="space-y-5">
                {post?.title && (
                    <p className="text-lg font-semibold text-[#444] leading-relaxed ">
                        {post.title}
                    </p>
                )}
                {post?.content && (
                    <div className="prose max-w-none text-[#666] leading-loose">
                        {parse(post.content)}
                    </div>
                )}
            </div>
            <div className="flex justify-between mt-2  ">
                <span className="text-xs text-[#999]">
                    published:{" "}
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                    })}
                </span>
                <span className="text-xs text-[#999]">
                    Updated:{" "}
                    {new Date(post.updatedAt).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                    })}
                </span>
            </div>
            <div className="flex items-start justify-between gap-4 mt-3 text-xs text-[#777]">
                <span
                    className="flex items-start gap-1"
                    onClick={() => handleLike(post._id)}
                >
                    <Heart
                        size={21}
                        strokeWidth={2.5}
                        className={`transition-all ${
                            isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-gray-500"
                        }`}
                    />
                    {likesCount}
                </span>
                <span className="flex items-start gap-2">
                    <span className="flex items-start gap-1">
                        <Eye
                            size={21}
                            strokeWidth={2.5}
                            className="text-sky-600"
                        />
                        {post?.views}
                    </span>

                    <span className="flex items-start gap-1">
                        <Timer
                            size={21}
                            strokeWidth={2.5}
                            className="text-amber-500"
                        />
                        {post?.readingTime} min
                    </span>
                </span>
            </div>

            <div className="mt-6">
                <form onSubmit={handleSubmit(addComment)}>
                    <label className="block text-sm font-medium text-[#333] mb-2">
                        Add Comment
                    </label>

                    <input
                        type="text"
                        {...register("comment"),{ required: true }}
                        placeholder="Write your comment..."
                        className="w-full border border-[#ddd] rounded-xl px-4 py-3 text-sm outline-none 
                    focus:ring-2 focus:ring-[#0891B2] focus:border-transparent
                    placeholder:text-[#999] transition-all"
                    />
                </form>
            </div>
        </div>
    );
};

export default PostDetails;
