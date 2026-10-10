const sizeClasses = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-8 h-8 text-xs",
    lg: "w-10 h-10 text-sm",
    xl: "w-54 h-54 text-3xl",
};

const Avatar = ({ user, size = "md", className = "" }) => {
    const avatarUrl = user?.avatar?.url || user?.avatarUrl;
    const name = user?.fullName || user?.username || "User";

    if (avatarUrl) {
        return (
            <img
                src={avatarUrl}
                alt={`${name}'s avatar`}
                className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
            />
        );
    }

    return (
        <div
            aria-label={`${name}'s avatar`}
            className={`${sizeClasses[size]} rounded-full bg-[#0891B2] text-white font-medium flex items-center justify-center ${className}`}
        >
            {name.charAt(0).toUpperCase()}
        </div>
    );
};

export default Avatar;
