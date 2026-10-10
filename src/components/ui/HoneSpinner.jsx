import React from "react";

const HoneSpinner = () => {
    return (
        <div className="py-10">
            <div className="h-5 bg-[#e8e6e1] w-24 rounded mb-6 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-[#e8e6e1] rounded-2xl h-56 animate-pulse" />
                <div className="flex flex-col gap-3">
                    <div className="h-4 bg-[#e8e6e1] w-1/2 rounded animate-pulse" />
                    <div className="h-6 bg-[#e8e6e1] w-full rounded animate-pulse" />
                    <div className="h-4 bg-[#e8e6e1] w-full rounded animate-pulse" />
                    <div className="h-4 bg-[#e8e6e1] w-3/4 rounded animate-pulse" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white border border-[#e8e6e1] rounded-2xl overflow-hidden animate-pulse"
                    >
                        <div className="h-44 bg-[#e8e6e1]" />
                        <div className="p-4 space-y-2">
                            <div className="h-3 bg-[#e8e6e1] w-3/4 rounded" />
                            <div className="h-3 bg-[#e8e6e1] w-1/2 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HoneSpinner;
