<template>
  <div v-if="weatherData && weatherData.daily" class="forecast-info bg-gray-800 shadow-xl rounded-2xl p-8 text-center transition-all duration-500 w-full mt-8">
    <h2 class="text-3xl font-semibold mb-6">{{ $t('dailyForecast') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="(day, index) in weatherData.daily.time.slice(1)" :key="index" class="forecast-card mb-6 last:mb-0 p-4 rounded-lg border border-gray-700 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full">
        <div>
          <p class="text-xl">
            <span class="font-bold">{{ $t('date') }}:</span> {{ day }}
          </p>
          <p class="text-xl">
            <span class="font-bold">{{ $t('maxTemperature') }}:</span> {{ weatherData.daily.temperature_2m_max[index + 1] }}°C
          </p>
          <p class="text-xl">
            <span class="font-bold">{{ $t('minTemperature') }}:</span> {{ weatherData.daily.temperature_2m_min[index + 1] }}°C
          </p>
        </div>
        <div class="flex items-center justify-center mt-4">
          <img :src="getWeatherIcon(weatherData.daily.weathercode[index + 1])" alt="Weather Icon" class="w-12 h-12 mr-2">
          <p class="text-xl">
            <span class="font-bold">{{ $t('condition') }}:</span> {{ getWeatherCondition(weatherData.daily.weathercode[index + 1]) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, defineProps } from 'vue';

export default {
  props: {
    weatherData: {
      type: Object,
      required: false
    },
    getWeatherIcon: {
      type: Function,
      required: true
    },
    getWeatherCondition: {
      type: Function,
      required: true
    }
  },
  setup() {
    const t = inject('t');
    return { t };
  }
};
</script>

<style scoped>
.forecast-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Make cards the same height */
}
.forecast-card:hover {
  transform: translateY(-5px); /* Add a slight lift on hover */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Enhance the shadow on hover */
}
</style>
