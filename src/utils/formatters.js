/**
 * Utility helper untuk memformat angka ke dalam format mata uang Rupiah (IDR)
 * Contoh: 15499000 -> "Rp 15.499.000"
 */
export const formatRupiah = (number) => {
  if (typeof number !== 'number' || isNaN(number)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
};
