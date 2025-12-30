'use client';

import { Cloud } from 'lucide-react';

export default function LoadingSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl space-y-6 fade-in">
                {/* Main Weather Card Skeleton */}
                <div className="rounded-3xl glass-strong p-8 md:p-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-1 w-full">
                            <div className="h-8 w-64 skeleton rounded-lg mb-2" />
                            <div className="h-4 w-48 skeleton rounded-lg" />
                        </div>
                        <div className="w-32 h-32 skeleton rounded-full" />
                    </div>

                    <div className="my-8">
                        <div className="h-24 w-48 skeleton rounded-lg mb-4" />
                        <div className="h-8 w-40 skeleton rounded-lg" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="glass rounded-2xl p-4">
                                <div className="h-4 w-24 skeleton rounded mb-3" />
                                <div className="h-8 w-16 skeleton rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Forecast Skeleton */}
                <div className="rounded-3xl glass-strong p-6 md:p-8">
                    <div className="h-8 w-48 skeleton rounded-lg mb-6" />
                    <div className="hidden md:grid md:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="glass rounded-2xl p-4">
                                <div className="h-4 w-16 skeleton rounded mx-auto mb-3" />
                                <div className="w-16 h-16 skeleton rounded-full mx-auto mb-3" />
                                <div className="h-3 w-20 skeleton rounded mx-auto mb-3" />
                                <div className="h-8 w-12 skeleton rounded mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Loading Icon with Animation */}
                <div className="flex justify-center items-center gap-3 text-foreground-secondary">
                    <Cloud size={24} className="pulse" />
                    <p className="text-lg">Loading weather data...</p>
                </div>
            </div>
        </div>
    );
}
