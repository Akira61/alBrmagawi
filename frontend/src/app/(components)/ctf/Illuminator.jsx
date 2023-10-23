import { IlluminatorSVG } from "@arwes/react-frames";

const Illuminator = () => {
  return (
    <svg
      style={{
        position: "fixed",
        zIndex: 100,
        width: 3000,
        height: 3000,
        pointerEvents: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 3000 3000"
    >
      <IlluminatorSVG color="hsl(284 50% 50% / 20%)" size={300} />
    </svg>
  );
};

export default Illuminator;
