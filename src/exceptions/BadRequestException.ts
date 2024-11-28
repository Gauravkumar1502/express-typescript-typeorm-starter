import { BaseException } from "./BaseException";

export class BadRequestException extends BaseException { 
    constructor(message: string = "Bad Request") {
        super(message, 400);
    }
}