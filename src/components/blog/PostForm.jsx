import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import TextEditor from "./editor/TextEditor";
import { createBlog, updateBlog } from "../../services/postService";

const PostForm = ({ existingPostData }) => {
    // const [tag, setTag] = useState("");
    // const [tags, setTags] = useState([]);
    const { register, handleSubmit, reset, control, getValues } = useForm({
        defaultValues: {
            title: existingPostData?.title || "",
            excerpt: existingPostData?.excerpt || "",
            content: existingPostData?.content || "",
            status: existingPostData?.status || "",
            category: existingPostData?.category || "",
          
        },
    });
    // console.log(existingPostData)
    const navigate = useNavigate();
    const { userData } = useContext(BlogContext);

    useEffect(() => {
        if (existingPostData) {
            reset({
                title: existingPostData.title || "",
                excerpt: existingPostData.excerpt || "",
                content: existingPostData.content || "",
                status: existingPostData?.status || "",
                category: existingPostData?.category || "",
                
            });
        }
    }, [existingPostData, reset]);

    const handleSubmitForm = async (postData) => {
        const formData = new FormData();
        try {
            if (existingPostData) {
                formData.append("title", postData.title);
                formData.append("excerpt", postData.excerpt);
                formData.append("status", postData.status);
                formData.append("content", postData.content);

                if (postData.coverImage.length > 0) {
                    formData.append("coverImage", postData.coverImage[0]);
                }
                await updateBlog( formData,existingPostData._id);
                navigate("/");
            } else {
                formData.append("title", postData.title);
                formData.append("excerpt", postData.excerpt);
                formData.append("status", postData.status);
                formData.append("content", postData.content);
                formData.append("coverImage", postData.coverImage[0]);
                await createBlog(formData);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            // alert("Something went wrong");
        }
    };
    const tag = () => {
        if (e.key === "Enter") {
            // current tag ko tags array me add karo
            // input clear karo
        }
    };

    const inputClass =
        "w-full bg-white border border-[#e0ddd8] text-[#111] text-sm p-2.5 rounded-lg focus:outline-none focus:border-[#0891B2] placeholder-[#bbb] transition-colors";
    const labelClass = "text-xs text-[#888] font-medium block mb-1";

    return (
        <div className="min-h-[80vh] bg-[#FAF9F6] py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Page heading */}
                <div className="mb-8">
                    <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-1">
                        {existingPostData ? "Editing" : "New Post"}
                    </p>
                    <h1 className="text-2xl font-bold text-[#111]">
                        {existingPostData
                            ? "Edit your post"
                            : "Write something"}
                    </h1>
                </div>

                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    {/* Mobile: flex-col | Desktop: flex-row */}
                    <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
                        {/* ── LEFT PANEL (mobile: full width, desktop: fixed 288px) ── */}
                        <div className="w-full lg:w-92 lg:shrink-0  bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
                            {/* Title */}
                            <div>
                                <label className={labelClass}>Title</label>
                                <input
                                    type="text"
                                    placeholder="Give your post a title..."
                                    className={inputClass}
                                    {...register("title", { required: true })}
                                />
                            </div>

                            {/* excerpt */}
                            <div>
                                <label className={labelClass}>excerpt</label>
                                <textarea
                                    placeholder="A brief summary of your post..."
                                    rows={4}
                                    className={`${inputClass} resize-none`}
                                    {...register("excerpt")}
                                />
                            </div>
                            {/* status */}
                            <div>
                                <label className={labelClass}>ststus</label>
                                <select {...register("status")}>
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            {/* Category */}
                            <div>
                                <label className={labelClass}>category</label>
                                <select {...register("category")}>
                                    <option value="technology">
                                        technology
                                    </option>
                                    <option value="lifestyle">lifestyle</option>
                                    <option value="travel">travel</option>
                                    <option value="food">food</option>
                                    <option value="education">education</option>
                                    <option value="health">health</option>
                                    <option value="business">business</option>
                                    <option value="entertainment ">
                                        entertainment{" "}
                                    </option>
                                    <option value="sports ">sports </option>
                                    <option value="general ">general </option>
                                </select>
                            </div>
                            {/* tags */}
                            {/* <div>
                                <input 
                                    
                                    type="text"
                                     className={inputClass}
                                    placeholder="Type a tag and press Enter"
                                />
                            </div> */}

                            {/* Cover image */}
                            <div>
                                <label className={labelClass}>
                                    Cover Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full text-sm text-[#888] file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#111] file:text-white file:cursor-pointer hover:file:bg-[#333] transition-colors"
                                    {...register("coverImage")}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-[#111] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors cursor-pointer mt-auto"
                            >
                                {existingPostData
                                    ? "Update Post"
                                    : "Publish Post"}
                            </button>
                        </div>

                        {/* ── RIGHT PANEL (mobile: full width, desktop: flex-1) ── */}
                        <div className="w-full max-w-2xl bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-sm">
                            <label className={labelClass}>Content</label>
                            <div className="rounded-lg overflow-hidden border border-[#e0ddd8] focus-within:border-[#0891B2] transition-colors mt-1">
                                <TextEditor
                                    control={control}
                                    name="content"
                                    defaultValue={getValues("content")}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
