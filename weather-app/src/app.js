import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import hbs from "hbs";
import "dotenv/config";

import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";

// define paths for Express config
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
   res.render("index", { title: "Weather App", name: "Me" });
});

app.get("/about", (req, res) => {
   res.render("about", { title: "About", name: "Me" });
});

app.get("/help", (req, res) => {
   res.render("help", { title: "Help", name: "Me" });
});

app.get("/weather", (req, res) => {
   if (!req.query.address) {
      return res.send({
         error: "You must provide an address",
      });
   }

   geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
         if (error) {
            return res.send({ error });
         }
         forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
               return res.send({ error });
            }
            res.send({
               forecast: forecastData,
               location,
               address: req.query.address,
            });
         });
      }
   );
});

app.get("/help/*", (req, res) => {
   res.render("404", {
      title: "404",
      name: "Me",
      errorMessage: "Help article not found",
   });
});

// 404 Page
app.get("*", (req, res) => {
   res.render("404", {
      title: "404",
      name: "Me",
      errorMessage: "Page not found",
   });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
