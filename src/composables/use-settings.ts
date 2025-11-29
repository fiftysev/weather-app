import { reactive, watch, computed, readonly } from "vue";
import type { CityConfig } from "@/types/settings";
import { storage } from "@/lib/storage";

const STORAGE_KEY = "weather-cities";

const DEFAULT_CITIES: CityConfig[] = [
  { id: "1", name: "Vladivostok", order: 0 },
  { id: "2", name: "New York", order: 1 },
  { id: "3", name: "Moscow", order: 2 },
  { id: "4", name: "Saint Petersburg", order: 3 },
];

const cities = reactive<CityConfig[]>(storage.get(STORAGE_KEY, DEFAULT_CITIES));

watch(cities, (value) => storage.set(STORAGE_KEY, value), { deep: true });

export function useSettings() {
  console.log(cities);
  const cityNames = computed(() =>
    [...cities].sort((a, b) => a.order - b.order).map((c) => c.name),
  );

  function addCity(name: string) {
    cities.push({
      id: Date.now().toString(),
      name,
      order: Math.max(...cities.map((c) => c.order), -1) + 1,
    });
  }

  function removeCity(id: string) {
    const index = cities.findIndex((c) => c.id === id);
    if (index !== -1) cities.splice(index, 1);
  }

  function reorderCities(ids: string[]) {
    ids.forEach((id, index) => {
      const city = cities.find((c) => c.id === id);
      if (city) city.order = index;
    });
  }

  return {
    cities: readonly(cities),
    cityNames,
    addCity,
    removeCity,
    reorderCities,
  };
}
