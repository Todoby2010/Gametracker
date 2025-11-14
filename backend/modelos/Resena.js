import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  autor: { type: String, required: true },
  texto: { type: String, required: true }, // 👈 debe ser "texto", no "contenido"
  fecha: { type: Date, default: Date.now },
  estrellas: { type: Number, default: 0, min: 0, max: 5 }
});

export default mongoose.model("Resena", resenaSchema);