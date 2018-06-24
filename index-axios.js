const yargs = require("yargs");
const axios = require("axios");

const api = require("./api");

apiKey = api.apiKey;
let argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  argv.address
)}`;

axios
  .get(geocodeUrl)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS")
      throw new Error("Unable to find the address.");

    let weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${
      response.data.results[0].geometry.location.lat
    },${response.data.results[0].geometry.location.lng}`;
    return axios.get(weatherUrl);
  })
  .then(res => {
    currentTemp = parseInt((res.data.currently.temperature - 32) / 1.8);
    feltTemp = parseInt((res.data.currently.apparentTemperature - 32) / 1.8);
    currentState = res.data.currently.summary;
    console.log(
      `Outside it is ${currentState} with a temperature of ${currentTemp}C felted as ${feltTemp}C.`
    );
  })
  .catch(err => {
    if (err.code === "ENOTFOUND")
      throw new Error("Unable to connect to API servers");
    else console.log(err.message);
  });
