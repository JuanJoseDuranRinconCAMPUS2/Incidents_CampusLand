import { body } from "express-validator";

export const vRecoveryPassword  = [

    body("name_User")
    .notEmpty().withMessage("name_User must not be empty")
    .isString().withMessage("name_User must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("name_User must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_User must have a maximum of 45 characters"),

    body("password_User")
    .notEmpty().withMessage("password_User must not be empty")
    .isString().withMessage("password_User must be a string")
    .isLength({ max: 255 }).withMessage("password_User must have a maximum of 255 characters"),

]