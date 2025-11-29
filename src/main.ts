import { defineCustomElement } from "vue";
import WeatherWidget from "./WeatherWidget.vue";

const WeatherWidgetElement = defineCustomElement(WeatherWidget, {
  shadowRoot: false,
});

if (typeof window !== "undefined" && !customElements.get("weather-widget")) {
  customElements.define("weather-widget", WeatherWidgetElement);
}

export default WeatherWidgetElement;
