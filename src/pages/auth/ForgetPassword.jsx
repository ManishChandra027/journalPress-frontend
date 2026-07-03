import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

const ForgetPassword = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    const handlepassword = async (emailData) => {
        setError("");
        try {
            const res = await forgotPassword(emailData);
            if (res) {
                setMsg(res.message);
            }
        } catch (err) {
            setError(err.message);
            console.error(err.message);
        }
    };

    return msg ? (
        msg
    ) : (
        <>
            <div className="mt-4 text-2xl text-[#111]">Forget Password</div>
            <form onSubmit={handleSubmit(handlepassword)}>
                <div className="w-full">
                    <label className="block mb-1">enter email</label>
                    <input
                        type="text"
                        placeholder="enter your email"
                        className="w-full"
                        {...register("email")}
                    />
                </div>

                <button
                    type="submit"
                    className="flex-1 p-1.5 text-sm bg-[#111] text-white rounded-lg font-medium hover:bg-[#333] transition-colors"
                >
                    enter
                </button>
            </form>
        </>
    );
};

export default ForgetPassword;
