import { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./components/header/Header";
import { PostContext } from "./context/PostContext";
import { getCurrentUser } from "./services/authService";
import { Footer } from "./components/footer/Footer";
import { Toaster } from "sonner";
import { useLocation } from "react-router-dom";
const App = () => {
    const { setStatus, setUserData } = useContext(PostContext);
    const location = useLocation();

    const publicAuthRoutes = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/signup"
    ];
    useEffect(() => {
        if (publicAuthRoutes.includes(location.pathname)) {
            setStatus(false);
            setUserData(null);
            return;
        }
        const checkUser = async () => {
            try {
                const userData = await getCurrentUser();

                if (userData?.data) {
                    setStatus(true);
                    setUserData(userData.data);
                } else {
                    setStatus(false);
                    setUserData(null);
                }
            } catch (error) {
                setStatus(false);
                setUserData(null);
            }
        };

        checkUser();
    }, [setStatus, setUserData]);

    return (
        <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-outfit">
            <Header />
            <Toaster
                position="top-center"
                richColors
                duration={1000}
                theme="light"
                offset={70}
            />
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default App;
