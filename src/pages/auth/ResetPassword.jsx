import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import FormField, { inputClass } from "../../components/ui/FormField";

export const ResetPassword = () => {
    const { token } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handlePassword = async (passData) => {
        setError("");
        setIsSubmitting(true);

        try {
            const res = await resetPassword(token, passData);

            if (res) {
                navigate("/login");
            }
        } catch (err) {
            setError(
                err.message || "Unable to reset password. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                <div className="mb-7">
                    <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-1">
                        Account Recovery
                    </p>

                    <h1 className="text-2xl font-semibold text-[#111]">
                        Reset Password
                    </h1>

                    <p className="text-sm text-[#888] mt-2">
                        Enter a new password for your account.
                    </p>
                </div>

                <div className="bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-sm">
                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(handlePassword)}
                        className="space-y-5"
                    >
                        <FormField label="New Password" error={errors.newPassword?.message}>
                            <input
                                id="newPassword"
                                type="password"
                                placeholder="Enter your new password"
                                className={inputClass}
                                {...register("newPassword", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                            />

                        </FormField>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 bg-[#111] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting
                                ? "Resetting Password..."
                                : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
