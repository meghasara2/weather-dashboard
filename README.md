# Weather Dashboard 🌦️

A modern, responsive weather dashboard built with Next.js 14, Tailwind CSS, and the OpenWeatherMap API. Features real-time weather data, 5-day forecasts, and a stunning dark mode UI with glassmorphism design.

![Weather Dashboard](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## ✨ Features

- 🔍 **Smart City Search** - Autocomplete search with global city suggestions
- 🌡️ **Current Weather** - Real-time temperature, humidity, wind speed, and more
- 📅 **5-Day Forecast** - Detailed weather predictions for the week ahead
- 🎨 **Dynamic Backgrounds** - Gradients that change based on weather conditions
- 🌓 **Temperature Units** - Toggle between Celsius and Fahrenheit
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- ⚡ **Lightning Fast** - Built with Next.js 14 App Router
- 🎭 **Glassmorphism UI** - Modern dark theme with frosted glass effects
- ♿ **Accessible** - WCAG compliant with proper ARIA labels

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenWeatherMap API key ([Get one free here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENWEATHER_API_KEY=your_openweathermap_api_key_here
   ```

   > ⚠️ **Important**: Never commit your `.env.local` file. It's already in `.gitignore`.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
weather-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles and animations
├── components/
│   ├── SearchBar.tsx       # City search with autocomplete
│   ├── WeatherCard.tsx     # Current weather display
│   ├── Forecast.tsx        # 5-day forecast component
│   └── LoadingSkeleton.tsx # Loading state UI
├── utils/
│   └── weatherApi.ts       # OpenWeatherMap API utilities
├── public/                 # Static assets
├── .env.local.example      # Example environment file
├── tailwind.config.js      # Tailwind customization
└── next.config.js          # Next.js configuration
```

## 🎨 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [OpenWeatherMap](https://openweathermap.org/api)

## 🌐 Deployment on Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Weather Dashboard"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. **Configure Environment Variables**:
   - Add `OPENWEATHER_API_KEY` with your OpenWeatherMap API key
5. Click "Deploy"

Your app will be live in under a minute! 🎉

### Environment Variables in Vercel

In your Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Name**: `OPENWEATHER_API_KEY`
   - **Value**: Your OpenWeatherMap API key
   - **Environments**: Production, Preview, Development (select all)

## 🔑 Getting an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to **API Keys** in your account
4. Copy your API key
5. Add it to `.env.local` as shown above

> 💡 The free tier includes:
> - 1,000 API calls per day
> - Current weather and 5-day forecast
> - More than enough for development and personal use

## 🎯 Features Breakdown

### SearchBar Component
- Debounced API calls for performance
- Real-time city suggestions
- Click-outside-to-close functionality
- Loading indicators

### WeatherCard Component
- Dynamic background gradients based on conditions
- Comprehensive weather metrics
- Responsive grid layout
- Smooth hover animations

### Forecast Component
- Processed daily forecasts
- Responsive design (horizontal on desktop, grid on mobile)
- Staggered fade-in animations
- Weather icons and detailed metrics

### LoadingSkeleton Component
- Skeleton screens matching actual content
- Shimmer animations
- Improved perceived performance

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'weather-sunny': '#YOUR_COLOR',
      // ... other colors
    },
  },
}
```

### Adding New Weather Categories

Edit `utils/weatherApi.ts` in the `getWeatherCategory` function:

```typescript
export function getWeatherCategory(weatherId: number, icon: string): string {
  // Add your custom logic
}
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### "API key is not configured" error

Make sure you've:
1. Created `.env.local` file
2. Added `OPENWEATHER_API_KEY=your_key`
3. Restarted the development server

### City not found

- Check spelling
- Try adding country code (e.g., "London, UK")
- Ensure the city is in OpenWeatherMap's database

### Slow autocomplete

This is normal due to debouncing (300ms delay). It prevents excessive API calls.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

If you have questions or run into issues:

1. Check the [OpenWeatherMap API documentation](https://openweathermap.org/api)
2. Review existing GitHub issues
3. Create a new issue with details

## 🌟 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)

---

Made with ❤️ and ☕ | Deployed on [Vercel](https://vercel.com)
