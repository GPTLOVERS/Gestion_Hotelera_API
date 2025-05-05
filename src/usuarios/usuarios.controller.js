import { hash, verify } from "argon2";
import Usuarios from "../usuarios/usuarios.model.js"

export const getUserById = async (req, res) => {
    try{
        const { uid } = req.params;
        const usuario = await Usuarios.findById(uid)

        if(!usuario){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            usuario
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getUsers = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, usuario ] = await Promise.all([
            Usuarios.countDocuments(query),
            Usuarios.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            usuario
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params; 
        const { contraseña, key } = req.body;

        if (uid !== key) {
            return res.status(400).json({
                success: false,
                message: 'No tienes permiso para eliminar este usuario',
            });
        }

        const user1 = await Usuarios.findById(uid);
        if (!user1) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        const requester = await Usuarios.findById(key);
        if (requester.roles === "CLIENT_ROLE") {
            if (user1.roles === "ADMIN_ROLE") {
                return res.status(400).json({
                    success: false,
                    message: 'Los clientes no pueden eliminar a administradores',
                });
            }
        }

        if (requester.roles === "ADMIN_ROLE" && user1.roles === "ADMIN_ROLE" && uid !== key) {
            return res.status(400).json({
                success: false,
                message: 'Los administradores no pueden eliminar a otros administradores',
            });
        }

        const oldPass = await verify(user1.contraseña, contraseña);

        if (!oldPass) {
            return res.status(400).json({
                success: false,
                message: "La contraseña no coincide",
            });
        }

        const user = await Usuarios.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message,
        });
    }
};

export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body

        const user = await Usuarios.findById(uid)

        const matchOldAndNewPassword = await verify(user.contraseña, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Usuarios.findByIdAndUpdate(uid, {contraseña: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { key } = req.body;
        const data = req.body;

        if (uid !== key) {
            return res.status(400).json({
                success: false,
                msg: 'No tienes permiso para actualizar este perfil',
            });
        }

        const userToUpdate = await Usuarios.findById(key);

        if (!userToUpdate) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado',
            });
        }

        if (userToUpdate.roles === "CLIENT_ROLE" && uid === key) {
            return res.status(400).json({
                success: false,
                msg: 'Los clientes no pueden actualizar los perfiles de administradores',
            });
        }

        if (userToUpdate.roles === "ADMIN_ROLE" && uid !== key) {
            return res.status(400).json({
                success: false,
                msg: 'No se puede actualizar el perfil de un administrador',
            });
        }

        const user = await Usuarios.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Usuario actualizado',
            user,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message,
        });
    }
};