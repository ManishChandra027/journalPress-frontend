import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Post from "../pages/blog/Post";
import AddPost from "../pages/blog/AddPost";
import MyPost from "../pages/blog/MyPost";
import EditPost from "../pages/blog/EditPost";
import PublicProfile from "../pages/profile/PublicProfile";
import MyProfile from "../pages/profile/MyProfile";
import Following from "../pages/follow/Following";
import Followrs from "../pages/follow/Followrs";
import ChangePassword from "../pages/auth/ChangePassword";
import ForgetPassword from "../pages/auth/ForgetPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";

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
                path: "/:username",
                element: <PublicProfile />,
            },
            {
                path: "/profile/me",
                element: <MyProfile />,
            },
            {
                path: "/:username/following",
                element: <Following />,
            },
            {
                path: "/:username/followers",
                element: <Followrs />,
            },
            {
                path: "/update-password",
                element: <ChangePassword />,
            },
            {
                path: "/forget-password",
                element: < ForgetPassword/>,
            },
            {
                path: "/reset-password/:token",
                element: < ResetPassword/>,
            },
        ],
    },
]);

export default appRouter;
