const Logo = ({ width = "auto" }) => {
    return (
        <div
            style={{ width }}
            className="group flex items-center gap-2 select-none"
        >
            <div className="group flex h-9 w-9 items-center justify-center">
                <img
                    src="/logo.png"
                    alt="JournalPress logo"
                    className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105"
                />
            </div>

            <div className="font-outfit text-2xl font-semibold tracking-tight">
                <span className="text-[#0891B2]">Journal</span>
                <span className="text-[#333333]">Press</span>
            </div>
        </div>
    );
};

export default Logo;
