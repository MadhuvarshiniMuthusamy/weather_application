const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    try {
        console.log(`Fetching weather data for: ${city}`); // Debugging
        console.log(`Using API Key: ${apiKey}`); // Debugging

        const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );

        console.log("Weather data received:", response.data); // Debugging

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || "Error fetching weather data" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
