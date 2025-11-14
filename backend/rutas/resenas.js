import express from "express";
import Resena from "../modelos/Resena.js";

const router = express.Router();

// Obtener reseñas
router.get("/", async (req, res) => {
  try {
    const resenas = await Resena.find();
    res.json(resenas);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ mensaje: "Error al obtener reseñas" });
  }
});

// Agregar reseña
router.post("/", async (req, res) => {
  try {
    const { juegoId, autor, texto, estrellas } = req.body;
    const nueva = new Resena({ juegoId, autor, texto, estrellas });
    await nueva.save();
    res.json(nueva);
  } catch (error) {
    console.error("Error al guardar reseña:", error);
    res.status(500).json({ mensaje: "Error al guardar reseña" });
  }
});

// Editar reseña
router.put("/:id", async (req, res) => {
  try {
    const actualizada = await Resena.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    console.error("Error al editar reseña:", error);
    res.status(500).json({ mensaje: "Error al editar reseña" });
  }
});

// Eliminar reseña
router.delete("/:id", async (req, res) => {
  try {
    await Resena.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Reseña eliminada" });
  } catch (error) {
    console.error("Error al eliminar reseña:", error);
    res.status(500).json({ mensaje: "Error al eliminar reseña" });
  }
});

export default router;