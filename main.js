/* =====================================================================
   main.js: membaca data/data.js lalu mengisi halaman.
   Tidak perlu diedit untuk mengganti isi website.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.PORTOFOLIO || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isWeb = /^https?:$/.test(location.protocol);

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("show"); }, 3600);
  }

  /* Cek apakah berkas ada. Hanya bisa dicek saat dibuka lewat http(s);
     bila dibuka langsung dari folder (file://), dianggap ada. */
  function fileExists(path) {
    if (!path) return Promise.resolve(false);
    if (!isWeb) return Promise.resolve(true);
    return fetch(path, { method: "HEAD" })
      .then(function (r) { return r.ok; })
      .catch(function () { return false; });
  }

  /* ---------- Identitas dasar ---------- */
  $$("[data-bind]").forEach(function (n) {
    var v = D[n.getAttribute("data-bind")];
    if (v) n.textContent = v;
  });

  var K = D.kelompok || {};
  [$("#heroKelompok"), $("#idKelompok")].forEach(function (n) {
    if (K.nama) { n.textContent = K.nama; }
    else { n.textContent = "Belum diisi"; n.classList.add("is-empty"); }
  });
  $("#tujuanText").textContent = D.tujuan || "";

  /* ---------- Anggota ---------- */
  var ml = $("#members");
  if (K.anggota && K.anggota.length) {
    K.anggota.forEach(function (a) {
      var li = el("li");
      li.appendChild(el("span", "", a.nama || ""));
      if (a.peran) li.appendChild(el("small", "", a.peran));
      ml.appendChild(li);
    });
  } else {
    ml.appendChild(el("li", "members-empty", "Nama anggota belum diisi. Tambahkan di data/data.js."));
  }

  /* ---------- Dokumen PDF ---------- */
  function setupDoc(opt) {
    var btnView = $(opt.view), btnDown = $(opt.down);
    var path = opt.path;

    function disable(a) {
      a.setAttribute("aria-disabled", "true");
      a.removeAttribute("download");
      a.setAttribute("href", "#");
      a.removeAttribute("target");
      a.addEventListener("click", function (e) { e.preventDefault(); toast(opt.missingMsg); });
    }

    return fileExists(path).then(function (ok) {
      if (!ok) { disable(btnView); disable(btnDown); return false; }
      btnView.href = path;
      btnDown.href = path;
      btnDown.setAttribute("download", path.split("/").pop());
      return true;
    });
  }

  var suratPath = D.surat && D.surat.berkas;
  var lampPath = D.lampiran && D.lampiran.berkas;

  setupDoc({
    path: suratPath, view: "#btnLihatSurat", down: "#btnUnduhSurat",
    missingMsg: "Surat penawaran belum diunggah. Lihat PETUNJUK.md."
  }).then(function (ok) {
    var stage = $("#stageSurat");
    $("#viewerSuratName").textContent = suratPath ? suratPath.split("/").pop() : "surat-penawaran.pdf";
    stage.textContent = "";
    if (ok) {
      var f = el("iframe");
      f.title = "Pratinjau surat penawaran (PDF)";
      f.src = suratPath + "#view=FitH";
      f.loading = "lazy";
      stage.appendChild(f);
      $("#hintSurat").textContent =
        "Jika pratinjau tidak tampil di HP, tekan “Lihat Dokumen” untuk membuka PDF di tab baru, atau “Unduh Surat Penawaran”.";
    } else {
      var box = el("div", "empty-state");
      box.appendChild(el("h3", "", "Surat penawaran belum diunggah"));
      box.appendChild(el("p", "", "Simpan berkas PDF surat dengan nama surat-penawaran.pdf di folder assets/pdf/. Pratinjau akan muncul di sini secara otomatis."));
      box.appendChild(el("p", "", "Isi, nomor surat, dan tanggal tidak diubah: yang tampil adalah berkas asli Anda."));
      stage.appendChild(box);
    }
  });

  setupDoc({
    path: lampPath, view: "#btnLihatLampiran", down: "#btnUnduhLampiran",
    missingMsg: "Lampiran PDF belum diunggah. Lihat PETUNJUK.md."
  });

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox");
  function openLightbox(src, cap) {
    $("#lbImg").src = src;
    $("#lbImg").alt = cap || "";
    $("#lbCap").textContent = cap || "";
    if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
  }
  $("#lbClose").addEventListener("click", function () { lb.close(); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });

  /* ---------- Produk ---------- */
  var ICON = '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/></svg>';
  var grid = $("#productGrid");
  var produk = D.produk || [];
  var adaContoh = false;

  produk.forEach(function (p, i) {
    var li = el("li", "card");
    var photo = el("button", "card-photo");
    photo.type = "button";

    if (p.foto) {
      photo.classList.add("has-photo");
      var img = el("img");
      img.src = p.foto; img.alt = "Foto " + (p.nama || "produk"); img.loading = "lazy";
      img.addEventListener("error", function () {
        photo.classList.remove("has-photo");
        photo.textContent = "";
        var ph = el("span", "ph"); ph.innerHTML = ICON;
        ph.appendChild(document.createTextNode("Foto tidak ditemukan. Periksa nama berkasnya."));
        photo.appendChild(ph);
      });
      photo.appendChild(img);
      photo.setAttribute("aria-label", "Perbesar foto " + (p.nama || "produk"));
      photo.addEventListener("click", function () { openLightbox(p.foto, p.nama); });
    } else {
      photo.tabIndex = -1;
      photo.setAttribute("aria-hidden", "true");
      var ph = el("span", "ph"); ph.innerHTML = ICON;
      ph.appendChild(document.createTextNode("Foto produk belum diunggah"));
      photo.appendChild(ph);
    }

    if (p.contoh) { adaContoh = true; photo.appendChild(el("span", "badge", "Contoh")); }
    photo.appendChild(el("span", "butir", String(i + 1)));
    li.appendChild(photo);

    var body = el("div", "card-body");
    body.appendChild(el("h3", "", p.nama || "Nama produk belum diisi"));
    body.appendChild(el("p", "card-desc", p.deskripsi || "Deskripsi belum diisi."));
    var price = el("div", "card-price");
    price.appendChild(el("span", "", "Harga"));
    var hv = el("strong", p.harga ? "" : "is-empty", p.harga || "Belum diisi");
    price.appendChild(hv);
    body.appendChild(price);
    li.appendChild(body);
    grid.appendChild(li);
  });

  if (!produk.length) {
    var box = el("li", "empty-state", "");
    box.appendChild(el("h3", "", "Belum ada produk"));
    box.appendChild(el("p", "", "Tambahkan produk pada bagian produk di data/data.js."));
    grid.appendChild(box);
  }
  if (adaContoh) $("#noticeContoh").hidden = false;

  /* ---------- Resleting jaket (Panduan) ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  $$(".jacket-container").forEach(function (box) {
    var puller = $(".zipper-puller", box);
    var y = 0, maxY = 1, drag = null, anim = null;

    function measure() { maxY = Math.max(1, box.clientHeight - puller.offsetHeight); }
    function setY(v) {
      y = Math.min(maxY, Math.max(0, v));
      box.style.setProperty("--y", y + "px");
      // Bukaan atas langsung melebar penuh setelah ditarik sekitar 120px,
      // jadi teks yang sudah terbuka tidak terpotong kain.
      box.style.setProperty("--a", (100 - 94 * Math.min(1, y / 120)) + "%");
      puller.setAttribute("aria-valuenow", String(Math.round(y / maxY * 100)));
    }
    function touched() { box.classList.add("is-touched"); }

    function glide(target) {
      cancelAnimationFrame(anim);
      if (reduceMotion) { setY(target); return; }
      var from = y, t0 = null, dur = 650;
      (function step(t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        setY(from + (target - from) * e);
        if (k < 1) anim = requestAnimationFrame(step);
      })(performance.now());
    }

    puller.addEventListener("pointerdown", function (e) {
      cancelAnimationFrame(anim);
      drag = { startPointer: e.clientY, startY: y, moved: false };
      puller.setPointerCapture(e.pointerId);
      touched();
      e.preventDefault();
    });
    puller.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dy = e.clientY - drag.startPointer;
      if (Math.abs(dy) > 4) drag.moved = true;
      setY(drag.startY + dy);
    });
    puller.addEventListener("pointerup", function () {
      // Ketuk tanpa menggeser: buka sampai habis, atau tutup bila sudah terbuka.
      if (drag && !drag.moved) glide(y > maxY / 2 ? 0 : maxY);
      drag = null;
    });
    puller.addEventListener("pointercancel", function () { drag = null; });

    puller.addEventListener("keydown", function (e) {
      var step = maxY / 8, used = true;
      if (e.key === "ArrowDown" || e.key === "PageDown") setY(y + step);
      else if (e.key === "ArrowUp" || e.key === "PageUp") setY(y - step);
      else if (e.key === "End") setY(maxY);
      else if (e.key === "Home") setY(0);
      else if (e.key === "Enter" || e.key === " ") glide(y > maxY / 2 ? 0 : maxY);
      else used = false;
      if (used) { touched(); e.preventDefault(); }
    });

    function remeasure() { var r = y / maxY; measure(); setY(r * maxY); }
    if ("ResizeObserver" in window) new ResizeObserver(remeasure).observe(box);
    else window.addEventListener("resize", remeasure);
    measure(); setY(0);
  });

  /* ---------- Beranda: video, ketikan judul, tombol salin ---------- */
  (function hero() {
    var section = $("#beranda"), video = $("#heroVideo"), typed = $("#typed"), pills = $("#pills");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Tombol pil muncul 400 ms setelah halaman dibuka, tanpa menunggu ketikan selesai.
    setTimeout(function () { pills.classList.add("is-visible"); }, reduce ? 0 : 400);

    // Judul diketik satu huruf demi satu huruf.
    var full = typed.textContent;
    if (!reduce) {
      typed.textContent = "";
      typed.classList.add("is-typing");
      var i = 0, speed = 38, startDelay = 600;
      setTimeout(function () {
        var t = setInterval(function () {
          i++; typed.textContent = full.slice(0, i);
          if (i >= full.length) { clearInterval(t); typed.classList.remove("is-typing"); }
        }, speed);
      }, startDelay);
    }

    // Video latar: tidak diputar otomatis, digeser maju-mundur mengikuti gerak mouse mendatar.
    var src = D.hero && D.hero.video;
    if (src) {
      video.src = src;
      video.addEventListener("error", function () { video.style.display = "none"; });
      video.addEventListener("loadedmetadata", function () { try { video.currentTime = 0.001; } catch (e) {} });

      var SENSITIVITY = 0.8, prevX = null, target = 0, seeking = false, visible = true;
      function seek() {
        if (seeking || !video.duration) return;
        if (Math.abs(video.currentTime - target) < 0.02) return;
        seeking = true; video.currentTime = target;
      }
      video.addEventListener("seeked", function () { seeking = false; seek(); });
      window.addEventListener("mousemove", function (e) {
        if (!visible || !video.duration || reduce) { prevX = e.clientX; return; }
        if (prevX === null) prevX = e.clientX;
        var delta = e.clientX - prevX; prevX = e.clientX;
        var base = seeking ? target : video.currentTime;
        target = Math.min(video.duration, Math.max(0, base + (delta / window.innerWidth) * SENSITIVITY * video.duration));
        seek();
      });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(section);
      }
    } else {
      video.style.display = "none";
    }

    // Salin kontak Instagram.
    var btn = $("#copyContact");
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      function ok() { toast("Disalin: " + text); }
      function fail() { toast("Tidak bisa menyalin otomatis. Ketik manual: " + text); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fail);
      else fail();
    });
  })();
})();
