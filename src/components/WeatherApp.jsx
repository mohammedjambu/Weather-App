import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Paper,
  Switch,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Box,
  responsiveFontSizes,
} from "@mui/material";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { motion } from "framer-motion";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Pune",
    feelsLike: 31.39,
    humidity: 74,
    temp: 28.08,
    tempMax: 28.08,
    tempMin: 28.08,
    weather: "overcast clouds",
    icon: "04n",
    timezone: 19800,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [unit, setUnit] = useState("metric");

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getWeatherVideo = (info) => {
    if (info.humidity > 80) {
      return "https://cdn.coverr.co/videos/coverr-rain-on-window-8822/1080p.mp4";
    } else if (info.temp > 15) {
      return "https://cdn.coverr.co/videos/coverr-sunny-meadow-8817/1080p.mp4";
    } else {
      return "https://cdn.coverr.co/videos/coverr-cold-river-2725/1080p.mp4";
    }
  };

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          background: {
            default: isDarkMode ? "#121212" : "#e3f2fd",
            paper: isDarkMode ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: isDarkMode ? "#ffffff" : "#000000",
            secondary: isDarkMode ? "#bbbbbb" : "#333333",
          },
          primary: {
            main: "#1976d2",
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                padding: "8px 16px",
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  theme = responsiveFontSizes(theme);

  useEffect(() => {
    document.body.style.background = "none";
  }, []);

  const videoUrl = getWeatherVideo(weatherInfo);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          bgcolor: theme.palette.background.default,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          src={videoUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
            zIndex: -1,
            filter: "blur(3px) brightness(0.6)",
          }}
        />
        <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 4,
              backgroundColor: isDarkMode
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderColor: isDarkMode
                ? "rgba(255, 255, 255, 0.18)"
                : "rgba(255, 255, 255, 0.5)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h3"
                textAlign="center"
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", sm: "3rem" },
                  fontWeight: 700,
                  color: "text.primary", // Ensure title uses theme color
                }}
              >
                Weather App 🌍
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Switch checked={isDarkMode} onChange={handleThemeToggle} />
                <Typography sx={{ color: "text.primary", fontWeight: 500 }}>
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </Typography>
              </Box>
              <SearchBox
                updateInfo={updateInfo}
                setUnit={setUnit}
                unit={unit}
              />
            </motion.div>

            {weatherInfo && (
              <motion.div
                key={weatherInfo.dt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <InfoBox info={weatherInfo} unit={unit} />
              </motion.div>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
