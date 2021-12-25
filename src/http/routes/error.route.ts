import { Response, Request, NextFunction } from "express"
import httpStatus from "http-status"
import { HTTPError, NotFoundError } from "./../../infra/helper/error";

interface payloadHttpError{
    code: number;
    status: string;
}

export function errorHandler(
    error: Error,
    request: Request,
    response: Response,
): Response{

    if (error instanceof HTTPError) {
        const payload: payloadHttpError = {
            code: error.httpStatus,
            status: error.message
        }
        return response.status(error.httpStatus).json(payload)
    }

    const payload: payloadHttpError = {
        code: httpStatus.INTERNAL_SERVER_ERROR,
        status: error.message || "Unknown Error"
    }

    return response.status(httpStatus.INTERNAL_SERVER_ERROR).json(payload)
} 

export function notFoundErrorHandler(
    next: NextFunction,
): void {
    next(new NotFoundError("Not Found"))
}