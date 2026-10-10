import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Post from "../pages/post/Post";
import AddPost from "../pages/post/AddPost";
import MyPost from "../pages/post/MyPost";
import EditPost from "../pages/post/EditPost";
import PublicProfile from "../pages/profile/PublicProfile";
import MyProfile from "../pages/profile/MyProfile";

import ChangePassword from "../pages/auth/ChangePassword";
import ForgetPassword from "../pages/auth/ForgetPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Following from "../pages/follow/Following";
import Followers from "../pages/follow/Followers";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
            {
                path: "/add-post",
                element: <AddPost />,
            },
            {
                path: "/my-post",
                element: <MyPost />,
            },
            {
                path: "/edit-post/:slug",
                element: <EditPost />,
            },
            {
                path: "/profile/me",
                element: <MyProfile />,
            },
            {
                path: "/update-password",
                element: <ChangePassword />,
            },
            {
                path: "/forget-password",
                element: <ForgetPassword />,
            },
            {
                path: "/reset-password/:token",
                element: <ResetPassword />,
            },
            {
                path: "/verify-email/:token",
                element: <VerifyEmail />,
            },
            {
                path: "/:username/following",
                element: < Following/>,
            },
            {
                path: "/:username/followers",
                element: <Followers />,
            },
            {
                path: "/:username",
                element: <PublicProfile />,
            },
        ],
    },
]);

export default appRouter;
