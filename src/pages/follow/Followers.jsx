import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getUserFollowers,
    followUser,
    unfollowUser,
} from "../../services/userService";

const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState(null);

    const { username } = useParams();
    const navigate = useNavigate();

    // Fetch followers
    useEffect(() => {
        const fetchFollowers = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await getUserFollowers(username);

                setFollowers(res?.data?.followers || []);
            } catch (err) {
                setError(
                    err.message || "Failed to load followers."
                );
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchFollowers();
        }
    }, [username]);

    // Follow / Unfollow
    const handleFollowToggle = async (follower) => {
        if (processingId === follower._id) return;

        setProcessingId(follower._id);
        setError("");

        try {
            if (follower.isFollowing) {
                // Already following → Unfollow
                await unfollowUser(follower.username);
            } else {
                // Not following → Follow
                await followUser(follower.username);
            }

            // Update local UI after successful API call
            setFollowers((prev) =>
                prev.map((user) =>
                    user._id === follower._id
                        ? {
                              ...user,
                              isFollowing: !user.isFollowing,
                          }
                        : user
                )
            );
        } catch (err) {
            setError(
                err.message || "Failed to update follow status."
            );
        } finally {
            setProcessingId(null);
        }
    };

    // Loading
    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                Loading followers...
            </div>
        );
    }

    // Error with no data
    if (error && followers.length === 0) {
        return (
            <div className="py-10 text-center text-red-500">
                {error}
            </div>
        );
    }

    // Empty
    if (followers.length === 0) {
        return (
            <div className="py-10 text-center text-gray-500">
                No followers found
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
                    Followers
                </h1>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-4 max-w-xl rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-500">
                    {error}
                </div>
            )}

            {/* Followers List */}
            <div className="space-y-2 max-w-xl">
                {followers.map((follower) => (
                    <div
                        key={follower._id}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f5f5] transition-all"
                    >
                        {/* User Information */}
                        <div
                            className="flex items-center gap-3 cursor-pointer min-w-0"
                            onClick={() =>
                                navigate(`/${follower.username}`)
                            }
                        >
                            {/* Avatar */}
                            {follower?.avatar?.url ? (
                                <img
                                    src={follower.avatar.url}
                                    alt={follower.fullName}
                                    className="w-10 h-10 rounded-full object-cover shrink-0"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-[#0891B2] text-white text-sm font-medium flex items-center justify-center shrink-0">
                                    {follower?.fullName
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>
                            )}

                            {/* Name */}
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#111] truncate">
                                    {follower?.fullName}
                                </p>

                                <p className="text-sm text-[#666] truncate">
                                    @{follower?.username}
                                </p>
                            </div>
                        </div>

                        {/* Follow / Unfollow Button */}
                        <button
                            type="button"
                            disabled={
                                processingId === follower._id
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFollowToggle(follower);
                            }}
                            className="px-4 py-1.5 text-sm rounded-full bg-[#111] text-white hover:bg-[#333] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0 ml-4"
                        >
                            {processingId === follower._id
                                ? "..."
                                : follower.isFollowing
                                  ? "Unfollow"
                                  : "Follow"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Followers;