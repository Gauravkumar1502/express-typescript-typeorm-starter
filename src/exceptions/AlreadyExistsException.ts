import { BaseException } from "./BaseException";

export class AlreadyExistsException extends BaseException {
    constructor(message: string = 'Resource already exists') {
        super(message, 409);
    }
}
