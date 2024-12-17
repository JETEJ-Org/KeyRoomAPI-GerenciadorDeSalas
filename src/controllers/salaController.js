import Sala from '../models/salaModels.js';
import mongoose from 'mongoose';

export async function listarSalas(req, res) {
    try {
        const salas = await Sala.find();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function novaSala(req, res) {
    try {
        const { sala, tipo, capacidade, local } = req.body;

        if (!sala || !tipo || !capacidade || !local) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const salaExiste = await Sala.findOne({ _id: sala });
        if (salaExiste) {
            return res.status(409).json({ error: 'Sala já cadastrada' });
        }

        const novaSala = new Sala({ _id: sala, tipo, capacidade, local });
        const salaCriada = await novaSala.save();
        res.status(201).json(salaCriada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function verificarSalaPeloID(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

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

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

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

        console.log(`Tentando deletar sala com _id: ${id}`);

        const salaRemovida = await Sala.findByIdAndDelete(id);

        if (salaRemovida) {
            console.log(`Sala com _id: ${id} deletada com sucesso`);
            res.status(200).json({ message: `Sala com código ${id} foi deletada com sucesso.` }); 
        } else {
            console.warn(`Sala com _id: ${id} não encontrada`);
            res.status(404).json({ error: 'Sala não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao deletar sala:', error);
        res.status(500).json({ error: error.message });
    }
}


