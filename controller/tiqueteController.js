import mongoose from 'mongoose';
import Tiquete from '../models/tiquete.js'; 

// Listar tiquetes
export async function getTiquete(req, res) {
    try {
        const cuentas = await Tiquete.find(); 
        res.json(cuentas); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tiquetes' });
    }
}

// Crear tiquete
export async function PostTiquete(req, res) {
    const { valor } = req.body; 

    try {
        if (valor <= 0) {
            return res.status(400).json({ message: 'El valor debe ser mayor a 0' });
        }

        const newTiquete = new Tiquete(req.body); 
        const savedTiquete = await newTiquete.save();

        res.status(201).json(savedTiquete); 
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el tiquete' });
    }
}

// Editar tiquete
export async function putTiquete(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID no válido' });
    }

    const { valor } = req.body;

    if (valor <= 0) {
        return res.status(400).json({ message: 'El valor debe ser mayor a 0' });
    }

    try {
        const tiquete = await Tiquete.findByIdAndUpdate(id, req.body, { new: true });

        if (!tiquete) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }

        res.json({ message: 'Tiquete actualizado exitosamente', tiquete });
    } catch (error) {
        res.status(500).json({ message: 'Problemas al actualizar el tiquete' });
    }
}

// Eliminar tiquete
export async function DeleteTiquete(req, res) {
    const id = req.params.id;
    try {
        const tiquete = await Tiquete.findByIdAndDelete(id);
        if (!tiquete) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }
        res.json({ message: 'Tiquete eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tiquete' });
    }
}

// Consultar un tiquete por ID
export async function getTiqueteById(req, res) {
    const id = req.params.id;
    try {
        const tiquete = await Tiquete.findById(id);

        if (!tiquete) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }

        res.json(tiquete);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el tiquete' });
    }
}

// Consultar tiquetes por origen
export async function getTiqueteByOrigen(req, res) {
    const { origen } = req.params;
    try {
        const tiquetes = await Tiquete.find({ origen });
        if (tiquetes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tiquetes para ese origen' });
        }

        res.json(tiquetes);
    } catch (error) {
        res.status(500).json({ message: 'Problemas al obtener los tiquetes por origen' });
    }
}

// Método que permite sumar todos los valores de los tiquetes
export async function getTotalTiquete(req, res) {
    try {
        const total = await Tiquete.aggregate([{ $group: { _id:null, total: { $sum: "$valor" } } }]);
        res.json(total.length > 0 ? total[0].total : 0);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el total de tiquetes' });
    }
}

// Método para consultar la cantidad de tiquetes
export async function getCountTiquete(req, res) {
    try {
        const count = await Tiquete.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al obtener la cantidad de tiquetes' });
    }
}
