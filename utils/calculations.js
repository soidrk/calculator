import { evaluate, simplify } from 'mathjs';
import { matrix, multiply as mathMultiply, det, inv, transpose as mathTranspose } from 'mathjs';

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

export function parseMatrix(str) {
  if (!str.trim()) throw new Error('Empty matrix string');
  const rows = str.split(';').map(row => row.trim());
  const matrixData = rows.map(r => {
    const cols = r.split(',').map(x => parseFloat(x.trim()));
    if (cols.some(isNaN)) {
      throw new Error('Invalid number in matrix');
    }
    return cols;
  });
  return matrixData;
}

/** matrixAdd: element-wise addition of two matrices of same dimensions */
export function matrixAdd(A, B) {
  if (!checkSameSize(A, B)) {
    throw new Error('Matrices must have same dimensions for addition');
  }
  const rows = A.length;
  const cols = A[0].length;
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(A[i][j] + B[i][j]);
    }
    result.push(row);
  }
  return result;
}

/** matrixSubtract: element-wise subtraction A - B */
export function matrixSubtract(A, B) {
  if (!checkSameSize(A, B)) {
    throw new Error('Matrices must have same dimensions for subtraction');
  }
  const rows = A.length;
  const cols = A[0].length;
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(A[i][j] - B[i][j]);
    }
    result.push(row);
  }
  return result;
}

/** matrixMultiply: standard matrix multiplication (A * B) */
export function matrixMultiply(A, B) {
  // Use math.js for convenience
  const mA = matrix(A);
  const mB = matrix(B);
  const product = mathMultiply(mA, mB);
  return product.toArray();
}

/** matrixTranspose(A) */
export function matrixTranspose(A) {
  return mathTranspose(matrix(A)).toArray();
}

/** matrixDeterminant(A) */
export function matrixDeterminant(A) {
  const mA = matrix(A);
  return det(mA);
}

/** matrixInverse(A) */
export function matrixInverse(A) {
  const mA = matrix(A);
  const invA = inv(mA);
  return invA.toArray();
}

/**
 * matrixRREF(A): compute the Row-Reduced Echelon Form of A.
 * We'll do a basic in-place Gauss-Jordan elimination. 
 */
export function matrixRREF(A) {
  // Clone A to avoid mutating the original
  const M = A.map(row => row.slice());
  let lead = 0;
  const rowCount = M.length;
  const colCount = M[0].length;

  for (let r = 0; r < rowCount; r++) {
    if (lead >= colCount) return M;
    let i = r;
    while (M[i][lead] === 0) {
      i++;
      if (i === rowCount) {
        i = r;
        lead++;
        if (lead === colCount) return M;
      }
    }
    // Swap if needed
    if (i !== r) {
      const temp = M[r];
      M[r] = M[i];
      M[i] = temp;
    }
    // Normalize row r so that M[r][lead] = 1
    const val = M[r][lead];
    for (let j = 0; j < colCount; j++) {
      M[r][j] /= val;
    }
    // Eliminate other rows
    for (let i2 = 0; i2 < rowCount; i2++) {
      if (i2 !== r) {
        const factor = M[i2][lead];
        for (let j = 0; j < colCount; j++) {
          M[i2][j] -= factor * M[r][j];
        }
      }
    }
    lead++;
  }
  return M;
}

/**
 * matrixEigen(A):
 *   For demonstration, let's handle only 2x2 or 3x3. 
 *   We'll do a naive approach:
 *     - 2x2: we can solve the characteristic polynomial exactly.
 *     - 3x3: partial numeric approach or attempt a characteristic polynomial approach.
 *   In a real app, you might use a specialized library or a more robust method.
 */
export function matrixEigen(A) {
  const rows = A.length;
  const cols = A[0].length;
  if (rows !== cols) {
    throw new Error('Eigen decomposition requires a square matrix');
  }
  if (rows === 2) {
    return eigen2x2(A);
  } else if (rows === 3) {
    return eigen3x3Approx(A);
  } else {
    throw new Error('Eigen solver example only supports 2x2 or 3x3');
  }
}

/* ----- 2x2 Eigen ----- */
function eigen2x2(A) {
  // A = [[a,b],[c,d]]
  const a = A[0][0], b = A[0][1];
  const c = A[1][0], d = A[1][1];
  // Characteristic polynomial: λ^2 - (a+d)λ + (ad - bc) = 0
  const trace = a + d;
  const detA = a * d - b * c;
  const disc = trace * trace - 4 * detA;
  let lambda1, lambda2;
  if (disc < 0) {
    // complex eigenvalues => for demonstration, just show real part
    // or throw an error
    return {
      values: 'Complex eigenvalues not handled in this demo',
      vectors: null
    };
  } else {
    lambda1 = (trace + Math.sqrt(disc)) / 2;
    lambda2 = (trace - Math.sqrt(disc)) / 2;
  }
  // For each eigenvalue, find eigenvector. E.g. for λ1:
  // (a - λ1)x + b y = 0
  // c x + (d - λ1)y = 0
  // We can pick x=1 => solve for y or vice versa
  function eigenvector2x2(l) {
    const denom = b !== 0 ? b : (a - l);
    if (Math.abs(denom) < 1e-12) {
      // fallback
      return [1, 0];
    }
    // Suppose x=1 => (a-l)*1 + b*y=0 => y = -(a-l)/b
    const y = - (a - l) / b;
    return [1, y];
  }

  let v1 = [0, 0], v2 = [0, 0];
  if (typeof lambda1 === 'number') {
    v1 = normalize(eigenvector2x2(lambda1));
  }
  if (typeof lambda2 === 'number') {
    v2 = normalize(eigenvector2x2(lambda2));
  }

  return {
    values: [lambda1, lambda2],
    vectors: [v1, v2]
  };
}

/* ----- 3x3 Eigen (very naive approximate) ----- */
function eigen3x3Approx(A) {
  // In reality, we'd solve the cubic characteristic polynomial or do a numeric method.
  // We'll do a very naive approach: power iteration for the largest eigenvalue, 
  // then deflation. This is purely demonstration. 
  const maxIterations = 50;
  const tolerance = 1e-6;
  const mat = matrix(A);

  // 1) Find one eigenvalue/eigenvector with power iteration
  let vec = matrix([[1], [1], [1]]);
  let lambda = 0;
  for (let i = 0; i < maxIterations; i++) {
    const next = mathMultiply(mat, vec);
    // approximate eigenvalue from ratio
    const norm = vectorNorm(next);
    const newVec = multiplyScalar(1 / norm, next);
    if (vectorDistance(newVec, vec) < tolerance) {
      // converged
      lambda = norm;
      vec = newVec;
      break;
    }
    vec = newVec;
    lambda = norm;
  }
  const firstEigenvalue = lambda;
  const firstEigenvector = vec.toArray().map(row => row[0]); // flatten

  // 2) "Deflation" approach: A' = A - λ * v * v^T
  // Then do power iteration again. (This is not perfect for repeated eigenvalues, etc.)
  const outer = outerProduct(vec, vec);
  const scaledOuter = multiplyScalar(lambda, outer);
  const deflated = mathSubtract(mat, scaledOuter);

  // second iteration
  let vec2 = matrix([[1], [0], [0]]);
  let lambda2 = 0;
  for (let i = 0; i < maxIterations; i++) {
    const next = mathMultiply(deflated, vec2);
    const norm = vectorNorm(next);
    const newVec = multiplyScalar(1 / norm, next);
    if (vectorDistance(newVec, vec2) < tolerance) {
      lambda2 = norm;
      vec2 = newVec;
      break;
    }
    vec2 = newVec;
    lambda2 = norm;
  }
  const secondEigenvalue = lambda2;
  const secondEigenvector = vec2.toArray().map(row => row[0]);

  // 3) We won't go for the 3rd eigenvalue for brevity, or we can do a third iteration.
  // This is extremely naive and won't always converge nicely. 
  return {
    values: [firstEigenvalue, secondEigenvalue, '... (3rd not computed)'],
    vectors: [firstEigenvector, secondEigenvector, null]
  };
}

/* Some helper functions for the naive 3x3 approach */
function vectorNorm(v) {
  // v is a mathjs matrix
  let arr = v.toArray();
  let sumSq = 0;
  arr.forEach(row => { sumSq += row[0]*row[0]; });
  return Math.sqrt(sumSq);
}
function multiplyScalar(s, mat) {
  return mat.map(val => val * s);
}
function vectorDistance(a, b) {
  // both are mathjs matrices
  let arrA = a.toArray();
  let arrB = b.toArray();
  let sumSq = 0;
  for (let i = 0; i < arrA.length; i++) {
    const diff = arrA[i][0] - arrB[i][0];
    sumSq += diff * diff;
  }
  return Math.sqrt(sumSq);
}
function outerProduct(a, b) {
  // a, b are column vectors. Return a*b^T
  let arrA = a.toArray();
  let arrB = b.toArray();
  let out = [];
  for (let i = 0; i < arrA.length; i++) {
    const rowVal = arrA[i][0];
    let row = [];
    for (let j = 0; j < arrB.length; j++) {
      row.push(rowVal * arrB[j][0]);
    }
    out.push(row);
  }
  return matrix(out);
}
function mathSubtract(A, B) {
  // mathjs "subtract" is different from "multiply"
  // We can do a simple approach: A - B element-wise
  const aArr = A.toArray();
  const bArr = B.toArray();
  const rows = aArr.length;
  const cols = aArr[0].length;
  let res = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(aArr[i][j] - bArr[i][j]);
    }
    res.push(row);
  }
  return matrix(res);
}
function normalize(vec) {
  // Return a normalized [x,y] array
  const length = Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
  if (length < 1e-12) return [0,0];
  return [vec[0]/length, vec[1]/length];
}

/** Helper: check if two matrices have the same dimensions */
function checkSameSize(A, B) {
  return A.length === B.length && A[0].length === B[0].length;
}

/* ------------------------------------------------------
   HILL CIPHER (Encoding/Decoding)
------------------------------------------------------- */

/**
 * hillCipherEncode(plaintext, keyMatrix)
 *   - plaintext is a string of letters
 *   - keyMatrix is an n×n matrix (must be invertible mod 26)
 *   - We do basic A=0,...,Z=25, block-based multiplication mod 26
 */
export function hillCipherEncode(plaintext, keyMatrix) {
  // Preprocess text: uppercase, remove non-alpha
  const text = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  const n = keyMatrix.length;
  // Convert keyMatrix to mathjs matrix and do mod 26 checks
  const K = matrix(keyMatrix);

  // Break text into blocks of size n
  let blocks = [];
  for (let i = 0; i < text.length; i += n) {
    let block = text.slice(i, i + n);
    // pad if necessary
    if (block.length < n) {
      block = block.padEnd(n, 'X'); // pad with X
    }
    blocks.push(block);
  }

  // Encode each block
  let result = '';
  blocks.forEach(block => {
    // convert block to vector
    let vec = [];
    for (let i = 0; i < n; i++) {
      vec.push(block.charCodeAt(i) - 65);
    }
    // multiply K * vec (mod 26)
    const v = matrix(vec).reshape([n, 1]);
    const prod = mathMultiply(K, v);
    // mod 26
    let encodedNums = prod.toArray().map(row => ((row[0] % 26) + 26) % 26);
    // convert back to letters
    let encodedBlock = encodedNums.map(num => String.fromCharCode(num + 65)).join('');
    result += encodedBlock;
  });
  return result;
}

/**
 * hillCipherDecode(ciphertext, keyMatrix)
 *   - ciphertext is a string of letters
 *   - keyMatrix is n×n
 *   - must find inverse of keyMatrix mod 26
 */
export function hillCipherDecode(ciphertext, keyMatrix) {
  const text = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  const n = keyMatrix.length;
  // We need the inverse of keyMatrix mod 26
  const invKey = matrixInverseMod26(keyMatrix);

  // Break text into blocks of size n
  let blocks = [];
  for (let i = 0; i < text.length; i += n) {
    let block = text.slice(i, i + n);
    if (block.length < n) {
      block = block.padEnd(n, 'X');
    }
    blocks.push(block);
  }

  // Decode each block
  let result = '';
  blocks.forEach(block => {
    let vec = [];
    for (let i = 0; i < n; i++) {
      vec.push(block.charCodeAt(i) - 65);
    }
    const v = matrix(vec).reshape([n, 1]);
    const prod = mathMultiply(invKey, v);
    let decodedNums = prod.toArray().map(row => ((row[0] % 26) + 26) % 26);
    let decodedBlock = decodedNums.map(num => String.fromCharCode(num + 65)).join('');
    result += decodedBlock;
  });
  return result;
}

/**
 * matrixInverseMod26: find inverse of matrix mod 26 using standard
 * adjoint/determinant approach, then mod 26.
 * For simplicity, we assume matrix is small and invertible mod 26.
 */
function matrixInverseMod26(m) {
  // Convert to standard mathjs matrix
  const M = matrix(m);
  // dimension
  const size = m.length;

  // compute determinant in normal integer form
  let d = Math.round(det(M)); 
  // mod 26
  d = ((d % 26) + 26) % 26;
  const dInv = multiplicativeInverseMod26(d);
  if (dInv === null) {
    throw new Error('Matrix not invertible mod 26 (det has no inverse mod 26)');
  }

  // use mathjs inverse for the float version
  const invFloat = inv(M);
  // Now multiply each entry by det/d factor so that effectively we get adjoint
  // We'll do a more direct approach: adj(M) = det(M) * invFloat(M).
  // Then we multiply by dInv mod 26.

  let invArr = invFloat.toArray();
  let out = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      // multiply by det to get integer adjoint
      let val = invArr[i][j] * Math.round(det(M));
      // round it
      val = Math.round(val);
      // mod 26
      val = ((val % 26) + 26) % 26;
      // multiply by dInv
      val = (val * dInv) % 26;
      row.push(val);
    }
    out.push(row);
  }
  return matrix(out);
}

/** multiplicativeInverseMod26(x): find y s.t. x*y ≡ 1 (mod 26) or null if none */
function multiplicativeInverseMod26(x) {
  for (let i = 1; i < 26; i++) {
    if ((x * i) % 26 === 1) return i;
  }
  return null;
}


/**
 * solveLinearEquations(equations)
 *  Expects an array of strings, each a linear equation (e.g., "2x + 3y = 7").
 *  Returns an object mapping variable names to their solution.
 *
 * This simple parser supports equations with variables that are single letters
 * (like x, y, z) and numbers (which can be integer or decimal).
 */
export function solveLinearEquations(equations) {
  // Helper to parse a single equation string
  function parseEquation(eqStr) {
    // Remove spaces and split at '='
    const [lhs, rhs] = eqStr.replace(/\s+/g, '').split('=');
    if (rhs === undefined) throw new Error('Equation must contain "="');
    // Parse each side
    const parseSide = (side, signMultiplier = 1) => {
      // Match terms like +2x, -3y, or standalone numbers
      const termRegex = /([+-]?[\d.]*)([a-zA-Z]?)/g;
      let match, coeffs = {}, constant = 0;
      while ((match = termRegex.exec(side)) !== null) {
        if (match[0] === '') continue;
        let coeffStr = match[1];
        let variable = match[2];
        let coeff = coeffStr === '' || coeffStr === '+' || coeffStr === '-' ? (coeffStr === '-' ? -1 : 1) : parseFloat(coeffStr);
        coeff *= signMultiplier;
        if (variable) {
          coeffs[variable] = (coeffs[variable] || 0) + coeff;
        } else {
          constant += coeff;
        }
      }
      return { coeffs, constant };
    };

    const left = parseSide(lhs, 1);
    const right = parseSide(rhs, -1);
    // Combine left and right: move all terms to LHS so equation becomes sum = 0.
    const coeffs = { ...left.coeffs };
    for (const v in right.coeffs) {
      coeffs[v] = (coeffs[v] || 0) + right.coeffs[v];
    }
    const constant = left.constant + right.constant;
    return { coeffs, constant };
  }

  // Parse all equations and collect variable names.
  const parsed = equations.map(eq => parseEquation(eq));
  const varSet = new Set();
  parsed.forEach(({ coeffs }) => {
    Object.keys(coeffs).forEach(v => varSet.add(v));
  });
  const variables = Array.from(varSet).sort();
  const n = parsed.length;
  if (variables.length !== n) {
    throw new Error('System must have as many independent equations as variables (found ' + variables.length + ' variables and ' + n + ' equations).');
  }

  // Build coefficient matrix A and constant vector b for A * x = -constant.
  const A = parsed.map(({ coeffs }) =>
    variables.map(v => coeffs[v] || 0)
  );
  const b = parsed.map(({ constant }) => -constant);

  // Solve using mathjs (if A is invertible).
  const mA = matrix(A);
  const mInv = inv(mA);
  const solMatrix = multiply(mInv, matrix(b));
  const solArray = solMatrix.toArray();
  const solution = {};
  variables.forEach((v, i) => {
    solution[v] = solArray[i];
  });
  return solution;
}
