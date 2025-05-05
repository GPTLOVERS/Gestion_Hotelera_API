import { body, param } from "express-validator";
import { uidExistE } from "../helpers/db-validators.js";
import { validationsFields } from "../middlewares/fields-validator.js";
import { catchErrors } from "./catch-errors.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-token.js";

export const crearEventoValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE', 'USER_ROLE'),
    body('nombre').notEmpty().withMessage('El nombre del evento es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripcion del evento es obligatoria'),
    body('fecha').notEmpty().withMessage('La fecha del evento es obligatoria'),
    body('horaInicio').notEmpty().withMessage('La hora inicial del evento es obligatoria'),
    body('horaFin').notEmpty().withMessage('La hora final del evento es obligatoria'),
    //body('serviciosAdicionales').notEmpty().withMessage('El servicio adicional del evento es obligatorio'),
    //body('habitaciones').notEmpty().withMessage('La habitacion del evento es obligatoria'),
    validationsFields,
    catchErrors
]
export const listarEventosValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    //validationsFields,
    catchErrors
]

export const editarEventoValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param('uid').isMongoId().withMessage('No es un ID válido de MongoDB'),
    param('uid').custom(uidExistE),
    validationsFields,
    catchErrors
]

export const eliminarEventoValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param('uid').isMongoId().withMessage('No es un ID válido de MongoDB'),
    param('uid').custom(uidExistE),
    validationsFields,
    catchErrors
]