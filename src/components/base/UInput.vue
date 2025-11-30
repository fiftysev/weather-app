<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useSlots, computed } from "vue";

type UInputProps = {
  modelValue?: string;
  error?: string | null;
  loading?: boolean;
  disabled?: boolean;
};

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<UInputProps>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const slots = useSlots();

const hasIcon = computed(() => !!slots.icon);
const hasError = computed(() => !!props.error);

const inputModel = computed({
  get: () => props.modelValue || "",
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="u-input-wrapper">
    <div
      class="u-input"
      :class="{
        'u-input--error': hasError,
        'u-input--disabled': disabled,
        'u-input--loading': loading,
      }"
    >
      <input
        class="u-input-field"
        :disabled="disabled || loading"
        v-model="inputModel"
        v-bind="$attrs"
      />

      <div v-if="loading" class="u-input-icon u-input-icon--loading">
        <Icon icon="material-symbols:progress-activity" width="20" />
      </div>

      <div v-else-if="hasIcon" class="u-input-icon">
        <slot name="icon" />
      </div>
    </div>

    <span v-if="hasError" class="u-input-error">
      {{ error }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/mixins" as m;

.u-input-wrapper {
  @include m.column($gap: var(--size-xs));
}

.u-input {
  @include m.row($align: center, $gap: var(--size-s));

  padding: var(--size-xs);
  border-radius: var(--size-xs);
  border: 1px solid var(--color-border);

  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: var(--color-primary);
  }

  &--error {
    border-color: var(--color-error);
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &-field {
    flex: 1;

    padding: 4px 0;

    background: transparent;
    border: none;
    outline: none;
    color: inherit;

    font-size: 14px;

    &::placeholder {
      color: var(--text-secondary);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &-icon {
    @include m.row($align: center, $gap: 0);
    color: var(--text-secondary);

    &--loading {
      animation: spin 1s linear infinite;
    }
  }

  &-error {
    color: var(--color-error);
    font-size: 12px;
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
