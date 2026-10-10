import { useContext } from "react";
import { useNavigate } from "react-router";
import { PostContext } from "../../context/PostContext";
import { logoutUser } from "../../services/authService";
import { toast } from "sonner";
const LogoutBtn = () => {
    const navigate = useNavigate();
    const { setStatus, setUserData } = useContext(PostContext);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setStatus(false);
            setUserData(null);
            toast.success("Logout successful!");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
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
