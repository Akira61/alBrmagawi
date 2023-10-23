"use client";
import Theme from "../../providers/Theme";
import { useState } from "react";
import {
  AnimatorGeneralProvider,
  Animator,
  BleepsProvider,
} from "@arwes/react";
import AllCTFs from "../../(components)/ctf/AllCTFs";
import Background from "../../(components)/ctf/Background";
import Illuminator from "../../(components)/ctf/Illuminator";
import "../../style/ctfs.css";

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
      sources: [{ src: "https://arwes.dev/assets/sounds/assemble.mp3", type: "audio/mpeg" }],
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

export default function Allctfs() {
  const [active] = useState(true);

  return (
    <AnimatorGeneralProvider {...animatorsSettings}>
      <Animator combine manager="stagger" active={active}>
        <BleepsProvider {...bleepsSettings}>
          <Illuminator />
          {/* <Background /> */}
          <Theme />
          <AllCTFs />
        </BleepsProvider>
      </Animator>
    </AnimatorGeneralProvider>
  );
}
