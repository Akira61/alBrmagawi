"use client";
import { useConfetti } from "../../providers/Confetti";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const MyConfetti = () => {
  const { active, deactivate } = useConfetti();
  const { width, height } = useWindowSize();

  if (!window || !active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Confetti
        numberOfPieces={400}
        onConfettiComplete={deactivate}
        recycle={false}
        width={width}
        height={height}
      />
    </div>
  );
};

export default MyConfetti;
