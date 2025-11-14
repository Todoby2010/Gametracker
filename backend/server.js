import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar MongoDB:", err));

// Rutas base
app.get("/", (req, res) => {
  res.send("Servidor GameTracker funcionando correctamente 🎮");
});

// Importar rutas
import juegosRoutes from "./rutas/juegos.js";
import resenasRoutes from "./rutas/resenas.js";
app.use("/api/juegos", juegosRoutes);
app.use("/api/resenas", resenasRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));