import { ref } from "vue";

export enum WidgetState {
  View = "view",
  Settings = "settings",
}

const widgetState = ref<WidgetState>(WidgetState.View);

export function useWidgetState() {
  function setWidgetState(newWidgetState: WidgetState) {
    widgetState.value = newWidgetState;
  }

  return {
    widgetState,
    setWidgetState,
  };
}
