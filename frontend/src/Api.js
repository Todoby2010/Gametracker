import axios from "axios";

// URL base de tu backend (asegúrate de que el backend esté corriendo en el puerto 5000)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// --- Endpoints ---
export const obtenerJuegos = () => API.get("/juegos");
export const crearJuego = (nuevoJuego) => API.post("/juegos", nuevoJuego);

export const obtenerResenas = () => API.get("/resenas");
export const crearResena = (nuevaResena) => API.post("/resenas", nuevaResena);