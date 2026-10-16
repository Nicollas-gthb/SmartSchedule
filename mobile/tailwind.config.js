/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#0038A8",
                accent: "#FCFC30",
                background: "#F5F7FA",
                surface: "#FFFFFF",
                border: "#D1D5DB",
                muted: "#6B7280",
                danger: "#DC2626",
            }
        }
    },
    plugins: [],
};