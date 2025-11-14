import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaTrophy, FaClock, FaGamepad, FaCamera } from "react-icons/fa";

const HeaderUsuario = ({ stats = {} }) => {
  // Valores por defecto si aún no hay datos
  const {
    nombre = "Jugador",
    nivel = 1,
    xp = 0,
    juegos = 0,
    horas = 0,
    logros = 0,
  } = stats;

  const [fotoPerfil, setFotoPerfil] = useState(localStorage.getItem("fotoPerfil") || "");
  const [mostrarInput, setMostrarInput] = useState(false);

  const manejarCambioFoto = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("fotoPerfil", reader.result);
        setFotoPerfil(reader.result);
        setMostrarInput(false);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const progresoXP = ((xp % 150) / 150) * 100;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-800 text-white rounded-2xl p-4 mb-6 flex items-center justify-between shadow-lg border-b border-gray-700"
    >
      {/* 📸 Foto de perfil e info */}
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
          <button
            onClick={() => setMostrarInput(!mostrarInput)}
            className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full text-xs hover:bg-blue-700"
          >
            <FaCamera />
          </button>

          {/* Input para subir imagen */}
          {mostrarInput && (
            <input
              type="file"
              accept="image/*"
              onChange={manejarCambioFoto}
              className="absolute bottom-0 left-0 opacity-0 w-full h-full cursor-pointer"
            />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{nombre}</h2>
          <p className="text-gray-400 text-sm">Nivel {nivel} • {xp} XP</p>

          {/* Barra XP */}
          <div className="w-40 bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progresoXP}%` }}
            />
          </div>
        </div>
      </div>

      {/* 🎮 Estadísticas rápidas */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <FaGamepad className="text-blue-400" />
          <span>{juegos} juegos</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-yellow-400" />
          <span>{horas} h jugadas</span>
        </div>
        <div className="flex items-center gap-2">
          <FaTrophy className="text-green-400" />
          <span>{logros} logros</span>
        </div>
      </div>
    </motion.header>
  );
};

export default HeaderUsuario;