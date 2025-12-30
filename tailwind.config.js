/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'weather-sunny': '#FF9B42',
                'weather-rainy': '#4A90E2',
                'weather-cloudy': '#8E9AAF',
                'weather-snowy': '#E0F4FF',
                'weather-clear': '#FFD166',
                foreground: 'var(--foreground)',
                'foreground-secondary': 'var(--foreground-secondary)',
                border: 'var(--border)',
            },
            backgroundImage: {
                'gradient-sunny': 'linear-gradient(135deg, #FF9B42 0%, #FF6B6B 100%)',
                'gradient-rainy': 'linear-gradient(135deg, #4A90E2 0%, #5C6AC4 100%)',
                'gradient-cloudy': 'linear-gradient(135deg, #8E9AAF 0%, #6C757D 100%)',
                'gradient-snowy': 'linear-gradient(135deg, #E0F4FF 0%, #A7C7E7 100%)',
                'gradient-clear': 'linear-gradient(135deg, #FFD166 0%, #FF9B42 100%)',
                'gradient-night': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            },
        },
    },
    plugins: [],
}
