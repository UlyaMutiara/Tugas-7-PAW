import React from 'react';

/**
 * Komponen Navbar
 * Menerapkan:
 * - Props: Menerima studentInfo, cartCount, wishlistCount, onOpenCart, onOpenAddModal, activeTab, onTabChange
 * - Event Handling: onClick tombol navigasi, buka modal, buka drawer keranjang
 * - Conditional Rendering: Menampilkan badge jumlah cart/wishlist jika > 0
 */
export default function Navbar({
  studentInfo,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenAddModal,
  activeTab,
  onTabChange
}) {
  return (
    <header className="navbar-header">
      {/* Top Banner untuk Identitas Mahasiswa */}
      <div className="student-badge-bar">
        <div className="container student-badge-container">
          <span className="student-tag">👨‍🎓 Tugas Individu React & Vite</span>
          <div className="student-details">
            <span className="student-name">
              <strong>Nama:</strong> {studentInfo.name}
            </span>
            <span className="divider">|</span>
            <span className="student-nim">
              <strong>NIM:</strong> {studentInfo.nim}
            </span>
            <span className="divider">|</span>
            <span className="student-class">{studentInfo.class}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar">
        <div className="container nav-content">
          {/* Logo / Brand */}
          <div className="brand" onClick={() => onTabChange('all')}>
            <span className="brand-icon">🛍️</span>
            <div className="brand-text">
              <h1 className="brand-title">Nusantara<span className="highlight">Catalog</span></h1>
              <p className="brand-subtitle">Component-Based E-Commerce</p>
            </div>
          </div>

          {/* Navigation Links / Filter Tabs */}
          <div className="nav-tabs">
            <button
              className={`nav-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => onTabChange('all')}
            >
              Semua Produk
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => onTabChange('wishlist')}
            >
              ❤️ Wishlist
              {wishlistCount > 0 && (
                <span className="tab-badge">{wishlistCount}</span>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="nav-actions">
            {/* Tombol Tambah Produk (Membuka Modal Form) */}
            <button
              className="btn btn-primary btn-add-product"
              onClick={onOpenAddModal}
              title="Tambah Produk Baru ke Katalog"
            >
              <span className="btn-icon">➕</span>
              <span className="btn-text">Tambah Produk</span>
            </button>

            {/* Tombol Keranjang Belanja (Membuka Drawer) */}
            <button
              className="cart-toggle-btn"
              onClick={onOpenCart}
              aria-label="Keranjang Belanja"
            >
              <span className="cart-icon">🛒</span>
              {/* Conditional Rendering: Tampilkan badge hanya bila cart tidak kosong */}
              {cartCount > 0 && (
                <span className="cart-counter-badge animate-pop">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
