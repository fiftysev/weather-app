import { defineCustomElement } from "vue";
import WeatherWidget from "./WeatherWidget.ce.vue";

const WeatherWidgetElement = defineCustomElement(WeatherWidget);

if (typeof window !== "undefined" && !customElements.get("weather-widget")) {
  customElements.define("weather-widget", WeatherWidgetElement);
}

export default WeatherWidgetElement;
