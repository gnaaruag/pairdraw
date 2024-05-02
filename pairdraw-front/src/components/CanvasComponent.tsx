/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState, useCallback } from "react";
import { MdFileDownload } from "react-icons/md";
import { FaPalette } from "react-icons/fa";
import { LuPaintbrush } from "react-icons/lu";
import { MdClear } from "react-icons/md";

import "./canvas.css";

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>("#FF0069");
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [drawing, setDrawing] = useState<Array<any>>([]); // Store drawing commands
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isTouchDown, setIsTouchDown] = useState<boolean>(false);
  const [, setUndoStack] = useState<Array<any>>([]);
  const [redoStack, setRedoStack] = useState<Array<any>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawGrid = () => {
      ctx.imageSmoothingEnabled = true;

      // Set canvas size based on parent container
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth || 900; // Default width
        if (canvas.width > 700) {
          canvas.height = canvas.width * 0.4;
        } else {
          canvas.height = canvas.width * 1.5; // Height ratio
        }
      }

      // Set canvas background to white
      ctx.fillStyle = "white"; // Set background color to white
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with white

      // Draw grid
      const gridSize = 10; // smaller grid size
      const gridColor = "lightgrey";

      ctx.beginPath();
      ctx.lineWidth = 1; // thinner grid lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.strokeStyle = gridColor;
      ctx.stroke();
    };

    drawGrid();

    // Re-render the canvas when drawing changes
    redrawCanvas(ctx);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawing]);

  const redrawCanvas = useCallback((ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Redraw grid
    drawGrid(ctx);

    // Replay drawing actions
    drawing.forEach((action) => {
      const { type, ...params } = action;
      switch (type) {
        case "draw":
          drawLine(ctx, params);
          break;
        default:
          break;
      }
    });
  }, [drawing]);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
    // Draw grid
    const gridSize = 10; // smaller grid size
    const gridColor = "lightgrey";

    ctx.beginPath();
    ctx.lineWidth = 1; // thinner grid lines
    for (let x = 0; x <= ctx.canvas.width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }
    for (let y = 0; y <= ctx.canvas.height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }
    ctx.strokeStyle = gridColor;
    ctx.stroke();
  }, []);

  const drawLine = useCallback((ctx: CanvasRenderingContext2D, params: any) => {
    const { points, color, lineWidth } = params;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }, []);

  const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  }, []);

  const handleLineWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(parseInt(e.target.value));
  }, []);

  const startDrawing = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;

    setDrawing((prevDrawing) => [
      ...prevDrawing,
      { type: "draw", points: [{ x: offsetX, y: offsetY }], color, lineWidth },
    ]);
  }, [color, lineWidth]);

  const continueDrawing = useCallback((x: number, y: number) => {
    if (!isMouseDown && !isTouchDown) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;

    if (!drawing.length) return;

    const lastAction = drawing[drawing.length - 1];
    if (lastAction.type === "draw") {
      const updatedDrawing = [...drawing];
      updatedDrawing[drawing.length - 1].points.push({
        x: offsetX,
        y: offsetY,
      });
      setDrawing(updatedDrawing);
    }
  }, [isMouseDown, isTouchDown, drawing]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsMouseDown(true);
    const { clientX, clientY } = e;
    startDrawing(clientX, clientY);
  }, [startDrawing]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = e;
    continueDrawing(clientX, clientY);
  }, [continueDrawing]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsTouchDown(true);
    const touch = e.touches[0];
    const { clientX, clientY } = touch;
    startDrawing(clientX, clientY);
  }, [startDrawing]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    const { clientX, clientY } = touch;
    continueDrawing(clientX, clientY);
  }, [continueDrawing]);

  const handleTouchEnd = useCallback(() => {
    setIsTouchDown(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawing([]);
    setUndoStack([]);
    setRedoStack([]);
  }, []);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary canvas
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.fillStyle = "white";

    // Draw only the drawn elements on the temporary canvas
    drawing.forEach((action) => {
      if (action.type === "draw") {
        drawLine(tempCtx, action);
      }
    });

    // Convert the temporary canvas to an image URL with a PNG format and transparent background
    const imageURL = tempCanvas.toDataURL("image/png");

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "canvas_image.png";
    link.click();
  }, [drawing, drawLine]);

  const undo = useCallback(() => {
    if (drawing.length === 0) return;

    const lastAction = drawing[drawing.length - 1];
    setUndoStack((prevStack) => [...prevStack, lastAction]);
    setDrawing((prevDrawing) => prevDrawing.slice(0, -1));
  }, [drawing]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;

    const lastUndo = redoStack[redoStack.length - 1];
    setRedoStack((prevStack) => [...prevStack, lastUndo]);
    setDrawing((prevDrawing) => [...prevDrawing, lastUndo]);
    setRedoStack((prevStack) => prevStack.slice(0, -1));
  }, [redoStack]);

  // Event listener for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "z") {
        undo();
      } else if (event.ctrlKey && event.key === "y") {
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  return (
    <>
      <div className="tools flex flex-wrap justify-center items-center mx-auto gap-4">
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <label htmlFor="color">
              <FaPalette size={20} />
            </label>
            <input type="color" value={color} onChange={handleColorChange} />
          </div>
          <div className="flex items-center gap-1">
            <label htmlFor="size">
              <LuPaintbrush size={20} color={color} />
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={lineWidth}
              onChange={handleLineWidthChange}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="btn-clear p-2 rounded-md"
            onClick={clearCanvas}
            title="clear canvas"
          >
            <MdClear size={20} />
          </button>
          <button
            className="btn-clear p-2 rounded-md"
            title="download canvas"
            onClick={handleDownload}
          >
            <MdFileDownload size={20} />
          </button>
        </div>
      </div>
      <canvas
        className="canvas mx-auto my-auto mt-2"
        ref={canvasRef}
        style={{ backgroundColor: "white", border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </>
  );
};

export default CanvasComponent;
