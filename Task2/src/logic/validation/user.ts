import * as Joi from "@hapi/joi";
import {
    ContainerTypes,
    ValidatedRequestSchema,
    createValidator
} from "express-joi-validation";

const validator = createValidator()

const bodySchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/[^A-Za-z0-9]+/, { invert: true }).required(),
    age: Joi.number().required().min(4).max(130)
});

export interface UserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        login: string,
        password: string,
        age: number
    }
}

export const userValidationMiddleware = validator.body(bodySchema);