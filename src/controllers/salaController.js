import Sala from '../models/salaModels.js';

export async function listarSalas(req, res) {
    try {
        const salas = await Sala.find();
        res.json(salas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function novaSala(req, res) {
    try {
        const { sala, tipo, capacidade, local } = req.body;
        const salaExiste = await Sala.findById(sala);
        if (salaExiste) {
            return res.status(400).json({ error: 'Sala já cadastrada' });
        }
        const _id = sala;
        const novaSala = new Sala({ _id, tipo, capacidade, local });
        const salaCriada = await novaSala.save();
        res.status(201).json(salaCriada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function verificarSalaPeloID(req, res) {
    try {
        const { id } = req.params;
        const sala = await Sala.findById(id);
        if (sala) {
            res.status(200).json(sala);
        } else {
            res.status(404).json({ error: 'Sala não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function atualizarSala(req, res) {
    try {
        const { id } = req.params;
        const { tipo, capacidade, local } = req.body;
        const salaAtualizada = await Sala.findByIdAndUpdate(id, { tipo, capacidade, local }, { new: true, runValidators: true });
        if (salaAtualizada) {
            res.status(200).json(salaAtualizada);
        } else {
            res.status(404).json({ error: 'Sala não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deletarSala(req, res) {
    try {
        const { id } = req.params;
        const salaRemovida = await Sala.findByIdAndDelete(id);
        if (salaRemovida) {
            res.status(200).json({ message: `Sala ${id}: deletada com sucesso` });
        } else {
            res.status(404).json({ error: 'Sala não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}