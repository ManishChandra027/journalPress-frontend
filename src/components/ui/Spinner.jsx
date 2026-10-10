const Spinner = ({ size = "md", className = "" }) => {
    const sizeClasses = {
        sm: "w-4 h-4 border",
        md: "w-7 h-7 border-2",
        lg: "w-10 h-10 border-2",
    };

    return (
        <div
            className={`${sizeClasses[size]} border-[#e8e6e1] border-t-[#0891B2] rounded-full animate-spin ${className}`}
            aria-label="Loading"
        />
    );
};

export default Spinner;
