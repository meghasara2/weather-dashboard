'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import HourlyForecast from '@/components/HourlyForecast';
import Forecast from '@/components/Forecast';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { getCurrentWeather, getForecast, WeatherData, ForecastData } from '@/utils/weatherApi';
import { Cloud, Sun, Moon } from 'lucide-react';

export default function Home() {
    const [city, setCity] = useState('London');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<'C' | 'F'>('C');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const fetchWeatherData = async (cityName: string) => {
        setLoading(true);
        setError(null);

        try {
            const [weatherData, forecastData] = await Promise.all([
                getCurrentWeather(cityName),
                getForecast(cityName),
            ]);

            setWeather(weatherData);
            setForecast(forecastData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            console.error('Error fetching weather:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    const handleCitySelect = (newCity: string) => {
        setCity(newCity);
    };

    const toggleUnit = () => {
        setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <main className="min-h-screen p-4 md:p-8 pb-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-8 md:mb-12 fade-in">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-gradient-clear glass">
                                <Cloud size={32} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                                    Weather Dashboard
                                </h1>
                                <p className="text-foreground-secondary text-sm md:text-base">
                                    Real-time weather information worldwide
                                </p>
                            </div>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="glass-strong p-3 rounded-xl hover-lift smooth-transition text-foreground"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                        </button>

                        {/* Temperature Unit Toggle */}
                        <button
                            onClick={toggleUnit}
                            className="glass-strong px-6 py-3 rounded-xl hover-lift smooth-transition flex items-center gap-2 
                       text-foreground font-semibold w-fit"
                            aria-label={`Switch to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
                        >
                            <span className="text-xl">°{unit === 'C' ? 'C' : 'F'}</span>
                        </button>
                    </div>

                    {/* Search Bar */}
                    <SearchBar onCitySelect={handleCitySelect} defaultCity={city} />
                </header>

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-6 rounded-2xl glass-strong border-2 border-red-500/50 fade-in">
                        <p className="text-red-300 text-center font-medium">{error}</p>
                        <p className="text-white/70 text-center text-sm mt-2">
                            Please check the city name and try again, or ensure your API key is configured correctly.
                        </p>
                    </div>
                )}

                {/* Weather Content */}
                {!error && weather && forecast && (
                    <div className="space-y-6">
                        <WeatherCard weather={weather} unit={unit} />
                        <HourlyForecast forecast={forecast} unit={unit} />
                        <Forecast forecast={forecast} unit={unit} />
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-12 text-center text-white/50 text-sm fade-in">
                    <p>
                        Powered by{' '}
                        <a
                            href="https://openweathermap.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground-secondary hover:text-foreground smooth-transition underline"
                        >
                            OpenWeatherMap API
                        </a>
                    </p>
                    <p className="mt-2 text-foreground-secondary">
                        Built with Next.js, Tailwind CSS, and Lucide Icons
                    </p>
                </footer>
            </div>
        </main>
    );
}
