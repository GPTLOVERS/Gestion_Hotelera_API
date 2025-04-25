import Hoteles from './hoteles.model.js';

export const obtenerHoteles = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;

        const [total, hoteles] = await Promise.all([
            Hoteles.countDocuments(),
            Hoteles.find()
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('habitaciones')
        ]);

        return res.status(200).json({
            success: true,
            total,
            hoteles
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los hoteles",
            error: err.message
        });
    }
};

export const crearHotel = async (req, res) => {
    try {
        const data = req.body;

        const nuevoHotel = new Hoteles(data);
        await nuevoHotel.save();

        return res.status(201).json({
            success: true,
            message: "Hotel creado exitosamente",
            hotel: nuevoHotel
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear el hotel",
            error: err.message
        });
    }
};


export const actualizarHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const hotelActualizado = await Hoteles.findByIdAndUpdate(id, data, { new: true });

        if (!hotelActualizado) {
            return res.status(404).json({
                success: false,
                message: "Hotel no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hotel actualizado",
            hotel: hotelActualizado
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el hotel",
            error: err.message
        });
    }
};

