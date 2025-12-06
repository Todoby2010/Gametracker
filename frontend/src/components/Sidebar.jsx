import { Link, useLocation } from "react-router-dom";
import { FaHome, FaGamepad, FaChartBar, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/", icon: <FaHome />, label: "Inicio" },
    { to: "/juegos", icon: <FaGamepad />, label: "Mis Juegos" },
    { to: "/estadisticas", icon: <FaChartBar />, label: "Estadísticas" },
    { to: "/perfil", icon: <FaUser />, label: "Perfil" },
  ];

  return (
    <aside className="w-64 bg-gray-800 flex flex-col p-4 border-r border-gray-700">
      <h1 className="text-2xl font-bold text-blue-400 mb-6 text-center">🎮 GameTracker</h1>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 transform ${
              location.pathname === link.to
              ? "bg-blue-600 text-white scale-105 shadow-lg"
              : "text-gray-300 hover:bg-blue-500/20 hover:text-blue-300 hover:translate-x-1"
  }`}
>
  <span className="text-lg">{link.icon}</span>
  <span>{link.label}</span>
</Link>
        ))}
      </nav>

      <div className="mt-auto text-center text-gray-500 text-sm">
        <p>By Juanjo ✨</p>
      </div>
    </aside>
  );
};

export default Sidebar;