import { OpenWeather, WeatherMap } from "@/types/weather";
const BASE_API_URL = "https://api.openweathermap.org/data/2.5/weather";

class WeatherService {
  #apiKey: string = "";
  #units: string = "metric";

  initialize(apiKey: string, units: string = "metric") {
    this.#apiKey = apiKey;
    this.#units = units;
  }

  isInitialized(): boolean {
    return this.#apiKey.length > 0;
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

  async validateCity(
    cityName: string,
  ): Promise<{ name: string; country: string } | null> {
    try {
      const response = await fetch(
        `${BASE_API_URL}?q=${cityName}&units=${this.#units}&appid=${
          this.#apiKey
        }`,
      );
      if (response.ok) {
        const data = (await response.json()) as OpenWeather.WeatherResponse;
        return {
          name: data.name,
          country: data.sys.country,
        };
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}

export const weatherService = new WeatherService();
