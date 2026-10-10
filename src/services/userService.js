import api from "../api";
import { apiHandler } from "../utils/apiHandler";

export const getCurrentUserProfile = () =>
    apiHandler(() => api.get("/users/me"));

export const updateAccountDetails = (accountData) =>
    apiHandler(() => api.patch("/users/me", accountData));

export const getUserPublishedPosts = (username, queries) =>
    apiHandler(() =>
        api.get(`/users/${username}/posts`, {
            params: queries,
        })
    );

export const followUser = (username) =>
    apiHandler(() => api.post(`/users/${username}/follow`));

export const unfollowUser = (username) =>
    apiHandler(() => api.delete(`/users/${username}/follow`));

export const getUserFollowers = (username, queries) =>
    apiHandler(() =>
        api.get(`/users/${username}/followers`, {
            params: queries,
        })
    );

export const getUserFollowings = (username, queries) =>
    apiHandler(() =>
        api.get(`/users/${username}/following`, {
            params: queries,
        })
    );

export const getUserPublicProfile = (username) =>
    apiHandler(() => api.get(`/users/${username}`));
