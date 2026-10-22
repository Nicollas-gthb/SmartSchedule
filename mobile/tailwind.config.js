/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", 
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                surface: "rgb(var(--surface) / <alpha-value>)",
                border: "rgb(var(--border) / <alpha-value>)",
                foreground: "rgb(var(--foreground) / <alpha-value>)",
                muted: "rgb(var(--muted) / <alpha-value>)",
                primary: "rgb(var(--primary) / <alpha-value>)",
                "on-primary": "rgb(var(--onPrimary) / <alpha-value>)",
                danger: "rgb(var(--danger) / <alpha-value>)",
                accent: "#FCFC30",
            }
        }
    },
    plugins: [],
};