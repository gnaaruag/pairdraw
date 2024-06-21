import { FunctionComponent } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

const TldCanvas: FunctionComponent = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 70,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Tldraw />
    </div>
  );
};

export default TldCanvas;