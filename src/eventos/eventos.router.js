import { Router } from "express";
import { crearEventoValidator, editarEventoValidator, eliminarEventoValidator, listarEventosValidator } from "../middlewares/eventos-validator.js";
import { crearEvento, editarEvento, eliminarEvento, listarEventos } from "./eventos.controller.js";

const router = Router()

router.post('/crearEvento', crearEventoValidator, crearEvento)

router.get('/listarEventos', listarEventosValidator, listarEventos)

router.put('/editarEvento/:uid', editarEventoValidator, editarEvento)

router.delete('/eliminarEvento/:uid', eliminarEventoValidator, eliminarEvento)