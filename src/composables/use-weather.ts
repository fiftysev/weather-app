import { WeatherService } from "@/services/weather.service";
import { WeatherMap } from "@/types/weather";
import { onMounted, ref, watch } from "vue";
import { useSettings } from "./use-settings";

export function useWeather(apiKey: string) {
  const weatherService = new WeatherService(apiKey);
  const weatherData = ref<WeatherMap | null>(null);
  const isLoading = ref(false);

  const { cityNames } = useSettings();

  async function fetchWeather() {
    if (cityNames.value.length === 0) return;

    isLoading.value = true;
    weatherData.value = await weatherService.getCurrentWeatherByCities(
      cityNames.value
    );
    isLoading.value = false;
  }

  onMounted(fetchWeather);
  watch(cityNames, fetchWeather);

  return { weatherData, isLoading };
}
