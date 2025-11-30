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
@use "@/assets/mixins" as m;

.u-data-item {
  @include m.column($gap: 0);

  .label {
    font-size: 10px;
    color: var(--text-secondary);
    text-transform: uppercase;
  }
}
</style>
