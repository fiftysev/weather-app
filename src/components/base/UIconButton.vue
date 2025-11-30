<script setup lang="ts">

</script>

<template>
  <button class="icon-button" v-bind="$attrs">
    <slot name="icon" />
  </button>
</template>

<style scoped lang="scss">
.icon-button {
  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1/1;
  padding: var(--size-s);

  border: none;
  outline: none;
  background-color: transparent;

  transition: all 0.5s ease;

  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
}
</style>
