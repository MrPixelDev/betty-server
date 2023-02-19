export declare class ApiError extends Error {
    status: any;
    message: any;
    constructor(status: any, message: any);
    static badRequest(message: any): ApiError;
    static internal(message: any): ApiError;
    static forbidden(message: any): ApiError;
}
