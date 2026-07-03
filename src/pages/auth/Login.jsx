import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { BlogContext } from "../../context/BlogContext";
import { getCurrentUser, loginUser } from "../../services/authService";

const LoginCard = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setStatus, setUserData } = useContext(BlogContext);

    const handleLogin = async (loginData) => {
        setError("");
        try {
            if (!loginData?.username && !loginData?.email)
                throw new Error("Please enter a username or email.");
            const session = await loginUser(loginData);
            if (!session) throw new Error("Account Login failed");
            const currentData = await getCurrentUser();
            if (!currentData)
                throw new Error("Failed to Fetch current Account");
            setStatus(true);
            setUserData(currentData.data);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const inputClass =
        "w-full bg-white border border-[#e0ddd8] text-[#111] placeholder-[#bbb] p-2.5 rounded-lg focus:outline-none focus:border-[#6d28d9] transition-colors text-sm";
    const labelClass = "text-xs text-[#888] block mb-1 font-medium";

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-[#FAF9F6]">
            <div className="bg-white border border-[#e8e6e1] p-8 rounded-2xl w-full max-w-sm shadow-sm">
                <h1 className="text-xl font-semibold text-[#111] text-center mb-1">
                    Welcome back
                </h1>
                <p className="text-xs text-[#999] text-center mb-6">
                    Sign in to your account
                </p>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(handleLogin)}
                >
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
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email",
                                },
                            })}
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className={labelClass}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            className={inputClass}
                            {...register("username", {})}
                        />
                    </div>
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
                                    message: "Minimum 8 characters",
                                },
                            })}
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#111] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#333] transition-colors mt-1 cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="text-xs text-[#999] text-center mt-5">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-[#0891B2] cursor-pointer hover:underline font-medium"
                    >
                        Sign up
                    </span>
                </p>
                <p className="text-xs text-[#999] text-center mt-5">
                    
                    <span
                        onClick={() => navigate("/forget-password")}
                        className="text-[#0891B2] cursor-pointer hover:underline font-medium"
                    >
                        Forget Password
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginCard;
