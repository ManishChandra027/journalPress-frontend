import Spinner from "./Spinner";

const Button = ({
    type = "button",
    children,
    loading = false,
    disabled = false,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    ...props
}) => {
    const baseClasses =
        "font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

    const variantClasses = {
        primary:
            "bg-[#111] text-white hover:bg-[#333] disabled:hover:bg-[#111]",
        secondary:
            "border border-[#ddd] text-[#666] hover:border-[#0891B2] hover:text-[#0891B2] disabled:hover:border-[#ddd] disabled:hover:text-[#666]",
        danger: "border border-[#ddd] text-[#666] hover:border-red-400 hover:text-red-500 disabled:hover:border-[#ddd] disabled:hover:text-[#666]",
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            type={type}
            disabled={loading || disabled}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {loading && <Spinner size="sm" />}
            <span>{children}</span>
        </button>
    );
};

export default Button;
