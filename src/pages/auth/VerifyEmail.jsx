import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../services/authService";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                setMessage("Invalid verification link.");
                setLoading(false);
                return;
            }

            try {
                const res = await verifyEmail(token);

                setSuccess(true);
                setMessage(
                    res?.message || "Email verified successfully."
                );
            } catch (error) {
                setSuccess(false);
                setMessage(
                    error?.message || "Email verification failed."
                );
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [token]);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF9F6]">
                <div className="text-sm text-[#777]">
                    Verifying your email...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF9F6] px-4">
            <div className="w-full max-w-sm bg-white border border-[#e8e6e1] rounded-2xl p-8 shadow-sm text-center">
                <div
                    className={`mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                        success
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                    }`}
                >
                    {success ? "✓" : "!"}
                </div>

                <h1 className="text-xl font-semibold text-[#111] mb-2">
                    {success
                        ? "Email Verified"
                        : "Verification Failed"}
                </h1>

                <p className="text-sm text-[#777] mb-6">
                    {message}
                </p>

                {success && (
                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-[#111] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#333] transition-colors cursor-pointer"
                    >
                        Go to Homepage
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;