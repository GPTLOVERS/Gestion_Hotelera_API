import { Schema, model } from 'mongoose';

const hotelesSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    precioPromedio: {
        type: Number,
        required: true,
    },
    comodidades: [{
        type: String,
        default: [],
    }],
    descripcion: {
        type: String,
        required: true,
    },
    habitaciones: [{
        type: Schema.ObjectId,
        ref: 'Habitaciones',
        default: [],
    }],
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo',
    },
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
});

hotelesSchema.methods.toJSON = function () {
    const { _id, ...hotel } = this.toObject();
    hotel.id = _id;
    return hotel;
};

export default model('Hoteles', hotelesSchema);