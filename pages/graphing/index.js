import { useRef, useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

export default function GraphingCalculator() {
  const canvasRef = useRef(null);
  const [expression, setExpression] = useState('sin(x)');
  const [error, setError] = useState(null);
  const [range, setRange] = useState({ xMin: -10, xMax: 10, yMin: -10, yMax: 10 });

  // Draw the function graph onto the canvas.
  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear the canvas.
    ctx.clearRect(0, 0, width, height);

    // Fill background.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    // Set up coordinate transformation.
    const { xMin, xMax, yMin, yMax } = range;
    const xScale = width / (xMax - xMin);
    const yScale = height / (yMax - yMin);

    // Draw vertical (x=0) axis.
    const zeroX = -xMin * xScale;
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(zeroX, 0);
    ctx.lineTo(zeroX, height);
    ctx.stroke();

    // Draw horizontal (y=0) axis.
    // Note: Canvas y=0 is at the top, so we map math y accordingly.
    const zeroY = ((yMax - 0) / (yMax - yMin)) * height;
    ctx.beginPath();
    ctx.moveTo(0, zeroY);
    ctx.lineTo(width, zeroY);
    ctx.stroke();

    // Plot the function.
    ctx.strokeStyle = "#f00";
    ctx.lineWidth = 2;
    ctx.beginPath();
    let firstPoint = true;
    setError(null);

    // For every pixel column, compute the corresponding math x,
    // evaluate f(x) and convert it back to canvas coordinates.
    for (let px = 0; px <= width; px++) {
      const mathX = xMin + (px / width) * (xMax - xMin);
      let mathY;
      try {
        mathY = evaluate(expression, { x: mathX });
      } catch (e) {
        setError('Error evaluating function.');
        return;
      }
      // Map mathY to canvas y (inverting the y-axis).
      const py = ((yMax - mathY) / (yMax - yMin)) * height;
      if (firstPoint) {
        ctx.moveTo(px, py);
        firstPoint = false;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
  };

  // Redraw whenever the expression or range changes.
  useEffect(() => {
    drawGraph();
  }, [expression, range]);

  const handlePlot = () => {
    setError(null);
    drawGraph();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Custom Graphing Calculator</h2>
      <p>Enter a function in terms of x (e.g. sin(x), x^2, etc.):</p>
      <input 
        type="text" 
        value={expression} 
        onChange={(e) => setExpression(e.target.value)} 
        style={{ width: '300px', marginRight: '0.5em' }}
      />
      <button onClick={handlePlot}>Plot</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ margin: '1em auto' }}>
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={400} 
          style={{ border: '1px solid #000', display: 'block', margin: 'auto' }} 
        />
      </div>
      <div>
        <h4>Adjust Range</h4>
        <label>
          xMin: 
          <input 
            type="number" 
            value={range.xMin} 
            onChange={(e) => setRange({ ...range, xMin: Number(e.target.value) })} 
          />
        </label>
        &nbsp;
        <label>
          xMax: 
          <input 
            type="number" 
            value={range.xMax} 
            onChange={(e) => setRange({ ...range, xMax: Number(e.target.value) })} 
          />
        </label>
        <br />
        <label>
          yMin: 
          <input 
            type="number" 
            value={range.yMin} 
            onChange={(e) => setRange({ ...range, yMin: Number(e.target.value) })} 
          />
        </label>
        &nbsp;
        <label>
          yMax: 
          <input 
            type="number" 
            value={range.yMax} 
            onChange={(e) => setRange({ ...range, yMax: Number(e.target.value) })} 
          />
        </label>
        <br />
        <button onClick={handlePlot} style={{ marginTop: '0.5em' }}>
          Update Range & Plot
        </button>
      </div>
    </div>
  );
}
