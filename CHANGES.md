# Update portfolio v3: Crosshair + Splash + animasi masuk

## Install
    npm install gsap

## File baru
- components/ui/Crosshair/Crosshair.tsx
- components/ui/Splash/Splash.tsx + Splash.css
- components/ui/Hero/Hero.css   (animasi masuk hero)

## File yang diubah
- pages/HomePage.tsx        (Splash, Crosshair, class `is-entered` pada <main>)
- components/ui/Hero/Hero.tsx (elemen diberi data-in + delay, headline dipecah per kata)
- index.css                 (hanya reveal saat scroll dibuat lebih halus)

ScrollExpand / IntroExpand sudah dihapus. Kalau di proyekmu sudah terlanjur ada
folder ScrollExpand atau IntroExpand, hapus saja.

## Alur animasi
Splash memudar -> (bersamaan) hero masuk berurutan:
anotasi -> name box -> sticker -> tags -> headline per kata -> tombol -> garis gelombang.
Section di bawahnya (About, Tech Stack, dst.) masuk saat di-scroll lewat data-reveal.

## Menyetel
- Kecepatan/urutan: nilai inDelay(...) di Hero.tsx, WORD_START / WORD_STEP, durasi di Hero.css
- Bikin lebih pelan/cepat: ubah durasi 1.1s / 1.15s di Hero.css
- prefers-reduced-motion: semua elemen langsung tampil tanpa animasi
