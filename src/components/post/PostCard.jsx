import { Link } from "react-router-dom";
import { Heart, Eye, Timer } from "lucide-react";
import Avatar from "../ui/Avatar";
import FormattedDate from "../ui/FormattedDate";

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
                            <Avatar user={postData?.author} size="sm" />

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

                            <span className="flex items-start gap-1">
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
                    {postData?.publishedAt ? (
                        
                        <FormattedDate
                                date={postData?.publishedAt}
                                label="Published:"
                            />
                    ) : (
                        <span className="text-xs text-[#f32b2b]">draft</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
