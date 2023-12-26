const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: ["class"],
  content: [
    "src/**/*.{js,jsx}",
    "src/components/**/*.{js,jsx}",
    "src/pages/**/*.{js,jsx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "gauge_fadeIn": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "gauge_fill": {
          from: { "stroke-dashoffset": "332", opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gauge_fadeIn": "gauge_fadeIn 1s ease forwards",
        "gauge_fill": "gauge_fill 1s ease forwards",
      },
    },
  },
  purge: {
    options: {
      safelist: [
        'border-transparent',
        'bg-fuchsia-950',
        'bg-sky-950',
        'bg-teal-950',
        'bg-violet-950',
        'bg-yellow-950',
        'bg-fuchsia-800',
        'bg-sky-800',
        'bg-teal-800',
        'bg-violet-800',
        'bg-yellow-800',
        'border-fuchsia-900',
        'border-sky-900',
        'border-teal-900',
        'border-violet-900',
        'border-yellow-900',
        'border-fuchsia-950',
        'border-sky-950',
        'border-teal-950',
        'border-violet-950',
        'border-yellow-950',
      ],
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}





