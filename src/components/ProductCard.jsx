import React from 'react';
import { formatRupiah } from '../utils/formatters';

/**
 * Komponen Reusable: ProductCard
 * Menerapkan:
 * - Props: product, onAddToCart, onToggleWishlist, onOpenDetail, onDeleteProduct, onToggleStock
 * - Event Handling: onClick pada tombol Beli, Wishlist, Detail, Toggle Stok, Hapus
 * - Conditional Rendering:
 *   * Badge tag produk (jika ada tag)
 *   * Badge stok (Tersedia vs Stok Habis)
 *   * Disabled state pada tombol Tambah ke Keranjang saat stok habis
 *   * Ikon Wishlist aktif (merah berisi) vs belum aktif
 */
export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onOpenDetail,
  onDeleteProduct,
  onToggleStock
}) {
  const {
    id,
    name,
    category,
    price,
    stock,
    inStock,
    rating,
    reviewsCount,
    image,
    isFavorite,
    tag
  } = product;

  return (
    <article className="product-card">
      {/* Gambar Produk & Overlay Actions */}
      <div className="product-card-image-box">
        <img
          src={image}
          alt={name}
          className="product-image"
          loading="lazy"
          onClick={() => onOpenDetail(product)}
        />

        {/* Conditional Rendering: Badge Tag */}
        {tag && (
          <span className="product-tag-badge">
            {tag}
          </span>
        )}

        {/* Tombol Wishlist / Favorit */}
        <button
          type="button"
          className={`btn-wishlist-toggle ${isFavorite ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(id);
          }}
          title={isFavorite ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
          aria-label="Toggle Wishlist"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        {/* Quick View Button on Hover */}
        <button
          type="button"
          className="btn-quick-view"
          onClick={() => onOpenDetail(product)}
        >
          👁️ Detail Cepat
        </button>
      </div>

      {/* Konten & Info Produk */}
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-category-label">{category}</span>
          <div className="product-rating">
            <span className="star-icon">⭐</span>
            <span className="rating-score">{rating}</span>
            <span className="reviews-count">({reviewsCount})</span>
          </div>
        </div>

        <h3
          className="product-card-title"
          title={name}
          onClick={() => onOpenDetail(product)}
        >
          {name}
        </h3>

        <div className="product-card-pricing">
          <span className="product-price">{formatRupiah(price)}</span>

          {/* Conditional Rendering: Status Ketersediaan Stok */}
          <span className={`stock-status-badge ${inStock && stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {inStock && stock > 0 ? `Stok: ${stock}` : 'Stok Habis'}
          </span>
        </div>

        {/* Card Actions */}
        <div className="product-card-actions">
          {/* Tombol Tambah ke Keranjang */}
          <button
            type="button"
            className="btn btn-primary btn-add-cart"
            disabled={!inStock || stock === 0}
            onClick={() => onAddToCart(product)}
          >
            🛒 {inStock && stock > 0 ? 'Beli Sekarang' : 'Habis'}
          </button>

          {/* Menu Opsi Cepat (Toggle Status Stok & Hapus) */}
          <div className="card-quick-controls">
            <button
              type="button"
              className="btn-icon-secondary"
              onClick={() => onToggleStock(id)}
              title={inStock ? 'Ubah status ke: Stok Habis' : 'Ubah status ke: Tersedia'}
            >
              🔄
            </button>
            <button
              type="button"
              className="btn-icon-danger"
              onClick={() => onDeleteProduct(id, name)}
              title="Hapus Produk dari Katalog"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
