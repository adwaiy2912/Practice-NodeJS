import axios from "axios";

const forecast = (lat, lon, callback) => {
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}&units=metric`;

   axios
      .get(url)
      .then((res) => {
         if (res.status === 200) {
            const weatherData = {
               weather: res.data.weather[0].description,
               temp: `${res.data.main.temp}°C`,
               feels_like: `${res.data.main.feels_like}°C`,
               humidity: `${res.data.main.humidity}%`,
            };
            callback(null, weatherData);
         } else {
            callback(res, null);
         }
      })
      .catch((err) => {
         console.log("Error in forecasting");
         callback(err, null);
      });
};

export { forecast };
