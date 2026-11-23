# 🛍️ Nusantara Catalog - Component-Based UI Development with React

> **Tugas Individu: Praktikum Pemrograman Web / Front-End Development**  
> **Materi:** Component-Based UI Development with React  
> **Teknologi:** React 18, Vite, JavaScript (JSX), Modern CSS (Flexbox & Grid)  
> **Nama Mahasiswa:** Ulya Mutiara  
> **NIM:** 220101001 *(Dapat disesuaikan di `src/data/initialProducts.js`)*  
> **Kelas / Prodi:** Teknik Informatika / Sistem Informasi  

---

## 📌 Ringkasan Proyek

**Nusantara Catalog** adalah aplikasi web e-commerce & katalog produk modern yang dibangun menggunakan paradigma **Component-Based UI Development** dengan React dan Vite. Seluruh antarmuka dipecah menjadi komponen-komponen mandiri (*modular & reusable components*), mengalirkan data melalui **Props**, mengelola kondisi dinamis dengan **State (`useState`)**, serta menangani interaksi pengguna melalui **Event Handling**.

---

## 🎯 Pemenuhan Ketentuan & Rubrik Tugas

| No | Ketentuan Tugas | Status | Detail Implementasi pada Kode |
| :---: | :--- | :---: | :--- |
| **1** | **React & Vite** | ✅ **Terpenuhi** | Menggunakan bundling super cepat Vite (`vite ^6.0.1`) dan React 18 dengan sintaks JSX bersih. |
| **2** | **Minimal 5 Komponen Terpisah** | ✅ **Terpenuhi** | Memiliki **8 komponen** modular terpisah dalam direktori `src/components/`. |
| **3** | **Reusable Components** | ✅ **Terpenuhi** | `ProductCard`, `SearchBar`, `Toast`, `ProductDetailModal` dapat digunakan kembali dengan data props berbeda. |
| **4** | **Penerapan Props** | ✅ **Terpenuhi** | Mengalirkan data produk, callback fungsi, event handler, dan status dari parent (`App.jsx`) ke seluruh child components. |
| **5** | **Penerapan State (`useState`)** | ✅ **Terpenuhi** | Mengelola state dinamis: `products`, `cartItems`, `searchQuery`, `selectedCategory`, `sortBy`, `selectedProduct`, `isFormOpen`, `isCartOpen`, `notification`. |
| **6** | **Event Handling** | ✅ **Terpenuhi** | Menangani event `onClick`, `onChange`, `onSubmit`, `onKeyDown` (Escape modal), dan browser confirm/alert dialogs. |
| **7** | **Conditional Rendering** | ✅ **Terpenuhi** | Menampilkan detail modal jika produk dipilih, drawer jika keranjang terbuka, badge counter jika > 0, status stok (Tersedia / Habis), serta Empty State saat hasil pencarian nihil. |
| **8** | **List Rendering (`map()` & `key`)** | ✅ **Terpenuhi** | Merender daftar produk (`products.map()`), opsi kategori (`categories.map()`), dan keranjang (`cartItems.map()`) dengan prop `key` unik. |
| **9** | **Minimal 3 Fitur Interaktif** | ✅ **Terpenuhi (5 Fitur)** | 1. Tambah produk baru<br>2. Hapus produk & cart item<br>3. Cari & filter data<br>4. Ubah status data (stok & wishlist)<br>5. Show/hide modal & drawer |
| **10** | **Tampilan Rapi & Responsif** | ✅ **Terpenuhi** | Desain modern berstandar industri dengan palet warna Indigo-Slate, responsif di ponsel, tablet, maupun layar desktop. |
| **11** | **Identitas Mahasiswa** | ✅ **Terpenuhi** | Ditampilkan secara jelas di Top Navbar Banner, Hero Section, dan Footer aplikasi. |
| **12** | **Minimal 5 Commit Git** | ✅ **Terpenuhi** | Riwayat git terstruktur rapi dengan 5+ commit informatif sesuai *conventional commits*. |

---

## 🧩 Struktur Komponen React & Penjelasan Konsep

Semua komponen tersimpan dalam folder `src/components/`:

```
src/
├── components/
│   ├── Navbar.jsx              # Navigasi utama, identitas mahasiswa & counter badge
│   ├── SearchBar.jsx           # Input pencarian, filter kategori & dropdown sorting
│   ├── ProductCard.jsx         # Card produk reusable (gambar, harga, rating, badge aksi)
│   ├── ProductList.jsx         # Kontainer list rendering produk & conditional empty state
│   ├── ProductDetailModal.jsx  # Modal pop-up detail spesifikasi lengkap & deskripsi produk
│   ├── ProductFormModal.jsx    # Modal form controlled component untuk input produk baru
│   ├── CartDrawer.jsx          # Drawer samping keranjang belanja interaktif & checkout
│   ├── Toast.jsx               # Balon notifikasi interaktif auto-dismiss
│   └── Footer.jsx              # Footer informasi, hak cipta, dan profil mahasiswa
├── data/
│   └── initialProducts.js      # Mock data awal produk & data profil mahasiswa
├── utils/
│   └── formatters.js           # Helper utility format mata uang Rupiah (IDR)
├── App.jsx                     # Parent component pengelola seluruh state & logic utama
├── main.jsx                    # Entry point React DOM render
└── index.css                   # Global styling responsif & CSS variables
```

### Penjelasan Rinci Komponen:

#### 1. `Navbar.jsx`
- **Tujuan:** Header navigasi tetap (*sticky*) dengan branding, identitas mahasiswa, tab navigasi, dan tombol aksi.
- **Props yang diterima:** `studentInfo`, `cartCount`, `wishlistCount`, `onOpenCart`, `onOpenAddModal`, `activeTab`, `onTabChange`.
- **Konsep:** *Conditional Rendering* pada badge angka keranjang belanja (`cartCount > 0 && <span ...>`) dan tombol tab aktif.

#### 2. `SearchBar.jsx`
- **Tujuan:** Area pencarian real-time dan penyaringan kategori.
- **Props yang diterima:** `searchQuery`, `onSearchChange`, `selectedCategory`, `onCategoryChange`, `categories`, `sortBy`, `onSortChange`, `totalResults`, `onClearSearch`.
- **Konsep:** *Event Handling* `onChange` untuk controlled input dan *List Rendering* `categories.map()` untuk dropdown.

#### 3. `ProductCard.jsx`
- **Tujuan:** Komponen kartu produk *reusable* yang menampilkan foto, label kategori, harga terformat, rating, dan tombol aksi cepat.
- **Props yang diterima:** `product`, `onAddToCart`, `onToggleWishlist`, `onOpenDetail`, `onDeleteProduct`, `onToggleStock`.
- **Konsep:** *Conditional Rendering* badge stok (`in-stock` vs `out-of-stock`), tombol beli dinonaktifkan (`disabled`) saat stok habis, dan ikon hati merah bila masuk wishlist.

#### 4. `ProductList.jsx`
- **Tujuan:** Mengelola perulangan data produk ke dalam bentuk grid.
- **Props yang diterima:** `products`, `onAddToCart`, `onToggleWishlist`, `onOpenDetail`, `onDeleteProduct`, `onToggleStock`, `onResetFilters`.
- **Konsep:** *List Rendering* menggunakan `products.map(product => <ProductCard key={product.id} ... />)` dan *Conditional Rendering* menampilkan Empty State bila daftar kosong.

#### 5. `ProductDetailModal.jsx`
- **Tujuan:** Jendela modal pop-up yang menyajikan rincian menyeluruh tentang produk yang diklik pengguna.
- **Props yang diterima:** `product`, `onClose`, `onAddToCart`, `onToggleWishlist`, `onToggleStock`.
- **Konsep:** *Conditional Rendering* (`if (!product) return null`), *Keyboard Event Handling* (menutup modal saat tombol `Escape` ditekan).

#### 6. `ProductFormModal.jsx`
- **Tujuan:** Formulir interaktif untuk menambahkan produk baru ke katalog.
- **Props yang diterima:** `isOpen`, `onClose`, `onAddProduct`, `categories`.
- **Konsep:** *Local State* (`formData`, `errors`), *Event Handling* validasi data input dan submit formulir (`e.preventDefault()`).

#### 7. `CartDrawer.jsx`
- **Tujuan:** Panel samping (*drawer*) geser untuk melihat daftar pesanan belanja, mengubah kuantitas barang, dan menghitung total harga.
- **Props yang diterima:** `isOpen`, `onClose`, `cartItems`, `onUpdateQuantity`, `onRemoveItem`, `onClearCart`, `onCheckout`.
- **Konsep:** *List Rendering* item keranjang, perhitungan kalkulasi harga menggunakan array reduce, dan aksi checkout interaktif.

#### 8. `Toast.jsx`
- **Tujuan:** Notifikasi popup di sudut layar saat aksi pengguna berhasil dilakukan (tambah produk, hapus, tambah ke keranjang).
- **Props yang diterima:** `notification`, `onClose`.
- **Konsep:** *Conditional Rendering* dan auto-dismiss via `useEffect` timer.

---

## ⚡ 5 Fitur Interaktif yang Diimplementasikan

1. **Menambahkan Data:**
   - Menambahkan produk baru ke katalog melalui modal formulir dengan validasi otomatis.
   - Menambahkan barang ke dalam keranjang belanja (*Shopping Cart*).
2. **Menghapus Data:**
   - Menghapus produk dari katalog dengan dialog konfirmasi keamanan browser.
   - Menghapus item dari daftar keranjang belanja atau mengosongkan seluruh keranjang.
3. **Mencari dan Memfilter Data:**
   - Pencarian teks instan (*real-time search*) berdasarkan nama, kategori, atau isi deskripsi.
   - Filter dropdown berdasarkan kategori produk (Elektronik, Fashion, Perlengkapan Kuliah, Aksesoris).
   - Pengurutan data (*Sorting*): Harga termurah/termahal, rating tertinggi, dan abjad A-Z.
4. **Mengubah Status Data:**
   - Mengubah status ketersediaan stok (*In Stock* vs *Stok Habis*) secara langsung dengan tombol *toggle*.
   - Mengubah status Wishlist / Favorit (ikon hati menyala merah) dengan satu klik.
5. **Menampilkan atau Menyembunyikan Informasi:**
   - Membuka dan menutup jendela *Modal Detail Produk*.
   - Menampilkan dan menyembunyikan *Drawer Keranjang Belanja*.
   - Menampilkan dan menyembunyikan *Modal Formulir Tambah Produk*.

---

## 💻 Cara Menjalankan Proyek Secara Lokal

### Prasyarat:
Pastikan komputer sudah terpasang **Node.js** (versi 18+).

### Langkah Menjalankan:
```bash
# 1. Masuk ke direktori proyek
cd katalog-produk-react

# 2. Instalasi dependencies (jika belum)
npm install

# 3. Jalankan server lokal Vite
npm run dev
```

Buka browser dan akses alamat lokal yang muncul di terminal (biasanya `http://localhost:3000` atau `http://localhost:5173`).

---

## 🚀 Panduan Publikasi ke GitHub (Minimal 5 Commit)

Repository lokal sudah memiliki 5+ commit terstruktur. Untuk mengunggah ke GitHub Anda:

1. Buat repository baru di **[GitHub](https://github.com/new)** dengan nama: `katalog-produk-react`.
2. Hubungkan repository lokal dan lakukan push:
```bash
# Hubungkan ke repository GitHub Anda (ganti URL dengan repository Anda)
git remote add origin https://github.com/UlyaMutiara/katalog-produk-react.git

# Pastikan branch utama bernama main
git branch -M main

# Unggah semua commit ke GitHub
git push -u origin main
```

---

## 🌐 Panduan Deploy ke Website Pribadi (Online Gratis)

Aplikasi React ini dapat dipublikasikan secara online hanya dalam 2 menit menggunakan **Vercel** atau **Netlify**:

### Cara 1: Deploy Menggunakan Vercel (Paling Direkomendasikan)
1. Buka **[vercel.com](https://vercel.com)** dan login menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pilih repository `katalog-produk-react` dari daftar repository GitHub Anda.
4. Pada konfigurasi build, biarkan default (*Framework Preset: Vite*).
5. Klik tombol **"Deploy"**.
6. Dalam hitungan detik, aplikasi Anda sudah live online dengan URL gratis seperti:  
   `https://katalog-produk-react-ulya.vercel.app`

### Cara 2: Menghubungkan ke Website Pribadi
Pada website pribadi Anda (misal portofolio di GitHub Pages / domain sendiri), tambahkan link tautan menuju aplikasi ini:
```html
<a href="https://katalog-produk-react-ulya.vercel.app" target="_blank" rel="noopener noreferrer">
  🚀 Buka Aplikasi Katalog Produk React
</a>
```

---

## 📝 Format Pengumpulan Tugas

Salin teks berikut untuk pengisian formulir pengumpulan tugas Anda:

```text
============================================================
PENGUMPULAN TUGAS INDIVIDU: COMPONENT-BASED UI DEVELOPMENT (REACT)
============================================================

1. Identitas Mahasiswa:
   - Nama: Ulya Mutiara
   - NIM : 220101001

2. Tautan Tugas:
   - Link Website Pribadi / Aplikasi Online: https://katalog-produk-react-ulya.vercel.app
   - Link Repository GitHub: https://github.com/UlyaMutiara/katalog-produk-react

3. Screenshot Tampilan Aplikasi:
   - (Lampirkan file screenshot tampilan katalog, modal detail, dan drawer keranjang)

4. Penjelasan Singkat Komponen React, Props, State, dan Event Handling:
   - Komponen yang dibuat:
     1. Navbar: Menampilkan identitas mahasiswa, menu tab, dan badge keranjang belanja.
     2. SearchBar: Mengelola input pencarian teks, dropdown kategori, dan pengurutan (reusable).
     3. ProductCard: Kartu produk reusable yang menampilkan data produk, badge stok, rating, dan tombol aksi.
     4. ProductList: Menangani perulangan (list rendering) produk menggunakan .map() serta conditional rendering saat data kosong.
     5. ProductDetailModal: Modal pop-up interaktif untuk melihat deskripsi dan spesifikasi lengkap produk.
     6. ProductFormModal: Formulir penambahan data produk baru dengan controlled component dan validasi.
     7. CartDrawer: Panel keranjang belanja dengan kontrol kuantitas, subtotal, dan checkout.
     8. Toast: Notifikasi balon interaktif dengan auto-dismiss menggunakan useEffect.
     9. Footer: Informasi identitas mahasiswa dan pemenuhan kriteria tugas.

   - Penggunaan Props:
     Props digunakan untuk mengirimkan data produk, fungsi callback penanganan event, serta status aktif dari komponen induk (App.jsx) ke setiap child component.

   - Penggunaan State (useState):
     State digunakan untuk mengelola data yang berubah secara dinamis, meliputi daftar produk (products), isi keranjang (cartItems), kata kunci pencarian (searchQuery), kategori aktif (selectedCategory), pengurutan (sortBy), serta status visibilitas modal (selectedProduct, isFormOpen, isCartOpen).

   - Penggunaan Event Handling:
     Menggunakan event onClick untuk menangani aksi penambahan barang ke keranjang, penghapusan produk, tombol wishlist, dan pembukaan modal; onChange untuk mengontrol nilai input pencarian dan form; onSubmit untuk memvalidasi dan memproses penambahan produk baru; serta keyboard event listener Escape untuk menutup jendela modal.
============================================================
```
