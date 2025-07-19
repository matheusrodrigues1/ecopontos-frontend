export function getErrorMessage(error: unknown, defaultMsg = "Erro inesperado"): string {
    if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
    ) {
        return (error.response as { data?: { message?: string } }).data?.message || defaultMsg;
    } else if (error instanceof Error) {
        return error.message;
    }
    return defaultMsg;
}