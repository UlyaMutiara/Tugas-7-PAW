import React from 'react';
import ProductCard from './ProductCard';

/**
 * Komponen ProductList
 * Menerapkan:
 * - Props: products, onAddToCart, onToggleWishlist, onOpenDetail, onDeleteProduct, onToggleStock, onResetFilters
 * - List Rendering: products.map() dengan prop key unik untuk setiap ProductCard
 * - Conditional Rendering:
 *   * Menampilkan Empty State bila tidak ada produk yang cocok dengan pencarian / filter
 *   * Menampilkan grid daftar produk bila data tersedia
 */
export default function ProductList({
  products,
  onAddToCart,
  onToggleWishlist,
  onOpenDetail,
  onDeleteProduct,
  onToggleStock,
  onResetFilters
}) {
  // Conditional Rendering: Jika hasil kosong (Empty State)
  if (!products || products.length === 0) {
    return (
      <section className="empty-state-section">
        <div className="container">
          <div className="empty-state-card">
            <div className="empty-state-icon">📦</div>
            <h3 className="empty-state-title">Tidak Ada Produk Ditemukan</h3>
            <p className="empty-state-desc">
              Maaf, tidak ada produk yang sesuai dengan kriteria pencarian atau filter yang Anda pilih.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onResetFilters}
            >
              🔄 Reset Semua Filter
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="products-grid-section">
      <div className="container">
        <div className="products-grid">
          {/* List Rendering: Iterasi array products dengan key wajib */}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onOpenDetail={onOpenDetail}
              onDeleteProduct={onDeleteProduct}
              onToggleStock={onToggleStock}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
