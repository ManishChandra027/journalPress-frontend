import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPublicProfile } from "../../services/userService";
import Profile from "../../components/profile/Profile";

const PublicProfile = () => {
    const isAuthor = false;
    const { username } = useParams();
    // const navigate = useNavigate();

    const [error, setError] = useState("");
    const [profileData, setProfileData] = useState(null);
   
    useEffect(() => {
        const fetchProfile = async () => {
            setError("");
            try {
                if (!username) throw new Error("username not found");
                const res = await getUserPublicProfile(username);
                if (res) {
                    setProfileData(res.data);
                }
            } catch (error) {
                console.log(error.message);
                setError(error.message);
            }
        };
        fetchProfile()
    }, []);

    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-sm text-red-500">{error}</p>
            </div>
        );

    if (!profileData)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-[#e8e6e1] border-t-[#0891B2] rounded-full animate-spin" />
            </div>
        );
    return <Profile profileData={profileData} isAuthor={isAuthor} />;
};

export default PublicProfile;
