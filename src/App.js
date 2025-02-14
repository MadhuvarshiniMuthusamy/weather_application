import React, { useState } from "react";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        setError(""); // Clear previous errors
        setWeather(null); // Clear previous weather data

        try {
            const response = await fetch(`http://localhost:5000/weather?city=${city}`);

            if (!response.ok) {
                throw new Error("Failed to fetch weather data. Check API response.");
            }

            const data = await response.json();
            console.log("Weather data received:", data); // Debugging

            setWeather(data);
        } catch (err) {
            console.error("Error fetching weather:", err);
            setError("Could not fetch weather data. Please try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Weather Monitoring System</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {weather && (
                <div>
                    <h2>Weather in {weather.location.name}</h2>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Humidity: {weather.current.humidity}%</p>
                    <p>Condition: {weather.current.condition.text}</p>
                </div>
            )}
        </div>
    );
}

export default App;
