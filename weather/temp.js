// for a synchronous fnc, we can simply use return but for async fnc we need to use callback fnc or async/await

const geocode = (address, callback) => {
   setTimeout(() => {
      const data = {
         latitude: 0,
         longtitude: 0,
      };

      callback(data);
   }, 2000);
};

geocode("India", (data) => {
   console.log(data);
});
