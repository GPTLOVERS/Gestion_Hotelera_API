import { Router } from "express";
import { obtenerHoteles, crearHotel, actualizarHotel, } from "./hoteles.controller.js";
import { listarHotelesValidator, crearHotelValidator,  editarHotelValidator, } from "../middlewares/hoteles-validator.js";

const router = Router();

router.get('/obtenerHotel/:id', listarHotelesValidator, obtenerHotelPorId);

router.post('/crearHotel', crearHotelValidator, crearHotel);

router.put('/editarHotel/:id', editarHotelValidator, actualizarHotel);


export default router;