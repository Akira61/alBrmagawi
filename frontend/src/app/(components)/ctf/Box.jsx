"use client";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useBleeps } from "@arwes/react-bleeps";
import { useRef, useState } from "react";
import { Animator } from "@arwes/react-animator";
import {
  FrameSVGNefrex,
  useFrameSVGAssemblingAnimation,
} from "@arwes/react-frames";

const Box = ({ children, active = true, onClick: handleClick, ...props }) => {
  const svgRef = useRef(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  const [a, setA] = useState(false);
  const bleeps = useBleeps();

  const onClick = () => {
    bleeps.click?.play();
    handleClick && handleClick();
  };

  return (
    <Animator active={true}>
      <div
        {...props}
        onClick={onClick}
        onMouseEnter={() => setA(true)}
        onMouseLeave={() => setA(false)}
        css={{
          position: "relative",
          zIndex: 10,

          "[data-name=bg]": {
            color: active ? "hsla(200, 87%, 26.42%, 0.25)" : "transparent",
            filter: active
              ? "drop-shadow(0 0 4px hsla(200, 87%, 26.42%, 0.25))"
              : "transparent",
          },
          "[data-name=line]": {
            color: "hsl(200, 87%, 26.42%)",
            filter: "drop-shadow(0 0 4px hsl(200, 87%, 26.42%))",
          },
        }}
      >
        <FrameSVGNefrex
          elementRef={svgRef}
          onRender={onRender}
          padding={0}
          strokeWidth={2}
          squareSize={12}
          smallLineLength={a ? 999 : 12}
          largeLineLength={a ? 999 : 32}
        />
        {children}
      </div>
    </Animator>
  );
};

export default Box;
