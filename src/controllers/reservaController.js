import Reserva from '../models/reservaModels.js';
import Sala from '../models/salaModels.js';

export async function listarReservas(req, res) {
    try {
        const reservas = await Reserva.find();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function novaReserva(req, res) {
    try {
        const { sala_id, pessoa, data, horario_inicio, horario_termino, detalhes } = req.body;
        const sala = await Sala.findById(sala_id);

        if (!sala) return res.status(404).json({ message: 'Sala não encontrada' });
        const novaReserva = new Reserva({ sala_id, pessoa, data, horario_inicio, horario_termino, detalhes });
        const reservaCriada = await novaReserva.save();
        res.status(201).json(reservaCriada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deletarReserva(req, res) {
    try {
        const { id } = req.params;
        const reservaRemovida = await Reserva.findByIdAndDelete(id);

        if (reservaRemovida) {
            res.status(200).json({ message: 'Reserva removida com sucesso' });
        } else {
            res.status(404).json({ message: 'Reserva não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function atualizarReserva(req, res) {
    try {
        const { id } = req.params;
        const { pessoa, data, horario_inicio, horario_termino, detalhes } = req.body;

        const reserva = await Reserva.findById(id);
        if (!reserva) return res.status(404).json({ message: 'Reserva não encontrada' });

        const sala = await Sala.findById(reserva.sala_id);
        if (!sala) return res.status(404).json({ message: 'Sala não encontrada' });

        const reservaAtualizada = await Reserva.findByIdAndUpdate(id, { pessoa, data, horario_inicio, horario_termino, detalhes }, { new: true, runValidators: true });
        if (reservaAtualizada) {
            res.status(200).json(reservaAtualizada);
        } else {
            res.status(404).json({ message: 'Reserva não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function verificarConflito(req, res, next) {
    const { sala_id, data, horario_inicio, horario_termino } = req.body;
    const inicio = new Date(`${data}T${horario_inicio}`);
    const termino = new Date(`${data}T${horario_termino}`);

    try {
        const reservas = await Reserva.find({ sala_id, data });

        if (!reservas.length) {
            return next();
        }

        const conflito = reservas.some(reserva => {
            const inicioReserva = new Date(`${reserva.data}T${reserva.horario_inicio}`);
            const terminoReserva = new Date(`${reserva.data}T${reserva.horario_termino}`);

            return (
                reserva.sala_id.toString() === sala_id.toString() &&
                !(termino <= inicioReserva || inicio >= terminoReserva)
            );
        });

        if (conflito) {
            return res.status(409).json({ message: 'Conflito de horário com outra reserva' });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}