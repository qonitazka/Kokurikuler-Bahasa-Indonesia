/* =====================================================================
   DATA PORTOFOLIO: SATU-SATUNYA FILE YANG PERLU DIEDIT UNTUK ISI WEBSITE
   ---------------------------------------------------------------------
   - Teks di dalam tanda kutip "..." boleh diganti.
   - Jangan hapus tanda koma (,) di akhir setiap baris.
   - Kosongkan "" bila datanya belum ada; website akan menampilkan
     penanda "belum diisi" dan tidak mengarang data apa pun.
   - Baris produk bertanda  contoh: true  adalah DATA CONTOH.
     Ganti isinya dengan data asli lalu ubah menjadi  contoh: false
     (atau hapus barisnya).
   ===================================================================== */

window.PORTOFOLIO = {

  /* ---------- Identitas sekolah ---------- */
  sekolah: "SMAN 4 Malang",
  kelas: "X-LTD",
  mapel: "Bahasa Indonesia",

  /* ---------- Beranda ----------
     video: alamat video latar (dibuka lewat internet). Kosongkan "" bila tidak ingin memakai video.
     kontak: teks yang disalin saat tombol kontak ditekan. */
  hero: {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
  },

  /* ---------- Identitas kelompok ---------- */
  kelompok: {
    nama: "Kelompok 5",  // sesuai penutup surat penawaran
    anggota: [
      { nama: "Amelya Putri Ramadhani", peran: "" },
      { nama: "Anindita Shaquila Putri", peran: "" },
      { nama: "Arvelia Setya Ludfiand", peran: "" },
      { nama: "Putri Calluella Irmaliya Widodo", peran: "" },
      { nama: "Qonita Azka Shaqeena", peran: "" },
      { nama: "Syarifa Nidaul Husna", peran: "" },
    ]
  },

  /* ---------- Tujuan proyek (boleh diubah sesuai kebutuhan) ---------- */
  tujuan:
    "Proyek kokurikuler ini melatih kami menyusun surat penawaran resmi " +
    "dengan bahasa yang baku, runtut, dan santun, serta melengkapinya " +
    "dengan lampiran produk yang jelas. Surat dan lampiran ditujukan " +
    "kepada Kantin Kejujuran sekolah.",

  /* ---------- Dokumen PDF (taruh file di folder assets/pdf/) ---------- */
  surat: {
    berkas: "assets/pdf/surat-penawaran.pdf"
  },
  lampiran: {
    berkas: "assets/pdf/lampiran-produk.pdf"   // boleh dikosongkan bila tidak ada
  },

  /* ---------- Produk pada lampiran ----------
     foto: nama file di folder assets/produk/, contoh "assets/produk/keripik.jpg"
     harga: tulis persis seperti di lampiran, contoh "Rp 5.000 per bungkus"   */
  produk: [
    { nama: "Single Bouqet", deskripsi: "Buket bunga mini yang cantik dan praktis, cocok sebagai hadiah untuk orang tersayang.", harga: "Rp 8.000", foto: "assets/produk/single-bouquet.jpg", contoh: false },
    { nama: "Bolu", deskripsi: "Kue bertekstur lembut dengan rasa manis yang pas, cocok untuk camilan di berbagai suasana.", harga: "Rp 5.000", foto: "assets/produk/bolu.jpg", contoh: false },
    { nama: "Salad Buah", deskripsi: "Potongan buah segar yang dipadukan dengan saus creamy, menghasilkan perpaduan rasa manis dan segar.", harga: "Rp 10.000", foto: "assets/produk/salad-buah.jpg", contoh: false },
    { nama: "Rainbow cake", deskripsi: "Kue lembut dengan lapisan warna-warni yang menarik dan rasa manis yang lezat.", harga: "Rp 5.000", foto: "assets/produk/rainbow-cake.jpg", contoh: false }
  ]
};
