import React, { useEffect, useState } from 'react';
import { Cloud, Sun } from 'lucide-react';
import WeatherEffects from './WeatherEffects';

interface SplashScreenProps {
    onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Start exit animation slightly before unmounting
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000); // Show for 2 seconds

        const finishTimer = setTimeout(() => {
            onFinish();
        }, 2500); // clear component after animation finishes

        return () => {
            clearTimeout(timer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-50">
                <WeatherEffects condition="clear" />
            </div>

            {/* Logo Container */}
            <div className={`relative z-10 flex flex-col items-center transition-transform duration-1000 ${isVisible ? 'scale-100' : 'scale-110'
                }`}>
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-40 pulse-glow"></div>
                    <div className="relative p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl animate-float">
                        <Cloud size={80} className="text-white drop-shadow-lg" />
                        <div className="absolute -top-2 -right-2 text-yellow-400 animate-spin-slow">
                            <Sun size={40} fill="currentColor" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    Weather Dashboard
                </h1>
                <p className="text-white/60 text-lg font-light tracking-wide">
                    Your World, Forecasted.
                </p>
            </div>

            {/* Loading Indicator */}
            <div className="absolute bottom-12 flex gap-2">
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-0"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-150"></div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
