import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PostForm from "../../components/post/PostForm";
import { getPostBySlug } from "../../services/postService";

const EditPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) {
                navigate("/");
                return;
            }

            try {
                const res = await getPostBySlug(slug);

                if (!res?.data) {
                    throw new Error("Post not found.");
                }

                setPost(res.data);
            } catch (err) {
                setError(err.message || "Failed to load post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <p className="text-sm text-[#777]">
                    Loading post...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <p className="text-sm text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    return <PostForm existingPostData={post} />;
};

export default EditPost;