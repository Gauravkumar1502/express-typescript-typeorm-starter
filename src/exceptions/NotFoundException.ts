import { BaseException } from "./BaseException";

export class NotFoundException extends BaseException {
    constructor(message: string = "Not Found") {
        super(message, 404);
    }
}