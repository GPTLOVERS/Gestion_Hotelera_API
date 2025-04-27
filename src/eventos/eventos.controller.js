import Eventos from './eventos.model.js';

export const crearEvento = async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data.serviciosAdicionales) && data.serviciosAdicionales.length === 0) {
            data.serviciosAdicionales = undefined;
        }

        const evento = new Eventos(data);
        await evento.save();
        
        res.status(201).json({
            success: true,
            message: "Evento creado",
            evento
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear el evento",
            error: error.message
        });
    }
}

export const listarEventos = async (req, res) => {
    try {
        const eventos = await Eventos.find()
            //.populate("serviciosAdicionales", "nombre")
            .populate("habitaciones", "nombre");
        res.status(200).json({
            success: true,
            message: "Lista de eventos",
            eventos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los eventos",
            error: error.message
        });
    }
}

export const editarEvento = async (req, res) => {
    try {
        const { uid } = req.params;
        let data = req.body;
        if (Array.isArray(data.serviciosAdicionales) && data.serviciosAdicionales.length === 0) {
            data.serviciosAdicionales = undefined;
        }

        const evento = await Eventos.findByIdAndUpdate(uid, data, { new: true });
        if (!evento) {
            return res.status(404).json({
                success: false,
                message: "Evento no encontrado",
            });
        }

        res.status(200).json({
            success: true,
            message: "Evento editado",
            evento
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error al editar el evento",
            error: error.message
        });
    }
}

export const eliminarEvento = async (req, res) => {
    try{
        const {uid} = req.params;
        const evento = await Eventos.findByIdAndDelete(uid);
        if(!evento){
            return res.status(404).json({
                success: false,
                message: "Evento no encontrado",
            });
        }
        res.status(200).json({
            success: true,
            message: "Evento eliminado",
            evento
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el evento",
            error: error.message
        });
    }
}