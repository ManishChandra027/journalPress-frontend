import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, Timer } from "lucide-react";
import { getFeaturedPost, getPublishedPosts } from "../services/postService";
import PostCard from "../components/post/PostCard";
import HoneSpinner from "../components/ui/HoneSpinner";
import FormattedDate from "../components/ui/FormattedDate";
import Avatar from "../components/ui/Avatar";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [featuredPost, setFeaturedPost] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPublishedPosts();

                setPosts(res.data.posts);
            } catch (err) {
                setError(
                    err.message || "An error occurred while fetching posts."
                );
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
                console.error("Error fetching featured post:", err);
            }
        };
        fetchFeatureData();
    }, []);

    const normalPosts = posts.filter((post) => post._id !== featuredPost?._id);

    if (!loading && error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-[#bbb] text-sm">{error}</p>
            </div>
        );
    }

    if (loading) {
        return <HoneSpinner />;
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
                                <Avatar
                                    user={featuredPost?.author}
                                    size="sm"
                                    className="w-6 h-6"
                                />

                                <span className="text-xs text-[#999] hover:text-black hover:font-semibold transition-all">
                                    {featuredPost?.author?.fullName}
                                </span>
                            </div>
                        </Link>

                        {/* Footer */}
                        <div className="flex justify-between items-end mt-auto">
                            <span className="text-sm font-medium text-[#333333] inline-flex items-center gap-1 group-hover:text-[#0891B2] transition-colors ">
                                Read Article
                                <span className="text-xs">→</span>
                            </span>

                            <FormattedDate
                                date={featuredPost?.publishedAt}
                                label="Published:"
                            />
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

                            <span className="flex items-center gap-1">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {normalPosts.map((post) => (
                    <PostCard key={post._id} postData={post} />
                ))}
            </div>
        </div>
    );
};

export default Home;
