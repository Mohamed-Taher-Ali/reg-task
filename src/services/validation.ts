import * as joi from 'joi';

export function registerOrLoginValidation(body) {
    let schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).required(),
    }) ;
    return schema.validate(body);
}

export function getUserValidation(body) {
    let schema = joi.object({
        userId: joi.number().min(1).required(),
    }) ;
    return schema.validate(body);
}

export function updateValidation(body) {
    let schema = joi.object({
        userId: joi.number().min(1).required(),
        email: joi.string().email().optional(),
        password: joi.string().min(5).optional(),
    }) ;
    return schema.validate(body);
}