import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFollowings } from "../../services/userService";

const Following = () => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [followings, setFollowings] = useState([]);
    const [loading, setLoading] = useState(true);

    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                setLoading(true);

                const res = await getUserFollowings(username);

                if (res) {
                    setFollowings(res.data.followings);
                    setIsAuthor(res.data.isOwnProfile);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowings();
    }, [username]);

    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                Loading followings...
            </div>
        );
    }

    if (followings.length === 0) {
        return (
            <div className="py-10 text-center text-gray-500">
                No followings found
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {followings.map((following) => (
                <div
                    key={following._id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f5f5] transition-all max-w-xl"
                >
                    {/* Left */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => navigate(`/${following.username}`)}
                    >
                        {following?.avatar?.url ? (
                            <img
                                src={following.avatar.url}
                                className="w-10 h-10 rounded-full object-cover"
                                alt={following.fullName}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-[#0891B2] text-white text-sm font-medium flex items-center justify-center">
                                {following?.fullName?.charAt(0)?.toUpperCase()}
                            </div>
                        )}

                        <div>
                            <p className="text-sm font-semibold text-[#111]">
                                {following?.fullName}
                            </p>

                            <p className="text-sm text-[#666]">
                                @{following?.username}
                            </p>
                        </div>
                    </div>

                    {/* Right */}
                    {isAuthor && (
                        <button className="px-4 py-1.5 text-sm rounded-full bg-[#111] text-white hover:opacity-90 transition-all cursor-pointer">
                            Following
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Following;
