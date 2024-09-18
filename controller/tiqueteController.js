import Tiquete from '../models/tiquete.js';

// Get all documents from Tiquete collection
export async function getTiquete(req, res) {
    try {
        const tiquetes = await Tiquete.find();
        res.json(tiquetes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error retrieving Tiquetes', error });
    }
}

// Post Create a document in the collection Tiquete
export async function postTiquete(req, res) {
    const body = req.body; // Get the body sent from Postman or a form
    let msg = 'Tiquete inserted successfully';
    
    try {
        const tiquete = new Tiquete(body); // Create the object Tiquete in RAM
        await tiquete.save(); // Insert object in the collection
        res.status(201).json({ msg, tiquete });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Error inserting Tiquete', error });
    }
}

// Put Update a document in the collection Tiquete
export async function putTiquete(req, res) {
    const { id } = req.params; // Get the ID from the route parameters
    const { nombrePasajero, documentoPasajero, placaVehiculo, origen, destino } = req.body; // Destructuring
    let msg = 'Tiquete updated successfully';

    try {
        const updatedTiquete = await Tiquete.findByIdAndUpdate(
            id,
            { nombrePasajero, documentoPasajero, placaVehiculo, origen, destino },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedTiquete) {
            return res.status(404).json({ msg: 'Tiquete not found' });
        }

        res.json({ msg, updatedTiquete });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Error updating Tiquete', error });
    }
}

// Delete a document from the collection Tiquete
export async function deleteTiquete(req, res) {
    const { id } = req.params; // Get the ID from the route parameters
    try {
        const deletedTiquete = await Tiquete.findByIdAndDelete(id);
        if (!deletedTiquete) {
            return res.status(404).json({ msg: 'Tiquete not found' });
        }
        res.json({ msg: 'Tiquete deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error deleting Tiquete', error });
    }
}
