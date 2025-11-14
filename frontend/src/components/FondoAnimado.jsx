import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const FondoAnimado = () => {
  const init = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={init}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 60 },
          color: { value: "#3b82f6" },
          links: { enable: true, color: "#60a5fa", opacity: 0.4 },
          move: { enable: true, speed: 1 },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default FondoAnimado;