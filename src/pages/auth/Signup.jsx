import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { PostContext } from "../../context/PostContext";
import { getCurrentUser, signupUser } from "../../services/authService";
import { toast } from "sonner";
const SignupCard = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { setStatus, setUserData } = useContext(PostContext);

    const handleSignup = async (signupData) => {
        setError("");

        try {
            await signupUser(signupData);

            const currentData = await getCurrentUser();

            if (!currentData?.data) {
                throw new Error("Unable to load your account right now.");
            }

            setStatus(true);
            setUserData(currentData.data);
            toast.success("Account created successfully!");
            navigate("/");
        } catch (err) {
            setError(
                err.message ||
                    "Unable to create your account. Please try again."
            );
        }
    };

    const inputClass =
        "w-full bg-white border border-[#e0ddd8] text-[#111] placeholder-[#bbb] p-2.5 rounded-lg focus:outline-none focus:border-[#0891B2] transition-colors text-sm";

    const labelClass = "text-xs text-[#888] block mb-1 font-medium";

    const errorClass = "text-xs text-red-500 mt-1";

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-[#FAF9F6] px-4 py-8">
            <div className="bg-white border border-[#e8e6e1] p-8 rounded-2xl w-full max-w-sm shadow-sm">
                <h1 className="text-xl font-semibold text-[#111] text-center mb-1">
                    Create account
                </h1>

                <p className="text-xs text-[#999] text-center mb-6">
                    Join the community
                </p>

                <form
                    onSubmit={handleSubmit(handleSignup)}
                    className="flex flex-col gap-4"
                >
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className={labelClass}>
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            className={inputClass}
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Username must be at least 3 characters",
                                },
                            })}
                        />

                        {errors.username && (
                            <p className={errorClass}>
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className={labelClass}>
                            Name
                        </label>

                        <input
                            id="fullName"
                            type="text"
                            placeholder="Enter your name"
                            className={inputClass}
                            {...register("fullName", {
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Name must be at least 3 characters",
                                },
                            })}
                        />

                        {errors.fullName && (
                            <p className={errorClass}>
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className={labelClass}>
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={inputClass}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email",
                                },
                            })}
                        />

                        {errors.email && (
                            <p className={errorClass}>{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className={labelClass}>
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            className={inputClass}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className={errorClass}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* API Error */}
                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#111] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#333] transition-colors mt-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-xs text-[#999] text-center mt-5">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-[#0891B2] cursor-pointer hover:underline font-medium"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupCard;
