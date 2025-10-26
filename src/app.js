const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { title } = require("process");
const geocode = require("./utils/geocode");
const forecast = require("./utils/prediksiCuaca");
const berita = require("./utils/berita");

const app = express();

// Mendefinisikan path untuk Express config
const direktoriPublik = path.join(__dirname, "../public");
const direktoriViews = path.join(__dirname, "../templates/views");
const direktoriPartials = path.join(__dirname, "../templates/partials");

// Setup handlebars engine dan views location
app.set("view engine", "hbs");
app.set("views", direktoriViews);
hbs.registerPartials(direktoriPartials);

// Setup direktori statis
app.use(express.static(direktoriPublik));

//ini halaman/page utama
app.get("", (req, res) => {
  res.render("index", {
    judul: "Aplikasi Cek Cuaca",
    nama: "Syahid Nurhidayatullah",
  });
});

//ini halaman bantuan/FAQ (Frequently Asked Questions)
app.get("/bantuan", (req, res) => {
  res.render("bantuan", {
    judul: "Halaman Bantuan",
    nama: "Syahid Nurhidayatullah",
    teksBantuan: "ini adalah teks bantuan",
  });
});

//ini halaman tentang
app.get("/tentang", (req, res) => {
  res.render("tentang", {
    judul: "Tentang Saya",
    nama: "Syahid Nurhidayatullah",
    nim: "23343056",
  });
});

//ini halaman info cuaca
app.get("/infocuaca", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Kamu harus memasukan lokasi yang ingin dicari",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, dataPrediksi) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          prediksiCuaca: dataPrediksi,
          lokasi: location,
          address: req.query.address,
        });
      });
    }
  );
});

// ini halaman berita
app.get("/berita", (req, res) => {
  berita((error, data) => {
    if (error) {
      return res.send({ error });
    }
    res.render("berita", {
      judul: "Berita Terbaru",
      nama: "Syahid Nurhidayatullah",
      daftarBerita: data,
    });
  });
});

// 404
app.get("/bantuan/*page", (req, res) => {
  res.render("404", {
    pesanKesalahan: "Artikel " + req.params.page + " Tidak Ditemukan.",
  });
});

app.get("/*page", (req, res) => {
  res.render("404", {
    pesanKesalahan: "Halaman Tidak Ditemukan.",
  });
});

app.listen(4000, () => {
  console.log("Server berjalan pada port 4000.");
});
