import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";

export const ResetPassword = () => {
    const {token}=useParams();
   const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
   
    

    const handlepassword = async (passData) => {
        setError("");
        try {
            const res = await resetPassword(token,passData)
            if (res) {
                console.log(res.message);
                navigate('/login')
            }
        } catch (err) {
            setError(err.message);
            console.error(err.message);
        }
    };

    return  (
        <>
            <div className="mt-4 text-2xl text-[#111]">Reset Password</div>
            <form onSubmit={handleSubmit(handlepassword)}>
                <div className="w-full">
                    <label className="block mb-1">enter new Password</label>
                    <input
                        type="password"
                        placeholder="enter your new password"
                        className="w-full"
                        {...register("newPassword")}
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
