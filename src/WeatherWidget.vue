<script setup lang="ts">
import "./assets/main.scss";
import { useWeather } from "./composables/use-weather";
import { WeatherList } from "./components/weather-list";

type WeatherWidgetProps = {
  apiKey: string;
  layout?: "column" | "row";
};

const props = withDefaults(defineProps<WeatherWidgetProps>(), {
  layout: "column",
});

const { weatherData, isLoading } = useWeather(props.apiKey);
</script>

<template>
  <section class="weather-widget">
    <div class="actions"></div>
    <span v-if="isLoading">Loading...</span>
    <WeatherList v-else-if="weatherData" :data="weatherData" :layout="layout" />
  </section>
</template>

<style scoped lang="scss">
.weather-widget {
  width: 400px;
  min-height: 200px;
  max-height: 450px;

  padding: var(--size-m);

  font-family: sans-serif;
  background-color: var(--background-primary);

  border-radius: var(--default-radius);
  overflow: auto;

  .actions {
    width: 100%;

    display: flex;
    justify-content: end;
  }
}
</style>
