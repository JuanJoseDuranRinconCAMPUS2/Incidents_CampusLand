import { body } from "express-validator";

export const vUserCreation = [

    body("name_User")
    .notEmpty().withMessage("name_User must not be empty")
    .isString().withMessage("name_User must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("name_User must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_User must have a maximum of 45 characters"),

    body("typeDoc_User")
    .notEmpty().withMessage("typeDoc_User must not be empty")
    .isNumeric().withMessage("typeDoc_User must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("typeDoc_User must be a positive number")
        }
        return true;
    }),

    body("identification_User")
    .notEmpty().withMessage("identification_User must not be empty")
    .isNumeric().withMessage("identification_User must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("identification_User must be a positive number")
        }
        return true;
    }),

    body("age_User")
    .notEmpty().withMessage("age_User must not be empty")
    .isNumeric().withMessage("age_User must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("age_User must be a positive number")
        }
        return true;
    }),

    body('email_User')
    .isString().withMessage("email_User must be a string")
    .isEmail().withMessage('email_User must be a valid email address')
    .isLength({ max: 250 }).withMessage('email_User must have a maximum of 250 characters')
    .notEmpty().withMessage('email_User must not be empty'),

    body("password_User")
    .notEmpty().withMessage("password_User must not be empty")
    .isString().withMessage("password_User must be a string")
    .isLength({ max: 255 }).withMessage("password_User must have a maximum of 255 characters"),

    body('versions_User')
    .isArray().withMessage('versions_User must be a array'),

    body('roles_User')
    .isArray().withMessage('roles_User must be a array')
    .custom((value) => {
        for (const item of value) {
            if (typeof item !== 'string' || !item.match(/^(CsWscEhspi6896|CsWscGexsiv6578|CsWscXvepmrk0769|YsWscQ1t3735|YsWscQ2v9865|YsWscQ3z9dc3|YsWscN1t0141|YsWscN2v3265|YsWscN3z7he8|YsWscR1x6891|YsWscR2x02a2)$/)) {
                throw new Error('roles_User elements must be valid codes.');
            }
        }
        return true;
    }),

    body("cellphone_User")
    .notEmpty().withMessage("cellphone_User must not be empty")
    .isNumeric().withMessage("cellphone_User must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("cellphone_User must be a positive number")
        }
        return true;
    }),

    body("gender_User")
    .notEmpty().withMessage("gender_User must not be empty")
    .isNumeric().withMessage("gender_User must be a number")
    .custom(value => {
        if (parseInt(value) <= 0 || !(typeof value == "number")) {
            throw new Error("gender_User must be a positive number")
        }
        return true;
    })
]

export const vUserDeletion = [

    body("name_User")
    .notEmpty().withMessage("name_User must not be empty")
    .isString().withMessage("name_User must be a string")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/).withMessage("name_User must only contain alphanumeric characters, spaces and specific accented characters.")
    .isLength({ max: 45 }).withMessage("name_User must have a maximum of 45 characters"),

]