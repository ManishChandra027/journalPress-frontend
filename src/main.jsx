import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/AppRouter.jsx";
import BlogProvider from "./context/Blogprovider.jsx";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <BlogProvider>
        <RouterProvider router={appRouter} />
    </BlogProvider>
    // </StrictMode>,
);
