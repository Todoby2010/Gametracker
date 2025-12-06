import { useState, useEffect } from "react";
import axios from "axios";
import FormularioJuego from "./FormularioJuego";
import TarjetaJuego from "./TarjetaJuego";
import { motion } from "framer-motion";

const PaginaJuegos = () => {
  const [juegos, setJuegos] = useState([]);

  // Obtener juegos desde el backend
  const obtenerJuegos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/juegos");
      setJuegos(res.data);
    } catch (error) {
      console.error("Error al obtener juegos:", error);
    }
  };

  useEffect(() => {
    obtenerJuegos();
  }, []);

  // Agregar nuevo juego
  const manejarAgregar = (nuevo) => setJuegos((prev) => [...prev, nuevo]);

  // Eliminar juego
  const manejarEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/juegos/${id}`);
      setJuegos((prev) => prev.filter((j) => j._id !== id));
    } catch (error) {
      console.error("Error al eliminar juego:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="p-6 text-white"
    >
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">
        🎮 Mis Juegos
      </h1>

      <FormularioJuego onAgregar={manejarAgregar} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {juegos.length > 0 ? (
          juegos.map((juego) => (
            <motion.div
              key={juego._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TarjetaJuego
                juego={juego}
                onEliminar={() => manejarEliminar(juego._id)}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No tienes juegos agregados aún. ¡Empieza a llenar tu colección! 🚀
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default PaginaJuegos;