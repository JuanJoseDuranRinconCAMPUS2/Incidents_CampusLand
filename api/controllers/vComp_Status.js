import { body } from "express-validator";

export const vComp_Status = [

    body("name_Status")
    .notEmpty().withMessage("name_Status must not be empty")
    .isString().withMessage("name_Status must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/).withMessage("name_Status must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_Status must have a maximum of 45 characters"),

    body("description_Status")
    .notEmpty().withMessage("description_Status must not be empty")
    .isString().withMessage("description_Status must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s]+$/).withMessage("description_Status must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 600 }).withMessage("description_Status must have a maximum of 600 characters")
]