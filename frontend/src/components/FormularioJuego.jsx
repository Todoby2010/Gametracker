import { useState } from "react";
import axios from "axios";

const FormularioJuego = ({ onAgregar }) => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [portada, setPortada] = useState("");
  const [horasJugadas, setHorasJugadas] = useState(0);
  const [completado, setCompletado] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("Por favor ingresa un título para el juego.");
      return;
    }

    try {
      const nuevoJuego = { titulo, genero, puntuacion, portada, horasJugadas, completado };
      const res = await axios.post("http://localhost:5000/api/juegos", nuevoJuego);
      onAgregar(res.data);

      // limpiar campos
      setTitulo("");
      setGenero("");
      setPuntuacion(0);
      setPortada("");
      setHorasJugadas(0);
      setCompletado(false);
    } catch (error) {
      console.error("Error al agregar el juego:", error);
      alert("Hubo un error al agregar el juego.");
    }
  };

  return (
    <form
      onSubmit={manejarEnvio}
      className="bg-gray-800 p-5 rounded-2xl shadow-md mb-6 text-white w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-3 text-blue-400">🎮 Agregar nuevo juego</h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
      />

      <input
        type="text"
        placeholder="Género"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
      />

      <input
        type="number"
        placeholder="Puntuación (0 - 5)"
        value={puntuacion}
        min="0"
        max="5"
        onChange={(e) => setPuntuacion(Number(e.target.value))}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
      />

      <input
        type="number"
        placeholder="Horas jugadas"
        value={horasJugadas}
        onChange={(e) => setHorasJugadas(Number(e.target.value))}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
      />

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={completado}
          onChange={(e) => setCompletado(e.target.checked)}
        />
        <span>¿Completado?</span>
      </label>

      <input
        type="text"
        placeholder="URL de portada"
        value={portada}
        onChange={(e) => setPortada(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
      >
        ➕ Agregar juego
      </button>
    </form>
  );
};

export default FormularioJuego;