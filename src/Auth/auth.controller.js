import { hash, verify } from "argon2";
import Usuario from "../usuarios/usuarios.model.js"
import { generateJWT } from "../helpers/generate-jwr.js";

export const register = async(req,res) =>{
    try{
        const data = req.body

        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPass = await hash(data.contraseña);
        data.contraseña = encryptedPass;
        data.profilePicture = profilePicture;
        const usuario = await Usuario.create(data)

        return res.status(201).json({
            message: "Usuario a sido creado con éxito",
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.roles
        })
    }catch(error){
        return res.status(500).json({
            message: "Error al crear un usuario",
            error: error.message
        })
    }
}

export const login = async(req,res) =>{
    const {correo, userName, contraseña} = req.body
    try{
        const usuario = await Usuario.findOne({ 
        $or: [
            {correo : correo},
            {userName: userName}
        ]
        })

        if(!usuario){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "no existe el usuario o crreo electrónico"
            })
        };

        const validcontraseña = await verify(usuario.contraseña, contraseña);

        if(!validcontraseña){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(usuario.id);

        return res.status(200).json({
            message: "Login succeful",
            detallesDelUsuario: {
                token: token,
                profilePicture: usuario.profilePicture
            }
        })

    }catch(err){
        return res.status(500).json({ 
            message: "login failed, server Error",
            error: err.message
        })    
    }
}