import { useState } from "react";
import { PostContext } from "./PostContext";

const PostProvider = ({ children }) => {
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState(null);

    return (
        <PostContext.Provider
            value={{ status, userData, setStatus, setUserData }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;
