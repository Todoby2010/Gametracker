import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCamera, FaTrophy, FaGamepad, FaClock } from "react-icons/fa";

const PaginaEstadisticas = () => {
  const [usuario, setUsuario] = useState({
    nombre: "Juanjo",
    nivel: 1,
    xp: 0,
    estilosDesbloqueados: ["Predeterminado"],
    estiloActivo: "Predeterminado",
    fotoPerfil: localStorage.getItem("fotoPerfil") || "",
  });

  const [stats, setStats] = useState({
    total: 0,
    completados: 0,
    horas: 0,
  });

  // 🧠 Obtener estadísticas de los juegos
  useEffect(() => {
    const obtenerEstadisticas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/juegos");
        const juegos = res.data;
        const completados = juegos.filter((j) => j.completado).length;
        const horas = juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0);

        // Sistema de XP y niveles
        const xpGanada = completados * 100;
        const xpNivel = 150;
        const nivel = Math.min(50, Math.floor(xpGanada / xpNivel) + 1);

        // Estilos desbloqueables
        const nuevosEstilos = ["Predeterminado"];
        if (nivel >= 5) nuevosEstilos.push("Neón");
        if (nivel >= 10) nuevosEstilos.push("Ciberpunk");
        if (nivel >= 20) nuevosEstilos.push("Oscuro Glitch");
        if (nivel >= 30) nuevosEstilos.push("Retro 80s");
        if (nivel >= 40) nuevosEstilos.push("Samurai Blue");
        if (nivel >= 50) nuevosEstilos.push("Legendario");

        setStats({ total: juegos.length, completados, horas });
        setUsuario((prev) => ({
          ...prev,
          nivel,
          xp: xpGanada,
          estilosDesbloqueados: nuevosEstilos,
        }));
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };

    obtenerEstadisticas();
  }, []);

  // 🎨 Cambiar tema visual
  const cambiarEstilo = (nuevoEstilo) => {
    setUsuario({ ...usuario, estiloActivo: nuevoEstilo });
    document.body.className = "";
    document.body.classList.add(`tema-${nuevoEstilo.toLowerCase().replace(/\s/g, "")}`);
  };

  // 📸 Manejar foto de perfil
  const manejarCambioFoto = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("fotoPerfil", reader.result);
        setUsuario((prev) => ({ ...prev, fotoPerfil: reader.result }));
      };
      reader.readAsDataURL(archivo);
    }
  };

  // Progreso XP (porcentaje)
  const progresoXP = ((usuario.xp % 150) / 150) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-white p-6"
    >
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">
        🏆 Progreso del Jugador
      </h1>

      {/* 🧍 Info del jugador */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-10 flex flex-col items-center">
        {/* Imagen de perfil */}
        <div className="relative mb-4">
          {usuario.fotoPerfil ? (
            <img
              src={usuario.fotoPerfil}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center border-4 border-gray-600 text-4xl text-gray-400">
              ?
            </div>
          )}
          <label
            htmlFor="input-foto"
            className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer"
          >
            <FaCamera />
          </label>
          <input
            type="file"
            id="input-foto"
            accept="image/*"
            onChange={manejarCambioFoto}
            className="hidden"
          />
        </div>

        <h2 className="text-2xl font-bold">{usuario.nombre}</h2>
        <p className="text-gray-400 mb-2">
          Nivel {usuario.nivel} • {usuario.xp} XP
        </p>

        {/* Barra XP */}
        <div className="w-full bg-gray-700 rounded-full h-4 mt-2 mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progresoXP}%` }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-400 to-green-400 h-4 rounded-full shadow-md"
          />
        </div>

        {/* Datos rápidos */}
        <div className="flex justify-around w-full text-gray-300 mt-2">
          <div className="flex items-center gap-2">
            <FaGamepad className="text-blue-400" />
            <span>{stats.total} juegos</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-yellow-400" />
            <span>{stats.horas} h jugadas</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTrophy className="text-green-400" />
            <span>{stats.completados} completados</span>
          </div>
        </div>
      </div>

      {/* 🎨 Estilos desbloqueados */}
      <div className="text-center">
        <h2 className="text-2xl text-blue-300 mb-4">
          🎨 Estilos Desbloqueados
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {usuario.estilosDesbloqueados.map((estilo) => (
            <button
              key={estilo}
              onClick={() => cambiarEstilo(estilo)}
              className={`px-5 py-2 rounded-lg border transition-all duration-300 ${
                usuario.estiloActivo === estilo
                  ? "bg-blue-600 border-blue-400"
                  : "bg-gray-700 hover:bg-gray-600 border-gray-500"
              }`}
            >
              {estilo}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PaginaEstadisticas;