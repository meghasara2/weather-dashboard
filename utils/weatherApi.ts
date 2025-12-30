// Weather API utility functions for OpenWeatherMap integration

const INTERNAL_API_URL = '/api/weather';

export interface WeatherData {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
    };
    dt: number;
    timezone: number;
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            humidity: number;
        };
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        wind: {
            speed: number;
        };
        dt_txt: string;
    }>;
    city: {
        name: string;
        country: string;
        timezone: number;
    };
}

export interface CitySearchResult {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

/**
 * Fetch current weather data via internal API
 */
export async function getCurrentWeather(city: string): Promise<WeatherData> {
    const response = await fetch(
        `${INTERNAL_API_URL}?endpoint=weather&q=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch weather data');
    }

    return response.json();
}

/**
 * Fetch 5-day weather forecast via internal API
 */
export async function getForecast(city: string): Promise<ForecastData> {
    const response = await fetch(
        `${INTERNAL_API_URL}?endpoint=forecast&q=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch forecast data');
    }

    return response.json();
}

/**
 * Search for cities via internal API
 * (Mainly legacy support, new components use country-state-city lib)
 */
export async function searchCities(query: string): Promise<CitySearchResult[]> {
    if (query.length < 2) {
        return [];
    }

    const response = await fetch(
        `${INTERNAL_API_URL}?endpoint=geo&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        return [];
    }

    return response.json();
}

/**
 * Get weather condition category for background styling
 */
export function getWeatherCategory(weatherId: number, icon: string): string {
    // Check if it's night time
    if (icon.includes('n')) {
        return 'night';
    }

    // Thunderstorm
    if (weatherId >= 200 && weatherId < 300) {
        return 'rainy';
    }
    // Drizzle
    if (weatherId >= 300 && weatherId < 400) {
        return 'rainy';
    }
    // Rain
    if (weatherId >= 500 && weatherId < 600) {
        return 'rainy';
    }
    // Snow
    if (weatherId >= 600 && weatherId < 700) {
        return 'snowy';
    }
    // Atmosphere (fog, haze, etc.)
    if (weatherId >= 700 && weatherId < 800) {
        return 'cloudy';
    }
    // Clear
    if (weatherId === 800) {
        return 'clear';
    }
    // Clouds
    if (weatherId > 800) {
        return 'cloudy';
    }

    return 'clear';
}

/**
 * Format temperature based on unit preference
 */
export function formatTemperature(temp: number, unit: 'C' | 'F'): string {
    if (unit === 'F') {
        return `${Math.round((temp * 9) / 5 + 32)}°F`;
    }
    return `${Math.round(temp)}°C`;
}

/**
 * Format wind speed
 */
export function formatWindSpeed(speed: number): string {
    return `${Math.round(speed * 3.6)} km/h`;
}

/**
 * Get day name from timestamp
 */
export function getDayName(timestamp: number, timezone: number): string {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
}

/**
 * Process forecast data to get daily forecasts (one per day)
 */
export function processDailyForecast(forecastData: ForecastData) {
    const dailyData: { [key: string]: typeof forecastData.list[0] } = {};

    forecastData.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();

        // Get the midday forecast (around 12:00) for each day
        if (!dailyData[date] || item.dt_txt.includes('12:00:00')) {
            dailyData[date] = item;
        }
    });

    // Return only 5 days
    return Object.values(dailyData).slice(0, 5);
}
