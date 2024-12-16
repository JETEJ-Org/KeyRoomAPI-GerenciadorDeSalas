import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
    sala_id: {
        type: String,
        ref: 'Sala',
        required: [true, 'O campo sala é obrigatório.']
    },
    pessoa: {
        type: String,
        required: [true, 'O campo pessoa é obrigatório.']
    },
    data: {
        type: Date,
        required: [true, 'O campo data é obrigatório.']
    },
    horario_inicio: {
        type: String,
        required: [true, 'O campo horário de início é obrigatório.']
    },
    horario_termino: {
        type: String,
        required: [true, 'O campo horário de término é obrigatório.']
    },
    detalhes: { type: String }
}, { timestamps: true, versionKey: false });

const Reserva = mongoose.model('Reserva', reservaSchema, 'reservas');

export default Reserva;