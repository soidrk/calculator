// pages/statistics/advanced.js

import { useState } from "react";

// Basic descriptive statistic functions:
function calculateMean(numbers) {
  const sum = numbers.reduce((acc, cur) => acc + cur, 0);
  return sum / numbers.length;
}

function calculateMedian(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const n = sorted.length;
  if (n % 2 === 1) return sorted[Math.floor(n / 2)];
  else return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

function calculateMode(numbers) {
  const freq = {};
  numbers.forEach((num) => {
    freq[num] = (freq[num] || 0) + 1;
  });
  let maxFreq = 0;
  for (const key in freq) {
    if (freq[key] > maxFreq) maxFreq = freq[key];
  }
  const modes = [];
  for (const key in freq) {
    if (freq[key] === maxFreq) {
      modes.push(Number(key));
    }
  }
  if (modes.length === Object.keys(freq).length) return []; // no unique mode
  return modes;
}

function calculateRange(numbers) {
  return Math.max(...numbers) - Math.min(...numbers);
}

function calculateVariance(numbers, sample = false) {
  const mean = calculateMean(numbers);
  const squaredDiffs = numbers.map((x) => Math.pow(x - mean, 2));
  const divisor = sample ? numbers.length - 1 : numbers.length;
  return squaredDiffs.reduce((acc, cur) => acc + cur, 0) / divisor;
}

function calculateStdDev(numbers, sample = false) {
  return Math.sqrt(calculateVariance(numbers, sample));
}

function calculateMAD(numbers) {
  const mean = calculateMean(numbers);
  const absDiffs = numbers.map((x) => Math.abs(x - mean));
  return absDiffs.reduce((acc, cur) => acc + cur, 0) / numbers.length;
}

function calculateQuartiles(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const median = calculateMedian(sorted);
  const n = sorted.length;
  const lower = sorted.slice(0, Math.floor(n / 2));
  const upper = sorted.slice(n % 2 === 0 ? n / 2 : Math.floor(n / 2) + 1);
  return {
    q1: calculateMedian(lower),
    median,
    q3: calculateMedian(upper),
  };
}

function calculateIQR(numbers) {
  const { q1, q3 } = calculateQuartiles(numbers);
  return q3 - q1;
}

// Advanced statistics functions:

// Sample skewness using the adjusted Fisher-Pearson standardized moment coefficient.
function calculateSkewness(numbers) {
  const n = numbers.length;
  if (n < 3) return null;
  const mean = calculateMean(numbers);
  const s = calculateStdDev(numbers, true);
  const sumCubed = numbers.reduce((acc, x) => acc + Math.pow((x - mean) / s, 3), 0);
  return (n / ((n - 1) * (n - 2))) * sumCubed;
}

// Sample kurtosis (excess kurtosis)
function calculateKurtosis(numbers) {
  const n = numbers.length;
  if (n < 4) return null;
  const mean = calculateMean(numbers);
  const s = calculateStdDev(numbers, true);
  const sumFourth = numbers.reduce((acc, x) => acc + Math.pow((x - mean) / s, 4), 0);
  const numerator = n * (n + 1) * sumFourth;
  const denominator = (n - 1) * (n - 2) * (n - 3);
  const adjustment = (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
  return numerator / denominator - adjustment;
}

function calculateCoefficientOfVariation(numbers) {
  const mean = calculateMean(numbers);
  const s = calculateStdDev(numbers, false);
  return mean !== 0 ? s / mean : null;
}

export default function AdvancedStatisticsDashboard() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    const numbers = input
      .split(/[,\s]+/)
      .map(x => parseFloat(x))
      .filter(x => !isNaN(x));
    if (numbers.length === 0) {
      setError("Please enter valid numbers separated by commas or spaces.");
      setResults(null);
      return;
    }
    
    const count = numbers.length;
    const mean = calculateMean(numbers);
    const median = calculateMedian(numbers);
    const mode = calculateMode(numbers);
    const range = calculateRange(numbers);
    const popVariance = calculateVariance(numbers, false);
    const sampleVariance = count > 1 ? calculateVariance(numbers, true) : null;
    const popStdDev = calculateStdDev(numbers, false);
    const sampleStdDev = count > 1 ? calculateStdDev(numbers, true) : null;
    const mad = calculateMAD(numbers);
    const quartiles = calculateQuartiles(numbers);
    const iqr = calculateIQR(numbers);
    const skewness = count >= 3 ? calculateSkewness(numbers) : null;
    const kurtosis = count >= 4 ? calculateKurtosis(numbers) : null;
    const coeffVar = calculateCoefficientOfVariation(numbers);

    setResults({
      count,
      mean,
      median,
      mode,
      range,
      popVariance,
      sampleVariance,
      popStdDev,
      sampleStdDev,
      mad,
      quartiles,
      iqr,
      skewness,
      kurtosis,
      coeffVar
    });
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Advanced Statistics Dashboard</h1>
      <p>
        Enter your data (numbers separated by commas or spaces). This dashboard computes a full range of descriptive statistics including:
      </p>
      <ul>
        <li>Count (n)</li>
        <li>Mean, Median, and Mode</li>
        <li>Range, Variance, and Standard Deviation (Population and Sample)</li>
        <li>Mean Absolute Deviation (MAD)</li>
        <li>Quartiles and Interquartile Range (IQR)</li>
        <li>Sample Skewness and Kurtosis (Excess)</li>
        <li>Coefficient of Variation</li>
      </ul>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        placeholder="Example: 5, 7, 9, 10, 12, 12, 15"
      ></textarea>
      <br />
      <button
        onClick={handleCalculate}
        style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}
      >
        Calculate Advanced Statistics
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {results && (
        <div style={{ marginTop: "30px", background: "#fdfdfd", padding: "20px", borderRadius: "8px", border: "1px solid #ccc" }}>
          <h2>Results</h2>
          <p><strong>Count (n):</strong> {results.count}</p>
          <h3>Central Tendency</h3>
          <p>
            <strong>Mean:</strong> {results.mean.toFixed(4)} <br />
            <em>Formula:</em> Mean = (Σxᵢ) / n
          </p>
          <p>
            <strong>Median:</strong> {results.median.toFixed(4)} <br />
            <em>Explanation:</em> The middle value after sorting the data.
          </p>
          <p>
            <strong>Mode:</strong> {results.mode.length > 0 ? results.mode.join(", ") : "No unique mode"} <br />
            <em>Explanation:</em> The most frequent value(s) in the dataset.
          </p>
          <h3>Dispersion</h3>
          <p>
            <strong>Range:</strong> {results.range.toFixed(4)} <br />
            <em>Formula:</em> Range = Max − Min
          </p>
          <p>
            <strong>Population Variance:</strong> {results.popVariance.toFixed(4)} <br />
            <em>Formula:</em> σ² = Σ(xᵢ − Mean)² / n
          </p>
          {results.sampleVariance !== null && (
            <p>
              <strong>Sample Variance:</strong> {results.sampleVariance.toFixed(4)} <br />
              <em>Formula:</em> s² = Σ(xᵢ − Mean)² / (n − 1)
            </p>
          )}
          <p>
            <strong>Population Standard Deviation:</strong> {results.popStdDev.toFixed(4)} <br />
            <em>Formula:</em> σ = √(Variance)
          </p>
          {results.sampleStdDev !== null && (
            <p>
              <strong>Sample Standard Deviation:</strong> {results.sampleStdDev.toFixed(4)} <br />
              <em>Formula:</em> s = √(Sample Variance)
            </p>
          )}
          <p>
            <strong>Mean Absolute Deviation (MAD):</strong> {results.mad.toFixed(4)} <br />
            <em>Formula:</em> MAD = Σ|xᵢ − Mean| / n
          </p>
          <h3>Distribution Shape</h3>
          <p>
            <strong>Sample Skewness:</strong> {results.skewness !== null ? results.skewness.toFixed(4) : "N/A"} <br />
            <em>Formula:</em> Skewness = [n/(n-1)(n-2)] * Σ[(xᵢ − Mean)/s]³
          </p>
          <p>
            <strong>Sample Kurtosis (Excess):</strong> {results.kurtosis !== null ? results.kurtosis.toFixed(4) : "N/A"} <br />
            <em>Formula:</em> Kurtosis = [n(n+1)/((n-1)(n-2)(n-3))]*Σ[(xᵢ − Mean)/s]⁴ − [3(n-1)²/((n-2)(n-3))]
          </p>
          <h3>Additional Measures</h3>
          <p>
            <strong>Quartiles:</strong> Q1 = {results.quartiles.q1.toFixed(4)}, Median = {results.quartiles.median.toFixed(4)}, Q3 = {results.quartiles.q3.toFixed(4)} <br />
            <em>Explanation:</em> Quartiles divide the sorted data into four equal parts.
          </p>
          <p>
            <strong>Interquartile Range (IQR):</strong> {results.iqr.toFixed(4)} <br />
            <em>Formula:</em> IQR = Q3 − Q1
          </p>
          <p>
            <strong>Coefficient of Variation (CV):</strong> {results.coeffVar !== null ? (results.coeffVar * 100).toFixed(2) + "%" : "N/A"} <br />
            <em>Formula:</em> CV = (Standard Deviation / Mean) × 100%
          </p>
          <h3>In-Depth Explanations</h3>
          <ul>
            <li>
              <strong>Mean:</strong> The arithmetic average, providing a measure of central tendency.
            </li>
            <li>
              <strong>Median:</strong> The middle value after sorting, which is robust to outliers.
            </li>
            <li>
              <strong>Mode:</strong> The most frequently occurring value(s); if all values occur equally, no unique mode exists.
            </li>
            <li>
              <strong>Variance & Standard Deviation:</strong> These quantify the spread of the data around the mean.
              The sample versions use n-1 in the denominator for an unbiased estimate.
            </li>
            <li>
              <strong>MAD:</strong> Measures the average absolute deviation from the mean.
            </li>
            <li>
              <strong>Skewness:</strong> Indicates asymmetry in the distribution. Positive skew suggests a longer right tail.
            </li>
            <li>
              <strong>Kurtosis:</strong> Reflects the “tailedness” of the distribution relative to a normal curve.
            </li>
            <li>
              <strong>Coefficient of Variation:</strong> Expresses standard deviation as a percentage of the mean, useful for comparing variability.
            </li>
            <li>
              <strong>Quartiles & IQR:</strong> Provide insight into the spread of the middle 50% of data.
            </li>
          </ul>
          <h3>Additional Resources</h3>
          <ul>
            <li>
              <a href="https://en.wikipedia.org/wiki/Descriptive_statistics" target="_blank" rel="noopener noreferrer">
                Descriptive Statistics (Wikipedia)
              </a>
            </li>
            <li>
              <a href="https://www.khanacademy.org/math/statistics-probability" target="_blank" rel="noopener noreferrer">
                Statistics and Probability (Khan Academy)
              </a>
            </li>
            <li>
              <a href="https://www.statisticshowto.com/" target="_blank" rel="noopener noreferrer">
                Statistics How To
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
