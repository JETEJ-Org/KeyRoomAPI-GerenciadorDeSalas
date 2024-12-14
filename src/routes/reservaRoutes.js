import {
    verificarConflito,
    listarReservas,
    novaReserva,
    atualizarReserva,
    deletarReserva
} from "../controllers/reservaController.js";

const routes = (app) => {
    app.get("/reservas", listarReservas);
    app.post("/reservas", verificarConflito, novaReserva);
    app.put("/reservas/:id", atualizarReserva);
    app.delete("/reservas/:id", deletarReserva);
}

export default routes;
