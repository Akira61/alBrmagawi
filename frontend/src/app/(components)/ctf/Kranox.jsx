/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { FrameSVGKranox } from "@arwes/react-frames";

const Kranox = ({ children, style, squareSize = "1.5rem", ...props }) => {
  return (
    <div
      style={{
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        zIndex: 1,
        paddingInline: "17px",
        paddingBlock: "1px",
      }}
      {...props}
    >
      <FrameSVGKranox
        css={{
          "[data-name=bg]": {
            color: "hsl(257, 57%, 7%)",
          },
          "[data-name=line]": {
            color: "hsl(200, 87%, 26.42%)",
          },
        }}
      />
      {children}
    </div>
  );
};

export default Kranox;
