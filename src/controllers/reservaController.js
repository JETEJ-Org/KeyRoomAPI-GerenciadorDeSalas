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

        const sala = await Sala.findOne({ _id: sala_id });

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

        const sala = await Sala.findOne({ _id: reserva.sala_id });
        if (!sala) return res.status(404).json({ message: 'Sala não encontrada' });

        const reservaAtualizada = await Reserva.findByIdAndUpdate(
            id,
            { pessoa, data, horario_inicio, horario_termino, detalhes },
            { new: true, runValidators: true }
        );
        res.status(200).json(reservaAtualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function verificarConflito(req, res, next) {
    const { sala_id, data, horario_inicio, horario_termino } = req.body;

    const diaAtual = dataHoje();
    const horaAtual = horarioAtual();

    function dataHoje() {
        const dataHoje = new Date();
        const ano = dataHoje.getFullYear();
        const mes = String(dataHoje.getMonth() + 1).padStart(2, '0');
        const dia = String(dataHoje.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    function horarioAtual() {
        const dataHoje = new Date();
        const hora = String(dataHoje.getHours()).padStart(2, '0');
        const minuto = String(dataHoje.getMinutes()).padStart(2, '0');
        return `${hora}:${minuto}`;
    }

    if (data < diaAtual || data === diaAtual && horario_inicio < horaAtual) {
        console.log('Data recebida:', data, 'Data de hoje:', diaAtual, 'Hora recebida:', horario_inicio, 'Hora atual:', horaAtual);
        return res.status(400).json({ message: `Não é possível criar reservas no passado` });
    }

    function converterParaMinutos(horario) {
        const [horas, minutos] = horario.split(":").map(Number);
        return horas * 60 + minutos;
    }

    const inicioReservaNova = converterParaMinutos(horario_inicio);
    const terminoReservaNova = converterParaMinutos(horario_termino);

    if (inicioReservaNova >= terminoReservaNova) {
        return res.status(400).json({ message: 'Horário de início deve ser antes do horário de término' });
    }

    try {
        const reservas = await Reserva.find({ sala_id, data });

        if (!reservas.length) {
            return next();
        }

        const reservasConvertidas = reservas.map(reserva => ({
            inicio: converterParaMinutos(reserva.horario_inicio),
            termino: converterParaMinutos(reserva.horario_termino),
        }));

        const conflito = reservasConvertidas.some(({ inicio, termino }) => {
            if (inicioReservaNova <= terminoReservaNova) {
                return inicio < terminoReservaNova && termino > inicioReservaNova;
            }
            return inicio < terminoReservaNova || termino > inicioReservaNova;
        });

        if (conflito) {
            return res.status(409).json({ message: 'Conflito de horário com outra reserva' });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
}
