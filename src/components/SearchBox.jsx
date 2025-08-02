import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import "./SearchBox.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBox({ updateInfo, setUnit, unit }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_API_KEY;
  const GEO_API_URL = "http://api.openweathermap.org/geo/1.0/direct";

  useEffect(() => {
    if (city.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const res = await axios.get(
            `${GEO_API_URL}?q=${city}&limit=5&appid=${API_KEY}`
          );
          setSuggestions(
            res.data.map((item) => `${item.name}, ${item.country}`)
          );
        } catch {
          setSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [city]);

  async function getWeatherInfo(cityName) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${API_URL}?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );
      if (!res.ok) throw new Error("City not found");
      const d = await res.json();
      return {
        city: d.name,
        temp: d.main.temp,
        tempMin: d.main.temp_min,
        tempMax: d.main.temp_max,
        humidity: d.main.humidity,
        feelsLike: d.main.feels_like,
        weather: d.weather[0].description,
        icon: d.weather[0].icon,
        dt: d.dt,
        timezone: d.timezone,
      };
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) return;
    try {
      const data = await getWeatherInfo(city.split(",")[0]);
      updateInfo(data);
      setCity("");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <Box
      className="SearchBox"
      sx={{
        p: 2,
        bgcolor: "rgba(255,255,255,0.1)",
        borderRadius: 2,
        backdropFilter: "blur(10px)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          options={suggestions}
          inputValue={city}
          onInputChange={(e, value) => setCity(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              id="city"
              label="Enter City Name"
              variant="outlined"
              required
              sx={{ width: { xs: "100%", sm: "80%" }, mb: 2 }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              InputLabelProps={{
                sx: { color: "text.secondary" }, // Ensure label uses theme color
              }}
            />
          )}
        />
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <Button variant="contained" type="submit" disabled={loading}>
            Search
          </Button>
          <Button variant="outlined" onClick={toggleUnit}>
            {unit === "metric" ? "°F" : "°C"}
          </Button>
        </Box>
        {error && (
          <Typography sx={{ color: "error.main", mt: 2 }}>{error}</Typography>
        )}
      </form>
    </Box>
  );
}
