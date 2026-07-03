import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFeaturedPost, getPublishedBlogs, toggleLikeBlog } from "../services/postService";
import PostCard from "../components/blog/PostCard";
import { Heart, Eye, Timer } from "lucide-react";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [featuredPost, setFeaturedPost] = useState(null);
    //  const { userData } = useContext(BlogContext);
     
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPublishedBlogs();
                if (!res) return;
                setPosts(res.data.blogs);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchFeatureData = async () => {
            try {
                const res = await getFeaturedPost();
                if (res) {
                    setFeaturedPost(res.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchFeatureData();
    }, []);
    const normalPosts = posts.filter(
        (post) => post?._id?.toString() !== featuredPost?._id?.toString()
    );

   
    if (loading) {
        return (
            <div className="py-10">
                <div className="h-5 bg-[#e8e6e1] w-24 rounded mb-6 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-[#e8e6e1] rounded-2xl h-56 animate-pulse" />
                    <div className="flex flex-col gap-3">
                        <div className="h-4 bg-[#e8e6e1] w-1/2 rounded animate-pulse" />
                        <div className="h-6 bg-[#e8e6e1] w-full rounded animate-pulse" />
                        <div className="h-4 bg-[#e8e6e1] w-full rounded animate-pulse" />
                        <div className="h-4 bg-[#e8e6e1] w-3/4 rounded animate-pulse" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white border border-[#e8e6e1] rounded-2xl overflow-hidden animate-pulse"
                        >
                            <div className="h-44 bg-[#e8e6e1]" />
                            <div className="p-4 space-y-2">
                                <div className="h-3 bg-[#e8e6e1] w-3/4 rounded" />
                                <div className="h-3 bg-[#e8e6e1] w-1/2 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-[#bbb] text-sm">No posts yet</p>
            </div>
        );
    }

    return (
        <div className="py-10">
            {/* Section label */}
            <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-6">
                Recent Post
            </p>

            {/* Featured post */}
            {featuredPost && (
                <div
                    onClick={() => navigate(`/post/${featuredPost.slug}`)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-[#e8e6e1] cursor-pointer group"
                >
                    {/* Image */}
                    <div className="w-full h-66 rounded-2xl overflow-hidden bg-[#f0ede8]">
                        <img
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            src={featuredPost?.coverImage?.url}
                            alt={featuredPost?.title}
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-start">
                        {/* Title */}
                        <h2 className="text-2xl font-semibold text-[#333333] leading-snug mb-3 group-hover:text-[#0891B2] transition-colors">
                            {featuredPost?.title}
                        </h2>

                        {/* Excerpt */}
                        {featuredPost?.excerpt && (
                            <p className="text-sm text-[#888] leading-relaxed line-clamp-4 mb-4">
                                {featuredPost?.excerpt}
                            </p>
                        )}

                        {/* Author */}
                        <Link
                            to={`/${featuredPost?.author?.username}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-fit"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                {featuredPost?.author?.avatar?.url ? (
                                    <img
                                        src={featuredPost?.author?.avatar?.url}
                                        className="w-6 h-6 rounded-full object-cover"
                                        alt={featuredPost?.author?.fullName}
                                    />
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-[#0891B2] text-white text-[10px] font-medium flex items-center justify-center">
                                        {featuredPost?.author?.fullName
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>
                                )}

                                <span className="text-xs text-[#999] hover:text-black hover:font-semibold transition-all">
                                    {featuredPost?.author?.fullName}
                                </span>
                            </div>
                        </Link>

                        {/* Footer */}
                        <div className="flex justify-between items-end mt-auto">
                            <span className="text-sm font-medium text-[#333333] inline-flex items-center gap-1 group-hover:text-[#0891B2] transition-colors ">
                                Read Article
                                <span className="text-xs">↗</span>
                            </span>

                            <span className="text-xs text-[#999]">
                                Published:{" "}
                                {new Date(
                                    featuredPost?.publishedAt
                                ).toLocaleDateString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                    day: "numeric",
                                    month: "short",
                                    year: "2-digit",
                                })}
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mt-3 text-xs text-[#777]">
                            <span className="flex items-center gap-1">
                                <Eye
                                    size={14}
                                    strokeWidth={2.5}
                                    className="text-sky-600"
                                />
                                {featuredPost?.views}
                            </span>

                            <span className="flex items-center gap-1" >
                                <Heart
                                    size={14}
                                    strokeWidth={2.5}
                                    className="text-red-500"
                                />
                                {featuredPost?.likesCount}
                            </span>

                            <span className="flex items-center gap-1">
                                <Timer
                                    size={14}
                                    strokeWidth={2.5}
                                    className="text-amber-500"
                                />
                                {featuredPost?.readingTime} min read
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Rest posts grid */}
            {normalPosts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {normalPosts.map((post) => (
                        <PostCard key={post._id} postData={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
