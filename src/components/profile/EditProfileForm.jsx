import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({ profileData, setIsEdit }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { bio: "", email: "", fullName: "", username: "" },
    });


    useEffect(() => {
        if (profileData)
            reset({
                bio: profileData?.bio || "",
                username: profileData?.username || "",
                email: profileData?.email || "",
                fullName: profileData?.fullName || "",
                url: profileData?.avatar?.url || "",
            });
    }, [profileData, reset, setIsEdit]);

    const navigate=useNavigate();

    const handleUpdate = async (data) => {
        // try {
        //     // let updatedData = { ...data };
        //     // const file = data.image?.[0] || null;
        //     // if (file) {
        //     //     if (profile?.avatarId)
        //     //         await profileService.delImage(profile.avatarId);
        //     //     const imageRes = await profileService.uplodeImage(file);
        //     //     updatedData.avatarId = imageRes.$id;
        //     // }
        //     // await profileService.updateProfile(profile.$id, updatedData);
        //     setIsEdit(false);
        //     navigate(`/profile/${slug}`);
        // } catch (err) {
        //     console.error(err);
        //     setError("Update failed");
        // }
    };

    return (
        <div className="max-w-xs w-full mx-auto mt-2 p-6  flex flex-col items-center text-center ">
            <form
                onSubmit={handleSubmit(handleUpdate)}
                className="w-full flex flex-col items-center gap-4"
            >
                <label htmlFor="avatarUpload" className="cursor-pointer">
                    <div className="relative w-54 h-54 rounded-full overflow-hidden border-2 border-[#0891B2]">
                        <img
                            className="w-full h-full object-cover"
                            src={profileData?.avatar?.url}
                            alt={profileData.username}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                                Change
                            </span>
                        </div>
                    </div>
                </label>

                <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    className="text-xs text-[#999]"
                    {...register("image")}
                />

                <div className="w-full">
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        className="w-full"
                        {...register("fullName")}
                    />
                </div>

               {profileData.isVerified?null: <div className="w-full">
                    <label className="block mb-1">Email</label> 
                    <input
                        type="email"
                        className="w-full"
                        {...register("email")}
                    />
                </div>}

                <div className="w-full">
                    <label className="block mb-1">Username</label>
                    <input
                        type="text"
                        className="w-full"
                        {...register("username")}
                    />
                </div>
                <div className="w-full ">
                     <button
                        type="button"
                        onClick={()=>navigate('/update-Password')}
                        className="flex-1 cursor-pointer p-1.5 text-sm bg-[#111] text-white rounded-lg font-medium hover:bg-[#333] transition-colors"
                    >
                        update Password
                    </button>
                </div>
                
                <textarea
                    placeholder="Update your bio..."
                    className="w-full bg-[#FAF9F6] border border-[#e0ddd8] text-[#111] text-sm p-2.5 rounded-lg focus:outline-none focus:border-[#0891B2] resize-none"
                    rows={3}
                    {...register("bio")}
                />

                <div className="flex gap-3 w-full">
                    <button
                        type="submit"
                        className="flex-1 py-1.5 text-sm bg-[#111] text-white rounded-lg font-medium hover:bg-[#333] transition-colors"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEdit(false)}
                        className="flex-1 py-1.5 text-sm border border-[#ddd] text-[#666] rounded-lg hover:border-[#111] transition-colors bg-transparent"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
