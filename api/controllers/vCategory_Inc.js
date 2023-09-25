import { body } from "express-validator";

export const vCategory_Inc = [

    body("name_Category_Inc")
    .notEmpty().withMessage("name_Category_Inc must not be empty")
    .isString().withMessage("name_Category_Inc must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("name_Category_Inc must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_Category_Inc must have a maximum of 45 characters"),

    body("description_Category_Inc")
    .notEmpty().withMessage("description_Category_Inc must not be empty")
    .isString().withMessage("description_Category_Inc must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s'"!?-]+$/).withMessage("description_Category_Inc must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 600 }).withMessage("description_Category_Inc must have a maximum of 600 characters")
]