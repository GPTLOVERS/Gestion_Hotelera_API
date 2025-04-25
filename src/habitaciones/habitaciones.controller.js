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

export const editarHabitacion = async (req, res) => {
    try{
            //const { usuario } = req; 
            const { hid } = req.params;
            const data = req.body;
            const habitacion = await Habitaciones.findById(hid);
    
            if (!habitacion) {
                return res.status(404).json({
                    success: false,
                    message: "La habitación no existe"
                });
            }
    
            if (data.numero && data.numero !== habitacion.numero) {
                const habitacionExistente = await Habitaciones.findOne({ numero: data.numero });
                if (habitacionExistente) {
                    return res.status(400).json({
                        success: false,
                        message: "El número de habitación ya está en uso"
                    });
                }
            }
    
            if (data.categoria && !['SENCILLA', 'DOBLE', 'SUITE', 'FAMILIAR'].includes(data.categoria)) {
                return res.status(400).json({
                    success: false,
                    message: "Categoría de habitación no válida"
                });
            }
    
            const habitacionActualizada = await Habitaciones.findOneAndUpdate(
                { _id: hid }, { $set: data }, { new: true })
            return res.status(200).json({
                success: true,
                message: "Habitación actualizada correctamente",
                habitacion: habitacionActualizada
            });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Error al editar la habitacion'
        })
    }
}

export const eliminarHabitacion = async (req, res) => {
    try {
        const { hid } = req.params;

        const habitacionEliminada = await Habitaciones.findOneAndDelete({
            _id: hid,
            reservacion: { $ne: true } 
        });

        if (!habitacionEliminada) {
            const habitacionExistente = await Habitaciones.findById(hid);
            
            if (habitacionExistente) {
                return res.status(400).json({
                    success: false,
                    message: "No se puede eliminar una habitación con reservación activa"
                });
            }
            return res.status(404).json({
                success: false,
                message: "La habitación no existe"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Habitación eliminada correctamente"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la habitación",
            error: err.message
        });
    }
};