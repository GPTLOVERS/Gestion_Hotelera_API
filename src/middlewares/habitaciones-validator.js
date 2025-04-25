import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-roles.js";
import { body } from "express-validator";

export const listarHabitacionesValidator = [
    /*validateJWT,
    hasRoles('ADMIN_ROLE', 'USER_ROLE')*/
]

export const crearHabitacionValidator = [
    //validateJWT,
    //hasRoles('ADMIN_ROLE'),
    body('numero').notEmpty().withMessage('El numero de la habitacion es obligatorio'),
    body('categoria').notEmpty().withMessage('La categoria de la habitacion es obligatoria'),
    body('precio').notEmpty().withMessage('El precio de la habitacion es obligatorio')
]

export const editarHabitacionValidator = [
    //validateJWT,
    //hasRoles('ADMIN_ROLE')
]

export const eliminarHabitacionValidator = [
    //validateJWT,
    //hasRoles('ADMIN_ROLE')
]