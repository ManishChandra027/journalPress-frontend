import { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../services/authService";
import FormField, { inputClass } from "../../components/ui/FormField";

const ForgetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePassword = async (emailData) => {
        setError("");
        setMsg("");
        setIsSubmitting(true);

        try {
            const res = await forgotPassword(emailData);

            if (res) {
                setMsg(
                    res.message ||
                        "Password reset instructions have been sent to your email."
                );
            }
        } catch (err) {
            setError(
                err.message ||
                    "Unable to process your request. Please try again."
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
                        Forgot Password?
                    </h1>

                    <p className="text-sm text-[#888] mt-2">
                        Enter your email and we'll send you instructions to
                        reset your password.
                    </p>
                </div>

                <div className="bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-sm">
                    {msg ? (
                        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {msg}
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit(handlePassword)}
                            className="space-y-5"
                        >
                            {/* Error */}
                            {error && (
                                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <FormField label="Email Address" error={errors.email?.message}>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className={inputClass}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Please enter a valid email address",
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
                                    ? "Sending..."
                                    : "Send Reset Instructions"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
