import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { PostContext } from "../../context/PostContext";
import { getCurrentUser, loginUser } from "../../services/authService";
import { toast } from "sonner";
import FormField, { inputClass } from "../../components/ui/FormField";
const LoginCard = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setStatus, setUserData } = useContext(PostContext);

    const handleLogin = async (loginData) => {
        setError("");
        try {
            if (!loginData?.username && !loginData?.email) {
                throw new Error("Please enter a username or email.");
            }

            const session = await loginUser(loginData);
            if (!session) {
                throw new Error("Login failed. Please try again.");
            }

            const currentData = await getCurrentUser();
            if (!currentData) {
                throw new Error("Unable to load your account right now.");
            }

            setStatus(true);
            setUserData(currentData.data);
             toast.success("Login successful!");
            navigate("/");
        } catch (err) {
            setError(err.message || "Unable to sign in. Please try again.");
        }
    };

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
                    <FormField label="Email">
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
                    </FormField>
                    <FormField label="Username">
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            className={inputClass}
                            {...register("username", {})}
                        />
                    </FormField>
                    <FormField label="Password">
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
                    </FormField>

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
