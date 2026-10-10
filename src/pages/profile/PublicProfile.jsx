import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPublicProfile } from "../../services/userService";
import Profile from "../../components/profile/Profile";
import Spinner from "../../components/ui/Spinner";

const PublicProfile = () => {
    const isAuthor = false;
    const { username } = useParams();
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
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to load profile.");
            }
        };
        fetchProfile();
    }, [username]);

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

    return <Profile profileData={profileData} isAuthor={isAuthor} />;
};

export default PublicProfile;
