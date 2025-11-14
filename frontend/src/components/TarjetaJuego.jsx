import { useEffect, useState } from "react";
import { FaStar, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";
import FormularioResena from "./FormularioResena";

const TarjetaJuego = ({ juego, onEliminar }) => {
  const [mostrarResena, setMostrarResena] = useState(false);
  const [resenas, setResenas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [estrellasEditadas, setEstrellasEditadas] = useState(0);

  // 🟢 Obtener reseñas
  useEffect(() => {
    const obtenerResenas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resenas");
        const filtradas = res.data.filter((r) => r.juegoId === juego._id);
        setResenas(filtradas);
      } catch (error) {
        console.error("Error al obtener reseñas:", error);
      }
    };
    obtenerResenas();
  }, [juego._id]);

  // 🟢 Agregar reseña
  const agregarResena = (nueva) => {
    setResenas((prev) => [...prev, nueva]);
  };

  // 🟢 Eliminar reseña
  const eliminarResena = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta reseña?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/resenas/${id}`);
      setResenas((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error al eliminar reseña:", error);
      alert("❌ Error al eliminar reseña");
    }
  };

  // 🟢 Editar reseña (activar modo edición)
  const activarEdicion = (resena) => {
    setEditandoId(resena._id);
    setTextoEditado(resena.texto);
    setEstrellasEditadas(resena.estrellas || 0);
  };

  // 🟢 Guardar cambios
  const guardarEdicion = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/resenas/${id}`, {
        texto: textoEditado,
        estrellas: estrellasEditadas,
      });

      setResenas((prev) =>
        prev.map((r) => (r._id === id ? res.data : r))
      );

      setEditandoId(null);
      alert("✅ Reseña actualizada con éxito");
    } catch (error) {
      console.error("Error al editar reseña:", error);
      alert("❌ Error al editar reseña");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 w-64 text-center text-white">
      <img
        src={juego.portada || "https://via.placeholder.com/200x250"}
        alt={juego.titulo}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{juego.titulo}</h3>
      <p className="text-gray-400">{juego.genero}</p>

      {/* ⭐ Calificación */}
      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            color={i < (juego.puntuacion || 0) ? "gold" : "gray"}
          />
        ))}
      </div>

      {/* Botones principales */}
      <div className="mt-3 flex justify-around">

        <button
          onClick={onEliminar}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
        >
          🗑️ Eliminar
        </button>
      </div>

      {/* Botón reseñas */}
      <button
        onClick={() => setMostrarResena(!mostrarResena)}
        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      >
        {mostrarResena ? "Cerrar reseñas" : "➕ Reseñas"}
      </button>

      {/* 📜 Lista de reseñas */}
      {mostrarResena && (
        <div className="mt-3 bg-gray-700 p-3 rounded-lg text-left">
          <h4 className="text-white font-semibold mb-2">Reseñas:</h4>

          {resenas.length === 0 ? (
            <p className="text-gray-400 text-sm">No hay reseñas aún.</p>
          ) : (
            resenas.map((r) => (
              <div
                key={r._id}
                className="border-b border-gray-600 pb-2 mb-2 text-white relative"
              >
                {/* 🟢 Si está editando */}
                {editandoId === r._id ? (
                  <div>
                    <textarea
                      value={textoEditado}
                      onChange={(e) => setTextoEditado(e.target.value)}
                      className="w-full p-2 mb-2 rounded bg-gray-600 text-white"
                    />
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={18}
                          onClick={() => setEstrellasEditadas(i + 1)}
                          color={i < estrellasEditadas ? "gold" : "gray"}
                          className="cursor-pointer"
                        />
                      ))}
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => guardarEdicion(r._id)}
                        className="bg-green-600 px-2 py-1 rounded hover:bg-green-700"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => setEditandoId(null)}
                        className="bg-gray-500 px-2 py-1 rounded hover:bg-gray-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ) : (
                  // 🟡 Modo lectura
                  <>
                    <p className="font-bold text-blue-400">{r.autor}</p>
                    <p className="text-sm">{r.texto}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={14}
                          color={i < (r.estrellas || 0) ? "gold" : "gray"}
                        />
                      ))}
                    </div>
                    {/* Botones editar y eliminar */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => activarEdicion(r)}
                        className="text-yellow-400 hover:text-yellow-500"
                        title="Editar reseña"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => eliminarResena(r._id)}
                        className="text-red-400 hover:text-red-600"
                        title="Eliminar reseña"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}

          {/* Formulario reseña */}
          <FormularioResena juegoId={juego._id} onResenaAgregada={agregarResena} />
        </div>
      )}
    </div>
  );
};

export default TarjetaJuego;