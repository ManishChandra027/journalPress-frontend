import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { BlogContext } from "../../context/BlogContext";
import { logoutUser } from "../../services/authService";


const LogoutBtn = () => {
  const navigate = useNavigate();
  const { setStatus, setUserData } = useContext(BlogContext);

  const handleLogout = async () => {
    const isLogout = await logoutUser();
    if (!isLogout) throw new Error("Failed to Logout");
    setStatus(false);
    setUserData(null);
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1.5 text-sm rounded-lg border border-[#ddd] text-[#666] hover:border-[#111] hover:text-[#111] transition-colors cursor-pointer bg-transparent"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
