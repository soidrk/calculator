// pages/graphing/index.js
import { useRef, useState, useEffect } from "react";
import { evaluate } from "mathjs";

export default function GraphingCalculator() {
  // State for multiple functions (each with an expression and color)
  const [functions, setFunctions] = useState([]);
  const [newExpression, setNewExpression] = useState("");
  const [newColor, setNewColor] = useState("#ff0000");
  // View parameters: center and scale (pixels per unit)
  const [view, setView] = useState({
    xCenter: 0,
    yCenter: 0,
    scale: 50,
  });
  // Coordinate readout (when user clicks)
  const [coord, setCoord] = useState(null);
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Convert world coords to canvas coords
  const worldToCanvas = (x, y, width, height) => {
    const { xCenter, yCenter, scale } = view;
    const cx = width / 2 + (x - xCenter) * scale;
    const cy = height / 2 - (y - yCenter) * scale;
    return { cx, cy };
  };

  // Convert canvas coords to world coords
  const canvasToWorld = (cx, cy, width, height) => {
    const { xCenter, yCenter, scale } = view;
    const x = xCenter + (cx - width / 2) / scale;
    const y = yCenter - (cy - height / 2) / scale;
    return { x, y };
  };

  // Draw grid, axes, and functions
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    const { xCenter, yCenter, scale } = view;
    // World bounds
    const xMin = xCenter - width / (2 * scale);
    const xMax = xCenter + width / (2 * scale);
    const yMin = yCenter - height / (2 * scale);
    const yMax = yCenter + height / (2 * scale);

    // Draw grid lines
    drawGrid(ctx, width, height, xMin, xMax, yMin, yMax);

    // Draw functions
    functions.forEach((fn) => {
      drawFunction(ctx, width, height, xMin, xMax, fn.expression, fn.color);
    });

    // Draw axes
    drawAxes(ctx, width, height);

    // If coordinate readout is active, draw a marker and label
    if (coord) {
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(coord.cx, coord.cy, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.font = "12px sans-serif";
      ctx.fillText(`(${coord.x.toFixed(2)}, ${coord.y.toFixed(2)})`, coord.cx + 6, coord.cy - 6);
    }
  };

  function drawGrid(ctx, width, height, xMin, xMax, yMin, yMax) {
    const { scale } = view;
    // Choose grid step based on scale (e.g., 1, 2, 5, 10, etc.)
    const steps = [1, 2, 5, 10, 20, 50, 100];
    let step = 1;
    for (let s of steps) {
      if (scale * s >= 40 && scale * s <= 150) {
        step = s;
        break;
      }
    }
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#555";

    // Vertical lines
    const firstX = Math.ceil(xMin / step) * step;
    for (let x = firstX; x <= xMax; x += step) {
      const { cx } = worldToCanvas(x, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
      ctx.fillText(x.toFixed(2), cx + 2, height / 2 + 12);
    }
    // Horizontal lines
    const firstY = Math.ceil(yMin / step) * step;
    for (let y = firstY; y <= yMax; y += step) {
      const { cy } = worldToCanvas(0, y, width, height);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();
      ctx.fillText(y.toFixed(2), width / 2 + 2, cy - 2);
    }
  }

  function drawAxes(ctx, width, height) {
    const { cx: zeroX } = worldToCanvas(0, 0, width, height);
    const { cy: zeroY } = worldToCanvas(0, 0, width, height);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1.5;
    // y-axis
    ctx.beginPath();
    ctx.moveTo(zeroX, 0);
    ctx.lineTo(zeroX, height);
    ctx.stroke();
    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, zeroY);
    ctx.lineTo(width, zeroY);
    ctx.stroke();
  }

  function drawFunction(ctx, width, height, xMin, xMax, expr, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let firstPoint = true;
    const samples = width;
    for (let i = 0; i <= samples; i++) {
      const x = xMin + (i / samples) * (xMax - xMin);
      let y;
      try {
        y = evaluate(expr, { x });
        if (typeof y !== "number" || !isFinite(y)) continue;
      } catch (e) {
        continue;
      }
      const { cx, cy } = worldToCanvas(x, y, width, height);
      if (firstPoint) {
        ctx.moveTo(cx, cy);
        firstPoint = false;
      } else {
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();
  }

  // Panning and zooming handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setView((prev) => ({
      ...prev,
      xCenter: prev.xCenter - dx / prev.scale,
      yCenter: prev.yCenter + dy / prev.scale,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleWheel = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const { x: beforeX, y: beforeY } = canvasToWorld(mouseX, mouseY, canvas.width, canvas.height);
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setView((prev) => {
      const newScale = prev.scale * factor;
      const newXCenter = beforeX - (mouseX - canvas.width / 2) / newScale;
      const newYCenter = beforeY + (mouseY - canvas.height / 2) / newScale;
      return { ...prev, scale: newScale, xCenter: newXCenter, yCenter: newYCenter };
    });
  };

  // When user clicks on the canvas, show the world coordinates at that point
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const worldCoords = canvasToWorld(cx, cy, canvas.width, canvas.height);
    const conv = worldToCanvas(worldCoords.x, worldCoords.y, canvas.width, canvas.height);
    setCoord({ ...worldCoords, cx: conv.cx, cy: conv.cy });
    setTimeout(() => setCoord(null), 2000);
  };

  // Redraw when view or functions change
  useEffect(() => {
    draw();
  }, [view, functions, coord]);

  // Add a new function
  const handleAddFunction = () => {
    if (newExpression.trim() === "") return;
    setFunctions([...functions, { expression: newExpression, color: newColor }]);
    setNewExpression("");
  };

  // Remove a function
  const handleRemoveFunction = (index) => {
    setFunctions(functions.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar for functions */}
      <div style={{ width: "220px", marginRight: "10px" }}>
        <h3>Functions</h3>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="f(x) e.g., sin(x)"
            value={newExpression}
            onChange={(e) => setNewExpression(e.target.value)}
            style={{ width: "100%", padding: "4px", marginBottom: "4px" }}
          />
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            style={{ marginBottom: "4px" }}
          />
          <button onClick={handleAddFunction} style={{ width: "100%", padding: "6px" }}>
            Add Function
          </button>
        </div>
        {functions.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {functions.map((fn, idx) => (
              <li key={idx} style={{ marginBottom: "4px" }}>
                <span style={{ background: fn.color, display: "inline-block", width: "12px", height: "12px", marginRight: "4px" }}></span>
                {fn.expression}
                <button onClick={() => handleRemoveFunction(idx)} style={{ marginLeft: "8px", fontSize: "10px" }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Canvas area */}
      <div style={{ flexGrow: 1 }}>
        <canvas
          ref={canvasRef}
          width={900}
          height={600}
          style={{ border: "1px solid #888", cursor: isDragging.current ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onClick={handleCanvasClick}
        />
        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "0.9em", color: "#555" }}>
          Drag to pan, scroll to zoom, click to see coordinates.
        </p>
      </div>
    </div>
  );
}
