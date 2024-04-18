console.log("Client side javascript file is loaded");

const para1 = document.querySelector("#p1");
const para2 = document.querySelector("#p2");

document.querySelector("form").addEventListener("submit", (e) => {
   e.preventDefault();

   para1.textContent = "Loading...";
   para2.textContent = "";

   const location = document.querySelector("input").value;
   fetch(`/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
         if (data.error) {
            para1.textContent = data.error;
            para2.textContent = "";
         } else {
            para1.textContent = `Location: ${data.location}`;
            para2.textContent = `Weather: ${data.forecast.weather},  Temperature: ${data.forecast.temp},  Feels like: ${data.forecast.feels_like},  Humidity: ${data.forecast.humidity}`;
         }
      });
   });
});
