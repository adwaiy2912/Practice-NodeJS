import "dotenv/config";

import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";

const address = process.argv[2];

if (!address) {
   console.log("Please provide an address");
} else {
   geocode(address, (error, geocodeData) => {
      if (error) {
         return console.log("Error:", error);
      }
      forecast(
         geocodeData.latitude,
         geocodeData.longitude,
         (error, forecastData) => {
            if (error) {
               return console.log("Error:", error);
            }
            console.log(geocodeData);
            console.log(forecastData);
         }
      );
   });
}
