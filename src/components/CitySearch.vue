<template>
  <div class="flex flex-col sm:flex-row items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
    <input
      v-model="searchCity"
      @keyup.enter="emitGeocodingResults"
      type="text"
      placeholder="Enter city name"
      class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />
    <button
      @click="emitGeocodingResults"
      class="bg-orange-accent hover:bg-orange-500 text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
    >
      {{ $t('search') }}
    </button>
  </div>
</template>

<script>
import { ref, inject } from 'vue';

export default {
  emits: ['get-geocoding-results'],
  setup(props, { emit }) {
    const searchCity = ref('');
    const t = inject('t');

    const emitGeocodingResults = () => {
      emit('get-geocoding-results', searchCity.value);
    };

    return {
      searchCity,
      emitGeocodingResults,
      t
    };
  }
};
</script>
