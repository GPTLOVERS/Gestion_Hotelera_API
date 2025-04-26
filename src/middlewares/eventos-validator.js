import { body, param } from "express-validator";
import { catchErrors } from "./catch-errors.js";
import { validarCampos } from "./validar-campos.js";
import { hasRoles } from "./validate-roles";
import { validateJWT } from "./validate-token";

export const crearEventoValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE, USER_ROLE'),
    body('nombre').notEmpty().withMessage('El nombre del evento es obligatorio'),
    body('fecha').notEmpty().withMessage('La fecha del evento es obligatoria'),
    body('hora').notEmpty().withMessage('La hora del evento es obligatoria'),
    body('duracion').notEmpty().withMessage('La duracion del evento es obligatoria'),
    body('tipoEvento').notEmpty().withMessage('El tipo de evento es obligatorio'),
    body('capacidad').notEmpty().withMessage('La capacidad del evento es obligatoria'),
    body('precio').notEmpty().withMessage('El precio del evento es obligatorio'),
    validarCampos,
    catchErrors
]
export const listarEventosValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    catchErrors
]

export const editarEventoValidator = [
    validateJWT,
    param('uid').isMongoId().withMessage('No es un ID válido de MongoDB'),
    param('uid').custom(uidExist),
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    catchErrors
]

export const eliminarEventoValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param('uid').isMongoId().withMessage('No es un ID válido de MongoDB'),
    param('uid').custom(uidExist),
    validarCampos,
    catchErrors
]