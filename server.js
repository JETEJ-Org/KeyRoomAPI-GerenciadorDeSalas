import express from "express";
import roomRoutes from "./src/routes/roomRoutes.js";
import authRoutes from "./src/routes/AuthRoutes.js";

const app = express();
app.use(express.json());

// Rotas
roomRoutes(app);
authRoutes(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});