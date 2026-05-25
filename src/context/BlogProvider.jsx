import React, { useState } from "react";
import { BlogContext } from "./BlogContext";

const BlogProvider = ({ children }) => {
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState(null);

    return (
        <BlogContext.Provider
            value={{ status, userData, setStatus, setUserData }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export default BlogProvider;
