<script setup lang="ts">
import { useSettings } from "@/composables/use-settings";
import { UIconButton } from "./base";
import { Icon } from "@iconify/vue";
import { reactive, ref } from "vue";
import { useWidgetState, WidgetState } from "@/composables/use-widget-state";

type DragState = {
  dragStartIndex: number | null;
  dragOverIndex: number | null;
};

const { cities, addCity, removeCity, reorderCities } = useSettings();
const { setWidgetState } = useWidgetState();

const dragState = reactive<DragState>({
  dragStartIndex: null,
  dragOverIndex: null,
});

const newCityModel = ref<string>();

function onEnterKeyUp(event: KeyboardEvent) {
  if (event.code === "Enter" && newCityModel.value?.trim().length) {
    addCity(newCityModel.value);
    newCityModel.value = "";
  }
}

function onDragHandlerMouseDown(e: MouseEvent) {
  if (!e.target) return;
  const target = e.target as HTMLButtonElement;
  target.parentElement?.setAttribute("draggable", "true");
}

function onDragHandlerMouseUp(e: MouseEvent) {
  if (!e.target) return;
  const target = e.target as HTMLButtonElement;
  target.parentElement?.setAttribute("draggable", "false");
}

function onDragStart(index: number) {
  dragState.dragStartIndex = index;
}

function onDragOver(index: number) {
  dragState.dragOverIndex = index;
}

function onDrop(index: number) {
  if (dragState.dragStartIndex == null) return;

  const data = [...cities];
  const movedItem = data[dragState.dragStartIndex];

  data.splice(dragState.dragStartIndex, 1);
  data.splice(index, 0, movedItem);

  reorderCities(data.map((v) => v.id));

  dragState.dragStartIndex = null;
  dragState.dragOverIndex = null;
}

function onDragEnd() {
  dragState.dragStartIndex = null;
  dragState.dragOverIndex = null;
}
</script>

<template>
  <div class="widget-settings">
    <div class="actions">
      <span>Settings</span>
      <UIconButton @click="() => setWidgetState(WidgetState.View)">
        <template #icon>
          <Icon icon="material-symbols:close" width="20" />
        </template>
      </UIconButton>
    </div>
    <div class="cities-list">
      <div
        v-for="(city, index) in cities"
        :key="city.order"
        class="cities-list-entry"
        :class="{ 'cities-list-entry-over': index === dragState.dragOverIndex }"
        @dragstart="onDragStart(index)"
        @dragover.prevent="onDragOver(index)"
        @drop="onDrop(index)"
        @dragend="onDragEnd"
      >
        <Icon
          class="drag-handler"
          icon="material-symbols:menu"
          width="20"
          @mousedown="onDragHandlerMouseDown"
          @mouseup="onDragHandlerMouseUp"
        />
        <span v-text="city.name" />
        <UIconButton @click="() => removeCity(city.id)">
          <template #icon>
            <Icon icon="material-symbols:delete" width="20" />
          </template>
        </UIconButton>
      </div>
      <span>Add Location</span>
      <div class="add-city">
        <input
          v-model="newCityModel"
          class="add-city-input"
          type="text"
          @keyup="onEnterKeyUp"
        />
        <Icon icon="material-symbols:subdirectory-arrow-left" width="24" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.widget-settings {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: var(--size-s);

  overflow: hidden;

  .actions {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cities-list {
    max-height: 100%;

    display: flex;
    flex-direction: column;
    gap: var(--size-s);

    overflow-y: auto;

    .cities-list-entry {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: var(--size-xs);
      background-color: var(--background-secondary);

      transition: all 0.5s ease;

      &-over {
        border: 1px solid #2867ab;
      }
    }

    .drag-handler {
      cursor: move;
    }
  }

  .add-city {
    display: flex;
    align-items: center;
    gap: var(--size-s);

    &-input {
      flex-grow: 1;
      height: 24px;
    }
  }
}
</style>
