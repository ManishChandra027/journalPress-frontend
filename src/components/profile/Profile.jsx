import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import ProfileCard from "./ProfileCard";

const Profile = ({ profileData, isAuthor, onProfileUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <EditProfileForm
                profileData={profileData}
                setIsEdit={setIsEditing}
                onProfileUpdated={onProfileUpdated}
            />
        );
    }

    return (
        <ProfileCard
            profileData={profileData}
            setIsEdit={setIsEditing}
            isAuthor={isAuthor}
        />
    );
};

export default Profile;
