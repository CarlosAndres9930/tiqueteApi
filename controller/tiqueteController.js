import Tiquete from '../models/tiquete.js'; // Importar el modelo del tiquete

//que permita listar los tiquetes
export async function getTiquete(req, res) {
    try {
        const cuentas = await Tiquete.find(); // Buscar todos los tiquetes en la base de datos
        res.json(cuentas); // Enviar los tiquetes como respuesta en formato JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tiquetes' }); // Manejo de errores
    }
}

// crear tiquete
export async function PostTiquete(req, res) {
    const { valor } = req.body; // Desestructurar valor del cuerpo de la solicitud

    try {
        // Verificar que el valor sea mayor a 0
        if (valor <= 0) {
            return res.status(400).json({ message: 'El valor debe ser mayor a 0' });
        }

        // Crear una nueva instancia de 'Tiquete' solo si el valor es válido
        const newTiquete = new Tiquete(req.body); 
        const savedTiquete = await newTiquete.save(); // Guardar el tiquete en la base de datos

        res.status(201).json(savedTiquete); // Enviar el tiquete creado como respuesta con un código de estado 201
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el tiquete' }); // Manejo de errores
    }
}


// editar tiquete
export async function PutTiquete(req, res) {
    try {
        const id = req.params.id; // Obtener el id del tiquete a editar
        const tiquete = await Tiquete.findByIdAndUpdate(id, req.body, { new: true });
        res.json(tiquete); // Enviar el tiquete editado como respuesta
    }
    catch(error){
        res.status(500).json({ message: 'Error al editar el tiquete' });
    }
}

// eliminar tiquete
export async function DeleteTiquete(req, res) {
    try {
        const id = req.params.id; // Obtener el id del tiquete a eliminar
        await Tiquete.findByIdAndDelete(id); // Eliminar el tiquete de la base de datos
        res.json({ message: 'Tiquete eliminado con éxito' });
    }
    catch(error){
        res.status(500).json({ message: 'Error al eliminar el tiquete' });
    }
}

// Consultar un tiquete por ID
export async function getTiqueteById(req, res) {
    try {
        const id = req.params.id; // Obtener el id del tiquete a consultar
        const tiquete = await Tiquete.findById(id); // Buscar el tiquete en la base de datos

        if (!tiquete) {
            return res.status(404).json({ message: 'Tiquete no encontrado' }); // Manejo de caso no encontrado
        }

        res.json(tiquete); // Enviar el tiquete encontrado como respuesta
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el tiquete' }); // Manejo de errores
    }
}
