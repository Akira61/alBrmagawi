/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useRef } from "react";
import { Animator } from "@arwes/react-animator";
import {
  FrameSVGLines,
  useFrameSVGAssemblingAnimation,
} from "@arwes/react-frames";

const Lines = ({ children, ...props }) => {
  const svgRef = useRef(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <Animator active={true}>
      <div
        {...props}
        css={{
          position: "relative",
          zIndex: 10,

          "[data-name=bg]": {
            color: "transparent",
            filter: "transparent",
          },
          "[data-name=line]": {
            color: "hsl(200, 87%, 26.42%)",
            filter: "drop-shadow(0 0 4px hsl(200, 87%, 26.42%))",
          },
        }}
      >
        <FrameSVGLines elementRef={svgRef} onRender={onRender} />
        {children}
      </div>
    </Animator>
  );
};

export default Lines;
