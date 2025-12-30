import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Weather Dashboard - Real-time Global Weather',
    description: 'A modern, responsive weather dashboard showing current conditions and 5-day forecasts for cities worldwide. Built with Next.js and OpenWeatherMap API.',
    keywords: ['weather', 'forecast', 'temperature', 'climate', 'weather app', 'next.js'],
    authors: [{ name: 'Weather Dashboard' }],
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#1a1a2e',
    openGraph: {
        title: 'Weather Dashboard - Real-time Global Weather',
        description: 'Get real-time weather information and 5-day forecasts for any city worldwide',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>{children}</body>
        </html>
    );
}
