import { useUser } from "../context/UserContext";
import { FaCamera, FaTrophy, FaClock, FaGamepad } from "react-icons/fa";

const PaginaPerfil = () => {
  const { usuario, actualizarFoto } = useUser();

  const cambiarAvatar = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const url = URL.createObjectURL(archivo);
      actualizarFoto(url); // usa la función del contexto
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        🎮 Perfil del Jugador
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-3xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={usuario.fotoPerfil}
              className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={cambiarAvatar}
              />
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-bold">{usuario.nombre}</h2>
            <p className="text-gray-400">Edad: {usuario.edad || "N/A"}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-gray-700 p-4 rounded-xl shadow-md">
            <FaGamepad className="text-blue-400 text-2xl mx-auto" />
            <p className="text-lg font-bold">{usuario.juegosTotales}</p>
            <p className="text-gray-300 text-sm">Juegos</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-xl shadow-md">
            <FaClock className="text-yellow-400 text-2xl mx-auto" />
            <p className="text-lg font-bold">{usuario.horasJugadas} h</p>
            <p className="text-gray-300 text-sm">Horas jugadas</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-xl shadow-md">
            <FaTrophy className="text-green-400 text-2xl mx-auto" />
            <p className="text-lg font-bold">{usuario.juegosCompletados}</p>
            <p className="text-gray-300 text-sm">Completados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaPerfil;