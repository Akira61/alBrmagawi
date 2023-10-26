"use client";
import Theme from "@/app/providers/Theme";
import { useState } from "react";
import {
  AnimatorGeneralProvider,
  Animator,
  BleepsProvider,
} from "@arwes/react";
import Confetti from "@/app/(components)/ctf/Confetti";
import Illuminator from "@/app/(components)/ctf/Illuminator";
import "@/app/style/ctfs.css";
import ConfettiProvider from "@/app/providers/Confetti";
import { ReactLenis } from "@studio-freight/react-lenis";

const animatorsSettings = {
  duration: {
    enter: 0.5,
    exit: 0.2,
    stagger: 0.04,
  },
};

const bleepsSettings = {
  master: {
    volume: 0.75,
  },
  bleeps: {
    assemble: {
      sources: [
        {
          src: "https://arwes.dev/assets/sounds/assemble.mp3",
          type: "audio/mpeg",
        },
      ],
    },
    click: {
      sources: [
        {
          src: "https://arwes.dev/assets/sounds/click.mp3",
          type: "audio/mpeg",
        },
      ],
    },
  },
};

export default function Allctfs({ children }) {
  const [active] = useState(true);

  return (
    <AnimatorGeneralProvider {...animatorsSettings}>
      <Animator combine manager="stagger" active={active}>
        <BleepsProvider {...bleepsSettings}>
          <ConfettiProvider>
            <Illuminator />
            <Theme />
            <ReactLenis root>{children}</ReactLenis>
            <Confetti />
          </ConfettiProvider>
        </BleepsProvider>
      </Animator>
    </AnimatorGeneralProvider>
  );
}
