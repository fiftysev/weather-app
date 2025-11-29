import { OpenWeather } from "@/types/weather";

export const WeatherFormatter = {
  getDescription(weatherData: OpenWeather.WeatherResponse): string {
    const feelsLike = this.formatTemperature(weatherData.main.feels_like);
    const description = weatherData.weather?.[0]?.description || "";
    return `Feels like: ${feelsLike}. ${
      description.charAt(0).toUpperCase() + description.slice(1)
    }`;
  },

  formatTemperature(temp: number): string {
    const rounded = Math.round(temp);
    return `${rounded}°C`;
  },

  formatHumidity(humidity: number): string {
    return `${humidity}%`;
  },

  formatPressure(pressure: number): string {
    return `${pressure} hPa`;
  },

  formatWindSpeed(speed: number, unit: "m/s" | "km/h" = "m/s"): string {
    let converted = speed;

    if (unit === "km/h") {
      converted = speed * 3.6;
    }

    return `${Math.round(converted)} ${unit}`;
  },

  getWindDirection(degrees: number): string {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  },

  formatWind(
    speed: number,
    degrees: number,
    unit: "m/s" | "km/h" = "m/s",
  ): string {
    const speedFormatted = this.formatWindSpeed(speed, unit);
    const direction = this.getWindDirection(degrees);
    return `${speedFormatted} ${direction}`;
  },

  formatVisibility(visibility: number) {
    return `${(visibility / 1000).toFixed(1)} km`;
  },

  getWeatherIconUrl(iconCode: string, size: "2x" | "4x" = "2x"): string {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
  },
};
