const request = require("postman-request");

const berita = (callback) => {
  const url =
    "http://api.mediastack.com/v1/news?access_key=df967d88e73d9b861578bac96907954e&countries=us&limit=5";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Tidak dapat terkoneksi ke layanan berita", undefined);
    } else if (response.body.error) {
      callback("Terjadi kesalahan: " + response.body.error.message, undefined);
    } else {
      const data = response.body.data.map((item) => ({
        judul: item.title,
        sumber: item.source,
        url: item.url,
        deskripsi: item.description,
      }));
      callback(undefined, data);
    }
  });
};

module.exports = berita;
