'use client';

import { useState, useEffect, useRef } from 'react';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import { MapPin, Globe, Navigation } from 'lucide-react';

interface LocationSelectorProps {
    onCitySelect: (cityName: string) => void;
}

export default function LocationSelector({ onCitySelect }: LocationSelectorProps) {
    // Data States
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [states, setStates] = useState<IState[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);

    // Selection States
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
    const [selectedState, setSelectedState] = useState<IState | null>(null);
    const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

    // Filter/Input States
    const [countryQuery, setCountryQuery] = useState('');
    const [stateQuery, setStateQuery] = useState('');
    const [cityQuery, setCityQuery] = useState('');

    // UI States
    const [activeDropdown, setActiveDropdown] = useState<'country' | 'state' | 'city' | null>(null);

    const wrapperRef = useRef<HTMLDivElement>(null);

    // Initialize Countries
    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    // Handle Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Selection Handlers
    const handleCountrySelect = (country: ICountry) => {
        setSelectedCountry(country);
        setCountryQuery(country.name);
        setStates(State.getStatesOfCountry(country.isoCode));

        // Reset subsequent selections
        setSelectedState(null);
        setStateQuery('');
        setCities([]);
        setSelectedCity(null);
        setCityQuery('');

        setActiveDropdown('state'); // Auto-advance
    };

    const handleStateSelect = (state: IState) => {
        setSelectedState(state);
        setStateQuery(state.name);
        if (selectedCountry) {
            setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
        }

        // Reset city
        setSelectedCity(null);
        setCityQuery('');

        setActiveDropdown('city'); // Auto-advance
    };

    const handleCitySelect = (city: ICity) => {
        setSelectedCity(city);
        setCityQuery(city.name);
        setActiveDropdown(null);

        // Trigger weather update
        onCitySelect(city.name);
    };

    // Filter Logic
    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(countryQuery.toLowerCase())
    );

    const filteredStates = states.filter(s =>
        s.name.toLowerCase().includes(stateQuery.toLowerCase())
    );

    const filteredCities = cities.filter(c =>
        c.name.toLowerCase().includes(cityQuery.toLowerCase())
    );

    const Dropdown = ({
        label,
        icon: Icon,
        value,
        onChange,
        placeholder,
        options,
        onSelect,
        type,
        disabled,
        active
    }: any) => (
        <div className="relative w-full">
            <div className={`relative group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        if (!active) setActiveDropdown(type);
                    }}
                    onFocus={() => !disabled && setActiveDropdown(type)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full px-4 py-3 pl-12 text-sm md:text-base rounded-xl glass-strong text-foreground placeholder-foreground-secondary 
                             focus:outline-none focus:ring-2 focus:ring-foreground/30 smooth-transition"
                />
                <Icon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-secondary"
                    size={18}
                />
            </div>

            {/* Dropdown List */}
            {active && options.length > 0 && (
                <div className="absolute z-50 w-full mt-2 rounded-xl glass-strong border border-border overflow-hidden fade-in shadow-2xl max-h-60 overflow-y-auto">
                    {options.map((opt: any, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => onSelect(opt)}
                            className="w-full px-4 py-2 text-left hover:bg-foreground/5 smooth-transition text-foreground text-sm border-b border-border last:border-b-0"
                        >
                            {opt.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div ref={wrapperRef} className="w-full max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Dropdown
                    type="country"
                    label="Country"
                    icon={Globe}
                    value={countryQuery}
                    onChange={setCountryQuery}
                    placeholder="Select Country"
                    options={filteredCountries}
                    onSelect={handleCountrySelect}
                    active={activeDropdown === 'country'}
                    disabled={false}
                />

                <Dropdown
                    type="state"
                    label="State"
                    icon={MapPin}
                    value={stateQuery}
                    onChange={setStateQuery}
                    placeholder="Select State"
                    options={filteredStates}
                    onSelect={handleStateSelect}
                    active={activeDropdown === 'state'}
                    disabled={!selectedCountry}
                />

                <Dropdown
                    type="city"
                    label="City"
                    icon={Navigation}
                    value={cityQuery}
                    onChange={setCityQuery}
                    placeholder="Select City"
                    options={filteredCities}
                    onSelect={handleCitySelect}
                    active={activeDropdown === 'city'}
                    disabled={!selectedState}
                />
            </div>
        </div>
    );
}
