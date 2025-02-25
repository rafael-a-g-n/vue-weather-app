<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-500 bg-gray-900 text-white">
    <div class="flex justify-end w-full max-w-md mb-4">
      <select v-model="locale" @change="changeLocale" class="bg-gray-700 text-white rounded-md py-2 px-4 focus:outline-none">
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </div>
    <h1 class="text-4xl font-bold mb-8 text-orange-accent transition-colors duration-300">{{ $t('weatherApp') }}</h1>
    <CitySearch @get-geocoding-results="getGeocodingResults" />

    <div v-if="geocodingResults && geocodingResults.length > 0" class="mb-8 w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('selectCity') }}</h2>
      <ul class="list-none p-0">
        <li v-for="result in geocodingResults" :key="result.id" class="mb-2">
          <button @click="getWeather(result.latitude, result.longitude, result.name, result.country)" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-left">
            {{ result.name }}, {{ result.country }}
          </button>
        </li>
      </ul>
    </div>

    <CurrentWeather
      :weather-data="weatherData"
      :city="city"
      :country="country"
      :get-weather-icon="getWeatherIcon"
      :get-weather-condition="getWeatherCondition"
    />

    <Forecast
      :weather-data="weatherData"
      :get-weather-icon="getWeatherIcon"
      :get-weather-condition="getWeatherCondition"
    />

    <div v-if="error" class="error-message text-red-500 mt-6 transition-opacity duration-500">
      {{ $t('cityNotFound', { city: searchCity }) }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, provide } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import CitySearch from './components/CitySearch.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import Forecast from './components/Forecast.vue';

export default {
  components: {
    CitySearch,
    CurrentWeather,
    Forecast
  },
  setup() {
    const searchCity = ref('');
    const city = ref('');
    const weatherData = ref(null);
    const error = ref('');
    const country = ref('');
    const geocodingResults = ref(null);
    const { locale, t, setLocaleMessage } = useI18n();

    provide('t', t);

    const changeLocale = (event) => {
      localStorage.setItem('lang', locale.value);
    };

    const weatherCodeMap = {
      0: { description: 'clearSky', icon: 'sun' },
      1: { description: 'mainlyClear', icon: 'sun' },
      2: { description: 'partlyCloudy', icon: 'cloud-sun' },
      3: { description: 'overcast', icon: 'cloud' },
      45: { description: 'fog', icon: 'smog' },
      48: { description: 'depositingRimeFog', icon: 'smog' },
      51: { description: 'lightDrizzle', icon: 'cloud-drizzle' },
      53: { description: 'moderateDrizzle', icon: 'cloud-drizzle' },
      55: { description: 'denseDrizzle', icon: 'cloud-drizzle' },
      61: { description: 'slightRain', icon: 'cloud-rain' },
      63: { description: 'moderateRain', icon: 'cloud-rain' },
      65: { description: 'heavyRain', icon: 'cloud-showers-heavy' },
      71: { description: 'slightSnow', icon: 'cloud-snow' },
      73: { description: 'moderateSnow', icon: 'cloud-snow' },
      75: { description: 'heavySnow', icon: 'cloud-snow' },
      80: { description: 'slightShowers', icon: 'cloud-showers-heavy' },
      81: { description: 'moderateShowers', icon: 'cloud-showers-heavy' },
      82: { description: 'heavyShowers', icon: 'cloud-showers-heavy' },
      95: { description: 'thunderstorm', icon: 'bolt' },
      96: { description: 'thunderstormWithSlightHail', icon: 'bolt' },
      99: { description: 'thunderstormWithHeavyHail', icon: 'bolt' },
    };

    const getGeocodingResults = async (searchQuery) => {
      try {
        searchCity.value = searchQuery;
        const geocodingResponse = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity.value}&count=5`
        );

        if (geocodingResponse.data.results && geocodingResponse.data.results.length > 0) {
          geocodingResults.value = geocodingResponse.data.results.map(result => ({
            id: result.id,
            name: result.name,
            latitude: result.latitude,
            longitude: result.longitude,
            country: result.country
          }));
          error.value = '';
        } else {
          geocodingResults.value = null;
          error.value = t('cityNotFound', { city: searchCity.value });
        }
      } catch (err) {
        geocodingResults.value = null;
        error.value = t('anErrorOccurred');
      }
    };

    const getWeather = async (latitude, longitude, cityName, countryName) => {
      try {
        city.value = cityName;
        country.value = countryName;
        geocodingResults.value = null;

        const weatherResponse = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        );

        weatherData.value = weatherResponse.data;
        error.value = '';
        localStorage.setItem('lastCity', searchCity.value);
        searchCity.value = ''; // Clear the input field after successful search
      } catch (err) {
        weatherData.value = null;
        error.value = t('anErrorOccurred');
        country.value = '';
        city.value = '';
      }
    };

    const getWeatherCondition = (weathercode) => {
      const descriptionKey = weatherCodeMap[weathercode]?.description || 'unknown';
      return t(descriptionKey);
    };

    const getWeatherIcon = (weathercode) => {
      const iconName = weatherCodeMap[weathercode]?.icon || 'question';
      return `https://openweathermap.org/img/wn/${getOpenWeatherMapIcon(iconName)}@2x.png`;
    };

    const getOpenWeatherMapIcon = (iconName) => {
      switch (iconName) {
        case 'sun': return '01d';
        case 'cloud-sun': return '02d';
        case 'cloud': return '03d';
        case 'smog': return '50d';
        case 'cloud-drizzle': return '09d';
        case 'cloud-rain': return '10d';
        case 'cloud-showers-heavy': return '09d';
        case 'cloud-snow': return '13d';
        case 'bolt': return '11d';
        default: return '01d';
      }
    };

    onMounted(() => {
      const lastCity = localStorage.getItem('lastCity');
      if (lastCity) {
        searchCity.value = lastCity;
        getGeocodingResults(searchCity.value);
      }
    });

    return {
      searchCity,
      city,
      weatherData,
      error,
      getWeather,
      country,
      getWeatherCondition,
      getWeatherIcon,
      locale,
      changeLocale,
      geocodingResults,
      getGeocodingResults
    };
  },
};
</script>
