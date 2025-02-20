import { useState, useRef, useEffect } from 'react';
import { evaluate } from 'mathjs';

/**
 * A more advanced custom graphing calculator:
 * - Multiple functions with add/remove
 * - Panning (click + drag)
 * - Zooming (mouse wheel)
 * - Dynamic grid with axis ticks & labels
 * - Slightly more refined styling
 */
export default function GraphingCalculator() {
  const [functions, setFunctions] = useState([]); // Start empty
  const [newExpression, setNewExpression] = useState('');
  const [newColor, setNewColor] = useState('#000000');
  
  // View parameters
  const [view, setView] = useState({
    xCenter: 0,   // Center x in "math" coords
    yCenter: 0,   // Center y in "math" coords
    scale: 50     // Pixels per 1 math unit
  });

  // Canvas ref & dragging state
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  /** Helper: convert math coords -> canvas coords */
  function worldToCanvas(x, y, width, height) {
    const { xCenter, yCenter, scale } = view;
    // Center of canvas is (width/2, height/2)
    // math X = xCenter => canvas X = width/2
    // math Y = yCenter => canvas Y = height/2
    const cx = width / 2 + (x - xCenter) * scale;
    const cy = height / 2 - (y - yCenter) * scale;
    return { cx, cy };
  }

  /** Helper: convert canvas coords -> math coords */
  function canvasToWorld(cx, cy, width, height) {
    const { xCenter, yCenter, scale } = view;
    const x = xCenter + (cx - width / 2) / scale;
    const y = yCenter - (cy - height / 2) / scale;
    return { x, y };
  }

  /** Main draw routine */
  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const { scale, xCenter, yCenter } = view;
    // Determine visible math range
    const xMin = xCenter - width / (2 * scale);
    const xMax = xCenter + width / (2 * scale);
    const yMin = yCenter - height / (2 * scale);
    const yMax = yCenter + height / (2 * scale);

    // 1) Draw grid lines
    drawGrid(ctx, width, height, xMin, xMax, yMin, yMax);

    // 2) Plot each function
    for (const func of functions) {
      drawFunction(ctx, width, height, xMin, xMax, func.expression, func.color);
    }

    // 3) Draw axes on top
    drawAxes(ctx, width, height);
  }

  /** Draw grid lines + labels. We'll pick a "nice" step based on scale. */
  function drawGrid(ctx, width, height, xMin, xMax, yMin, yMax) {
    const { scale } = view;

    // Decide step for grid lines (like 1, 2, 5, 10, etc.)
    const steps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
    let step = 1;
    for (let s of steps) {
      if (scale * s >= 50 && scale * s <= 200) {
        step = s;
        break;
      }
    }

    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#666';

    // Vertical lines
    // Start at the nearest multiple of "step" above xMin
    let firstVLine = Math.ceil(xMin / step) * step;
    for (let x = firstVLine; x <= xMax; x += step) {
      const { cx } = worldToCanvas(x, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
      // Label at the bottom axis (or near bottom)
      // We'll only label if x isn't too close to center (to avoid collisions with y-axis label).
      ctx.save();
      ctx.translate(cx, height / 2);
      ctx.rotate(0);
      ctx.fillText(x.toString(), 2, height / 2 - 2); 
      ctx.restore();
    }

    // Horizontal lines
    let firstHLine = Math.ceil(yMin / step) * step;
    for (let y = firstHLine; y <= yMax; y += step) {
      const { cy } = worldToCanvas(0, y, width, height);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();
      // Label
      ctx.save();
      ctx.translate(width / 2, cy);
      ctx.fillText(y.toString(), 4, -2);
      ctx.restore();
    }
  }

  /** Draw the main x=0 and y=0 axes in black */
  function drawAxes(ctx, width, height) {
    const { cx: zeroX } = worldToCanvas(0, 0, width, height);
    const { cy: zeroY } = worldToCanvas(0, 0, width, height);

    ctx.strokeStyle = '#000';
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

  /** Plot a single function from xMin to xMax */
  function drawFunction(ctx, width, height, xMin, xMax, expr, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let firstPoint = true;
    const steps = width; // sample at each pixel in x

    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      let y;
      try {
        y = evaluate(expr, { x });
        if (typeof y !== 'number' || isNaN(y)) continue;
      } catch (err) {
        // If there's an error in the expression, skip
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

  // Panning with mouse
  const onMouseDown = (e) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setView((prev) => ({
      ...prev,
      xCenter: prev.xCenter - dx / prev.scale,
      yCenter: prev.yCenter + dy / prev.scale
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };
  const onMouseLeave = () => {
    isDragging.current = false;
  };
  // Zooming
  const onWheel = (e) => {
    e.preventDefault();
    const { width, height } = canvasRef.current;
    // mouse coords => math coords => zoom
    const mouseX = e.clientX - canvasRef.current.getBoundingClientRect().left;
    const mouseY = e.clientY - canvasRef.current.getBoundingClientRect().top;
    const { x: beforeX, y: beforeY } = canvasToWorld(mouseX, mouseY, width, height);

    // Zoom factor
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setView((prev) => {
      const newScale = prev.scale * zoomFactor;
      const newView = { ...prev, scale: newScale };
      // Recompute center so the point under mouse remains the same
      const { x: afterX, y: afterY } = {
        x: beforeX,
        y: beforeY
      };
      // afterX = newView.xCenter + (mouseX - width/2)/newScale
      // => newView.xCenter = afterX - (mouseX - width/2)/newScale
      newView.xCenter = afterX - (mouseX - width / 2) / newScale;
      newView.yCenter = afterY + (mouseY - height / 2) / newScale;
      return newView;
    });
  };

  // Redraw whenever view or functions change
  useEffect(() => {
    draw();
  }, [view, functions]);

  // Add a function
  function handleAddFunction() {
    if (!newExpression.trim()) return;
    setFunctions([...functions, { expression: newExpression, color: newColor }]);
    setNewExpression('');
  }
  // Remove a function
  function handleRemoveFunction(index) {
    const updated = [...functions];
    updated.splice(index, 1);
    setFunctions(updated);
  }

  return (
    <div style={{ display: 'flex', margin: '20px' }}>
      {/* Sidebar for function list */}
      <div style={{ width: '200px', marginRight: '10px' }}>
        <h3>Functions</h3>
        <div style={{ marginBottom: '1em' }}>
          <input
            type="text"
            placeholder="e.g. cos(x)"
            value={newExpression}
            onChange={(e) => setNewExpression(e.target.value)}
            style={{ width: '100%', marginBottom: '0.5em' }}
          />
          <div>
            <label style={{ marginRight: '5px' }}>Color:</label>
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
          </div>
          <button onClick={handleAddFunction} style={{ marginTop: '0.5em' }}>
            Add Function
          </button>
        </div>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {functions.map((f, idx) => (
            <li key={idx} style={{ marginBottom: '0.5em' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '1em',
                  height: '1em',
                  backgroundColor: f.color,
                  marginRight: '5px',
                  verticalAlign: 'middle'
                }}
              ></span>
              {f.expression}
              <button
                onClick={() => handleRemoveFunction(idx)}
                style={{ marginLeft: '10px', fontSize: '0.8em' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Graph Canvas */}
      <div style={{ flexGrow: 1, textAlign: 'center' }}>
        <canvas
          ref={canvasRef}
          width={900}
          height={600}
          style={{ border: '1px solid #888', cursor: 'grab' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onWheel={onWheel}
        />
        <p style={{ fontSize: '0.9em', color: '#555' }}>
          Drag to pan, scroll to zoom.
        </p>
      </div>
    </div>
  );
}
