import { motion } from "framer-motion";
import HeaderUsuario from "./HeaderUsuario";

const PaginaInicio = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Encabezado del usuario */}
      <HeaderUsuario usuario="Juanjo" juegos={2} horas={8} logros={3} />

      {/* Contenido principal */}
      <div className="text-white p-6">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">
          🎮 Bienvenido a GameTracker
        </h1>
        <p className="text-gray-300 max-w-2xl">
          Lleva el control de tus juegos favoritos, comparte reseñas y observa tus estadísticas de jugador.
        </p>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-300 mb-2">Novedades</h2>
          <p className="text-gray-400">
            Próximamente podrás personalizar tu perfil, ver tus logros y conectar con otros jugadores 👾.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PaginaInicio;