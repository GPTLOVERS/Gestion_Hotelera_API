import {Schema, model} from 'mongoose';

const habitacionesSchema = new Schema({
    numero:{
        type: Number,
        required: true,
        unique: true,
    },
    categoria:{
        type: String,
        required: true
    },
    precio:{
        type: String,
        required: true
    },
    reservacion:{
        type: Boolean,
        default: false
    },
    eventos:[{
        type: Schema.ObjectId,
        ref: 'Eventos',
        default: []
    }],
    usuario:{
        type: Schema.ObjectId,
        ref: 'User',
        default: null
    },
})

habitacionesSchema.methods.toJSON = function(){
    const {_id, ...habitaciones} = this.toObject()
    habitaciones.id = _id
    return habitaciones
}

export default model('Habitaciones', habitacionesSchema)
