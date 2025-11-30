<script setup lang="ts">
import "./assets/main.scss";

import { computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";

import { UIconButton } from "./components/base";
import { WeatherList } from "./components/weather-list";
import { WidgetSettings } from "./components/widget-settings";

import { useWeather } from "./composables/use-weather";
import { useWidgetState, WidgetState } from "./composables/use-widget-state";

import { weatherService } from "./services/weather.service";
import { useSettings } from "./composables/use-settings";

type WeatherWidgetProps = {
  apiKey?: string;
  layout?: "column" | "row";
};

const props = withDefaults(defineProps<WeatherWidgetProps>(), {
  layout: "column",
});

const { widgetState, setWidgetState } = useWidgetState();

const widgetHeight = computed(() =>
  props.layout === "column" ? "450px" : "270px",
);

onMounted(() => {
  if (props.apiKey) {
    weatherService.initialize(props.apiKey);
  }
});

const { weatherData, isLoading } = useWeather();
const { cityNames } = useSettings();
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
      <div class="info-state" v-if="!apiKey || !cityNames?.length">
        <template v-if="!apiKey">
          <Icon icon="material-symbols:warning" width="24" />
          <span>No API key provided.</span>
        </template>
        <template v-else-if="!cityNames?.length">
          <Icon icon="material-symbols:warning" width="24" />
          <span>No cities added. Add a new one in Settings.</span>
        </template>
      </div>
      <span v-else-if="isLoading">Loading...</span>
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
@use "@/assets/mixins" as m;

.weather-widget {
  position: relative;
  width: 400px;
  height: v-bind("widgetHeight");
  min-height: 200px;
  max-height: 500px;

  padding: var(--size-m);

  font-family: sans-serif;
  background-color: var(--background-base);

  border-radius: var(--default-radius);

  overflow: hidden;

  .actions {
    width: 100%;

    position: absolute;
    bottom: var(--size-s);
    right: var(--size-s);

    @include m.row($justify: flex-end, $gap: 0);
  }

  .info-state {
    @include m.column($align: center, $justify: center);
    height: 100%;
    color: var(--text-secondary);
  }
}
</style>
