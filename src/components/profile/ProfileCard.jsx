import React from "react";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ProfileCard = ({ profileData, setIsEdit, isAuthor }) => {
    // console.log(profileData);
    const navigate=useNavigate();

    return (
        <div className="max-w-xs w-full mx-auto mt-2 p-6  flex flex-col items-center text-center ">
            {profileData.avatar ? (
                <img
                    className="w-54 h-54 rounded-full object-cover border-2 border-[#0891B2]"
                    src={profileData.avatar?.url}
                    alt={profileData.username}
                />
            ) : (
                <div className="w-54 h-54 rounded-full bg-[#0891B2] text-white text-3xl font-semibold flex items-center justify-center">
                    {profileData.username?.charAt(0).toUpperCase()}
                </div>
            )}
            <h2 className="mt-4 text-base font-semibold text-[#111]">
                {profileData.fullName}
                <span >
                    {" "}
                    {profileData.isVerified ? (
                        <BadgeCheck strokeWidth={3} />
                    ) : null}
                </span>
            </h2>
            <h3 className="mt-4 text-base font-semibold text-[#111]">
                @{profileData.username}
            </h3>
            <p className="mt-2 text-sm text-[#888] line-clamp-3">
                {profileData.bio || "No bio added"}
            </p>
            {isAuthor && (
                <>
                    <p>email: {profileData.email}</p>
                    <button
                        className="mt-4 px-5 py-1.5 text-sm bg-[#111] text-white rounded-lg font-medium hover:bg-[#333] transition-colors cursor-pointer"
                        onClick={() => setIsEdit(true)}
                    >
                        Edit Profile
                    </button>
                </>
            )}
            <div className="flex justify-between gap-5 cursor-pointer" >
                <span onClick={()=>navigate(`/${profileData.username}/following`)}>Following:{profileData.followingCount}</span>
                <span onClick={()=>navigate(`/${profileData.username}/followers`)}>Followers:{profileData.followersCount}</span>
            </div>
        </div>
    );
};

export default ProfileCard;
