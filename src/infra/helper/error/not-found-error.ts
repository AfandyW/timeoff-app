export class NotFoundError extends Error {
    code : number;
    constructor(message: string) {
        super(message);
        this.name = "Not Found Error";
        this.code = 404
    }
}