import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/AppRouter.jsx";
import PostProvider from "./context/PostProvider.jsx";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <PostProvider>
        <RouterProvider router={appRouter} />
    </PostProvider>
    // </StrictMode>,
);
