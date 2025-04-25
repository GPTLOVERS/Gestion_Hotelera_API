import { Router } from "express";
import { listarHabitaciones, crearHabitacion } from "./habitaciones.controller.js";
import { listarHabitacionesValidator, crearHabitacionValidator } from "../middlewares/habitaciones-validator.js";

const router = Router()

router.get('/listarHabitaciones', listarHabitacionesValidator, listarHabitaciones)

router.post('/crearHabitacion', crearHabitacionValidator, crearHabitacion)

export default router