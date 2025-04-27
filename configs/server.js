'use strict'

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "../src/Auth/auth.routes.js";
import eventosRoutes from "../src/eventos/eventos.router.js";
import habitacionesRoutes from "../src/habitaciones/habitaciones.routes.js";
import userRouter from "../src/usuarios/usuarios.routes.js";
import { connectionDB } from "./mongo.js";

const middlewares = (app)  =>{
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"));
}

const routes = (app) => {
    app.use('/gestorDeHoteles/v1/auth', authRoutes)
    app.use('/gestorDeHoteles/v1/usuarios', userRouter)
    app.use('/gestorDeHoteles/v1/habitaciones', habitacionesRoutes)
    app.use('/gestorDeHoteles/v1/eventos', eventosRoutes)
}

const connectionMongo = async() =>{
    try{
        await connectionDB();
    }catch(error){
        console.log(`Data Base connection is failed, please try again ${e}`);
    }
};

export const initServer = () => {
    const app = express();
    const timeInit = Date.now();
    try{
        middlewares(app);
        connectionMongo();
        routes(app);
        app.listen(process.env.PORT);
        const elapsedTime = Date.now() - timeInit;
        console.log(`Server running on port ${process.env.PORT} ${elapsedTime}ms`);
    }catch(error){
        console.log(`Server failed to start: ${error}`);
    }
};