const request = require("request");

const geocode = (address, callback) => {
  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Something went wrong with Google servers");
      } else if (body.status === "ZERO_RESULTS") {
        callback("Unable to find the address"); 
      } else if (body.status === "OK") {
        callback(undefined, {
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
        });
      }else{
        callback("Something went wrong"); 
      }
    }
  );
};

module.exports = {
  geocode
};
