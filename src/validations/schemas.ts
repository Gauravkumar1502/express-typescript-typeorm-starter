import Joi, { Schema } from 'joi';

const emailSchema = Joi.string().email();
const passwordSchema = Joi.string().min(8).max(30).custom((value, helpers) => {
    if (!value.match(/[a-z]/)) {
        return helpers.error('any.custom', { message: 'Password must contain at least 1 lowercase letter' });
    }
    if (!value.match(/[A-Z]/)) {
        return helpers.error('any.custom', { message: 'Password must contain at least 1 uppercase letter' });
    }
    if (!value.match(/[0-9]/)) {
        return helpers.error('any.custom', { message: 'Password must contain at least 1 digit' });
    }
    if (!value.match(/[^a-zA-Z0-9]/)) {
        return helpers.error('any.custom', { message: 'Password must contain at least 1 special character' });
    }
    return value;
});

export const emailOrPasswordSchema: Schema = Joi.object({
    email: emailSchema.required(),
    password: passwordSchema.required()
});