import { Schema, model } from 'mongoose';

const tiqueteSchema = new Schema({
  nombrePasajero: { 
    type: String, 
    required: true 
  },
  documentoPasajero: { 
    type: String, 
    required: true,
    unique: true
  },
  placaVehiculo: { 
    type: String, 
    unique:true, 
    required: true
  },
  origen: { 
    type: String, 
    required: true 
  },
  destino: { 
    type: String, 
    required: true 
  },
});

export default model('Tiquete', tiqueteSchema, 'tiquete');