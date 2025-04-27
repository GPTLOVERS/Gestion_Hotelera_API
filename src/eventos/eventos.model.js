import { Schema, model } from 'mongoose';

const eventosSchema = new Schema({
    nombre:{
        type: String,
        required: [true, "Name is requiered"],
        maxLength: [35, "Name cannot exceed 25 characteres"],
    },
    descripcion:{
        type: String,
        required: [true, "Description is required"],
    },
    fecha:{
        type: Date,
        required: [true, "Date is required"],
    },
    horaInicio:{
        type: String,
        required: [true, "Start time is required"],
        maxLength: [5, "Start time cannot exceed 5 characteres"],
    },
    horaFin:{
        type: String,
        required: [true, "End time is required"],
        maxLength: [5, "End time cannot exceed 5 characteres"],
    },
    serviciosAdicionales:{
        type: Schema.Types.ObjectId,
        ref: "ServiciosAdicionales",
        default: []
    },
    habitaciones:[{
        type: Schema.Types.ObjectId,
        ref: 'Habitaciones',
        default: []
    }],
}, {
    versionKey: false,
    timeStamps: true
});

eventosSchema.methods.toJSON = function(){
    const {_id, ...eventos} = this.toObject()
    eventos.uid = _id
    return eventos;
}

export default model("Eventos", eventosSchema);
