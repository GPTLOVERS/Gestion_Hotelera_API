import { Router } from "express";
import { crearHabitacionValidator, editarHabitacionValidator, eliminarHabitacionValidator, listarHabitacionesValidator } from "../middlewares/habitaciones-validator.js";
import { crearHabitacion, editarHabitacion, eliminarHabitacion, listarHabitaciones, reservarHabitacion } from "./habitaciones.controller.js";

const router = Router()

router.get('/listarHabitaciones', listarHabitacionesValidator, listarHabitaciones)

router.post('/crearHabitacion', crearHabitacionValidator, crearHabitacion)

router.patch('/reservaciones/:uid', reservarHabitacion)

router.put('/editarHabitacion/:hid', editarHabitacionValidator, editarHabitacion)

router.delete('/eliminarHabitacion/:hid', eliminarHabitacionValidator, eliminarHabitacion)

export default router