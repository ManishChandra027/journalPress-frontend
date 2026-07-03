import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getCurrentUserProfile,
    getUserPublicProfile,
} from "../../services/userService";
import Profile from "../../components/profile/Profile";

const MyProfile = () => {
    const isAuthor = true;

    // const navigate = useNavigate();

    const [error, setError] = useState("");
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setError("");
            try {
                const res = await getCurrentUserProfile();
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
    return <Profile profileData={profileData} isAuthor={isAuthor}/>;
};

export default MyProfile;
