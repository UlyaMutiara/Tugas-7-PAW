import React from 'react';

/**
 * Komponen Footer
 * Menerapkan:
 * - Props: studentInfo (name, nim, class, academicYear, portfolioUrl)
 * - Menampilkan identitas mahasiswa secara jelas sesuai ketentuan tugas
 */
export default function Footer({ studentInfo }) {
  return (
    <footer className="app-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand & Deskripsi */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="footer-icon">🛍️</span>
              <span className="footer-title">Nusantara Catalog</span>
            </div>
            <p className="footer-text">
              Aplikasi web katalog produk modern berbasis komponen React (Component-Based UI Development) dengan Vite, JSX, State Management, Props, dan Event Handling interaktif.
            </p>
          </div>

          {/* Ketentuan Tugas yang Dipenuhi */}
          <div className="footer-col">
            <h4 className="footer-heading">Ketentuan Tugas Terpenuhi</h4>
            <ul className="footer-list">
              <li>✅ React + Vite + JSX</li>
              <li>✅ 7+ Komponen Terpisah & Reusable</li>
              <li>✅ Props & useState Management</li>
              <li>✅ Conditional & List Rendering</li>
              <li>✅ 5 Fitur Interaktif Lengkap</li>
            </ul>
          </div>

          {/* Identitas Mahasiswa */}
          <div className="footer-col student-col">
            <h4 className="footer-heading">Identitas Mahasiswa</h4>
            <div className="footer-student-card">
              <p><strong>Nama:</strong> {studentInfo.name}</p>
              <p><strong>NIM:</strong> {studentInfo.nim}</p>
              <p><strong>Mata Kuliah:</strong> {studentInfo.class}</p>
              <p><strong>Tahun Akademik:</strong> {studentInfo.academicYear}</p>
              <a
                href={studentInfo.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-student-link"
              >
                🌐 Kunjungi Repository GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nusantara Catalog. Dibuat dengan dedikasi oleh {studentInfo.name} ({studentInfo.nim}).</p>
        </div>
      </div>
    </footer>
  );
}
