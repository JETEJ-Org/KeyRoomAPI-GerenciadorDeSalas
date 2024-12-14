import {
    listarSalas,
    novaSala,
    verificarSalaPeloID,
    atualizarSala,
    deletarSala
} from "../controllers/salaController.js";

const routes = (app) => {
    app.get("/salas", listarSalas);
    app.post("/salas", novaSala);
    app.get("/salas/:id", verificarSalaPeloID);
    app.put("/salas/:id", atualizarSala);
    app.delete("/salas/:id", deletarSala);
}

export default routes;
