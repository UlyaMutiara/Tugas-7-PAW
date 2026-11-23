import React, { useState } from 'react';

/**
 * Komponen ProductFormModal (Form Tambah Produk Baru)
 * Menerapkan:
 * - Props: isOpen, onClose, onAddProduct, categories
 * - State (useState): Mengelola state input formulir (formData) dan state validasi error (errors)
 * - Event Handling:
 *   * onChange untuk setiap input controlled component
 *   * onSubmit untuk validasi dan penyerahan data ke parent component
 * - Conditional Rendering:
 *   * Modal hanya muncul bila `isOpen === true`
 *   * Pesan error tampil hanya jika validasi gagal
 * - List Rendering: Render pilihan kategori secara dinamis dari array categories
 */
export default function ProductFormModal({
  isOpen,
  onClose,
  onAddProduct,
  categories
}) {
  // Local State untuk form
  const [formData, setFormData] = useState({
    name: '',
    category: 'Elektronik',
    price: '',
    stock: '',
    description: '',
    image: '',
    tag: 'Produk Baru'
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // Handle Perubahan Input (Event Handling)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Bersihkan error jika user mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validasi Form
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama produk wajib diisi!';
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Harga harus berupa angka lebih dari 0!';
    }
    if (!formData.stock || Number(formData.stock) < 0) {
      newErrors.stock = 'Jumlah stok minimal 0!';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi produk wajib diisi!';
    }
    return newErrors;
  };

  // Handle Submit Form (Event Handling)
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Buat data produk baru
    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      inStock: Number(formData.stock) > 0,
      rating: 5.0,
      reviewsCount: 1,
      description: formData.description.trim(),
      image:
        formData.image.trim() ||
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      isFavorite: false,
      tag: formData.tag.trim() || 'Baru'
    };

    onAddProduct(newProduct);
    onClose();

    // Reset Form
    setFormData({
      name: '',
      category: 'Elektronik',
      price: '',
      stock: '',
      description: '',
      image: '',
      tag: 'Produk Baru'
    });
    setErrors({});
  };

  // Filter kategori agar "Semua Kategori" tidak muncul di dropdown pilihan produk baru
  const selectableCategories = categories.filter((c) => c !== 'Semua Kategori');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container form-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <span className="icon">✨</span>
            <h3>Tambah Produk Baru ke Katalog</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {/* Input Nama Produk */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nama Produk <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Contoh: iPad Air 5th Generation"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Baris Kategori & Tag */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">Kategori</label>
              <select
                id="category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                {selectableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tag" className="form-label">Badge Tag (Opsional)</label>
              <input
                type="text"
                id="tag"
                name="tag"
                className="form-input"
                placeholder="Contoh: Best Seller / New"
                value={formData.tag}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Baris Harga & Stok */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Harga (Rp) <span className="required">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className={`form-input ${errors.price ? 'input-error' : ''}`}
                placeholder="Contoh: 8500000"
                value={formData.price}
                onChange={handleChange}
                min="1000"
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="stock" className="form-label">
                Jumlah Stok <span className="required">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className={`form-input ${errors.stock ? 'input-error' : ''}`}
                placeholder="Contoh: 10"
                value={formData.stock}
                onChange={handleChange}
                min="0"
              />
              {errors.stock && <span className="error-message">{errors.stock}</span>}
            </div>
          </div>

          {/* Input URL Gambar */}
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              URL Gambar Produk (Opsional - default Unsplash)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              className="form-input"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          {/* Input Deskripsi */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Deskripsi Produk <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Jelaskan keunggulan, spesifikasi, dan kelengkapan produk..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          {/* Tombol Aksi Form */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              💾 Simpan Produk ke Katalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
