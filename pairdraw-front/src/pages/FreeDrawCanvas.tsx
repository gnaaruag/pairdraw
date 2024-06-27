import { FunctionComponent } from "react";
import Navbar from "../components/Navbar";
import TldCanvas from "../components/TldCanvas";
import React from "react";


const FreeDrawCanvas: FunctionComponent = () => {
  return (
    <>
    <Navbar />
    <TldCanvas />
  </>
  )
};

export default FreeDrawCanvas;
