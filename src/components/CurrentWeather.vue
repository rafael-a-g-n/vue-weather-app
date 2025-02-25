<template>
  <div v-if="weatherData" class="weather-info bg-gray-800 shadow-xl rounded-2xl p-8 text-center transition-all duration-500 w-full max-w-md">
    <h2 class="text-3xl font-semibold mb-6">{{ city }}, {{ country }}</h2>
    <div class="flex items-center justify-center mb-4">
      <img :src="getWeatherIcon(weatherData.current.weathercode)" alt="Weather Icon" class="w-16 h-16 mr-4">
      <p class="text-xl font-semibold">{{ getWeatherCondition(weatherData.current.weathercode) }}</p>
    </div>
    <p class="text-xl mb-3">
      <span class="font-bold flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-2">
        <path fill-rule="evenodd" d="M1.5 13.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm9-10.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm10.5 7.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-9 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm7.5 9a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" clip-rule="evenodd" />
      </svg>{{ $t('temperature') }}:</span> {{ weatherData.current.temperature_2m }}°C
    </p>
    <p class="text-xl mb-3">
      <span class="font-bold flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-2">
        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM10.5 17.25a4.875 4.875 0 1 1 9.75 0 4.875 4.875 0 0 1-9.75 0ZM4.5 12a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
      </svg>{{ $t('humidity') }}:</span> {{ weatherData.current.relative_humidity_2m }}%
    </p>
    <p class="text-xl mb-3">
      <span class="font-bold flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-2">
        <path d="M16.217 6.707a8.25 8.25 0 0 0-11.534 0 1.125 1.125 0 0 1-1.591-1.591C6.093 3.018 7.93 1.75 10.012 1.75c3.385 0 6.169 2.288 7.288 5.457a1.125 1.125 0 0 1-1.083 1.499Z" />
        <path d="M18.293 8.783a8.25 8.25 0 0 0-11.534 0 1.125 1.125 0 0 1-1.591-1.591C8.167 5.107 10.005 3.84 12.087 3.84c3.385 0 6.169 2.288 7.288 5.457a1.125 1.125 0 0 1-1.083 1.499Z" />
        <path d="M20.37 10.86a8.25 8.25 0 0 0-11.534 0 1.125 1.125 0 0 1-1.591-1.591C10.24 7.2 12.077 5.932 14.159 5.932c3.385 0 6.169 2.288 7.288 5.457a1.125 1.125 0 0 1-1.083 1.499Z" />
      </svg>{{ $t('windSpeed') }}:</span> {{ weatherData.current.wind_speed_10m }} m/s
    </p>
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
    city: {
      type: String,
      required: false
    },
    country: {
      type: String,
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
