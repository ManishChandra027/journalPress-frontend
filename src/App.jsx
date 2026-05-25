import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./components/header/Header";
import { BlogContext } from "./context/BlogContext";
import { getCurrentUser } from "./services/authService";
const App = () => {
    const { setStatus, setUserData,status } = useContext(BlogContext);
    useEffect(() => {
      //TODO try-catch
        const checkUser = async () => {
            const userData = await getCurrentUser();
            if (userData) {
                setStatus(true);
                setUserData(userData);
            }
        };
        checkUser();
    }, []);
    return (
        <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-outfit">
            <Header />
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default App;
