const FormattedDate = ({ date, label }) => {
    if (!date) return null;

    return (
        <span className="text-xs text-[#999]">
            {label}{" "}
            {new Date(date).toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "numeric",
                month: "short",
                year: "2-digit",
            })}
        </span>
    );
};

export default FormattedDate;