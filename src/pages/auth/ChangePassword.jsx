import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { changePassword, logoutUser } from "../../services/authService";
import FormField, { inputClass } from "../../components/ui/FormField";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleUpdatePassword = async (passwordData) => {
        setError("");
        setIsSubmitting(true);

        try {
            const isChanged = await changePassword(passwordData);

            if (!isChanged) {
                throw new Error("Failed to change password.");
            }

            // Password change successful.
            // Logout separately so a logout failure doesn't
            // incorrectly say password change failed.
            try {
                await logoutUser();
            } finally {
                navigate("/login");
            }
        } catch (err) {
            setError(err.message || "Failed to change password.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-7">
                    <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-1">
                        Account Security
                    </p>

                    <h1 className="text-2xl font-semibold text-[#111]">
                        Change Password
                    </h1>

                    <p className="text-sm text-[#888] mt-2">
                        Update your password to keep your account secure.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-sm">
                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(handleUpdatePassword)}
                        className="space-y-5"
                    >
                        <FormField label="Current Password" error={errors.currentPassword?.message}>
                            <input
                                id="currentPassword"
                                type="password"
                                placeholder="Enter your current password"
                                className={inputClass}
                                {...register("currentPassword", {
                                    required: "Current password is required",
                                })}
                            />

                        </FormField>

                        <FormField label="New Password" error={errors.updatedPassword?.message}>
                            <input
                                id="updatedPassword"
                                type="password"
                                placeholder="Enter your new password"
                                className={inputClass}
                                {...register("updatedPassword", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "New password must be at least 8 characters",
                                    },
                                })}
                            />

                        </FormField>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 bg-[#111] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting
                                ? "Updating Password..."
                                : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
