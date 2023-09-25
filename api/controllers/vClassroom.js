import { body } from "express-validator";

export const vClassroom = [

    body("name_Classroom")
    .notEmpty().withMessage("name_Classroom must not be empty")
    .isString().withMessage("name_Classroom must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("name_Classroom must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_Classroom must have a maximum of 45 characters"),

    body("description_Classroom")
    .notEmpty().withMessage("description_Classroom must not be empty")
    .isString().withMessage("description_Classroom must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s'"!?-]+$/).withMessage("description_Classroom must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 600 }).withMessage("description_Classroom must have a maximum of 600 characters"),

    body("classroom_Area")
    .notEmpty().withMessage("classroom_Area must not be empty")
    .isNumeric().withMessage("classroom_Area must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("classroom_Area must be a positive number")
        }
        return true;
    }),
]