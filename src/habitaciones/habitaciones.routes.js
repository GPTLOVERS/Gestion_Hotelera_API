import { Router } from "express";
import { listarHabitaciones } from "./habitaciones.controller.js";
//import { listarHabitacionesValidator } from "../middlewares/habitaciones-validator.js";

const router = Router()

router.get('/listarHabitaciones', listarHabitaciones)

export default router