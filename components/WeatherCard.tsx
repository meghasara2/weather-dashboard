'use client';

import { Cloud, Droplets, Wind, Thermometer, MapPin } from 'lucide-react';
import { WeatherData, formatTemperature, formatWindSpeed, getWeatherCategory } from '@/utils/weatherApi';

interface WeatherCardProps {
    weather: WeatherData;
    unit: 'C' | 'F';
}

export default function WeatherCard({ weather, unit }: WeatherCardProps) {
    const weatherCategory = getWeatherCategory(weather.weather[0].id, weather.weather[0].icon);

    const backgroundClass = {
        sunny: 'bg-gradient-sunny',
        clear: 'bg-gradient-clear',
        rainy: 'bg-gradient-rainy',
        cloudy: 'bg-gradient-cloudy',
        snowy: 'bg-gradient-snowy',
        night: 'bg-gradient-night',
    }[weatherCategory] || 'bg-gradient-clear';

    return (
        <div className={`rounded-3xl p-8 md:p-10 ${backgroundClass} glass-strong hover-lift smooth-transition fade-in`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {/* Location and Date */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin size={20} className="text-white/80" />
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {weather.name}, {weather.sys.country}
                        </h2>
                    </div>
                    <p className="text-white/70 text-sm">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>

                {/* Weather Icon */}
                <div className="flex items-center">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                        alt={weather.weather[0].description}
                        className="w-32 h-32 drop-shadow-2xl"
                    />
                </div>
            </div>

            {/* Main Temperature */}
            <div className="my-8">
                <div className="flex items-start gap-2">
                    <span className="text-7xl md:text-8xl font-bold text-white">
                        {Math.round(weather.main.temp)}
                    </span>
                    <span className="text-4xl md:text-5xl font-light text-white/90 mt-2">
                        °{unit}
                    </span>
                </div>
                <p className="text-2xl md:text-3xl font-medium text-white/90 capitalize mt-2">
                    {weather.weather[0].description}
                </p>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Feels Like */}
                <div className="glass rounded-2xl p-4 smooth-transition hover:bg-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Thermometer size={18} className="text-white/70" />
                        <p className="text-white/70 text-sm font-medium">Feels Like</p>
                    </div>
                    <p className="text-2xl font-bold text-white">
                        {formatTemperature(weather.main.feels_like, unit)}
                    </p>
                </div>

                {/* Humidity */}
                <div className="glass rounded-2xl p-4 smooth-transition hover:bg-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Droplets size={18} className="text-white/70" />
                        <p className="text-white/70 text-sm font-medium">Humidity</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{weather.main.humidity}%</p>
                </div>

                {/* Wind Speed */}
                <div className="glass rounded-2xl p-4 smooth-transition hover:bg-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Wind size={18} className="text-white/70" />
                        <p className="text-white/70 text-sm font-medium">Wind Speed</p>
                    </div>
                    <p className="text-2xl font-bold text-white">
                        {formatWindSpeed(weather.wind.speed)}
                    </p>
                </div>

                {/* Pressure */}
                <div className="glass rounded-2xl p-4 smooth-transition hover:bg-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Cloud size={18} className="text-white/70" />
                        <p className="text-white/70 text-sm font-medium">Pressure</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{weather.main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}
