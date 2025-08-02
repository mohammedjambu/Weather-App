import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Fade,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./InfoBox.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import moment from "moment-timezone";
import { motion } from "framer-motion";

export default function InfoBox({ info, unit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, [info]);

  const visuals = {
    hot: {
      img: "https://images.unsplash.com/photo-1561473880-3b8b12de0a71?w=600",
      icon: "https://amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg",
    },
    cold: {
      img: "https://images.unsplash.com/photo-1612826296340-003036100a92?w=600",
      icon: "https://amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg",
    },
    rain: {
      img: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600",
      icon: "https://amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-7.svg",
    },
  };

  const visual =
    info.humidity > 80
      ? visuals.rain
      : info.temp > 15
      ? visuals.hot
      : visuals.cold;

  const localTime = info.timezone
    ? moment()
        .utcOffset(info.timezone / 60)
        .format("MMMM Do YYYY, h:mm A")
    : "";

  const weatherIconUrl = {
    rain: "https://amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-7.svg",
    hot: "https://amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg",
    cold: "https://amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg",
    default:
      "https://amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-1.svg",
  };

  const iconUrl =
    info.humidity > 80
      ? weatherIconUrl.rain
      : info.temp > 15
      ? weatherIconUrl.hot
      : weatherIconUrl.cold;

  return (
    <Box className="InfoBox" sx={{ my: 3 }}>
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card
          sx={{
            maxWidth: { xs: "100%", sm: 400 },
            mx: "auto",
            transition: "box-shadow 0.3s ease-in-out",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <CardMedia
            sx={{ height: 200, backgroundSize: "cover" }}
            image={visual.img}
          />
          <CardContent>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              {info.city}
              <Box
                component="img"
                src={visual.icon}
                sx={{ width: 50, height: 50 }}
              />
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              mb={3}
              sx={{ color: "text.secondary" }} // Use theme color
            >
              {localTime}
            </Typography>

            <Grid
              container
              spacing={2}
              textAlign="center"
              direction={isMobile ? "column" : "row"}
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography sx={{ color: "text.secondary" }}>
                  Temperature
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="1.8rem"
                  sx={{ color: "text.primary" }}
                >
                  {info.temp.toFixed(1)}°{unit === "metric" ? "C" : "F"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ color: "text.secondary" }}>
                  Feels Like
                </Typography>
                <Typography fontWeight="bold" sx={{ color: "text.primary" }}>
                  {info.feelsLike.toFixed(1)}°{unit === "metric" ? "C" : "F"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ color: "text.secondary" }}>
                  Humidity
                </Typography>
                <Typography fontWeight="bold" sx={{ color: "text.primary" }}>
                  {info.humidity}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: "text.secondary" }}>
                  Condition
                </Typography>
                <Typography
                  fontWeight="bold"
                  textTransform="capitalize"
                  sx={{ color: "text.primary" }}
                >
                  {info.weather}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: "text.secondary" }}>
                  Min Temp
                </Typography>
                <Typography fontWeight="bold" sx={{ color: "text.primary" }}>
                  {info.tempMin.toFixed(1)}°{unit === "metric" ? "C" : "F"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: "text.secondary" }}>
                  Max Temp
                </Typography>
                <Typography fontWeight="bold" sx={{ color: "text.primary" }}>
                  {info.tempMax.toFixed(1)}°{unit === "metric" ? "C" : "F"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
