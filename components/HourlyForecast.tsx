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
    const rawData = forecast.list.slice(0, 9); // Get slightly more to interpolate properly

    // Interpolate data to get 1-hour intervals
    const hourlyData = [];
    for (let i = 0; i < rawData.length - 1; i++) {
        const current = rawData[i];
        const next = rawData[i + 1];

        // Add current 3-hour point
        hourlyData.push(current);

        // Create 2 intermediate points
        // Time difference is usually 3 hours (10800 seconds)
        // We want to add points at +1 hour and +2 hours

        for (let j = 1; j < 3; j++) {
            // Linear interpolation for temperature
            const tempDiff = next.main.temp - current.main.temp;
            const tempStep = tempDiff / 3;
            const newTemp = current.main.temp + (tempStep * j);

            // Create interpolated item
            const interpolatedItem = {
                ...current,
                dt: current.dt + (j * 3600), // Add j hours in seconds
                main: {
                    ...current.main,
                    temp: newTemp,
                    feels_like: current.main.feels_like + ((next.main.feels_like - current.main.feels_like) / 3 * j),
                    humidity: Math.round(current.main.humidity + ((next.main.humidity - current.main.humidity) / 3 * j))
                }
                // We keep the icon/desc of the starting interval for simplicity
            };
            hourlyData.push(interpolatedItem);
        }
    }

    // Limit to next 24 hours
    const displayedData = hourlyData.slice(0, 24);

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
                <h3 className="text-2xl font-bold text-foreground">24-Hour Forecast</h3>
            </div>

            {/* Horizontal Scrollable Layout */}
            <div className="overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-4 min-w-max">
                    {displayedData.map((hour, index) => (
                        <div
                            key={hour.dt}
                            className="glass rounded-2xl p-4 hover-lift smooth-transition text-center min-w-[100px]"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <p className="text-foreground-secondary text-sm font-medium mb-2">
                                {index === 0 ? 'Now' : formatHour(hour.dt)}
                            </p>

                            <img
                                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                                alt={hour.weather[0].description}
                                className="w-10 h-10 mx-auto drop-shadow-lg"
                            />

                            <div className="flex items-center justify-center gap-1 my-2">
                                <span className="text-xl font-bold text-foreground">
                                    {Math.round(hour.main.temp)}°
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-foreground-secondary text-xs text-center mt-4 opacity-60">
                * Hourly temperatures interpolated from 3-hour forecast data
            </p>
        </div>
    );
}
