import { body } from "express-validator";

export const vComputers = [

    body("brand_Computer")
    .notEmpty().withMessage("brand_Computer must not be empty")
    .isString().withMessage("brand_Computer must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("brand_Computer must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 40 }).withMessage("brand_Computer must have a maximum of 40 characters"),

    body("computer_Status")
    .notEmpty().withMessage("computer_Status must not be empty")
    .isNumeric().withMessage("computer_Status must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("computer_Status must be a positive number")
        }
        return true;
    }),

    body("description_Computer")
    .notEmpty().withMessage("description_Computer must not be empty")
    .isString().withMessage("description_Computer must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s'"!?-]+$/).withMessage("description_Computer must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 600 }).withMessage("description_Computer must have a maximum of 600 characters"),

    body("computer_Classroom")
    .notEmpty().withMessage("computer_Classroom must not be empty")
    .isNumeric().withMessage("computer_Classroom must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("computer_Classroom must be a positive number")
        }
        return true;
    }),
]