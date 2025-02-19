import Link from 'next/link';

export default function MatricesHome() {
  return (
    <div>
      <h2>Matrix Calculators</h2>
      <ul>
        <li><Link href="/matrices/basic-operations">Basic Operations (Add, Multiply, Transpose)</Link></li>
        <li><Link href="/matrices/determinant">Determinant</Link></li>
        <li><Link href="/matrices/inverse">Inverse</Link></li>
        <li><Link href="/matrices/rref">Row-Reduced Echelon Form (RREF)</Link></li>
        <li><Link href="/matrices/eigen">Eigenvalues &amp; Eigenvectors</Link></li>
        <li><Link href="/matrices/encoding-decoding">Matrix Encoding/Decoding (Hill Cipher)</Link></li>
      </ul>
    </div>
  );
}
