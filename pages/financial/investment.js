import { useState } from 'react';

export default function InvestmentCalculator() {
  const [principal, setPrincipal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [compoundsPerYear, setCompoundsPerYear] = useState('');
  const [futureValue, setFutureValue] = useState(null);

  const handleCalculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(annualRate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(compoundsPerYear);
    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || n === 0) {
      setFutureValue('Invalid input');
      return;
    }
    const amount = P * Math.pow(1 + r/n, n*t);
    setFutureValue(amount);
  };

  return (
    <div>
      <h2>Investment Calculator</h2>
      <p>Calculate the future value of an investment:</p>
      <input 
        type="number" 
        value={principal} 
        onChange={(e) => setPrincipal(e.target.value)} 
        placeholder="Principal amount" 
      />
      <input 
        type="number" 
        value={annualRate} 
        onChange={(e) => setAnnualRate(e.target.value)} 
        placeholder="Annual interest rate (%)" 
      />
      <input 
        type="number" 
        value={years} 
        onChange={(e) => setYears(e.target.value)} 
        placeholder="Number of years" 
      />
      <input 
        type="number" 
        value={compoundsPerYear} 
        onChange={(e) => setCompoundsPerYear(e.target.value)} 
        placeholder="Compounds per year" 
      />
      <button onClick={handleCalculate}>Calculate Future Value</button>
      {futureValue !== null && (
        <p>The future value of your investment is approximately {typeof futureValue === 'number' ? futureValue.toFixed(2) : futureValue}.</p>
      )}
    </div>
  );
}
