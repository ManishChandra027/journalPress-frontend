import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import TextEditor from "./editor/TextEditor";
import { createPost, updatePost } from "../../services/postService";
import { toast } from "sonner";
const PostForm = ({ existingPostData }) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: existingPostData?.title || "",
            excerpt: existingPostData?.excerpt || "",
            content: existingPostData?.content || "",
            status: existingPostData?.status || "published",
            category: existingPostData?.category || "general",
        },
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (existingPostData) {
            reset({
                title: existingPostData.title || "",
                excerpt: existingPostData.excerpt || "",
                content: existingPostData.content || "",
                status: existingPostData?.status || "draft",
                category: existingPostData?.category || "general",
            });
        }
    }, [existingPostData, reset]);

    const handleSubmitForm = async (postData) => {
        const formData = new FormData();
        setError("");
        setIsSubmitting(true);
        try {
            // if (!postData.title?.trim() || !postData.content?.trim()) {
            //     throw new Error("Title and content are required.");
            // }

            formData.append("title", postData.title.trim());
            formData.append("excerpt", postData.excerpt?.trim() || "");
            formData.append("status", postData.status || "draft");
            formData.append("category", postData.category || "general");
            formData.append("content", postData.content);

            if (postData.coverImage?.length > 0) {
                formData.append("coverImage", postData.coverImage[0]);
            }

         console.log("postData:", postData);

for (const [key, value] of formData.entries()) {
    console.log(key, value);
}

            if (existingPostData) {
                await updatePost(formData, existingPostData._id);
            } else {
                await createPost(formData);
                
            }
            toast.success("post created successfully");
            navigate("/");
        } catch (err) {
            setError(err.message || "Unable to save your post right now.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full bg-white border border-[#e0ddd8] text-[#111] text-sm p-2.5 rounded-lg focus:outline-none focus:border-[#0891B2] placeholder-[#bbb] transition-colors";
    const labelClass = "text-xs text-[#888] font-medium block mb-1";

    return (
        <div className="min-h-[80vh] bg-[#FAF9F6] py-12 px-4">
            <div className="max-w-6xl mx-auto">
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
                    <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
                        <div className="w-full lg:w-92 lg:shrink-0 bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
                            {error && (
                                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className={labelClass}>Title</label>
                                <input
                                    type="text"
                                    placeholder="Give your post a title..."
                                    className={inputClass}
                                    {...register("title", {
                                        required: "Title is required",
                                        minLength: {
                                            value: 5,
                                            message:
                                                "Title must be at least 5 characters",
                                        },
                                    })}
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className={labelClass}>excerpt</label>
                                <textarea
                                    placeholder="A brief summary of your post..."
                                    rows={4}
                                    className={`${inputClass} resize-none`}
                                    {...register("excerpt")}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Status</label>
                                <select
                                    className={`${inputClass} pr-8 appearance-none`}
                                    {...register("status")}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Category</label>
                                <select
                                    className={`${inputClass} pr-8 appearance-none`}
                                    {...register("category")}
                                >
                                    <option value="technology">
                                        technology
                                    </option>
                                    <option value="lifestyle">lifestyle</option>
                                    <option value="travel">travel</option>
                                    <option value="food">food</option>
                                    <option value="education">education</option>
                                    <option value="health">health</option>
                                    <option value="business">business</option>
                                    <option value="entertainment">
                                        entertainment
                                    </option>
                                    <option value="sports">sports</option>
                                    <option value="general">general</option>
                                </select>
                            </div>

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
                                className="w-full py-2.5 bg-[#111] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors cursor-pointer mt-auto disabled:opacity-60"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? existingPostData
                                        ? "Updating..."
                                        : "Publishing..."
                                    : existingPostData
                                      ? "Update Post"
                                      : "Publish Post"}
                            </button>
                        </div>

                        <div className="w-full max-w-2xl bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-sm">
                            <label className={labelClass}>Content</label>
                            <div className="rounded-lg overflow-hidden border border-[#e0ddd8] focus-within:border-[#0891B2] transition-colors mt-1">
                                <TextEditor
                                    control={control}
                                    name="content"
                                    rules={{
                                        validate: (value) =>
                                            value
                                                ?.replace(/<[^>]*>/g, "")
                                                .trim().length > 0 ||
                                            "Content is required",
                                    }}
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
