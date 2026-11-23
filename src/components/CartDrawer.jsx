import React from 'react';
import { formatRupiah } from '../utils/formatters';

/**
 * Komponen CartDrawer (Keranjang Belanja Interaktif)
 * Menerapkan:
 * - Props: isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onCheckout
 * - Event Handling:
 *   * Klik tombol + dan - untuk mengubah kuantitas
 *   * Klik tombol hapus item
 *   * Klik tombol checkout
 * - List Rendering: cartItems.map() menampilkan daftar barang di keranjang
 * - Conditional Rendering:
 *   * Drawer hanya tampil jika `isOpen === true`
 *   * Tampilan keranjang kosong vs tampilan ringkasan pesanan & total
 */
export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout
}) {
  if (!isOpen) return null;

  // Hitung total harga & kuantitas
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItemsCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header Drawer */}
        <div className="cart-header">
          <div className="cart-title-wrap">
            <span className="cart-icon-title">🛒</span>
            <h3>Keranjang Belanja</h3>
            <span className="cart-count-pill">{totalItemsCount} item</span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Tutup Keranjang"
          >
            ✕
          </button>
        </div>

        {/* Isi Keranjang (Conditional Rendering: Kosong vs Berisi) */}
        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <div className="empty-cart-icon">🛍️</div>
            <h4>Keranjang Anda Masih Kosong</h4>
            <p>Yuk cari produk impianmu dan tambahkan ke keranjang sekarang!</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          <>
            {/* List Item di Keranjang */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">
                      {formatRupiah(item.price)}
                    </span>

                    {/* Kontrol Kuantitas */}
                    <div className="cart-item-controls">
                      <div className="qty-picker">
                        <button
                          type="button"
                          className="btn-qty"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          title="Kurangi Kuantitas"
                        >
                          -
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          type="button"
                          className="btn-qty"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          title="Tambah Kuantitas"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="btn-remove-item"
                        onClick={() => onRemoveItem(item.id)}
                        title="Hapus dari Keranjang"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer & Total Keranjang */}
            <div className="cart-footer">
              <div className="cart-summary-row">
                <span>Subtotal ({totalItemsCount} barang):</span>
                <span className="cart-total-amount">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
              <p className="cart-shipping-note">
                🚚 Gratis Ongkir untuk Pembelian Mahasiswa
              </p>

              <div className="cart-footer-actions">
                <button
                  type="button"
                  className="btn btn-outline btn-clear-cart"
                  onClick={onClearCart}
                >
                  Kosongkan
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-checkout"
                  onClick={onCheckout}
                >
                  💳 Checkout Sekarang
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
