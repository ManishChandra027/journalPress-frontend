import api from "../api.js";
import { apiHandler } from "../utils/apiHandler.js";

// export const signupUser = async (signupData) => {
//     try {
//         const response = await api.post("/auth/register", signupData);

//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };

export const signupUser = (signupData) =>
    apiHandler(() => api.post("/auth/register", signupData));

export const getCurrentUser = () => apiHandler(() => api.get("/auth/me"));

export const loginUser = (loginData) =>
    apiHandler(() => api.post("/auth/login", loginData));

export const forgotPassword = (emailData) =>
    apiHandler(() => api.post("/auth/forgot-password", emailData));

export const resetPassword = (token, passwordData) =>
    apiHandler(() => api.post(`/auth/reset-password/${token}`, passwordData));

export const verifyEmail = (token) =>
    apiHandler(() => api.post(`/auth/verify-email/${token}`));

export const logoutUser = () => apiHandler(() => api.post("/auth/logout"));

export const refreshAccessToken = () =>
    apiHandler(() => api.post("/auth/refresh-token"));

export const changePassword = (passwordData) =>
    apiHandler(() => api.post("/auth/change-password", passwordData));

export const requestEmailVerification = () =>
    apiHandler(() => api.post("/auth/request-email-verification"));

// export const changeEmailRequest = (emailData) =>
//     apiHandler(() => api.post("/auth/change-email-request", emailData));
