// utils/calculations.js

import { evaluate } from 'mathjs';

/* ------------------- */
/* Conversion Functions */
/* ------------------- */
export function convertLength(meters) {
  const m = parseFloat(meters);
  if (isNaN(m)) throw new Error('Invalid input');
  return m / 1000;
}

export function convertTemperature(celsius) {
  const c = parseFloat(celsius);
  if (isNaN(c)) throw new Error('Invalid input');
  return (c * 9/5) + 32;
}

/* ----------------- */
/* Calculus Functions */
/* ----------------- */
export function derivative(expression, point, epsilon = 1e-5) {
  const x = parseFloat(point);
  if (isNaN(x)) throw new Error('Invalid point');
  try {
    const f = (val) => evaluate(expression, { x: val });
    return (f(x + epsilon) - f(x - epsilon)) / (2 * epsilon);
  } catch (error) {
    throw new Error('Error in evaluating expression');
  }
}

export function integral(expression, a, b, subdivisions = 1000) {
  const lower = parseFloat(a);
  const upper = parseFloat(b);
  if (isNaN(lower) || isNaN(upper)) throw new Error('Invalid limits');
  const n = subdivisions;
  const h = (upper - lower) / n;
  let sum = 0;
  try {
    for (let i = 0; i <= n; i++) {
      const x = lower + i * h;
      const fx = evaluate(expression, { x });
      sum += (i === 0 || i === n) ? fx : 2 * fx;
    }
    return (h / 2) * sum;
  } catch (error) {
    throw new Error('Error in evaluating expression');
  }
}

/* --------------------- */
/* Financial Functions   */
/* --------------------- */
export function loanPayment(principal, annualRate, years) {
  const P = parseFloat(principal);
  const r = parseFloat(annualRate) / 100 / 12;
  const n = parseFloat(years) * 12;
  if (isNaN(P) || isNaN(r) || isNaN(n) || r === 0) throw new Error('Invalid input');
  return P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

export function futureInvestmentValue(principal, annualRate, years, compoundsPerYear) {
  const P = parseFloat(principal);
  const r = parseFloat(annualRate) / 100;
  const t = parseFloat(years);
  const n = parseFloat(compoundsPerYear);
  if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || n === 0) throw new Error('Invalid input');
  return P * Math.pow(1 + r/n, n*t);
}

/* ---------------------- */
/* Statistics Functions   */
/* ---------------------- */
export function mean(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) throw new Error('Invalid input');
  const total = numbers.reduce((acc, curr) => acc + curr, 0);
  return total / numbers.length;
}

export function median(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) throw new Error('Invalid input');
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    return sorted[mid];
  }
}

/* ----------------------- */
/* Trigonometry Functions  */
/* ----------------------- */
export function sine(angle, unit = 'degrees') {
  let a = parseFloat(angle);
  if (isNaN(a)) throw new Error('Invalid angle');
  if (unit === 'degrees') {
    a = a * Math.PI / 180;
  }
  return Math.sin(a);
}

export function cosine(angle, unit = 'degrees') {
  let a = parseFloat(angle);
  if (isNaN(a)) throw new Error('Invalid angle');
  if (unit === 'degrees') {
    a = a * Math.PI / 180;
  }
  return Math.cos(a);
}

/* --------------------- */
/* Geometry Functions    */
/* --------------------- */
export function circleArea(radius) {
  const r = parseFloat(radius);
  if (isNaN(r)) throw new Error('Invalid radius');
  return Math.PI * r * r;
}

export function sphereVolume(radius) {
  const r = parseFloat(radius);
  if (isNaN(r)) throw new Error('Invalid radius');
  return (4/3) * Math.PI * Math.pow(r, 3);
}

/* --------------------- */
/* Algebra Functions     */
/* --------------------- */
export function quadraticSolver(a, b, c) {
  const A = parseFloat(a);
  const B = parseFloat(b);
  const C = parseFloat(c);
  if (isNaN(A) || isNaN(B) || isNaN(C) || A === 0) throw new Error('Invalid input (a must not be 0)');
  const discriminant = B * B - 4 * A * C;
  if (discriminant < 0) return null; // No real roots
  const root1 = (-B + Math.sqrt(discriminant)) / (2 * A);
  const root2 = (-B - Math.sqrt(discriminant)) / (2 * A);
  return { root1, root2 };
}

/* ----------------------- */
/* Arithmetic Functions    */
/* ----------------------- */
export function basicArithmetic(expression) {
  try {
    // WARNING: Using eval() is dangerous and is used here for demonstration only.
    return eval(expression);
  } catch (error) {
    throw new Error('Error in evaluating expression');
  }
}

export function percentageCalculator(part, whole) {
  const p = parseFloat(part);
  const w = parseFloat(whole);
  if (isNaN(p) || isNaN(w) || w === 0) throw new Error('Invalid input');
  return (p / w) * 100;
}
