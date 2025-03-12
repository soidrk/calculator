// pages/matrices/index.js
import Link from "next/link";

export default function MatricesHome() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Matrix Tools</h2>
      <ul>
        <li><Link href="/matrices/basic-operations">Basic Operations</Link></li>
        <li><Link href="/matrices/determinant">Determinant</Link></li>
        <li><Link href="/matrices/inverse">Inverse</Link></li>
        <li><Link href="/matrices/rref">Row-Reduced Echelon Form (RREF)</Link></li>
        <li><Link href="/matrices/eigen">Eigenvalues &amp; Eigenvectors</Link></li>
        <li><Link href="/matrices/lu-decomposition">LU Decomposition</Link></li>
        <li><Link href="/matrices/qr-decomposition">QR Decomposition</Link></li>
        <li><Link href="/matrices/hill-cipher">Hill Cipher (Encoding/Decoding)</Link></li>
      </ul>
    </div>
  );
}
