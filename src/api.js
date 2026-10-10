import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1",
    withCredentials: true,
});

const refreshClient = axios.create({
    baseURL: "/api/v1",
    withCredentials: true,
});

const isAuthRequest = (url = "") => {
    return (
        url.includes("/auth/login") ||
        url.includes("/auth/signup") ||
        url.includes("/auth/register") ||
        url.includes("/auth/refresh-token") ||
        url.includes("/auth/logout") ||
        url.includes("/auth/verify-email") ||
        url.includes("/auth/forgot-password") ||
        url.includes("/auth/reset-password")
    );
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }
        if (isAuthRequest(originalRequest?.url)) {
            return Promise.reject(error);
        }

        if (originalRequest?._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve,
                    reject,
                });
            }).then(() => {
                return api(originalRequest);
            });
        }

        isRefreshing = true;

        try {
            await refreshClient.post("/auth/refresh-token");

            processQueue(null);

            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError);

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;
