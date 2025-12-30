'use client';

import { ForecastData, formatTemperature } from '@/utils/weatherApi';
import { Clock } from 'lucide-react';

interface HourlyForecastProps {
    forecast: ForecastData;
    unit: 'C' | 'F';
}

export default function HourlyForecast({ forecast, unit }: HourlyForecastProps) {
    // Get today's hourly forecast (next 24 hours)
    const now = new Date();
    const todayDate = now.toLocaleDateString();
    const tomorrowDate = new Date(now.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString();

    // Filter forecast data to get hourly data for today (next 24 hours / 8 entries since API gives 3-hour intervals)
    const hourlyData = forecast.list.slice(0, 8); // This gives us the next 24 hours in 3-hour intervals

    const formatHour = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        });
    };

    return (
        <div className="rounded-3xl glass-strong p-6 md:p-8 fade-in">
            <div className="flex items-center gap-3 mb-6">
                <Clock size={24} className="text-foreground" />
                <h3 className="text-2xl font-bold text-foreground">Today's Hourly Forecast</h3>
            </div>

            {/* Horizontal Scrollable Layout */}
            <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 min-w-max">
                    {hourlyData.map((hour, index) => (
                        <div
                            key={hour.dt}
                            className="glass rounded-2xl p-4 hover-lift smooth-transition text-center min-w-[120px]"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <p className="text-foreground-secondary font-medium mb-2">
                                {index === 0 ? 'Now' : formatHour(hour.dt)}
                            </p>

                            <img
                                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                                alt={hour.weather[0].description}
                                className="w-12 h-12 mx-auto drop-shadow-lg"
                            />

                            <p className="text-foreground-secondary text-xs capitalize mb-2 min-h-[2rem] flex items-center justify-center">
                                {hour.weather[0].description}
                            </p>

                            <div className="flex items-center justify-center gap-1">
                                <span className="text-2xl font-bold text-foreground">
                                    {Math.round(hour.main.temp)}°
                                </span>
                            </div>

                            <div className="mt-2 pt-2 border-t border-border">
                                <div className="text-xs text-foreground-secondary space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span>Feels</span>
                                        <span className="font-semibold">{Math.round(hour.main.feels_like)}°</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Humid</span>
                                        <span className="font-semibold">{hour.main.humidity}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-foreground-secondary text-xs text-center mt-4">
                * Forecast shown in 3-hour intervals for the next 24 hours
            </p>
        </div>
    );
}
