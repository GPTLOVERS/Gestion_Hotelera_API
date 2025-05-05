import jwt from 'jsonwebtoken';
import Usuario from "../usuarios/usuarios.model.js"

export const validateJWT = async (req, res, next) => {

    try{
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token not found"
            })
        };

        token = token.replace(/^Bearer\s+/, "");

        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(400).json({
                success: false,
                message: "El usuario no existe en la base de datos"
            }) 
        }

        if(usuario.status === false){
            return res.status(400).json({
                success: false,
                message: "Usuario desactivado anteriormente"
            })
        }

        req.usuario = usuario
        next()


    }catch(error){
        return res.status(500).json({
            success: false,
            message : "Error al validar el token",
            error: error.message
        })
    }

}