/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',     // Indigo 600
        secondary: '#10B981',   // Emerald 500
        accent: '#F59E0B',      // Amber 500
        background: '#F9FAFB',  // Gray 50
        surface: '#FFFFFF',     // White
        textPrimary: '#111827', // Gray 900
        textSecondary: '#6B7280', // Gray 500
        border: '#E5E7EB',      // Gray 300
        error: '#EF4444',       // Red 500
        success: '#10B981',     // Emerald 500
        info: '#3B82F6',        // Blue 500
      },
    },
  },
  darkMode:"class",
  plugins: [],
}

