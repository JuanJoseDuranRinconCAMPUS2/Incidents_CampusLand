import { body } from "express-validator";

export const vIncidents = [

    body("category_Incident")
    .notEmpty().withMessage("category_Incident must not be empty")
    .isNumeric().withMessage("category_Incident must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("category_Incident must be a positive number")
        }
        return true;
    }),

    body("type_Incident")
    .notEmpty().withMessage("type_Incident must not be empty")
    .isNumeric().withMessage("type_Incident must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("type_Incident must be a positive number")
        }
        return true;
    }),

    body("desc_Incident")
    .notEmpty().withMessage("desc_Incident must not be empty")
    .isString().withMessage("desc_Incident must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s'"!?-]+$/).withMessage("desc_Incident must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 600 }).withMessage("desc_Incident must have a maximum of 600 characters"),

    body("solution_Incident")
    .optional({ nullable: true })
    .notEmpty().withMessage("solution_Incident must not be empty")
    .isString().withMessage("solution_Incident must be a string")
    .matches(/^(\d{4})-(\d{2})-(\d{2})$/).withMessage("solution_Incident must have the date format YYYYY-MM-DD")
    .isLength({ max: 10 }).withMessage("solution_Incident must have a maximum of 10 characters"),

    body("desc_Solution_Incident")
    .optional({ nullable: true })
    .notEmpty().withMessage("desc_Solution_Incident must not be empty")
    .isString().withMessage("desc_Solution_Incident must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s'"!?-]+$/).withMessage("desc_Solution_Incident must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 600 }).withMessage("desc_Solution_Incident must have a maximum of 600 characters"),

    body("area_Incident")
    .notEmpty().withMessage("area_Incident must not be empty")
    .isNumeric().withMessage("area_Incident must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("area_Incident must be a positive number")
        }
        return true;
    }),

    body("classroom_Incident")
    .notEmpty().withMessage("classroom_Incident must not be empty")
    .isNumeric().withMessage("classroom_Incident must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("classroom_Incident must be a positive number")
        }
        return true;
    }),

    body("user_Incident")
    .notEmpty().withMessage("user_Incident must not be empty")
    .isNumeric().withMessage("user_Incident must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("user_Incident must be a positive number")
        }
        return true;
    }),

    body("pc_Incident")
    .optional({ nullable: true })
    .notEmpty().withMessage("pc_Incident must not be empty")
    .isNumeric().withMessage("pc_Incident must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("pc_Incident must be a positive number")
        }
        return true;
    }),

    body("peripheral_Incident")
    .optional({ nullable: true })
    .notEmpty().withMessage("peripheral_Incident must not be empty")
    .isString().withMessage("peripheral_Incident must be a string")
    .matches(/^(Keyboards|Mouses|Diadems_Gamers|Screens)$/).withMessage("peripheral_Incident must be a 'Keyboards', 'Mouses', 'Diadems_Gamers' or 'Screens'.")
    .isLength({ max: 25 }).withMessage("peripheral_Incident must have a maximum of 25 characters"),

    body("status_Incident")
    .optional({ nullable: true })
    .notEmpty().withMessage("status_Incident must not be empty")
    .isString().withMessage("status_Incident must be a string")
    .matches(/^(Pending|In progress|Solved)$/).withMessage("status_Incident must be a 'Pending', 'In progress' or 'Solved'.")
    .isLength({ max: 25 }).withMessage("status_Incident must have a maximum of 25 characters"),

]

export const vIncidentsPerDate = [

    body("start_Date")
    .notEmpty().withMessage("start_Date must not be empty")
    .isString().withMessage("start_Date must be a string")
    .matches(/^(\d{4})-(\d{2})-(\d{2})$/).withMessage("start_Date must have the date format YYYYY-MM-DD")
    .isLength({ max: 10 }).withMessage("start_Date must have a maximum of 10 characters"),

    body("end_Date")
    .notEmpty().withMessage("end_Date must not be empty")
    .isString().withMessage("end_Date must be a string")
    .matches(/^(\d{4})-(\d{2})-(\d{2})$/).withMessage("end_Date must have the date format YYYYY-MM-DD")
    .isLength({ max: 10 }).withMessage("end_Date must have a maximum of 10 characters"),

    body("filter_Date")
    .notEmpty().withMessage("filter_Date must not be empty")
    .isString().withMessage("filter_Date must be a string")
    .matches(/^(solutionDate|incidentDate)$/).withMessage("filter_Date must be 'solutionDate' or 'incidentDate'")
    .isLength({ max: 15 }).withMessage("filter_Date must have a maximum of 15 characters"),

]

export const vIncidentsPerPC = [

    body("pc_Incident")
    .optional({ nullable: true })
    .notEmpty().withMessage("pc_Incident must not be empty")
    .isNumeric().withMessage("pc_Incident must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("pc_Incident must be a positive number")
        }
        return true;
    }),

    body("end_Date")
    .notEmpty().withMessage("end_Date must not be empty")
    .isString().withMessage("end_Date must be a string")
    .matches(/^(\d{4})-(\d{2})-(\d{2})$/).withMessage("end_Date must have the date format YYYYY-MM-DD")
    .isLength({ max: 10 }).withMessage("end_Date must have a maximum of 10 characters"),

    body("filter_Date")
    .notEmpty().withMessage("filter_Date must not be empty")
    .isString().withMessage("filter_Date must be a string")
    .matches(/^(solutionDate|incidentDate)$/).withMessage("filter_Date must be 'solutionDate' or 'incidentDate'")
    .isLength({ max: 15 }).withMessage("filter_Date must have a maximum of 15 characters"),

]