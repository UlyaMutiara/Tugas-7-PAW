import React from 'react';

/**
 * Komponen SearchBar & Filter
 * Menerapkan:
 * - Props: searchQuery, onSearchChange, selectedCategory, onCategoryChange, categories, sortBy, onSortChange, totalResults, onClearSearch
 * - Event Handling: onChange pada input teks dan select box, onClick pada tombol clear
 * - List Rendering: categories.map() untuk membuat option dropdown dinamis
 * - Conditional Rendering: Tombol bersihkan pencarian muncul hanya saat input terisi
 */
export default function SearchBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  sortBy,
  onSortChange,
  totalResults,
  onClearSearch
}) {
  return (
    <section className="search-filter-section">
      <div className="container">
        <div className="search-filter-card">
          {/* Kolom Input Pencarian */}
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Cari nama produk, spesifikasi, atau merk..."
              value={searchQuery}
              onChange={onSearchChange}
            />
            {/* Conditional Rendering: Tombol Clear jika teks ada */}
            {searchQuery && (
              <button
                type="button"
                className="btn-clear-search"
                onClick={onClearSearch}
                title="Hapus kata kunci"
              >
                ✕
              </button>
            )}
          </div>

          {/* Kolom Filter Kategori & Pengurutan */}
          <div className="filter-controls-wrapper">
            {/* Filter Kategori */}
            <div className="select-group">
              <label htmlFor="category-select" className="select-label">Kategori:</label>
              <select
                id="category-select"
                className="custom-select"
                value={selectedCategory}
                onChange={onCategoryChange}
              >
                {/* List Rendering: Render daftar kategori secara dinamis */}
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Pengurutan (Sort By) */}
            <div className="select-group">
              <label htmlFor="sort-select" className="select-label">Urutkan:</label>
              <select
                id="sort-select"
                className="custom-select"
                value={sortBy}
                onChange={onSortChange}
              >
                <option value="default">Rekomendasi</option>
                <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                <option value="rating-desc">Rating Tertinggi ⭐</option>
                <option value="name-asc">Nama (A - Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Info Jumlah Hasil yang Ditemukan */}
        <div className="results-counter">
          <span>Menampilkan <strong>{totalResults}</strong> produk</span>
          {selectedCategory !== 'Semua Kategori' && (
            <span className="active-filter-badge">
              Kategori: {selectedCategory}
            </span>
          )}
          {searchQuery && (
            <span className="active-filter-badge">
              Kata Kunci: "{searchQuery}"
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
