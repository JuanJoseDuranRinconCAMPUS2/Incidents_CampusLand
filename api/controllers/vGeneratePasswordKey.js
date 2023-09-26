import { body } from "express-validator";

export const vGeneratePasswordKey = [

    body("name_User")
    .notEmpty().withMessage("name_User must not be empty")
    .isString().withMessage("name_User must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("name_User must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_User must have a maximum of 45 characters"),

    body('email_User')
    .isString().withMessage("email_User must be a string")
    .isEmail().withMessage('email_User must be a valid email address')
    .isLength({ max: 250 }).withMessage('email_User must have a maximum of 250 characters')
    .notEmpty().withMessage('email_User must not be empty')

]