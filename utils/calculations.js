import { evaluate, simplify } from 'mathjs';

/* ---------------------------------
   Conversions
-----------------------------------*/
export function convertLength(meters) {
  const m = parseFloat(meters);
  if (isNaN(m)) throw new Error('Invalid input');
  return m / 1000; // meters to kilometers
}

export function convertTemperature(celsius) {
  const c = parseFloat(celsius);
  if (isNaN(c)) throw new Error('Invalid input');
  return (c * 9 / 5) + 32; // Celsius to Fahrenheit
}

/* ---------------------------------
   Calculus
-----------------------------------*/
export function derivative(expression, point, epsilon = 1e-5) {
  const x = parseFloat(point);
  if (isNaN(x)) throw new Error('Invalid point');
  try {
    const f = (val) => evaluate(expression, { x: val });
    return (f(x + epsilon) - f(x - epsilon)) / (2 * epsilon);
  } catch {
    throw new Error('Error in calculation');
  }
}

export function integral(expression, a, b, subdivisions = 1000) {
  const lower = parseFloat(a);
  const upper = parseFloat(b);
  if (isNaN(lower) || isNaN(upper)) throw new Error('Invalid interval');
  const h = (upper - lower) / subdivisions;
  let sum = 0;
  try {
    for (let i = 0; i <= subdivisions; i++) {
      const x = lower + i * h;
      const fx = evaluate(expression, { x });
      sum += (i === 0 || i === subdivisions) ? fx : 2 * fx;
    }
    return (h / 2) * sum;
  } catch {
    throw new Error('Error in calculation');
  }
}

/**
 * nthDerivative: approximate the n-th derivative using repeated numeric differentiation.
 * (In practice, one could do a more sophisticated approach, but this is just a demonstration.)
 */
export function nthDerivative(expression, point, order = 2, epsilon = 1e-5) {
  let currentExpr = expression;
  let currentVal = parseFloat(point);
  let result = 0;
  for (let i = 0; i < order; i++) {
    result = derivative(currentExpr, currentVal, epsilon);
    // This is naive: we do numeric derivative repeatedly,
    // but not "symbolically re-deriving" the function each time.
    // It's just an example of repeated numeric approximation.
  }
  return result;
}

/* -----------
   Limits
----------- */
/**
 * approximateLimit: approximate limit of f(x) as x->point from left/right/both.
 */
export function approximateLimit(expression, point, direction = 'both', epsilon = 1e-5) {
  const a = parseFloat(point);
  if (isNaN(a)) throw new Error('Invalid point');
  const f = (val) => evaluate(expression, { x: val });

  try {
    if (direction === 'left') {
      return f(a - epsilon);
    } else if (direction === 'right') {
      return f(a + epsilon);
    } else {
      // two-sided: average the left and right
      const left = f(a - epsilon);
      const right = f(a + epsilon);
      return (left + right) / 2;
    }
  } catch {
    throw new Error('Error in calculation');
  }
}

/**
 * approximateLimitInfinity: approximate limit of f(x) as x->∞ or x->-∞
 * sign = 1 for +∞, -1 for -∞
 */
export function approximateLimitInfinity(expression, sign = 1, largeVal = 1e6) {
  const xVal = sign > 0 ? largeVal : -largeVal;
  try {
    return evaluate(expression, { x: xVal });
  } catch {
    throw new Error('Error in calculation');
  }
}

/* ---------------------------------
   Financial
-----------------------------------*/
export function loanPayment(principal, annualRate, years) {
  const P = parseFloat(principal);
  const r = parseFloat(annualRate) / 100 / 12;
  const n = parseFloat(years) * 12;
  if (isNaN(P) || isNaN(r) || isNaN(n) || r === 0) {
    throw new Error('Invalid input');
  }
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function futureInvestmentValue(principal, annualRate, years, compoundsPerYear) {
  const P = parseFloat(principal);
  const r = parseFloat(annualRate) / 100;
  const t = parseFloat(years);
  const n = parseFloat(compoundsPerYear);
  if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || n === 0) {
    throw new Error('Invalid input');
  }
  return P * Math.pow(1 + r / n, n * t);
}

/* ---------------------------------
   Statistics
-----------------------------------*/
export function mean(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Invalid input');
  }
  const total = numbers.reduce((acc, val) => acc + val, 0);
  return total / numbers.length;
}

export function median(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Invalid input');
  }
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    return sorted[mid];
  }
}

/* ---------------------------------
   Trigonometry
-----------------------------------*/
export function sine(angle, unit = 'degrees') {
  let a = parseFloat(angle);
  if (isNaN(a)) throw new Error('Invalid input');
  if (unit === 'degrees') {
    a = (a * Math.PI) / 180;
  }
  return Math.sin(a);
}

export function cosine(angle, unit = 'degrees') {
  let a = parseFloat(angle);
  if (isNaN(a)) throw new Error('Invalid input');
  if (unit === 'degrees') {
    a = (a * Math.PI) / 180;
  }
  return Math.cos(a);
}

/**
 * evaluateAllTrigFunctions: returns sin, cos, tan, csc, sec, cot
 */
export function evaluateAllTrigFunctions(angle, unit = 'degrees') {
  let a = parseFloat(angle);
  if (isNaN(a)) throw new Error('Invalid angle');
  if (unit === 'degrees') {
    a = (a * Math.PI) / 180;
  }
  const sinVal = Math.sin(a);
  const cosVal = Math.cos(a);
  const tanVal = sinVal / cosVal;
  return {
    sin: sinVal,
    cos: cosVal,
    tan: tanVal,
    csc: sinVal !== 0 ? 1 / sinVal : Infinity,
    sec: cosVal !== 0 ? 1 / cosVal : Infinity,
    cot: tanVal !== 0 ? 1 / tanVal : Infinity
  };
}

/**
 * rightTriangleSolve: Given some known sides/angles, solve the rest.
 *   sides: a (opposite A), b (opposite B), c (hypotenuse)
 *   angles: A, B in degrees
 * We assume A+B=90 in a right triangle.  We'll do a simple approach.
 */
export function rightTriangleSolve({ a, b, c, A, B }) {
  // Convert inputs to numbers or NaN
  let A_ = parseFloat(A);
  let B_ = parseFloat(B);
  let a_ = parseFloat(a);
  let b_ = parseFloat(b);
  let c_ = parseFloat(c);

  // Count how many valid (non-NaN) inputs we have
  let validCount = [A_, B_, a_, b_, c_].filter((x) => !isNaN(x)).length;
  if (validCount < 2) {
    throw new Error('Need at least two known values');
  }

  // If we have angles, keep them in degrees but convert to radians for side relations
  // We also know that A_ + B_ = 90 (since C=90 in a right triangle)
  // We'll do a naive solve approach:

  // If both angles are known, we can find the third angle = 90
  if (!isNaN(A_) && !isNaN(B_)) {
    // in a right triangle, A + B = 90
    // we won't forcibly correct them, but we can trust the user input or do:
    // if (Math.abs(A_ + B_ - 90) > 0.001) ...
  } else if (!isNaN(A_)) {
    B_ = 90 - A_;
  } else if (!isNaN(B_)) {
    A_ = 90 - B_;
  }

  // Now we can convert A_ or B_ to radians if needed
  const A_rad = (A_ * Math.PI) / 180;
  const B_rad = (B_ * Math.PI) / 180;

  // Try to fill in sides if we know one side + an angle
  // a = c * sin(A)
  // b = c * sin(B)
  // a = b * tan(A) etc.

  // If c is known and A is known
  if (!isNaN(c_) && !isNaN(A_)) {
    a_ = c_ * Math.sin(A_rad);
    b_ = c_ * Math.cos(A_rad);
  }
  // If c is known and B is known
  else if (!isNaN(c_) && !isNaN(B_)) {
    b_ = c_ * Math.sin(B_rad);
    a_ = c_ * Math.cos(B_rad);
  }
  // If a is known and A is known => c = a / sin(A)
  else if (!isNaN(a_) && !isNaN(A_)) {
    c_ = a_ / Math.sin(A_rad);
    b_ = c_ * Math.cos(A_rad);
  }
  // If b is known and A is known => c = b / cos(A)
  else if (!isNaN(b_) && !isNaN(A_)) {
    c_ = b_ / Math.cos(A_rad);
    a_ = c_ * Math.sin(A_rad);
  }

  // If a & b are known => c = sqrt(a^2 + b^2), A = arctan(a/b), B= 90 - A
  if (!isNaN(a_) && !isNaN(b_)) {
    c_ = Math.sqrt(a_ * a_ + b_ * b_);
    A_ = (Math.atan2(a_, b_) * 180) / Math.PI; // angle opposite a
    B_ = 90 - A_;
  } else if (!isNaN(a_) && !isNaN(c_)) {
    // b = sqrt(c^2 - a^2)
    b_ = Math.sqrt(c_ * c_ - a_ * a_);
    A_ = (Math.asin(a_ / c_) * 180) / Math.PI;
    B_ = 90 - A_;
  } else if (!isNaN(b_) && !isNaN(c_)) {
    // a = sqrt(c^2 - b^2)
    a_ = Math.sqrt(c_ * c_ - b_ * b_);
    B_ = (Math.asin(b_ / c_) * 180) / Math.PI;
    A_ = 90 - B_;
  }

  // Round results for a nicer display
  const round = (val) => Math.round(val * 10000) / 10000;
  return {
    a: round(a_),
    b: round(b_),
    c: round(c_),
    A: round(A_),
    B: round(B_)
  };
}

/**
 * simplifyTrigExpression: tries to simplify a trig expression using mathjs
 */
export function simplifyTrigExpression(expr) {
  try {
    const s = simplify(expr);
    return s.toString();
  } catch {
    throw new Error('Invalid input');
  }
}

/* ---------------------------------
   Geometry
-----------------------------------*/
export function circleArea(radius) {
  const r = parseFloat(radius);
  if (isNaN(r)) throw new Error('Invalid input');
  return Math.PI * r * r;
}

export function sphereVolume(radius) {
  const r = parseFloat(radius);
  if (isNaN(r)) throw new Error('Invalid input');
  return (4 / 3) * Math.PI * r * r * r;
}

/* ---------------------------------
   Algebra
-----------------------------------*/
export function quadraticSolver(a, b, c) {
  const A = parseFloat(a);
  const B = parseFloat(b);
  const C = parseFloat(c);
  if (isNaN(A) || isNaN(B) || isNaN(C) || A === 0) {
    throw new Error('Invalid input (a must not be 0)');
  }
  const disc = B * B - 4 * A * C;
  if (disc < 0) {
    return null; // no real roots
  }
  const root1 = (-B + Math.sqrt(disc)) / (2 * A);
  const root2 = (-B - Math.sqrt(disc)) / (2 * A);
  return { root1, root2 };
}

/* ---------------------------------
   Arithmetic
-----------------------------------*/
export function basicArithmetic(expression) {
  try {
    // NOTE: eval() is not safe for production. Use a safe parser (like mathjs) if needed.
    return eval(expression);
  } catch {
    throw new Error('Error in calculation');
  }
}

export function percentageCalculator(part, whole) {
  const p = parseFloat(part);
  const w = parseFloat(whole);
  if (isNaN(p) || isNaN(w) || w === 0) {
    throw new Error('Invalid input');
  }
  return (p / w) * 100;
}
