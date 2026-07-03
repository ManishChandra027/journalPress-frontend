import React, { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword, logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const navigate=useNavigate();
    const handleUpdatePassord = async(passwordData) => {
        setError("");
        try {
            const isChanged = await changePassword(passwordData);
            console.log(isChanged.message)
            if (isChanged) {
                await logoutUser();
                navigate("/login");
            }
        } catch (err) {
            setError(err.message);
            console.error(err.message)
        }
    };

    return (
        <>
            <div className="mt-4 text-2xl text-[#111]">ChangePassword</div>
            <form onSubmit={handleSubmit(handleUpdatePassord)}>
                <div className="w-full">
                    <label className="block mb-1">currendPassword</label>
                    <input
                        type="password"
                        placeholder="enter curr password"
                        className="w-full"
                        {...register("currendPassword")}
                    />
                </div>
                <div className="w-full">
                    <label className="block mb-1">New Password</label>
                    <input
                        type="password"
                        placeholder="enter new password"
                        className="w-full"
                        {...register("updatedPassword")}
                    />
                </div>

                <button
                    type="submit"
                    className="flex-1 p-1.5 text-sm bg-[#111] text-white rounded-lg font-medium hover:bg-[#333] transition-colors"
                >
                    Update
                </button>
            </form>
        </>
    );
};

export default ChangePassword;
