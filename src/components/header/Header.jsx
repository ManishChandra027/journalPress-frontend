import { useContext, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { PostContext } from "../../context/PostContext";
import Logo from "../logo/Logo";
import LogoutBtn from "../auth/LogoutBtn";
import Avatar from "../ui/Avatar";

const Header = () => {
    const { status, userData } = useContext(PostContext);
    const authStatus = status;
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const profile = userData;
    const navItem = useMemo(
        () => [
            { name: "Home", slug: "/", isActive: true },
            { name: "Login", slug: "/login", isActive: !authStatus },
            { name: "Signup", slug: "/signup", isActive: !authStatus },
            { name: "Add Post", slug: "/add-post", isActive: authStatus },
            { name: "My Posts", slug: "/my-post", isActive: authStatus },
        ],
        [authStatus]
    );

    const activeItems = navItem.filter((item) => item.isActive);

    return (
        <>
            <div className="sticky top-0 z-50 bg-[#FAF9F6] border-b border-[#e8e6e1] flex items-center justify-between w-full h-18 px-4 sm:px-8">
                <div
                    className="cursor-pointer shrink-0"
                    onClick={() => {
                        navigate("/");
                        setMenuOpen(false);
                    }}
                >
                    <Logo />
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-1 items-center">
                    {activeItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.slug}
                                className={({ isActive }) =>
                                    `px-3 py-1.5 text-sm rounded-lg transition-colors duration-150 ${
                                        isActive
                                            ? "bg-[#333333] text-white"
                                            : "text-[#666] hover:text-[#111] hover:bg-[#eee]"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    {/* Desktop right */}
                    {authStatus && (
                        <div className="hidden md:flex items-center gap-3">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => navigate(`/profile/me`)}
                            >
                                <Avatar
                                    user={profile}
                                    size="md"
                                    className="w-7 h-7"
                                />
                                <span className="text-sm text-[#666] hover:text-[#111] transition-colors">
                                    {userData?.fullName}
                                </span>
                            </div>
                            <LogoutBtn />
                        </div>
                    )}

                    {/* Mobile */}
                    <div className="flex md:hidden items-center gap-2">
                        {authStatus && (
                            <div
                                className="cursor-pointer"
                                onClick={() => navigate(`/profile/me`)}
                            >
                                <Avatar
                                    user={profile}
                                    size="md"
                                    className="w-7 h-7"
                                />
                            </div>
                        )}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex flex-col gap-1 p-1.5 cursor-pointer bg-transparent border-none"
                        >
                            <span
                                className={`block w-5 h-0.5 bg-[#666] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                            />
                            <span
                                className={`block w-5 h-0.5 bg-[#666] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
                            />
                            <span
                                className={`block w-5 h-0.5 bg-[#666] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-[#FAF9F6] border-b border-[#e8e6e1] px-4 py-3 flex flex-col gap-1 sticky top-14 z-40">
                    {activeItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.slug}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `px-3 py-2 text-sm rounded-lg transition-colors duration-150 ${
                                    isActive
                                        ? "bg-[#111] text-white"
                                        : "text-[#666] hover:text-[#111] hover:bg-[#eee]"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    {authStatus && (
                        <div className="mt-2 pt-2 border-t border-[#e8e6e1] flex items-center justify-between">
                            <span className="text-sm text-[#888]">
                                {profile?.fullName}
                            </span>
                            <LogoutBtn />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Header;
