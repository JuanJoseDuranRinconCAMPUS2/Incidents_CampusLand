import { body } from "express-validator";

export const vArea = [

    body("name_Area")
    .notEmpty().withMessage("name_Area must not be empty")
    .isString().withMessage("name_Area must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("name_Area must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_Area must have a maximum of 45 characters"),

    body("description_Area")
    .notEmpty().withMessage("description_Area must not be empty")
    .isString().withMessage("descripcion_Area must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s'"!?-]+$/).withMessage("description_Area must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 600 }).withMessage("description_Area must have a maximum of 600 characters")
]