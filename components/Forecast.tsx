'use client';

import { ForecastData, formatTemperature, processDailyForecast, getDayName } from '@/utils/weatherApi';
import { Calendar } from 'lucide-react';

interface ForecastProps {
    forecast: ForecastData;
    unit: 'C' | 'F';
}

export default function Forecast({ forecast, unit }: ForecastProps) {
    const dailyForecasts = processDailyForecast(forecast);

    return (
        <div className="rounded-3xl glass-strong p-6 md:p-8 fade-in">
            <div className="flex items-center gap-3 mb-6">
                <Calendar size={24} className="text-foreground" />
                <h3 className="text-2xl font-bold text-foreground">5-Day Forecast</h3>
            </div>

            {/* Desktop: Horizontal Layout */}
            <div className="hidden md:grid md:grid-cols-5 gap-4">
                {dailyForecasts.map((day, index) => (
                    <div
                        key={day.dt}
                        className="glass rounded-2xl p-4 hover-lift smooth-transition text-center"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <p className="text-foreground-secondary font-medium mb-3">
                            {index === 0 ? 'Today' : getDayName(day.dt, forecast.city.timezone)}
                        </p>

                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt={day.weather[0].description}
                            className="w-16 h-16 mx-auto drop-shadow-lg"
                        />

                        <p className="text-foreground-secondary text-sm capitalize mb-3 min-h-[2.5rem] flex items-center justify-center">
                            {day.weather[0].description}
                        </p>

                        <div className="flex items-center justify-center gap-2">
                            <span className="text-2xl font-bold text-foreground">
                                {Math.round(day.main.temp)}°
                            </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border">
                            <div className="flex items-center justify-between text-xs text-foreground-secondary">
                                <span>Humidity</span>
                                <span className="font-semibold">{day.main.humidity}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile: Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {dailyForecasts.map((day, index) => (
                    <div
                        key={day.dt}
                        className="glass rounded-2xl p-4 hover:bg-white/10 smooth-transition"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-foreground font-semibold mb-1">
                                    {index === 0 ? 'Today' : getDayName(day.dt, forecast.city.timezone)}
                                </p>
                                <p className="text-foreground-secondary text-sm capitalize mb-2">
                                    {day.weather[0].description}
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-foreground">
                                        {Math.round(day.main.temp)}
                                    </span>
                                    <span className="text-lg text-foreground-secondary">°{unit}</span>
                                </div>
                                <p className="text-foreground-secondary text-sm mt-2">
                                    Humidity: {day.main.humidity}%
                                </p>
                            </div>

                            <img
                                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                alt={day.weather[0].description}
                                className="w-20 h-20 drop-shadow-lg"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
