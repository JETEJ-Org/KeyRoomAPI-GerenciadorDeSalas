import {
    addNewRoom,
    getRooms,
    getRoomWithID,
    updateRoom,
    deleteRoom
} from "../controllers/roomController.js";

const routes = (app) => {
    app.get("/room", getRooms);
    app.post("/room", addNewRoom);
    app.get("/room/:RoomID", getRoomWithID);
    app.put("/room/:RoomID", updateRoom);
    app.delete("/room/:RoomID", deleteRoom);
}

export default routes;