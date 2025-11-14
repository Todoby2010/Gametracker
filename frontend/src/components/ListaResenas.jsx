import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ListaResenas = ({ juegoId }) => {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    const obtenerResenas = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/resenas`);
        // 🔍 Filtramos solo las reseñas del juego actual
        const filtradas = res.data.filter(r => r.juegoId === juegoId);
        setResenas(filtradas);
      } catch (error) {
        console.error("Error al obtener reseñas:", error);
      }
    };
    obtenerResenas();
  }, [juegoId]);

  if (!resenas.length)
    return <p className="text-gray-400">No hay reseñas aún.</p>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2 text-blue-400">💬 Reseñas</h3>
      {resenas.map((r, i) => (
        <div key={i} className="bg-gray-700 p-3 rounded mb-2">
          <div className="flex">
            {[...Array(5)].map((_, j) => (
              <FaStar
                key={j}
                size={16}
                className={j < (r.estrellas || 0) ? "text-yellow-400" : "text-gray-500"}
              />
            ))}
          </div>
          <p className="mt-1 text-gray-200">{r.texto}</p>
          <p className="text-sm text-gray-400">Autor: {r.autor || "Anónimo"}</p>
        </div>
      ))}
    </div>
  );
};

export default ListaResenas;