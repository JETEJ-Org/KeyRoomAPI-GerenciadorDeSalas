import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
    sala_id: {
        type: mongoose.Schema.Types.ObjectId,
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
    horario: {
        inicio: {
            type: String,
            required: [true, 'O campo horário de início é obrigatório.']
        },
        termino: {
            type: String,
            required: [true, 'O campo horário de término é obrigatório.']
        }
    },
    detalhes: { type: String }
}, { timestamps: true, versionKey: false });

const Reserva = mongoose.model('Reserva', reservaSchema, 'reservas');

export default Reserva;