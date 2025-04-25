import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-roles.js";
import { body, param } from "express-validator";

export const obtenerHotelValidator = [
    //validateJWT,
    //hasRoles('ADMIN_ROLE', 'USER_ROLE'),
    param('id').notEmpty().withMessage('El ID del hotel es obligatorio')
        .isMongoId().withMessage('El ID debe ser un identificador válido de MongoDB')
];

export const crearHotelValidator = [
    //validateJWT,
    //hasRoles('ADMIN_ROLE'),
    body('nombre').notEmpty().withMessage('El nombre del hotel es obligatorio'),
    body('direccion').notEmpty().withMessage('La dirección del hotel es obligatoria'),
    body('categoria').notEmpty().withMessage('La categoría del hotel es obligatoria'),
    body('precioPromedio')
        .notEmpty().withMessage('El precio promedio es obligatorio')
        .isNumeric().withMessage('El precio promedio debe ser un número'),
    body('descripcion').notEmpty().withMessage('La descripción del hotel es obligatoria'),
    body('comodidades').isArray().withMessage('Las comodidades deben ser un arreglo'),
    body('estado')
        .optional()
        .isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo"')
];

export const editarHotelValidator = [
    //validateJWT,
    //hasRoles('ADMIN_ROLE'),
    param('id').notEmpty().withMessage('El ID del hotel es obligatorio')
        .isMongoId().withMessage('El ID debe ser un identificador válido de MongoDB'),
    body('nombre').optional().notEmpty().withMessage('El nombre del hotel no puede estar vacío'),
    body('direccion').optional().notEmpty().withMessage('La dirección no puede estar vacía'),
    body('categoria').optional().notEmpty().withMessage('La categoría no puede estar vacía'),
    body('precioPromedio')
        .optional()
        .isNumeric().withMessage('El precio promedio debe ser un número'),
    body('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
    body('comodidades').optional().isArray().withMessage('Las comodidades deben ser un arreglo'),
    body('estado')
        .optional()
        .isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo"')
];