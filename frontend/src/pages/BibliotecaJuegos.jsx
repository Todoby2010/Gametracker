import { useEffect, useState } from "react";
import api from "../services/api";
import TarjetaJuego from "../components/TarjetaJuego";

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    api.get("/juegos").then(res => setJuegos(res.data));
  }, []);

  return (
    <div>
      <h2>🎮 Mi Biblioteca de Juegos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {juegos.map(juego => (
          <TarjetaJuego key={juego._id} juego={juego} />
        ))}
      </div>
    </div>
  );
}

export default BibliotecaJuegos;