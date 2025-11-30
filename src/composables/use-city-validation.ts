import { weatherService } from "@/services/weather.service";
import { ref } from "vue";

export function useCityValidation() {
  const isValidating = ref(false);
  const validationError = ref<string | null>(null);

  async function validateCity(
    cityName: string,
  ): Promise<{ name: string; country: string } | null> {
    if (!cityName.trim()) {
      validationError.value = null;
      return null;
    }

    isValidating.value = true;
    validationError.value = null;

    const result = await weatherService.validateCity(cityName);

    isValidating.value = false;

    if (!result) {
      validationError.value = "City not found";
    }

    return result;
  }

  function clearValidation() {
    validationError.value = null;
    isValidating.value = false;
  }

  return {
    validateCity,
    isValidating,
    validationError,
    clearValidation,
  };
}
