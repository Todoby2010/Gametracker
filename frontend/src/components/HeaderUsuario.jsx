import { motion } from "framer-motion";
import { FaUserCircle, FaTrophy, FaClock, FaGamepad, FaCamera } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const HeaderUsuario = () => {
  const { usuario, actualizarFoto } = useUser();
  const { nombre, nivel, xp, juegosTotales, horasJugadas, juegosCompletados, fotoPerfil } = usuario;

  const manejarCambioFoto = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = () => actualizarFoto(reader.result);
    reader.readAsDataURL(archivo);
  };

  const progresoXP = ((xp % 150) / 150) * 100;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-800 text-white rounded-2xl p-4 mb-6 flex items-center justify-between shadow-lg border-b border-gray-700"
    >
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          {fotoPerfil ? (
            <img
              src={fotoPerfil}
              alt="Foto de perfil"
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
            />
          ) : (
            <FaUserCircle size={64} className="text-blue-400" />
          )}

          {/* Botón para cambiar foto */}
          <input
            type="file"
            accept="image/*"
            onChange={manejarCambioFoto}
            className="absolute bottom-0 right-0 w-full h-full opacity-0 cursor-pointer"
          />
          <FaCamera className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full text-xs hover:bg-blue-700" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">{nombre}</h2>
          <p className="text-gray-400 text-sm">Nivel {nivel} • {xp} XP</p>

          {/* Barra XP */}
          <div className="w-40 bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progresoXP}%` }} />
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <FaGamepad className="text-blue-400" />
          <span>{juegosTotales} juegos</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-yellow-400" />
          <span>{horasJugadas} h</span>
        </div>
        <div className="flex items-center gap-2">
          <FaTrophy className="text-green-400" />
          <span>{juegosCompletados} logros</span>
        </div>
      </div>
    </motion.header>
  );
};

export default HeaderUsuario;