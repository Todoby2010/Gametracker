import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const datosIniciales = {
  nombre: "Juanjo",
  fotoPerfil: localStorage.getItem("fotoPerfil") || "",
  nivel: 1,
  xp: 0,
  juegosTotales: 0,
  juegosCompletados: 0,
  horasJugadas: 0,
};

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(datosIniciales);

  // 🔹 Actualizar foto
  const actualizarFoto = (nuevaFoto) => {
    localStorage.setItem("fotoPerfil", nuevaFoto);
    setUsuario((prev) => ({ ...prev, fotoPerfil: nuevaFoto }));
  };

  // 🔹 Actualizar estadísticas
  const actualizarStats = ({ total, completados, horas, xp, nivel }) => {
    setUsuario((prev) => ({
      ...prev,
      juegosTotales: total,
      juegosCompletados: completados,
      horasJugadas: horas,
      xp,
      nivel,
    }));
  };

  return (
    <UserContext.Provider value={{ usuario, actualizarFoto, actualizarStats }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);