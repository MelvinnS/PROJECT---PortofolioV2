/**
 * Menjalankan callback setelah halaman benar-benar terlihat.
 * - Kalau tidak ada transisi halaman yang sedang berjalan -> langsung jalan.
 * - Kalau sedang ada transisi (layar masih tertutup blok hitam) -> tunggu
 *   event "pt:reveal" (dikirim PageTransition tepat saat blok mulai terbuka),
 *   supaya animasi konten baru terlihat setelah halaman terbuka, bukan
 *   selesai duluan di balik layar hitam.
 * Mengembalikan fungsi cleanup.
 */
export function onPageReady(cb: () => void): () => void {
  if (document.documentElement.dataset.ptBusy !== '1') {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener('pt:reveal', handler, { once: true });
  return () => window.removeEventListener('pt:reveal', handler);
}
