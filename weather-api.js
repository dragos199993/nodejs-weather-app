const request = require("request");
const api = require("./api");

apiKey = api.apiKey;
const getWeather = data => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://api.darksky.net/forecast/${apiKey}/${data.latitude},${
          data.longitude
        }`,
        json: true
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200)
          resolve({
            currentTemp: parseInt((body.currently.temperature - 32) / 1.8),
            feltTemp: parseInt((body.currently.apparentTemperature - 32) / 1.8),
            currentState: body.currently.summary
          });
        reject("Something went wrong with Weather API");
      }
    );
  });
};
module.exports = {
  getWeather
};
