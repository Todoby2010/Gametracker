import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import FondoAnimado from "./components/FondoAnimado";
import PaginaInicio from "./components/PaginaInicio";
import PaginaJuegos from "./components/PaginaJuegos";
import PaginaEstadisticas from "./components/PaginaEstadisticas";
import PaginaPerfil from "./components/PaginaPerfil";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white relative">
      <FondoAnimado />
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/juegos" element={<PaginaJuegos />} />
            <Route path="/estadisticas" element={<PaginaEstadisticas />} />
            <Route path="/perfil" element={<PaginaPerfil />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;