<script setup lang="ts">
import "./assets/main.scss";

import { Icon } from "@iconify/vue";

import { useWeather } from "./composables/use-weather";
import { WeatherList } from "./components/weather-list";
import { UIconButton } from "./components/base";
import { computed } from "vue";
import WidgetSettings from "./components/WidgetSettings.vue";
import { useWidgetState, WidgetState } from "./composables/use-widget-state";

type WeatherWidgetProps = {
  apiKey: string;
  layout?: "column" | "row";
};

const props = withDefaults(defineProps<WeatherWidgetProps>(), {
  layout: "column",
});

const { widgetState, setWidgetState } = useWidgetState();

const widgetHeight = computed(() =>
  props.layout === "column" ? "450px" : "270px",
);

const { weatherData, isLoading } = useWeather(props.apiKey);
</script>

<template>
  <section class="weather-widget">
    <template v-if="widgetState === WidgetState.View">
      <div class="actions">
        <UIconButton @click="() => setWidgetState(WidgetState.Settings)">
          <template #icon>
            <Icon icon="material-symbols:settings" width="24" />
          </template>
        </UIconButton>
      </div>
      <span v-if="isLoading">Loading...</span>
      <WeatherList
        v-else-if="weatherData"
        :data="weatherData"
        :layout="layout"
      />
    </template>
    <template v-else-if="widgetState === WidgetState.Settings">
      <WidgetSettings />
    </template>
  </section>
</template>

<style scoped lang="scss">
.weather-widget {
  position: relative;
  width: 400px;
  height: v-bind("widgetHeight");
  min-height: 200px;
  max-height: 500px;

  padding: var(--size-m);

  font-family: sans-serif;
  background-color: var(--background-primary);

  border-radius: var(--default-radius);

  overflow: hidden;

  .actions {
    position: absolute;
    bottom: var(--size-s);
    right: var(--size-s);
    width: 100%;

    display: flex;
    justify-content: end;
  }
}
</style>
