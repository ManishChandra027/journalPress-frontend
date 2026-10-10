const FormField = ({ label, error, children }) => {
    return (
        <div>
            {label && (
                <label
                    htmlFor={children.props.id}
                    className="block text-xs font-medium text-[#777] mb-1.5"
                >
                    {label}
                </label>
            )}
            {children}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export const inputClass =
    "w-full bg-white border border-[#e0ddd8] text-[#111] text-sm px-3 py-2.5 rounded-lg outline-none focus:border-[#0891B2] transition-colors placeholder:text-[#aaa]";

export default FormField;
