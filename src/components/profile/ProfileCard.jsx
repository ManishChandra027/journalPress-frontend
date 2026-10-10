import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { requestEmailVerification } from "../../services/authService";
import Avatar from "../ui/Avatar";

const ProfileCard = ({ profileData, setIsEdit, isAuthor }) => {
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const safeProfile = {
        username: profileData?.username || "user",
        fullName: profileData?.fullName || "User",
        bio: profileData?.bio || "No bio added",
        email: profileData?.email || "",
        followingCount: profileData?.followingCount ?? 0,
        followersCount: profileData?.followersCount ?? 0,
        isVerified: profileData?.isVerified,
        avatarUrl: profileData?.avatar?.url || "",
    };

    const handleVerifyEmail = async () => {
        const res = await requestEmailVerification();
        if (res) {
            setMsg(res.message);
        }
    };

    const stats = [
        {
            label: "Following",
            value: safeProfile.followingCount,
            path: `/${safeProfile.username}/following`,
        },
        {
            label: "Followers",
            value: safeProfile.followersCount,
            path: `/${safeProfile.username}/followers`,
        },
    ];

    return (
        <div className="max-w-xs w-full mx-auto mt-2 p-6 flex flex-col items-center text-center">
            <Avatar user={safeProfile} size="xl" className="border-2 border-[#0891B2]" />
            <h2 className="mt-4 text-base font-semibold text-[#111]">
                {safeProfile.fullName}
            </h2>
            {safeProfile.isVerified ? (
                <div className="flex items-center gap-1 text-sm text-[#0891B2]">
                    <BadgeCheck strokeWidth={3} />
                    <span>Verified</span>
                </div>
            ) : msg ? (
                <span className="text-xs text-[#666]">{msg}</span>
            ) : (
                <button
                    onClick={handleVerifyEmail}
                    className="mt-1 text-sm text-[#0891B2] hover:underline cursor-pointer"
                >
                    Verify email
                </button>
            )}
            <h3 className="mt-4 text-base font-semibold text-[#111]">
                @{safeProfile.username}
            </h3>
            <p className="mt-2 text-sm text-[#888] line-clamp-3">
                {safeProfile.bio}
            </p>
            {isAuthor && (
                <>
                    <p className="mt-3 text-sm text-[#666]">
                        Email: {safeProfile.email}
                    </p>
                    <button
                        className="mt-4 px-5 py-1.5 text-sm bg-[#111] text-white rounded-lg font-medium hover:bg-[#333] transition-colors cursor-pointer"
                        onClick={() => setIsEdit(true)}
                    >
                        Edit Profile
                    </button>
                </>
            )}
            <div className="flex justify-between gap-5 mt-4 w-full text-sm text-[#666]">
                {stats.map((stat) => (
                    <button
                        key={stat.label}
                        type="button"
                        onClick={() => navigate(stat.path)}
                        className="flex-1 rounded-lg py-2 transition-colors hover:bg-[#f5f5f5] cursor-pointer"
                    >
                        <span className="block font-semibold text-[#111]">
                            {stat.value}
                        </span>
                        <span>{stat.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProfileCard;
