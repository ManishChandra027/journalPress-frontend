import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signupUser } from "../../services/authService";
const Signup = () => {
    const { register, handleSubmit } = useForm();

    const handleSignUp = async (signupData) => {
        try {
            const response = await signupUser(signupData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    className="space-y-4"
                >
                    <div>
                        <label className="block mb-1 font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            {...register("fullName")}
                            placeholder="Enter your name"
                            className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>

                        <input
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email"
                            className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            username
                        </label>

                        <input
                            type="text"
                            {...register("username")}
                            placeholder="Enter your username"
                            className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Enter password"
                            className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
