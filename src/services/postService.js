import api from "../api";
import { apiHandler } from "../utils/apiHandler";

export const getPublishedBlogs = () => apiHandler(() => api.get("/blogs"));

export const createBlog = (blogData) =>
    apiHandler(() => api.post("/blogs/", blogData));

export const getMyBlogs = (query) =>
    apiHandler(() =>
        api.get("/blogs/me", {
            params: query,
        })
    );

export const restoreAllBlogs = () =>
    apiHandler(() => api.patch("/blogs/me/restore-all"));

export const softDeleteAllBlogs = () =>
    apiHandler(() => api.delete("/blogs/me/delete-all"));

export const updateBlog = (blogData, id) =>
    apiHandler(() => api.patch(`/blogs/id/${id}`, blogData));

export const softDeleteBlog = (id) =>
    apiHandler(() => api.delete(`/blogs/id/${id}`));

export const restoreBlog = (id) =>
    apiHandler(() => api.patch(`/blogs/me/${id}/restore`));

export const updateBlogStatus = (statusData, id) =>
    apiHandler(() => api.patch(`/blogs/${id}/status`, statusData));

export const updateComment = (blogId, commentId, commentData) =>
    apiHandler(() =>
        api.patch(`/blogs/${blogId}/comments/${commentId}`, commentData)
    );
export const deleteComment = (blogId, commentId) =>
    apiHandler(() => api.delete(`/blogs/${blogId}/comments/${commentId}`));
export const addComment = (blogId, commentData) =>
    apiHandler(() => api.post(`/blogs/${blogId}/comments`, commentData));

export const getComments = (blogId) =>
    apiHandler(() => api.get(`/blogs/${blogId}/comments`));

export const toggleLikeBlog = (blogId) =>
    apiHandler(() => api.post(`/blogs/${blogId}/like`));

export const toggleBookmarkBlog = (blogId) =>
    apiHandler(() => api.post(`/blogs/${blogId}/bookmark`));

export const getBlogBySlug = (slug) =>
    apiHandler(() => api.post(`/blogs/slug/${slug}`));
