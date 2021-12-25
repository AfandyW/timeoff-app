import httpStatus from "http-status"
// import { Response } from "express";

export class HTTPError extends Error{
    public httpStatus: number;

    constructor(message: string , status: number) {
        super(message);
        this.httpStatus = status
    }
    // send(response: Response): void {
    //     const body = { message: this.message};
    //     response.status(this.httpStatus).send(body)
    // }
}

export class NotFoundError extends HTTPError {
    constructor(message: string ) {
        super(message, httpStatus.NOT_FOUND)
    }
}