import { useContext, useEffect, useState } from "react";
import { getCurrentUserProfile } from "../../services/userService";
import Profile from "../../components/profile/Profile";
import { PostContext } from "../../context/PostContext";
import Spinner from "../../components/ui/Spinner";

const MyProfile = () => {
    const isAuthor = true;
    const [error, setError] = useState("");
    const [profileData, setProfileData] = useState(null);
    const { setUserData } = useContext(PostContext);

    useEffect(() => {
        const fetchProfile = async () => {
            setError("");
            try {
                const res = await getCurrentUserProfile();
                if (res) {
                    setProfileData(res.data);
                }
            } catch (err) {
                console.error(err);
                setError(
                    err.message || "Unable to load your profile right now."
                );
            }
        };
        fetchProfile();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-sm text-red-500">{error}</p>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    const handleProfileUpdated = (updatedProfile) => {
        setProfileData(updatedProfile);
        setUserData(updatedProfile);
    };

    return (
        <Profile
            profileData={profileData}
            isAuthor={isAuthor}
            onProfileUpdated={handleProfileUpdated}
        />
    );
};

export default MyProfile;
