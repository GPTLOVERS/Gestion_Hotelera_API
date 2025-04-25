import { Router } from "express";
import { obtenerHoteles, crearHotel, editarHotel } from "./hoteles.controller.js"; 
import { obtenerHotelValidator, crearHotelValidator, editarHotelValidator } from "../middlewares/hoteles-validator.js";

const router = Router();

router.get('/obtenerHoteles', obtenerHotelValidator, obtenerHoteles);

router.post('/crearHotel', crearHotelValidator, crearHotel);

router.put('/editarHotel/:id', editarHotelValidator, editarHotel); 

export default router;