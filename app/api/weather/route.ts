import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');
    const query = searchParams.get('q');

    if (!API_KEY) {
        return NextResponse.json(
            { error: 'Server configuration error: API Key missing' },
            { status: 500 }
        );
    }

    if (!query) {
        return NextResponse.json(
            { error: 'Query parameter "q" is required' },
            { status: 400 }
        );
    }

    let url = '';

    switch (endpoint) {
        case 'weather':
            // Current Weather
            url = `${BASE_URL}/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;
            break;
        case 'forecast':
            // 5-Day / 3-Hour Forecast
            url = `${BASE_URL}/forecast?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;
            break;
        case 'geo':
            // Geocoding (City Search)
            url = `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
            break;
        default:
            return NextResponse.json(
                { error: 'Invalid endpoint specified. Use "weather", "forecast", or "geo".' },
                { status: 400 }
            );
    }

    try {
        const res = await fetch(url);

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return NextResponse.json(
                { error: errorData.message || 'Upstream API error' },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Weather API Proxy Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}
