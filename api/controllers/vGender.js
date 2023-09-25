import { body } from "express-validator";

export const vGender = [

    body("name_Gender")
    .notEmpty().withMessage("name_Gender must not be empty")
    .isString().withMessage("name_Gender must be a Gender")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("name_Gender must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_Gender must have a maximum of 45 characters"),

    body("abbreviation_Gender")
    .notEmpty().withMessage("abbreviation_Gender must not be empty")
    .isString().withMessage("abbreviation_Gender must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s'"!?-]+$/).withMessage("abbreviation_Gender must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 10 }).withMessage("abbreviation_Gender must have a maximum of 10 characters")
]