<script setup lang="ts">
type UDataItemProps = {
  label: string;
  value: string;
};

defineProps<UDataItemProps>();
</script>

<template>
  <div class="u-data-item">
    <span class="label" v-text="label" />
    <span class="value" v-text="value" />
  </div>
</template>

<style scoped lang="scss">
.u-data-item {
  display: flex;
  flex-direction: column;

  .label {
    font-size: 10px;
    color: var(--text-secondary);
    text-transform: uppercase;
  }
}
</style>
