import { Router } from "express";
import { listarHabitaciones, crearHabitacion, editarHabitacion, eliminarHabitacion, reservarHabitacion } from "./habitaciones.controller.js";
import { listarHabitacionesValidator, crearHabitacionValidator, editarHabitacionValidator,
    eliminarHabitacionValidator
} from "../middlewares/habitaciones-validator.js";

const router = Router()

router.get('/listarHabitaciones', listarHabitacionesValidator, listarHabitaciones)

router.post('/crearHabitacion', crearHabitacionValidator, crearHabitacion)

router.patch('/reservaciones/:uid', reservarHabitacion)

router.put('/editarHabitacion/:hid', editarHabitacionValidator, editarHabitacion)

router.delete('/eliminarHabitacion/:hid', eliminarHabitacionValidator, eliminarHabitacion)

export default router