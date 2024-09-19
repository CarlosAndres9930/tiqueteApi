import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const tiqueteSchema = new Schema({
    numeroTiquete: { 
        type: Number,
        unique: true
    },
    valor: {
        type: Number,
        required: true
    },
    impuesto: {
        type: Number,
        required: true,
        default: function() {
            return this.valor * 0.16;
        }
    },
    documentoPasajero: { 
        type: String, 
        required: true 
    },
    nombrePasajero: {
        type: String,
        required: true
    },
    placaVehiculo: {
        type: String,
        required: true
    },
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    }
});

tiqueteSchema.plugin(AutoIncrement, { inc_field: 'numeroTiquete' });
const Tiquete = mongoose.model('Tiquete', tiqueteSchema, 'tiquete');
export default Tiquete
