'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchCities, CitySearchResult } from '@/utils/weatherApi';

interface SearchBarProps {
    onCitySelect: (city: string) => void;
    defaultCity?: string;
}

export default function SearchBar({ onCitySelect, defaultCity = '' }: SearchBarProps) {
    const [query, setQuery] = useState(defaultCity);
    const [suggestions, setSuggestions] = useState<CitySearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) {
                setSuggestions([]);
                return;
            }

            setIsLoading(true);
            try {
                const results = await searchCities(query);
                setSuggestions(results);
                setIsOpen(true);
            } catch (error) {
                console.error('Error fetching city suggestions:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onCitySelect(query.trim());
            setIsOpen(false);
        }
    };

    const handleSuggestionClick = (city: CitySearchResult) => {
        const cityName = city.state
            ? `${city.name}, ${city.state}, ${city.country}`
            : `${city.name}, ${city.country}`;
        setQuery(cityName);
        onCitySelect(city.name);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a city..."
                        className="w-full px-6 py-4 pl-14 pr-14 text-lg rounded-2xl glass-strong text-foreground placeholder-foreground-secondary 
                     focus:outline-none focus:ring-2 focus:ring-foreground/30 smooth-transition"
                        aria-label="Search for a city"
                    />
                    <Search
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground-secondary group-focus-within:text-foreground smooth-transition"
                        size={20}
                    />
                    {isLoading && (
                        <div className="absolute right-5 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full spin" />
                        </div>
                    )}
                </div>
            </form>

            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 rounded-xl glass-strong overflow-hidden fade-in">
                    <ul className="max-h-80 overflow-y-auto">
                        {suggestions.map((city, index) => (
                            <li key={`${city.name}-${city.country}-${index}`}>
                                <button
                                    type="button"
                                    onClick={() => handleSuggestionClick(city)}
                                    className="w-full px-6 py-3 text-left hover:bg-foreground/5 smooth-transition flex items-center gap-3 
                           border-b border-border last:border-b-0"
                                >
                                    <MapPin size={16} className="text-foreground-secondary flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-foreground font-medium truncate">
                                            {city.name}
                                        </div>
                                        <div className="text-foreground-secondary text-sm truncate">
                                            {city.state ? `${city.state}, ${city.country}` : city.country}
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
