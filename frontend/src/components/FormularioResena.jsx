import { useState } from "react";
import axios from "axios";

const FormularioResena = ({ juegoId, onResenaAgregada }) => {
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [estrellas, setEstrellas] = useState(0);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!autor.trim() || !texto.trim()) {
      alert("Por favor llena todos los campos");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/resenas", {
        juegoId,
        autor,
        texto,
        estrellas,
      });

      alert("✅ Reseña agregada con éxito");
      onResenaAgregada(res.data); // 👈 Esto actualiza la lista
      setAutor("");
      setTexto("");
      setEstrellas(0);
    } catch (error) {
      console.error("Error al guardar reseña:", error);
      alert("❌ Error al guardar reseña");
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="mt-3">
      <input
        type="text"
        placeholder="Tu nombre"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-600 text-white"
      />
      <textarea
        placeholder="Escribe tu reseña..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-600 text-white"
      />
      <input
        type="number"
        min="0"
        max="5"
        placeholder="⭐ Puntuación"
        value={estrellas}
        onChange={(e) => setEstrellas(Number(e.target.value))}
        className="w-full p-2 mb-2 rounded bg-gray-600 text-white"
      />
      <button
        type="submit"
        className="bg-green-600 w-full py-2 rounded hover:bg-green-700 transition-all"
      >
        Guardar reseña
      </button>
    </form>
  );
};

export default FormularioResena;