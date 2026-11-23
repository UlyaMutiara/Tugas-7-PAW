import React, { useEffect } from 'react';

/**
 * Komponen Toast (Notifikasi Balon Interaktif)
 * Menerapkan:
 * - Props: notification, onClose
 * - Conditional Rendering: Muncul hanya saat ada pesan notifikasi aktif
 * - useEffect: Otomatis menghilang setelah 3.5 detik
 */
export default function Toast({ notification, onClose }) {
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const { message, type = 'info' } = notification;

  const icons = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🗑️'
  };

  return (
    <div className={`toast-container toast-${type}`}>
      <span className="toast-icon">{icons[type] || '🔔'}</span>
      <span className="toast-message">{message}</span>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Tutup notifikasi"
      >
        ✕
      </button>
    </div>
  );
}
