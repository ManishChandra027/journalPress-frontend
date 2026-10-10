import Spinner from "./Spinner";

const Loader = ({ message = "Loading...", minHeight = "60vh" }) => {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-4 min-h-[${minHeight}]`}
            style={{ minHeight }}
        >
            <Spinner size="lg" />
            {message && <p className="text-sm text-[#999]">{message}</p>}
        </div>
    );
};

export default Loader;
