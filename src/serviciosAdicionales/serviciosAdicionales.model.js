import { Schema } from "mongoose";

const serviciosAdicionalesSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion: {
        type: String,
    },
    precio: {
        type: Number,
        required: true,
    },
    disponible: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: String,
        enum: ['spa', 'transporte', 'comida', 'entretenimiento', 'otro'],
        default: 'otro'
    },
    habitaciones: [{
        type: Schema.ObjectId,
        ref: 'Habitaciones',
        default: [],
    }],
    eventos:[{
        type: Schema.ObjectId,
        ref: 'Eventos',
        default: []
    }],
    status:{
        type: Boolean,
        default: true
    }
})

serviciosAdicionalesSchema.methods.toJSON = function () {
    const { _id, ...serviciosAdicionales } = this.toObject();
    serviciosAdicionales.id = _id;
    return serviciosAdicionales;
};

export default model('ServiciosAdicionales', serviciosAdicionalesSchema);