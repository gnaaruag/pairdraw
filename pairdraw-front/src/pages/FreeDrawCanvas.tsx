import { FunctionComponent } from "react";
import Navbar from "../components/Navbar";
import CanvasComponent from "../components/CanvasComponent";

const FreeDrawCanvas: FunctionComponent = () => {
  return (
  <>
	<Navbar />
  <CanvasComponent />
  </>
  )
};

export default FreeDrawCanvas;
