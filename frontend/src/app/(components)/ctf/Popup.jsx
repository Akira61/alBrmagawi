"use client";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useRef } from "react";
import { Animator } from "@arwes/react-animator";
import {
  FrameSVGOctagon,
  useFrameSVGAssemblingAnimation,
} from "@arwes/react-frames";
import { useBleeps } from "@arwes/react-bleeps";

const Popup = ({ children }) => {
  const svgRef = (useRef < SVGSVGElement) | (null > null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  const bleeps = useBleeps();

  useEffect(() => {
    setTimeout(() => {
      bleeps.assemble?.play();
    }, 650)

    return () => {
      bleeps.assemble?.stop();
    }
  }, [bleeps])

  return (
    <Animator active={true}>
      <div
        css={{
          position: "relative",
          zIndex: 2,

          "[data-name=bg]": {
            color: "hsl(279, 77%, 5%)",
          },
          "[data-name=line]": {
            color: "hsl(200, 87%, 26.42%)",
          },
        }}
      >
        <FrameSVGOctagon elementRef={svgRef} onRender={onRender} />
        {children}
      </div>
    </Animator>
  );
};

export default Popup;
