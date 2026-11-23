import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import ProductDetailModal from './components/ProductDetailModal';
import ProductFormModal from './components/ProductFormModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { INITIAL_PRODUCTS, CATEGORIES, STUDENT_INFO } from './data/initialProducts';

export default function App() {
  // =========================================================================
  // 1. STATE MANAGEMENT (useState)
  // =========================================================================

  // State Daftar Produk (Menggunakan localStorage agar perubahan tersimpan)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('nusantara_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  // State Keranjang Belanja
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nusantara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // State Filter & Pencarian
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [sortBy, setSortBy] = useState('default');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'wishlist'

  // State Tampilan / Interaksi (Modal & Drawer)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State Notifikasi Toast
  const [notification, setNotification] = useState(null);

  // Simpan data ke localStorage setiap kali state products atau cartItems berubah
  useEffect(() => {
    try {
      localStorage.setItem('nusantara_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('nusantara_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Helper fungsi untuk menampilkan Toast
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // =========================================================================
  // 2. FITUR INTERAKTIF & EVENT HANDLER
  // =========================================================================

  // Fitur 1: Menambahkan Produk Baru ke Katalog
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Produk "${newProduct.name}" berhasil ditambahkan ke katalog!`, 'success');
  };

  // Fitur 2: Menghapus Produk dari Katalog
  const handleDeleteProduct = (productId, productName) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus produk "${productName}" dari katalog?`
    );
    if (!isConfirmed) return;

    setProducts((prev) => prev.filter((item) => item.id !== productId));
    // Hapus juga dari cart jika ada
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    showToast(`Produk "${productName}" telah dihapus.`, 'danger');
  };

  // Fitur 3: Mengubah Status Data (Toggle Status Ketersediaan Stok)
  const handleToggleStock = (productId) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const nextInStock = !item.inStock;
          const updated = {
            ...item,
            inStock: nextInStock,
            stock: nextInStock ? (item.stock > 0 ? item.stock : 10) : 0,
            tag: nextInStock ? 'Tersedia' : 'Stok Habis'
          };
          // Update selectedProduct jika modal detail sedang terbuka
          if (selectedProduct && selectedProduct.id === productId) {
            setSelectedProduct(updated);
          }
          showToast(
            `Status "${item.name}" diubah menjadi: ${nextInStock ? 'Tersedia' : 'Stok Habis'}`,
            'info'
          );
          return updated;
        }
        return item;
      })
    );
  };

  // Fitur 4: Mengubah Status Data (Toggle Wishlist Favorit)
  const handleToggleWishlist = (productId) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const nextFav = !item.isFavorite;
          const updated = { ...item, isFavorite: nextFav };
          if (selectedProduct && selectedProduct.id === productId) {
            setSelectedProduct(updated);
          }
          showToast(
            nextFav
              ? `Ditambahkan ke Wishlist: "${item.name}" ❤️`
              : `Dihapus dari Wishlist: "${item.name}"`,
            'info'
          );
          return updated;
        }
        return item;
      })
    );
  };

  // Fitur 5: Interaksi Keranjang Belanja (Tambah ke Cart)
  const handleAddToCart = (product) => {
    if (!product.inStock || product.stock === 0) {
      showToast('Maaf, produk ini sedang habis.', 'warning');
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          showToast(`Maksimal pesanan tercapai (${product.stock} unit)`, 'warning');
          return prev;
        }
        showToast(`Kuantitas "${product.name}" di keranjang bertambah!`, 'success');
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`"${product.name}" berhasil dimasukkan ke keranjang! 🛒`, 'success');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Update Kuantitas Item di Keranjang
  const handleUpdateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Hapus Item dari Keranjang
  const handleRemoveCartItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item dihapus dari keranjang.', 'info');
  };

  // Kosongkan Keranjang
  const handleClearCart = () => {
    if (window.confirm('Kosongkan semua barang dari keranjang belanja?')) {
      setCartItems([]);
      showToast('Keranjang belanja dikosongkan.', 'info');
    }
  };

  // Checkout Pesanan
  const handleCheckout = () => {
    alert(
      `🎉 Terima kasih, pesanan Anda berhasil diproses!\n\nNama Pemesan: ${STUDENT_INFO.name}\nJumlah Item: ${cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      )}\nBarang akan segera dikirimkan.`
    );
    setCartItems([]);
    setIsCartOpen(false);
    showToast('Checkout berhasil dilakukan! Terima kasih.', 'success');
  };

  // Reset Semua Filter & Pencarian
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Kategori');
    setSortBy('default');
    setActiveTab('all');
  };

  // =========================================================================
  // 3. LOGIKA FILTERING & SORTING (List & Conditional Rendering)
  // =========================================================================

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Filter Tab Wishlist
        if (activeTab === 'wishlist' && !product.isFavorite) {
          return false;
        }

        // Filter Kategori
        if (
          selectedCategory !== 'Semua Kategori' &&
          product.category !== selectedCategory
        ) {
          return false;
        }

        // Filter Kata Kunci Pencarian (Nama & Deskripsi)
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCategory) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // Default
      });
  }, [products, activeTab, selectedCategory, searchQuery, sortBy]);

  // Perhitungan badge counters
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = products.filter((p) => p.isFavorite).length;

  return (
    <div className="app-layout">
      {/* 1. Navbar Component */}
      <Navbar
        studentInfo={STUDENT_INFO}
        cartCount={totalCartCount}
        wishlistCount={totalWishlistCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAddModal={() => setIsFormOpen(true)}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Hero Banner Mahasiswa */}
      <section className="hero-banner">
        <div className="container hero-container">
          <div className="hero-badge">🎓 Tugas Praktikum Pemrograman Web</div>
          <h2 className="hero-title">
            Katalog Produk & E-Commerce Interaktif
          </h2>
          <p className="hero-subtitle">
            Dibangun dengan arsitektur <strong>Component-Based UI React</strong>, Props, State Management, Event Handling, serta Responsive Layout.
          </p>
          <div className="hero-quick-stats">
            <div className="stat-pill">
              <span className="stat-number">{products.length}</span>
              <span className="stat-label">Total Produk</span>
            </div>
            <div className="stat-pill">
              <span className="stat-number">{totalWishlistCount}</span>
              <span className="stat-label">Di Wishlist</span>
            </div>
            <div className="stat-pill">
              <span className="stat-number">{CATEGORIES.length - 1}</span>
              <span className="stat-label">Kategori</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SearchBar & Filter Component */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedCategory={selectedCategory}
        onCategoryChange={(e) => setSelectedCategory(e.target.value)}
        categories={CATEGORIES}
        sortBy={sortBy}
        onSortChange={(e) => setSortBy(e.target.value)}
        totalResults={filteredProducts.length}
        onClearSearch={() => setSearchQuery('')}
      />

      {/* 3. ProductList Component (List & Conditional Rendering) */}
      <main className="main-content">
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onOpenDetail={(product) => setSelectedProduct(product)}
          onDeleteProduct={handleDeleteProduct}
          onToggleStock={handleToggleStock}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* 4. ProductDetailModal Component (Conditional Rendering) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onToggleStock={handleToggleStock}
      />

      {/* 5. ProductFormModal Component (Fitur Tambah Produk) */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAddProduct={handleAddProduct}
        categories={CATEGORIES}
      />

      {/* 6. CartDrawer Component (Drawer Keranjang Belanja) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      {/* 7. Toast Component (Notifikasi Interaktif) */}
      <Toast
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* 8. Footer Component */}
      <Footer studentInfo={STUDENT_INFO} />
    </div>
  );
}
