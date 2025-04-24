import { Schema } from "mongoose";

const usuariosSchema = Schema({
    nombre: {
        type: String,
        required: [true, "Name is requiered"],
        maxLength: [25, "Name cannot exceed 25 characteres"]
    },
    appellido:{
        type: String,
        required: [true, "Surname is requiered"],
        maxLength: [25, "Surname cannot exceed 25 characteres"]
    },
    userName:{
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    correo: {
        type: String,
        required: [true, "Email is requiered"],
        unique: true,
    },
    contraseña: {
        type: String,
        required: [true, "Password is requiered"]
    },
    telefono: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    habitaciones:[{
        type: Schema.ObjectId,
        ref: 'Habitaciones',
        default: []
    }],
    eventos:[{
        type: Schema.ObjectId,
        ref: 'Eventos',
        default: []
    }],
    roles: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE","CLIENT_ROLE"],
        default: "CLIENT_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    },
},
{
    versionKey: false,
    timeStamps: true
});

usuariosSchema.methods.toJSON = function(){
    const {_v, contraseña, _id, ...usuario} = this.toObject()
    usuario.uid = _id;
    return usuario;
};

export default model("Usuario", usuariosSchema);