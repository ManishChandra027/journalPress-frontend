import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getUserFollowings,
    followUser,
    unfollowUser,
} from "../../services/userService";

const Following = () => {
    const [followings, setFollowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState(null);

    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFollowings = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await getUserFollowings(username);

                setFollowings(res?.data?.followings || []);
            } catch (error) {
                setError(
                    error.message || "Failed to load followings."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFollowings();
    }, [username]);

    const handleFollowToggle = async (user) => {
        const userId = user._id;

        // Prevent double click / multiple requests
        if (processingId === userId) return;

        setProcessingId(userId);
        setError("");

        try {
            if (user.isFollowing) {
                // Currently following → Unfollow
                await unfollowUser(user.username);
            } else {
                // Currently not following → Follow
                await followUser(user.username);
            }

            // Update UI only after API succeeds
            setFollowings((prev) =>
                prev.map((item) =>
                    item._id === userId
                        ? {
                              ...item,
                              isFollowing: !item.isFollowing,
                          }
                        : item
                )
            );
        } catch (error) {
            setError(
                error.message || "Failed to update follow status."
            );
        } finally {
            setProcessingId(null);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                Loading followings...
            </div>
        );
    }

    // Error state when fetching failed
    if (error && followings.length === 0) {
        return (
            <div className="py-10 text-center text-red-500">
                {error}
            </div>
        );
    }

    // Empty state
    if (followings.length === 0) {
        return (
            <div className="py-10 text-center text-gray-500">
                No followings found
            </div>
        );
    }

    return (
        <div className="py-10">
            {/* Header */}
            <div className="mb-6">
                <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-1">
                    Connections
                </p>

                <h1 className="text-xl font-bold text-[#111]">
                    Following
                </h1>
            </div>

            {/* Follow/Unfollow error */}
            {error && (
                <div className="mb-4 max-w-xl rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-500">
                    {error}
                </div>
            )}

            {/* Users */}
            <div className="space-y-2 max-w-xl">
                {followings.map((following) => (
                    <div
                        key={following._id}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f5f5] transition-all"
                    >
                        {/* User information */}
                        <div
                            className="flex items-center gap-3 cursor-pointer min-w-0"
                            onClick={() =>
                                navigate(`/${following.username}`)
                            }
                        >
                            {/* Avatar */}
                            {following?.avatar?.url ? (
                                <img
                                    src={following.avatar.url}
                                    className="w-10 h-10 rounded-full object-cover shrink-0"
                                    alt={following.fullName}
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-[#0891B2] text-white text-sm font-medium flex items-center justify-center shrink-0">
                                    {following?.fullName
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>
                            )}

                            {/* Name */}
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#111] truncate">
                                    {following?.fullName}
                                </p>

                                <p className="text-sm text-[#666] truncate">
                                    @{following?.username}
                                </p>
                            </div>
                        </div>

                        {/* Follow / Unfollow button */}
                        <button
                            type="button"
                            disabled={processingId === following._id}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFollowToggle(following);
                            }}
                            className={`px-4 py-1.5 text-sm rounded-full transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 ml-4 ${
                                following.isFollowing
                                    ? "bg-white border border-[#ddd] text-[#333] hover:bg-[#f5f5f5]"
                                    : "bg-[#111] text-white hover:bg-[#333]"
                            }`}
                        >
                            {processingId === following._id
                                ? "..."
                                : following.isFollowing
                                ? "Unfollow"
                                : "Follow"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Following;