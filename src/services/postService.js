import api from "../api";
import { apiHandler } from "../utils/apiHandler";

export const getPublishedPosts = () => apiHandler(() => api.get("/posts"));

export const createPost = (postData) =>
    apiHandler(() => api.post("/posts/", postData));

export const getMyPosts = (query) =>
    apiHandler(() =>
        api.get("/posts/me", {
             params:query,
        })
    );

export const restoreAllPosts = () =>
    apiHandler(() => api.patch("/posts/me/restore-all"));

export const softDeleteAllPosts = () =>
    apiHandler(() => api.delete("/posts/me/delete-all"));

export const updatePost = (postData, id) =>
    apiHandler(() => api.patch(`/posts/id/${id}`, postData));

export const softDeletePost = (id) =>
    apiHandler(() => api.delete(`/posts/id/${id}`));

export const restorePost = (id) =>
    apiHandler(() => api.patch(`/posts/me/${id}/restore`));

export const updatePostStatus = (statusData, id) =>
    apiHandler(() => api.patch(`/posts/${id}/status`, statusData));

export const updateComment = (postId, commentId, commentData) =>
    apiHandler(() =>
        api.patch(`/posts/${postId}/comments/${commentId}`, commentData)
    );
export const deleteComment = (postId, commentId) =>
    apiHandler(() => api.delete(`/posts/${postId}/comments/${commentId}`));
export const addComment = (postId, commentData) =>
    apiHandler(() => api.post(`/posts/${postId}/comments`, commentData));

export const getComments = (postId) =>
    apiHandler(() => api.get(`/posts/${postId}/comments`));

export const toggleLikePost = (postId) =>
    apiHandler(() => api.post(`/posts/${postId}/like`));

export const toggleBookmarkPost = (postId) =>
    apiHandler(() => api.post(`/posts/${postId}/bookmark`));

export const getPostBySlug = (slug) =>
    apiHandler(() => api.get(`/posts/slug/${slug}`));

export const getFeaturedPost = () =>
    apiHandler(() => api.get(`/posts/featured`));

export const checkPostLiked = (postId) =>
    apiHandler(() => api.get(`/posts/${postId}/liked`));

