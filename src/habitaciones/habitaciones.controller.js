import Habitaciones from './habitaciones.model.js';

export const listarHabitaciones = async (req, res) => {
    try{
        const habitaciones = await Habitaciones.find().populate('usuario', 'nombre').populate('serviciosAdicionales', 'nombre').populate('eventos', 'nombre')
        res.status(200).json({
            msg: 'Lista de habitaciones',
            habitaciones
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Error al listar las habitaciones'
        })
    }
}

export const crearHabitacion = async (req, res) => {
    try{
        const {numero, categoria, precio} = req.body
        const habitacion = new Habitaciones({numero, categoria, precio})
        await habitacion.save()
        res.status(201).json({
            msg: 'Habitacion creada',
            habitacion
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Error al crear la habitacion'
        })
    }
}