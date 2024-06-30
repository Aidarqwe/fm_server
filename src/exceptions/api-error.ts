class ApiError extends Error {
    status: number;
    errors: any[];

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static UnauthorizedError(): ApiError {
        return new ApiError(401, "Пользователь не авторизован");
    }

    static BadRequest(message: string, errors: any[] = []): ApiError {
        return new ApiError(400, message, errors);
    }

    static NotFoundError(message: string = "Такого id не существует"): ApiError {
        return new ApiError(404, message);
    }

    static ValidationError(message: string, errors: any[] = []): ApiError {
        return new ApiError(422, message, errors);
    }

    static ImageValidationError(message: string, errors: any[] = []): ApiError {
        return new ApiError(415, message, errors);
    }
}

export default ApiError;
