import { OpenWeather, WeatherMap } from "@/types/weather";
const BASE_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export class WeatherService {
  #apiKey: string;
  #units: string;

  constructor(apiKey: string, units: string = "metric") {
    this.#apiKey = apiKey;
    this.#units = units;
  }

  private async getCurrentWeatherByCity(
    cityName: string,
  ): Promise<OpenWeather.WeatherResponse | null> {
    try {
      const response = await fetch(
        `${BASE_API_URL}?q=${cityName}&units=${this.#units}&appid=${
          this.#apiKey
        }`,
      );
      if (response.ok) {
        return (await response.json()) as OpenWeather.WeatherResponse;
      } else {
        throw new Error(JSON.stringify(await response.json()));
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Openweather API Error: ${e.message}`);
      }

      return null;
    }
  }

  async getCurrentWeatherByCities(cityNames: string[]): Promise<WeatherMap> {
    const result: WeatherMap = {};
    for (const cityName of cityNames) {
      result[cityName] = await this.getCurrentWeatherByCity(cityName);
    }
    return result;
  }
}
