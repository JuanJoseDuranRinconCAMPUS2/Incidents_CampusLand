import { check, query } from "express-validator";

export const validatorIds = [
    check("id")
    .notEmpty().withMessage("id must not be empty")
    .isNumeric().withMessage("id must be a number")
    .matches(/^[1-9][0-9]*$/).withMessage("id can only be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number" || "string")) {
            throw new Error("id must be a positive number");
        }
        return true;
    })
]