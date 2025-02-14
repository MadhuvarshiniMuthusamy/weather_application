const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;
const API_KEY = process.env.OPENWEATHER_API_KEY; // Read API key from .env

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Weather API Endpoint
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (response.data.cod !== 200) {
            return res.status(400).json({ error: "Invalid city name or API issue" });
        }

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error.response?.data || error.message);
        res.status(500).json({ error: "Error fetching weather data" });
    }
});


// Start Server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
