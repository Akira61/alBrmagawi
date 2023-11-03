import { Animator } from "@arwes/react-animator";
import { GridLines, Dots } from "@arwes/react-bgs";

const Background = () => {
  return (
    <Animator duration={{ interval: 25 }}>
      <div
        style={{
          backgroundImage:
            "radial-gradient(85% 85% at 50% 50%, hsla(239, 54%, 15%, 0.25) 0%, hsla(279, 77%, 5%, 0.12) 50%, hsla(279, 77%, 5%, 0) 100%)",
        }}
        className="fixed inset-0 bg-jaguar"
      >
        <GridLines lineColor="hsla(180, 100%, 75%, 0.05)" distance={30} />
        <Dots color="hsla(180, 100%, 75%, 0.05)" distance={30} />
      </div>
    </Animator>
  );
};

export default Background;
