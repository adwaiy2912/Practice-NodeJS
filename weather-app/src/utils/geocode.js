import axios from "axios";

const geocode = (address, callback) => {
   const url = `https://geocode.maps.co/search?q=${address}&api_key=${process.env.GEOCODE_KEY}`;

   axios
      .get(url)
      .then((res) => {
         if (res.status === 200) {
            const data = res.data;
            if (data.length === 0) {
               throw new Error("Unable to find location. Try another search.");
            } else {
               const geocodeData = {
                  latitude: data[0].lat,
                  longitude: data[0].lon,
                  location: data[0].display_name,
               };
               callback(null, geocodeData);
            }
         } else {
            throw new Error(`Geocoding API error: ${res.status}`);
         }
      })
      .catch((err) => {
         console.log("Error in geocoding");
         callback(err.message, {});
      });
};

export { geocode };
