import { useState } from 'react';

export default function StatisticsSummary() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  function calculateStats() {
    setError(null);
    // Split by commas or whitespace
    const numbers = input
      .split(/[,\s]+/)
      .map((x) => parseFloat(x))
      .filter((x) => !isNaN(x));
    if (numbers.length === 0) {
      setError("Please enter valid numbers separated by commas or spaces.");
      return;
    }
    const n = numbers.length;
    // Calculate Mean
    const mean = numbers.reduce((acc, cur) => acc + cur, 0) / n;
    // Variance (Population variance)
    const variance = numbers.reduce((acc, cur) => acc + Math.pow(cur - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    // Mean Absolute Deviation (MAD)
    const mad = numbers.reduce((acc, cur) => acc + Math.abs(cur - mean), 0) / n;

    setResults({ n, mean, variance, stdDev, mad });
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Descriptive Statistics Summary</h2>
      <p>
        Enter your data values (separated by commas or spaces) below. The calculator will compute the
        following:
      </p>
      <ul>
        <li><strong>Mean</strong> – The average value.</li>
        <li><strong>Variance</strong> – The average squared difference from the mean.</li>
        <li><strong>Standard Deviation</strong> – The square root of the variance.</li>
        <li><strong>Mean Absolute Deviation (MAD)</strong> – The average absolute difference from the mean.</li>
      </ul>
      <textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "8px", fontSize: "14px" }}
        placeholder="Example: 2, 4, 6, 8, 10"
      ></textarea>
      <br />
      <button 
        onClick={calculateStats} 
        style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}
      >
        Calculate Statistics
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {results && (
        <div style={{ marginTop: "20px", background: "#f9f9f9", padding: "15px", borderRadius: "4px" }}>
          <h3>Results</h3>
          <p><strong>Number of Data Points (n):</strong> {results.n}</p>
          <p>
            <strong>Mean:</strong> {results.mean.toFixed(4)}
            <br />
            <em>Formula:</em> Mean = (x₁ + x₂ + … + xₙ) / n
          </p>
          <hr />
          <p>
            <strong>Variance:</strong> {results.variance.toFixed(4)}
            <br />
            <em>Formula:</em> Variance = [(x₁ − Mean)² + (x₂ − Mean)² + … + (xₙ − Mean)²] / n
          </p>
          <hr />
          <p>
            <strong>Standard Deviation:</strong> {results.stdDev.toFixed(4)}
            <br />
            <em>Formula:</em> Standard Deviation = √(Variance)
          </p>
          <hr />
          <p>
            <strong>Mean Absolute Deviation (MAD):</strong> {results.mad.toFixed(4)}
            <br />
            <em>Formula:</em> MAD = [|x₁ − Mean| + |x₂ − Mean| + … + |xₙ − Mean|] / n
          </p>
        </div>
      )}
      <div style={{ marginTop: "30px" }}>
        <h3>In-Depth Explanation of Formulas</h3>
        <ul>
          <li>
            <strong>Mean:</strong> The average value of your dataset. It provides a measure of central
            tendency. The mean is calculated by summing all data points and dividing by the total
            number of points.
          </li>
          <li>
            <strong>Variance:</strong> This measures the spread of your data. It is computed by taking
            the average of the squared differences between each data point and the mean. A higher
            variance indicates that the data points are more spread out.
          </li>
          <li>
            <strong>Standard Deviation:</strong> The standard deviation is simply the square root of the
            variance, which brings the units back to the original scale of the data. It provides a
            more interpretable measure of dispersion.
          </li>
          <li>
            <strong>Mean Absolute Deviation (MAD):</strong> Instead of squaring the differences (as in
            variance), MAD takes the absolute value of the difference between each data point and the
            mean, then averages these values. It is often considered a more robust measure of variability,
            especially when dealing with outliers.
          </li>
        </ul>
      </div>
    </div>
  );
}
    
