import React, { useState } from "react";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        setError(""); // Clear previous errors

        if (!city) {
            setError("Please enter a city name.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/weather?city=${city}`);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
                setWeather(null);
            } else {
                setWeather(data);
            }
        } catch (error) {
            setError("Failed to fetch weather data.");
            console.error("Fetch error:", error);
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
                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main?.temp ?? "Data not available"}°C</p>
                    <p>Humidity: {weather.main?.humidity ?? "Data not available"}%</p>
                    <p>Condition: {weather.weather?.[0]?.description ?? "Data not available"}</p>
                </div>
            )}
        </div>
    );
}

export default App;