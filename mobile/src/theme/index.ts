import { vars } from "nativewind"

export const palette = {
    light: {
        background: "245 247 250",
        surface: "255 255 255",
        border: "209 213 219",
        foreground: "17 24 39",
        muted: "107 114 128",
        primary: "0 56 168",
        danger: "220 38 38",
    },
    dark: {
        background: "15 23 42",
        surface: "30 41 59",
        border: "51 65 85",
        foreground: "241 245 249",
        muted: "148 163 184",
        primary: "96 140 255",
        danger: "248 113 113",
    },
}as const

type Scheme = keyof typeof palette

function toVars(colors: Record<string, string>) {
    return vars(
        Object.fromEntries(Object.entries(colors).map(([k, v]) => [`--${k}`, v]))
    )
}

export const themes = {
    light: toVars(palette.light),
    dark: toVars(palette.dark),
}

export function getColor(scheme: Scheme, name: keyof typeof palette.light) {
    return `rgb(${palette[scheme][name].split(" ").join(",")})`
}