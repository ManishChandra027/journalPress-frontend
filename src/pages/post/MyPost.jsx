import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../context/PostContext";
import { getMyPosts } from "../../services/postService";
import PostCard from "../../components/post/PostCard";

const MyPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("published");

    const { userData } = useContext(PostContext);

    useEffect(() => {
        const fetchMyPosts = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await getMyPosts({
                    page: 1,
                    limit: 10,
                    sort: "latest",
                    status,
                });

                setPosts(res?.data?.posts || []);
            } catch (err) {
                setError(err.message || "Failed to load your posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, [userData, status]);

    if (loading) {
        return (
            <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-sm text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="py-10">
            <div className="mb-7">
                <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-1">
                    Your Content
                </p>

                <h1 className="text-xl font-bold text-[#111]">My Posts</h1>
            </div>
            <div className="mb-5 flex items-center justify-start ">
                <button
                    className={`px-4 py-2 rounded-l-lg border border-[#e8e6e1] cursor-pointer ${
                        status === "published"
                            ? "bg-[#111] text-white"
                            : "bg-white text-[#111]"
                    }`}
                    onClick={() => setStatus("published")}
                >
                    Published
                </button>
                <button
                    className={`px-4 py-2 rounded-r-lg border border-[#e8e6e1] cursor-pointer ${
                        status === "draft"
                            ? "bg-[#111] text-white"
                            : "bg-white text-[#111]"
                    }`}
                    onClick={() => setStatus("draft")}
                >
                    Drafts
                </button>
            </div>
            
            {posts.length === 0 ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                    <p className="text-[#bbb] text-sm">
                        You haven't posted anything yet
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {posts.map((post) => (
                        <PostCard key={post._id} postData={post} />
                    ))}
                </div>
            )}
            
        </div>
    );
};

export default MyPost;
