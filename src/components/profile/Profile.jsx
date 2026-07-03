import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import EditProfileForm from "./EditProfileForm";
import ProfileCard from "./ProfileCard";

const Profile = ({ profileData,isAuthor }) => {
    const [isEdit, setIsEdit] = useState(false);
    return isEdit ? (
        <EditProfileForm profileData={profileData} setIsEdit={setIsEdit} isAuthor={isAuthor}/>
    ) : (
        <ProfileCard profileData={profileData} setIsEdit={setIsEdit} isAuthor={isAuthor} />
    );
};

export default Profile;
