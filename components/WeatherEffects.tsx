import React from 'react';

interface WeatherEffectsProps {
    condition: string;
}

export default function WeatherEffects({ condition }: WeatherEffectsProps) {
    const renderEffects = () => {
        switch (condition) {
            case 'sunny':
            case 'clear':
                return (
                    <>
                        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-yellow-300 rounded-full blur-3xl opacity-40 pulse-glow"></div>
                        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-100 rounded-full blur-xl opacity-60 pulse-glow"></div>
                    </>
                );
            case 'night':
                return (
                    <>
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="star"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    width: `${Math.random() * 3 + 1}px`,
                                    height: `${Math.random() * 3 + 1}px`,
                                    animationDelay: `${Math.random() * 3}s`
                                }}
                            ></div>
                        ))}
                    </>
                );
            case 'rainy':
                return (
                    <>
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="rain-drop"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                                    animationDelay: `${Math.random() * 2}s`
                                }}
                            ></div>
                        ))}
                        {/* Moving Clouds for Rain */}
                        <div className="absolute top-10 left-0 text-white/20 animate-cloud delay-0">
                            <CloudShape size={120} />
                        </div>
                        <div className="absolute top-20 left-1/3 text-white/10 animate-cloud delay-5">
                            <CloudShape size={100} />
                        </div>
                    </>
                );
            case 'snowy':
                return (
                    <>
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className="snow-flake"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    width: `${Math.random() * 4 + 2}px`,
                                    height: `${Math.random() * 4 + 2}px`,
                                    animationDuration: `${Math.random() * 3 + 2}s`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    opacity: Math.random() * 0.7 + 0.3
                                }}
                            ></div>
                        ))}
                    </>
                );
            case 'cloudy':
                return (
                    <>
                        <div className="absolute top-5 left-[-50px] text-white/30 animate-cloud delay-0 scale-150">
                            <CloudShape size={150} />
                        </div>
                        <div className="absolute top-20 left-1/4 text-white/20 animate-cloud delay-5 scale-125">
                            <CloudShape size={120} />
                        </div>
                        <div className="absolute top-10 left-3/4 text-white/20 animate-cloud delay-10">
                            <CloudShape size={100} />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-3xl">
            {renderEffects()}
        </div>
    );
}

// Simple SVG Cloud for reusability
const CloudShape = ({ size }: { size: number }) => (
    <svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.819 10.022C17.761 9.945 17.699 9.87 17.634 9.8C16.89 8.941 15.918 8.281 14.821 7.892C14.777 5.176 12.541 3 9.809 3C7.228 3 5.093 4.945 4.838 7.462C2.127 7.962 0 10.367 0 13.091C0 16.331 2.639 18.96 5.882 18.96L17.5 19Z" />
    </svg>
);
