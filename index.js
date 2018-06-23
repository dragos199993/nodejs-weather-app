const yargs = require("yargs");

const location = require("./google-geocode");
const weather = require("./weather-api");
const util = require('./utilities');

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

location.geocode(argv.a, (error, data) => {
  if (error) console.log(error);
    console.log(`You are in ${data.address} and...`);
    weather.getWeather(data, (error, data) => {
        if(error) console.log(error);
            console.log(`Outside it is ${data.currentState} with a temperature of ${data.currentTemp}C felted as ${data.feltTemp}C.`);
    });
});
