const express = require("express");
const bodyParser = require("body-parser");
const supabaseClient = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const axios = require("axios");

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);


app.get("/", (req, res) => {
  res.sendFile("public/home.html", { root: __dirname });
});

// Create a reusable axios instance
const weatherClient = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    params: {
        key: process.env.WEATHER_API_KEY
    }
});

// Handle WeatherAPI errors
weatherClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.error) {
      const { code, message } = error.response.data.error;
      throw new Error(`WeatherAPI error ${code}: ${message}`);
    }

    throw error;
  }
);

// Get forecast (up to 14 days)
async function getForecast(location, days = 3) {
  const { data } = await weatherClient.get('/forecast.json', {
    params: { 
        q: location, 
        days, 
        aqi: 'no', 
        alerts: 'yes' },
  });
  return data;
}

// Get current weather
app.get("/api/weather", async (req, res) => {
    const city = req.query.city;

    if(!city){
        res.status(400).json({
            error: "City is required"
        });
        return;
    }

    try {
        const weatherData = await getForecast(city, 1);
        res.json(weatherData);
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            error: "Unable to retrieve weather data"
        });
    }
});

// Get all clothes
app.get("/clothes", async (req, res) => {
    console.log("Getting all clothes");

    const { data, error } = await supabase
        .from("clothes")
        .select();

    if (error) {
        console.log(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);
    } else {
        console.log("Received clothes:", data.length);
        res.json(data);
    }
});

// Add clothing item
app.post("/clothes", async (req, res) => {

    console.log("Adding Clothing Item");

    const name = req.body.name;
    const category = req.body.category;
    const weatherType = req.body.weatherType;
    const minTemp = req.body.minTemp;
    const maxTemp = req.body.maxTemp;
    const imageURL = req.body.imageURL;

    const { data, error } = await supabase
        .from("clothes")
        .insert({
            name: name,
            category: category,
            weather_type: weatherType,
            min_temp: minTemp,
            max_temp: maxTemp,
            image_url: imageURL
        })
        .select();

    if(error){
        console.log(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);
    } else{
        res.json(data);
    }
});

app.listen(port, () => {
  console.log(`App is available on http://localhost:${port}`);
});
