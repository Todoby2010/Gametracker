import { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCamera, FaTrophy, FaGamepad, FaClock } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const PaginaEstadisticas = () => {
  const { usuario, actualizarStats, actualizarFoto } = useUser();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/juegos");
        const juegos = res.data;

        const completados = juegos.filter((j) => j.completado).length;
        const horas = juegos.reduce((s, j) => s + (j.horasJugadas || 0), 0);
        const xp = completados * 100;
        const nivel = Math.min(50, Math.floor(xp / 150) + 1);

        actualizarStats({
          total: juegos.length,
          completados,
          horas,
          xp,
          nivel,
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    cargarDatos();
  }, [actualizarStats]);

  const manejarFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => actualizarFoto(reader.result);
    reader.readAsDataURL(file);
  };

  const progresoXP = ((usuario.xp % 150) / 150) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">🏆 Progreso del Jugador</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-10 flex flex-col items-center">
        <div className="relative mb-4">
          {usuario.fotoPerfil ? (
            <img src={usuario.fotoPerfil} className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg" />
          ) : (
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-4xl text-gray-400 border-4 border-gray-600">?</div>
          )}

          <label htmlFor="input-foto" className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer">
            <FaCamera />
          </label>
          <input id="input-foto" type="file" accept="image/*" className="hidden" onChange={manejarFoto} />
        </div>

        <h2 className="text-2xl font-bold">{usuario.nombre}</h2>
        <p className="text-gray-400 mb-2">Nivel {usuario.nivel} • {usuario.xp} XP</p>

        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mb-4">
          <div style={{ width: `${progresoXP}%` }} className="h-4 bg-gradient-to-r from-blue-400 to-green-400" />
        </div>

        <div className="flex justify-around w-full mt-3 text-gray-300">
          <div className="flex items-center gap-2"><FaGamepad className="text-blue-400" /> {usuario.juegosTotales} juegos</div>
          <div className="flex items-center gap-2"><FaClock className="text-yellow-400" /> {usuario.horasJugadas} h jugadas</div>
          <div className="flex items-center gap-2"><FaTrophy className="text-green-400" /> {usuario.juegosCompletados} completados</div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaginaEstadisticas;