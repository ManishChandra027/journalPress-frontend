import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFollowers } from "../../services/userService";

const Followers = () => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                setLoading(true);

                const res = await getUserFollowers(username);

                if (res) {
                    setFollowers(res.data.followers);
                    setIsAuthor(res.data.isOwnProfile);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();
    }, [username]);

    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                Loading followers...
            </div>
        );
    }

    if (followers.length === 0) {
        return (
            <div className="py-10 text-center text-gray-500">
                No followers found
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {followers.map((follower) => (
                <div
                    key={follower._id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f5f5] transition-all max-w-xl"
                >
                    {/* Left */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() =>
                            navigate(`/${follower.username}`)
                        }
                    >
                        {follower?.avatar?.url ? (
                            <img
                                src={follower.avatar.url}
                                className="w-10 h-10 rounded-full object-cover"
                                alt={follower.fullName}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-[#0891B2] text-white text-sm font-medium flex items-center justify-center">
                                {follower?.fullName
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>
                        )}

                        <div>
                            <p className="text-sm font-semibold text-[#111]">
                                {follower?.fullName}
                            </p>

                            <p className="text-sm text-[#666]">
                                @{follower?.username}
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

export default Followers;