import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        // Premium Corporate Colors
                        navy: {
                                DEFAULT: '#001F3F',
                                light: '#003366',
                                dark: '#001229',
                                50: '#E6EBF0',
                                100: '#B3C3D1',
                                200: '#809BB2',
                                300: '#4D7393',
                                400: '#1A4B74',
                                500: '#001F3F',
                                600: '#001831',
                                700: '#001123',
                                800: '#000A14',
                                900: '#00030A',
                        },
                        gold: {
                                DEFAULT: '#D4AF37',
                                light: '#FFD700',
                                dark: '#B8960F',
                                50: '#FFFDF0',
                                100: '#FFF8D6',
                                200: '#FFF0AD',
                                300: '#FFE885',
                                400: '#FFE05C',
                                500: '#D4AF37',
                                600: '#A68B2C',
                                700: '#786720',
                                800: '#4B4315',
                                900: '#1D1B0A',
                        },
                        teal: {
                                DEFAULT: '#0D9488',
                                light: '#14B8A6',
                                dark: '#0F766E',
                        },
                        // shadcn/ui compatible
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        heading: ['Inter', 'system-ui', 'sans-serif'],
                        burmese: ['Padauk', 'Pyidaungsu', 'Myanmar Text', 'sans-serif'],
                },
                fontSize: {
                        'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
                        'hero-sm': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
                },
                boxShadow: {
                        'corporate': '0 2px 12px rgba(0, 31, 63, 0.04)',
                        'corporate-lg': '0 8px 32px rgba(0, 31, 63, 0.08)',
                        'gold': '0 4px 14px rgba(212, 175, 55, 0.4)',
                        'gold-lg': '0 8px 32px rgba(212, 175, 55, 0.5)',
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
