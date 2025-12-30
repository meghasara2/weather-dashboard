'use client';

import { Cloud, Droplets, Wind, Thermometer, MapPin } from 'lucide-react';
import { formatTemperature, formatWindSpeed, getWeatherCategory, WeatherData } from '@/utils/weatherApi';
import WeatherEffects from './WeatherEffects';

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

    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className={`relative overflow-hidden rounded-3xl p-8 md:p-10 ${backgroundClass} border border-white/20 shadow-2xl hover-lift smooth-transition fade-in`}>

            {/* Dynamic Weather Animations */}
            <WeatherEffects condition={weatherCategory} />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                {/* Location and Date */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="text-white" size={20} />
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {weather.name}, {weather.sys.country}
                        </h2>
                    </div>
                    <p className="text-white/80 text-lg font-medium">{formattedDate}</p>
                </div>

                {/* Main Temperature and Icon */}
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <h3 className="text-6xl md:text-7xl font-bold text-white tracking-tighter">
                            {formatTemperature(weather.main.temp, unit)}
                        </h3>
                        <p className="text-white/90 text-xl font-medium capitalize">
                            {weather.weather[0].description}
                        </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-white/30">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                            alt={weather.weather[0].description}
                            className="w-24 h-24 md:w-28 md:h-28 drop-shadow-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Weather Details Grid */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Feels Like */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 smooth-transition hover:bg-white/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Thermometer size={18} className="text-white/70" />
                        <p className="text-white/70 text-sm font-medium">Feels Like</p>
                    </div>
                    <p className="text-2xl font-bold text-white">
                        {formatTemperature(weather.main.feels_like, unit)}
                    </p>
                </div>

                {/* Humidity */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 smooth-transition hover:bg-white/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Droplets size={18} className="text-white/70" />
                        <p className="text-white/70 text-sm font-medium">Humidity</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{weather.main.humidity}%</p>
                </div>

                {/* Wind Speed */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 smooth-transition hover:bg-white/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Wind size={18} className="text-white/70" />
                        <p className="text-white/70 text-sm font-medium">Wind Speed</p>
                    </div>
                    <p className="text-2xl font-bold text-white">
                        {formatWindSpeed(weather.wind.speed)}
                    </p>
                </div>

                {/* Pressure */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 smooth-transition hover:bg-white/20">
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
