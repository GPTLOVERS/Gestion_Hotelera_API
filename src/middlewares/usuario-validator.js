import { body } from "express-validator";
import { emailExist, userNameExist, uidExist } from "../helpers/db-validators.js";
import {validationsFields} from "../middlewares/fields-validator.js"
import { catchErrors } from "./catch-errors.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("nombre").not().isEmpty().withMessage("Name is required"),
    body("userName").not().isEmpty().withMessage("userName is required").custom(userNameExist),
    body("correo").not().isEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").custom(emailExist),
    validationsFields,
    catchErrors
];

export const loginValidator = [
    body("correo").optional().isEmail().withMessage("Invalid email"),
    body("userName").optional(),
    body("contraseña").notEmpty().withMessage("The password need have 8 characteres"),
    validationsFields,
    catchErrors
];
