const yargs = require("yargs");

const location = require("./google-geocode");
const weather = require("./weather-api");
const util = require("./utilities");

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

location
  .geocode(argv.a)
  .then(data => {
    weather
      .getWeather(data)
      .then(res =>
        console.log(
          `Outside it is ${res.currentState} with a temperature of ${
            res.currentTemp
          }C felted as ${res.feltTemp}C.`
        )
      )
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
