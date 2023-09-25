import { body } from "express-validator";

export const vDocument_type = [

    body("name_Document")
    .notEmpty().withMessage("name_Document must not be empty")
    .isString().withMessage("name_Document must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("name_Document must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_Document must have a maximum of 45 characters"),

    body("abbreviation_Document")
    .notEmpty().withMessage("abbreviation_Document must not be empty")
    .isString().withMessage("abbreviation_Document must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s'"!?-]+$/).withMessage("abbreviation_Document must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 10 }).withMessage("abbreviation_Document must have a maximum of 10 characters")
]