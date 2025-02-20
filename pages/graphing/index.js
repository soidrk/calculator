import { useState, useRef, useEffect } from 'react';
import { evaluate } from 'mathjs';

export default function GraphingCalculator() {
  // State for multiple functions: each has an expression and color.
  const [functions, setFunctions] = useState([
    { expression: 'sin(x)', color: '#f00' },
    { expression: '0.5*x', color: '#00f' }
  ]);
  // View parameters: center and scale
  const [view, setView] = useState({
    xCenter: 0,
    yCenter: 0,
    scale: 40 // pixels per unit
  });
  const [newExpression, setNewExpression] = useState('');
  const [newColor, setNewColor] = useState('#000');
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Convert world coordinate (x, y) to canvas coordinate
  const worldToCanvas = (x, y, width, height) => {
    const { xCenter, yCenter, scale } = view;
    const cx = width / 2 + (x - xCenter) * scale;
    const cy = height / 2 - (y - yCenter) * scale;
    return { cx, cy };
  };

  // Draw grid, axes, labels and functions
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Fill background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    const { scale, xCenter, yCenter } = view;
    // Determine the world bounds
    const xMin = xCenter - width / (2 * scale);
    const xMax = xCenter + width / (2 * scale);
    const yMin = yCenter - height / (2 * scale);
    const yMax = yCenter + height / (2 * scale);

    // Draw grid lines (choose grid step based on scale)
    const gridStep = Math.pow(10, Math.floor(Math.log10(1 / scale)) + 1);
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#888';

    // Vertical grid lines
    let startX = Math.ceil(xMin / gridStep) * gridStep;
    for (let x = startX; x <= xMax; x += gridStep) {
      const { cx } = worldToCanvas(x, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
      // Label
      ctx.fillText(x.toFixed(2), cx + 2, height / 2 + 12);
    }
    // Horizontal grid lines
    let startY = Math.ceil(yMin / gridStep) * gridStep;
    for (let y = startY; y <= yMax; y += gridStep) {
      const { cy } = worldToCanvas(0, y, width, height);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();
      // Label
      ctx.fillText(y.toFixed(2), width / 2 + 2, cy - 2);
    }

    // Draw axes (x=0 and y=0) with thicker lines and labels
    const { cx: axisX } = worldToCanvas(0, 0, width, height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    // y-axis
    ctx.beginPath();
    ctx.moveTo(axisX, 0);
    ctx.lineTo(axisX, height);
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.fillText('x=0', axisX + 4, height / 2 - 4);
    // x-axis
    const { cy: axisY } = worldToCanvas(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, axisY);
    ctx.lineTo(width, axisY);
    ctx.stroke();
    ctx.fillText('y=0', width / 2 + 4, axisY - 4);

    // Draw each function
    functions.forEach(func => {
      ctx.strokeStyle = func.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let first = true;
      for (let px = 0; px <= width; px++) {
        const x = xMin + (px / width) * (xMax - xMin);
        let y;
        try {
          y = evaluate(func.expression, { x });
          if (typeof y !== 'number') continue;
        } catch (e) {
          continue;
        }
        const { cy } = worldToCanvas(0, y, width, height);
        if (first) {
          ctx.moveTo(px, cy);
          first = false;
        } else {
          ctx.lineTo(px, cy);
        }
      }
      ctx.stroke();
      // Optionally, add a label near the beginning of the curve
      ctx.fillStyle = func.color;
      ctx.font = '12px sans-serif';
      ctx.fillText(func.expression, 10, 20 + 15 * functions.indexOf(func));
    });
  };

  // Redraw on changes
  useEffect(() => {
    draw();
  }, [view, functions]);

  // Mouse events for panning
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
      yCenter: prev.yCenter + dy / prev.scale
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  // Zoom on wheel
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    setView((prev) => {
      let newScale = prev.scale * (delta > 0 ? 0.9 : 1.1);
      return { ...prev, scale: newScale };
    });
  };

  // Add new function
  const handleAddFunction = () => {
    if (newExpression.trim() !== '') {
      setFunctions([...functions, { expression: newExpression, color: newColor }]);
      setNewExpression('');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Custom Graphing Calculator</h2>
      <div style={{ marginBottom: '1em' }}>
        <input 
          type="text"
          placeholder="Enter function f(x) e.g. cos(x)"
          value={newExpression}
          onChange={(e) => setNewExpression(e.target.value)}
          style={{ width: '250px', marginRight: '0.5em' }}
        />
        <input 
          type="color" 
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          style={{ marginRight: '0.5em' }}
        />
        <button onClick={handleAddFunction}>Add Function</button>
      </div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        style={{ border: '1px solid #333', cursor: 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      <p style={{ fontSize: '0.9em', color: '#555' }}>
        Use mouse drag to pan and scroll to zoom.
      </p>
    </div>
  );
}
