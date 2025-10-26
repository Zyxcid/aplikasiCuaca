const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=3415e5af9f94acbd94ae1ef3a4e2ab4f&query=" +
    encodeURIComponent(address);

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Tidak dapat terkoneksi ke layanan geocoding", undefined);
    } else if (!response.body.data || response.body.data.length === 0) {
      callback("Tidak dapat menemukan lokasi. Coba lokasi lain.", undefined);
    } else {
      const data = response.body.data[0];
      callback(undefined, {
        latitude: data.latitude,
        longitude: data.longitude,
        location: data.label,
      });
    }
  });
};

module.exports = geocode;
