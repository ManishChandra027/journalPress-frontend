import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, Timer } from "lucide-react";
const PostCard = ({ postData }) => {
    
    return (
        <Link to={`/post/${postData.slug}`}>
            <div className="bg-white border border-[#e8e6e1] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="w-full h-44 overflow-hidden bg-[#f0ede8]">
                    <img
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                        src={postData?.coverImage?.url}
                        alt={postData.title}
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-[#111] leading-snug line-clamp-2 mb-3">
                        {postData.title}
                    </h2>
                    <p className="text-xs font-light line-clamp-4 text-[#333333cb] my-2 ">
                        {postData.excerpt}
                    </p>

                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            {postData?.author?.avatar ? (
                                <img
                                    src={postData?.author.avatar?.url}
                                    className="w-6 h-6 rounded-full object-cover"
                                    alt={postData?.author?.fullName}
                                />
                            ) : (
                                <div className="w-5 h-5 rounded-full bg-[#0891B2] text-white text-[10px] font-medium flex items-center justify-center">
                                    {postData?.author?.fullName
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}

                            <span className=" text-xs text-[#999]">
                                {postData?.author?.fullName}
                            </span>
                        </div>
                        
                        <div className="flex items-start  gap-4 mt-3 text-xs text-[#777]">
                            <span className="flex items-start gap-1">
                                <Eye
                                    size={14}
                                    strokeWidth={2.5}
                                    className="text-sky-600"
                                />
                                {postData?.views}
                            </span>

                            <span className="flex items-start gap-1" >
                                <Heart
                                    size={14}
                                    strokeWidth={2.5}
                                    className="text-red-500"
                                />
                                {postData?.likesCount}
                            </span>

                            <span className="flex items-start gap-1">
                                <Timer
                                    size={14}
                                    strokeWidth={2.5}
                                    className="text-amber-500"
                                />
                                {postData?.readingTime} min
                            </span>
                        </div>
                    </div>
                        {postData?.publishedAt?(<span className="text-xs text-[#999]">
                            Published:{" "}
                            <span>
                                {new Date(
                                    postData.publishedAt

                                ).toLocaleDateString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                    day: "numeric",
                                    month: "short",
                                    year: "2-digit",
                                })}
                            </span>
                        </span>):<span className="text-xs text-[#f32b2b]">
                            draft
                            </span>}
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
