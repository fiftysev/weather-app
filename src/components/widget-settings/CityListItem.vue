<script setup lang="ts">
import type { Settings } from "@/types/settings";
import { UIconButton } from "@/components/base";
import { Icon } from "@iconify/vue";

defineProps<{
  city: Settings.CityConfig;
  isDragOver?: boolean;
}>();

defineEmits<{
  delete: [cityId: string];
  dragstart: [event: DragEvent];
  dragover: [event: DragEvent];
  drop: [event: DragEvent];
  dragend: [];
}>();

function enableDragging(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const draggableElement = target.parentElement
  if (draggableElement) {
    draggableElement.setAttribute("draggable", "true");
  }
}

function disableDragging(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const draggableElement = target.parentElement;
  if (draggableElement) {
    draggableElement.setAttribute("draggable", "false");
  }
}
</script>

<template>
  <div
    class="city-list-item"
    :class="{ 'city-list-item-drag-over': isDragOver }"
    draggable="false"
    @dragstart="$emit('dragstart', $event)"
    @dragover.prevent="$emit('dragover', $event)"
    @drop="$emit('drop', $event)"
    @dragend="$emit('dragend')"
  >
    <Icon
      class="drag-handle"
      icon="material-symbols:menu"
      width="20"
      @mousedown="enableDragging"
      @mouseup="disableDragging"
    />
    <span class="name">{{ city.name }}</span>
    <UIconButton
      class="delete-btn"
      tabindex="0"
      @click="$emit('delete', city.id)"
    >
      <template #icon>
        <Icon icon="material-symbols:delete" width="20" />
      </template>
    </UIconButton>
  </div>
</template>

<style scoped lang="scss">
.city-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--size-s);

  padding: var(--size-s) var(--size-xs);
  background-color: var(--background-secondary);
  border-radius: 6px;
  border: 2px solid transparent;

  transition: all 0.2s ease;
  cursor: default;

  &-drag-over {
    border-color: #2867ab;
    background-color: rgba(40, 103, 171, 0.1);
  }

  .drag-handle {
    cursor: grab;
    color: var(--text-secondary);
    transition: color 0.2s ease;
    flex-shrink: 0;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      cursor: grabbing;
    }
  }

  .name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .delete-btn {
    flex-shrink: 0;
  }
}
</style>
