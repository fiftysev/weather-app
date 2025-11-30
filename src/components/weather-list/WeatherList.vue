<script setup lang="ts">
import { WeatherMap } from "@/types/weather";
import WeatherCard from "./WeatherCard.vue";

type WeatherListProps = {
  data: WeatherMap;
  layout: string;
};

defineProps<WeatherListProps>();
</script>

<template>
  <div class="weather-list">
    <template v-for="(weather, cityName) in data" :key="cityName">
      <p v-if="!weather" class="no-data">No data for {{ cityName }}</p>
      <WeatherCard v-else :city-name="cityName" :weather-data="weather" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.weather-list {
  height: 100%;

  display: flex;
  flex-direction: v-bind("layout");
  gap: var(--size-l);

  overflow: auto;

  .no-data {
    color: var(--text-secondary);
  }
}
</style>
