export class HttpExceptionFilter extends Error {
    public readonly statusCode: number

    constructor(message: string, statusCode = 400) {
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, HttpExceptionFilter.prototype)
    }
}