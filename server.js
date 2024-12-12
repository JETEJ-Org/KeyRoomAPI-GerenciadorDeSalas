import express from 'express';

const app = express();
app.use(express.json());

let reservations = [];

// Middleware para verificar conflitos de horário
const verificarConflito = (req, res, next) => {
  const { sala_id, data, horario_inicio, horario_termino } = req.body;
  const inicio = new Date(`${data}T${horario_inicio}`);
  const termino = new Date(`${data}T${horario_termino}`);

  const conflito = reservations.some(reserva => {
    const inicioReserva = new Date(`${reserva.data}T${reserva.horario_inicio}`);
    const terminoReserva = new Date(`${reserva.data}T${reserva.horario_termino}`);

    return (
      reserva.sala_id === sala_id &&
      reserva.data === data &&
      !(termino <= inicioReserva || inicio >= terminoReserva)
    );
  });

  if (conflito) {
    return res.status(409).json({ message: 'Conflito de horário com outra reserva' });
  } else {
    next();
  }
};

const novaReserva = (req, res) => {
  const { sala_id, data, horario_inicio, horario_termino, detalhes } = req.body;
  const reservation = { sala_id, data, horario_inicio, horario_termino, detalhes };
  reservations.push(reservation);
  res.status(201).json(reservation);
};

const listarReserva = (req, res) => {
  res.json(reservations);
};

const deletarReserva = (req, res) => {
  const sala_id = req.params.sala_id;
  const index = reservations.findIndex(reservation => reservation.sala_id === sala_id);
  if (index !== -1) {
    const reservaRemovida = reservations.splice(index, 1);
    res.json(reservaRemovida[0]);
  } else {
    res.status(404).json({ message: 'Reserva não encontrada' });
  }
};

app.post('/reservas', verificarConflito, novaReserva);
app.get('/reservas', listarReserva);
app.delete('/reservas/:sala_id', deletarReserva);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// AInda vou adicionar a função de procurar a reserva por id
// Quando adicionar o banco de dados, precisarei realizar algumas alterações.