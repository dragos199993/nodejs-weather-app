const request = require("request");

const geocode = address => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}`,
        json: true
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
        reject("Something went wrong");
      }
    );
  });
};
module.exports = {
  geocode
};
