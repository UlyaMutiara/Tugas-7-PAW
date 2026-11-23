import React, { useEffect } from 'react';
import { formatRupiah } from '../utils/formatters';

/**
 * Komponen ProductDetailModal (Modal Popup Informasi Lengkap)
 * Menerapkan:
 * - Props: product, onClose, onAddToCart, onToggleWishlist, onToggleStock
 * - Conditional Rendering: Modal hanya dirender jika prop `product` bukan null
 * - Event Handling:
 *   * Klik tombol close atau klik backdrop untuk menutup
 *   * Keyboard Event listener (Escape) untuk menutup modal
 *   * Klik tombol aksi Tambah ke Keranjang dan Wishlist
 */
export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onToggleStock
}) {
  // Event listener untuk tombol keyboard Escape
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  // Conditional Rendering: Jangan render apa pun jika tidak ada produk yang dipilih
  if (!product) return null;

  const {
    id,
    name,
    category,
    price,
    stock,
    inStock,
    rating,
    reviewsCount,
    description,
    image,
    isFavorite,
    tag
  } = product;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Tombol Tutup Modal */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Tutup Detail Produk"
        >
          ✕
        </button>

        <div className="modal-content-grid">
          {/* Kolom Gambar */}
          <div className="modal-image-col">
            <img src={image} alt={name} className="modal-product-image" />
            {tag && <span className="modal-tag-badge">{tag}</span>}
          </div>

          {/* Kolom Informasi Detail */}
          <div className="modal-info-col">
            <div className="modal-header-meta">
              <span className="modal-category">{category}</span>
              <div className="modal-rating">
                <span>⭐ {rating}</span>
                <span className="text-muted">({reviewsCount} ulasan pembeli)</span>
              </div>
            </div>

            <h2 className="modal-product-title">{name}</h2>
            <div className="modal-product-price">{formatRupiah(price)}</div>

            {/* Status Stok */}
            <div className="modal-stock-status">
              <span className={`status-indicator ${inStock && stock > 0 ? 'available' : 'unavailable'}`}>
                ●
              </span>
              <span>
                {inStock && stock > 0 ? `Stok Tersedia (${stock} unit)` : 'Stok Sedang Habis'}
              </span>
              <button
                type="button"
                className="btn-toggle-stock-inline"
                onClick={() => onToggleStock(id)}
              >
                (Ubah Status Stok)
              </button>
            </div>

            {/* Deskripsi Produk */}
            <div className="modal-description-box">
              <h4>Deskripsi Produk:</h4>
              <p>{description}</p>
            </div>

            {/* Spesifikasi Ringkas */}
            <div className="modal-specs-list">
              <div className="spec-item">
                <span className="spec-label">Garansi:</span>
                <span className="spec-val">1 Tahun Resmi</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Pengiriman:</span>
                <span className="spec-val">Bebas Ongkir se-Indonesia</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Kondisi:</span>
                <span className="spec-val">100% Baru & Original</span>
              </div>
            </div>

            {/* Tombol Aksi di Modal */}
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-primary btn-modal-cart"
                disabled={!inStock || stock === 0}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                🛒 Tambahkan ke Keranjang
              </button>

              <button
                type="button"
                className={`btn btn-outline btn-modal-wishlist ${isFavorite ? 'favorited' : ''}`}
                onClick={() => onToggleWishlist(id)}
              >
                {isFavorite ? '❤️ Di Wishlist' : '🤍 Tambah Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
