# Petunjuk Mengisi Website Portofolio

Website ini terdiri dari HTML, CSS, dan JavaScript biasa. Tidak perlu login, server, atau instalasi apa pun. Semua isi website diatur dari **satu berkas**: `data/data.js`.

## Isi folder

```
portofolio-penawaran/
├── index.html          halaman utama (tidak perlu diedit)
├── css/style.css       warna, huruf, tata letak (warna ada di bagian "Token")
├── js/main.js          logika halaman (tidak perlu diedit)
├── data/data.js        SEMUA ISI WEBSITE: edit di sini
└── assets/
    ├── pdf/            surat penawaran dan lampiran (PDF)
    └── produk/         foto produk
```

## 1. Memasukkan surat penawaran (PDF)

1. Ekspor surat Anda sebagai PDF. Pakai berkas asli, jangan diketik ulang, agar nomor surat, tanggal, tujuan, dan tata letaknya tetap sama.
2. Beri nama `surat-penawaran.pdf`, lalu simpan di folder `assets/pdf/`.
3. Selesai. Pratinjau, tombol **Lihat Dokumen**, dan tombol **Unduh Surat Penawaran** aktif otomatis.

Jika nama berkas Anda berbeda, ubah baris `surat.berkas` di `data/data.js`.

## 2. Memasukkan lampiran produk (PDF)

1. Simpan PDF lampiran sebagai `lampiran-produk.pdf` di `assets/pdf/`.
2. Tombol **Lihat Lampiran** dan **Unduh Lampiran** aktif otomatis.
3. Jika tidak punya PDF lampiran, kosongkan: `berkas: ""`. Kedua tombol akan nonaktif.

## 3. Mengisi produk dan foto produk

1. Simpan foto produk di `assets/produk/` (JPG atau PNG, disarankan lebar 1200 px agar ringan).
2. Buka `data/data.js`, cari bagian `produk`. Satu produk ditulis seperti ini:

```js
{
  nama: "Nama produk persis seperti di lampiran",
  deskripsi: "Deskripsi singkat, 1 sampai 2 kalimat.",
  harga: "Rp 5.000 per bungkus",
  foto: "assets/produk/nama-berkas-foto.jpg",
  contoh: false
},
```

3. Untuk menambah produk, salin satu blok `{ ... },` lalu tempel di bawahnya. Untuk menghapus, hapus blok itu.
4. Tiga produk bawaan adalah **data contoh** (ada label “Contoh”). Ganti isinya dan ubah `contoh: true` menjadi `contoh: false`. Bila semua sudah `false`, kotak “Data contoh” hilang sendiri.
5. Harga yang dikosongkan akan tampil “Belum diisi”. Website tidak akan mengarang harga.

Foto dapat diperbesar dengan mengkliknya.

## 4. Mengubah teks Panduan

Panduan berisi tiga jaket dengan resleting yang bisa ditarik. Teksnya ada di `index.html`, di dalam `<section id="panduan">`, pada setiap `<div class="inner-content">`. Ubah tulisan di antara tag `<p>` dan `<li>` tanpa menghapus tag-nya. Gaya jaket ada di `css/style.css` (bagian 8), dan logika tarik resleting di `js/main.js` (bagian "Resleting jaket").

## 5. Mengisi identitas kelompok

Di `data/data.js`, bagian `kelompok`:

```js
kelompok: {
  nama: "Kelompok 3",
  anggota: [
    { nama: "Nama Anggota 1", peran: "Penyusun surat" },
    { nama: "Nama Anggota 2", peran: "" },
  ]
},
```

`peran` boleh dikosongkan. Bagian `tujuan` di bawahnya adalah teks tujuan proyek dan boleh Anda ubah sesuai kata-kata kelompok.

## 6. Mengubah warna dan huruf

Buka `css/style.css`, bagian **1. Token**. Warna utama: `--green-900` (hijau tua), `--cream` (krem), `--paper` (putih hangat).

## 7. Mencoba di komputer

- Cara tercepat: klik dua kali `index.html`. Semua tampil, tetapi pratinjau PDF di beberapa browser kadang diblokir saat dibuka dari folder. Bila itu terjadi, pakai cara berikut.
- Dengan server lokal: buka terminal di folder ini, jalankan `python3 -m http.server 8000`, lalu buka `http://localhost:8000`.

## 8. Menayangkan agar bisa dibuka guru dan pihak kantin

Pilih salah satu. Semuanya gratis:

- **GitHub Pages**: unggah seluruh isi folder ke repositori, lalu aktifkan *Settings > Pages*.
- **Netlify Drop**: buka `app.netlify.com/drop`, lalu tarik seluruh folder ke halaman itu.
- **Cloudflare Pages**: unggah folder lewat *Direct Upload*.

Bagikan tautan yang dihasilkan kepada guru. Untuk memperbarui, unggah ulang folder dengan berkas yang sudah diganti.

## Masalah umum

| Gejala | Penyebab dan solusi |
|---|---|
| Pratinjau PDF kosong | Nama berkas tidak sama dengan yang ada di `data.js`, atau browser HP tidak mendukung pratinjau. Pakai tombol **Lihat Dokumen**. |
| Foto produk tidak muncul | Cek huruf besar/kecil dan ekstensi nama berkas (`.jpg` berbeda dari `.JPG`). |
| Halaman kosong atau tulisan tidak terisi | Ada tanda kutip atau koma yang hilang di `data.js`. Buka konsol browser (F12) untuk melihat baris yang salah. |
