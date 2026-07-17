import React, { useEffect, useState } from "react";
import { verifyEmail } from "../../services/authService";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
    const [msg, setMsg] = useState("plz wait");
    const [loading, setLoading] = useState(true);
    const {token}=useParams()

    useEffect(() => {

        try {
          
            const verify = async () => {
                const res = await verifyEmail(token);
                console.log(res)
                if (res) {
                    setMsg(res.message);
                }
            };
            verify(token);
        } catch (error) {
            setMsg(error.message)
        } finally {
            setLoading(false);
        }
    }, []);
    if (loading) {
        <div>Loading ......</div>;
    }
    if(msg){
        <div>{msg}</div>
    }
};

export default VerifyEmail;
