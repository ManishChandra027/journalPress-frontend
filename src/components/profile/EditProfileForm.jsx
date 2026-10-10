import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { updateAccountDetails } from "../../services/userService";
import FormField, { inputClass } from "../ui/FormField";

const EditProfileForm = ({ profileData, setIsEdit, onProfileUpdated }) => {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            bio: "",
            email: "",
            fullName: "",
            username: "",
        },
    });

    useEffect(() => {
        if (profileData) {
            reset({
                bio: profileData?.bio || "",
                username: profileData?.username || "",
                email: profileData?.email || "",
                fullName: profileData?.fullName || "",
            });
        }
    }, [profileData, reset]);

    const handleUpdate = async (formData) => {
        setSubmitError("");
        const updateData = new FormData();
        const fields = ["fullName", "email", "username", "bio"];

        fields.forEach((field) => {
            const nextValue = formData[field]?.trim() ?? "";
            const currentValue = profileData?.[field] ?? "";

            if (nextValue !== currentValue) {
                updateData.append(field, nextValue);
            }
        });

        const avatar = formData.image?.[0];
        if (avatar) updateData.append("avatar", avatar);

        if ([...updateData.keys()].length === 0) {
            setSubmitError("Make a change before updating your profile.");
            return;
        }

        try {
            const response = await updateAccountDetails(updateData);
            onProfileUpdated(response.data);
            toast.success(response.message || "Profile updated successfully.");
            setIsEdit(false);
        } catch (error) {
            setSubmitError(error.message || "Failed to update profile.");
        }
    };

    const avatarUrl = profileData?.avatar?.url || "";

    return (
        <div className="max-w-xs w-full mx-auto mt-2 p-6 flex flex-col items-center text-center">
            <form
                onSubmit={handleSubmit(handleUpdate)}
                className="w-full flex flex-col items-center gap-4"
            >
                <label htmlFor="avatarUpload" className="cursor-pointer">
                    <div className="relative w-54 h-54 rounded-full overflow-hidden border-2 border-[#0891B2] bg-[#f5f5f5]">
                        {avatarUrl ? (
                            <img
                                className="w-full h-full object-cover"
                                src={avatarUrl}
                                alt={profileData?.username || "profile"}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-semibold text-[#0891B2]">
                                {(
                                    profileData?.fullName ||
                                    profileData?.username ||
                                    "U"
                                )
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                        )}
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

                {submitError && (
                    <p className="w-full text-sm text-red-500">{submitError}</p>
                )}

                <FormField label="Name">
                    <input
                        id="fullName"
                        type="text"
                        className={inputClass}
                        {...register("fullName")}
                    />
                </FormField>
                {profileData?.isVerified ? (
                    <p className="mt-3 text-sm text-[#666]">
                        Email: {profileData.email}
                    </p>
                ) : (
                    <FormField label="Email">
                        <input
                            id="email"
                            type="email"
                            className={inputClass}
                            {...register("email")}
                        />
                    </FormField>
                )}

                <FormField label="Username">
                    <input
                        id="username"
                        type="text"
                        className={inputClass}
                        {...register("username")}
                    />
                </FormField>

                <textarea
                    placeholder="Update your bio..."
                    className={`${inputClass} bg-[#FAF9F6] resize-none`}
                    rows={3}
                    {...register("bio")}
                />
                <div className="w-full">
                    <button
                        type="button"
                        onClick={() => navigate("/update-password")}
                        className="text-[#0891B2] cursor-pointer hover:underline font-sm"
                    >
                        Change Password
                    </button>
                </div>

                <div className="flex gap-3 w-full">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-1.5 text-sm bg-[#111] text-white rounded-lg font-medium hover:bg-[#333] transition-colors"
                    >
                        {isSubmitting ? "Updating..." : "Update"}
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
