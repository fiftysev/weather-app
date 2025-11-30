<script setup lang="ts">
import { WeatherFormatter } from "@/lib/weather-format";
import { OpenWeather } from "@/types/weather";
import { UDataItem } from "../base";

type WeatherCardProps = {
  cityName: string;
  weatherData: OpenWeather.WeatherResponse;
};

defineProps<WeatherCardProps>();
</script>

<template>
  <div class="weather-card">
    <span class="title"
      >{{ weatherData.name }}, {{ weatherData.sys.country }}</span
    >
    <div class="base-data">
      <img
        class="icon"
        :src="
          WeatherFormatter.getWeatherIconUrl(weatherData?.weather?.[0].icon)
        "
      />
      <span
        class="temperature"
        v-text="WeatherFormatter.formatTemperature(weatherData.main.temp)"
      />
    </div>
    <span
      class="description"
      v-text="WeatherFormatter.getDescription(weatherData)"
    />
    <div class="details">
      <UDataItem
        label="wind"
        :value="
          WeatherFormatter.formatWind(
            weatherData.wind.speed,
            weatherData.wind.deg,
          )
        "
      />
      <UDataItem
        label="pressure"
        :value="WeatherFormatter.formatPressure(weatherData.main.pressure)"
      />
      <UDataItem
        label="humidity"
        :value="WeatherFormatter.formatHumidity(weatherData.main.humidity)"
      />
      <UDataItem
        label="visibility"
        :value="WeatherFormatter.formatVisibility(weatherData.visibility)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/mixins" as m;

.weather-card {
  width: 100%;
  min-width: 200px;

  @include m.column($gap: var(--size-s));

  .title {
    font-weight: 600;
  }

  .base-data {
    @include m.row($align: center, $gap: var(--size-s));

    .icon {
      width: 64px;
      aspect-ratio: 1 / 1;
    }

    .temperature {
      font-weight: 600;
      font-size: var(--size-xl);
    }
  }

  .description {
    color: var(--text-secondary);
  }

  .details {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--size-s);

    margin-top: var(--size-m);
  }
}
</style>
