import mongoose from 'mongoose';

const salaSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'O campo sala é obrigatório.']
    },
    tipo: {
        type: String,
        required: [true, 'O campo tipo é obrigatório.']
    },
    capacidade: {
        type: Number,
        required: [true, 'O capacidade capacidade é obrigatório.']
    },
    local: {
        type: String,
        required: [true, 'O campo local é obrigatório.']
    },
}, { timestamps: true, versionKey: false });

const Sala = mongoose.model('Sala', salaSchema, 'salas');

export default Sala;
