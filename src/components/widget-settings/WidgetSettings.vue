<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

import { UIconButton, UInput } from "../base";
import CityListItem from "./CityListItem.vue";

import { useSettings } from "@/composables/use-settings";
import { useCityValidation } from "@/composables/use-city-validation";
import { useDragAndDrop } from "@/composables/use-drag-and-drop";
import { useWidgetState, WidgetState } from "@/composables/use-widget-state";

const { cities, addCity, removeCity, reorderCities } = useSettings();
const { setWidgetState } = useWidgetState();
const { validateCity, isValidating, validationError, clearValidation } =
  useCityValidation();

const {
  dragState,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
} = useDragAndDrop(reorderCities);

const newCityModel = ref<string>("");

async function handleAddCity() {
  if (!newCityModel.value?.trim()) return;

  const result = await validateCity(newCityModel.value);
  if (result) {
    addCity(`${result.name}, ${result.country}`);
    newCityModel.value = "";
    clearValidation();
  }
}

function handleInputChange() {
  if (!newCityModel.value?.trim()) {
    clearValidation();
  }
}
</script>

<template>
  <div class="widget-settings">
    <header class="header">
      <h2 class="title">Settings</h2>
      <UIconButton tabindex="0" @click="() => setWidgetState(WidgetState.View)">
        <template #icon>
          <Icon icon="material-symbols:close" width="20" />
        </template>
      </UIconButton>
    </header>
    <div class="cities">
      <CityListItem
        v-for="(city, index) in cities"
        :key="city.id"
        :city="city"
        :is-drag-over="index === dragState.dragOverIndex"
        @delete="removeCity"
        @dragstart="() => handleDragStart(index)"
        @dragover="() => handleDragOver(index)"
        @drop="() => handleDrop(index, cities)"
        @dragend="handleDragEnd"
      />
    </div>

    <div class="add-city">
      <span class="label">Add Location</span>
      <UInput
        v-model="newCityModel"
        type="text"
        placeholder="Enter city name..."
        :error="validationError"
        :loading="isValidating"
        @keyup.enter="handleAddCity"
        @input="handleInputChange"
      >
        <template #icon>
          <Icon icon="material-symbols:subdirectory-arrow-left" width="20" />
        </template>
      </UInput>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/mixins" as m;

.widget-settings {
  width: 100%;
  height: 100%;

  @include m.column($gap: var(--size-m));

  overflow: hidden;

  .header {
    @include m.row($align: center, $justify: space-between, $gap: 0);
  }

  .title {
    margin: 0;

    font-size: 18px;
    font-weight: 500;
  }

  .cities {
    @include m.column($gap: var(--size-s));
    flex: 1;

    overflow-y: auto;
    padding-right: var(--size-xs);
  }
}

.add-city {
  @include m.column($gap: var(--size-xs));
  flex-shrink: 0;

  .label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
