import { getTodasSalas } from '../models/roomModels.js';

export function getRooms(req, res) {
    const salas = getTodasSalas();
    res.status(200).json(salas);
}

export function addNewRoom(req, res) {
    res.status(200).json("salas");
}

export function getRoomWithID(req, res) {
    res.status(200).json(`salas ${req.params.RoomID}`);
}

export function deleteRoom(req, res) {
    res.status(200).json(`salas ${req.params.RoomID}`);
}

export function updateRoom(req, res) {
    res.status(200).json(`salas ${req.params.RoomID}`);
}