import express from "express";

import {
    registerUser,
    loginUser
} from "../controllers/userController.js";

const routes = (app) => {
    app.post("/register", registerUser);
    app.post("/login", loginUser);
}

export default routes;