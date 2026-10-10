const normalizeMessage = (message) => {
    if (typeof message !== "string") {
        return "Something went wrong. Please try again.";
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
        return "Something went wrong. Please try again.";
    }

    if (!/[.!?]$/.test(trimmedMessage)) {
        return `${trimmedMessage}.`;
    }

    return trimmedMessage;
};

export const apiHandler = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data;
    } catch (error) {
        const message = normalizeMessage(
            error.response?.data?.message ||
                error.message ||
                "Something went wrong. Please try again."
        );  

        throw {
            status: error.response?.status || 500,
            message,
            data: error.response?.data || null,
        };
    }
};
