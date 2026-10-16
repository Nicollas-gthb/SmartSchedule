import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native";

type Variant = "primary" | "secondary" | "ghost";

type Props = Omit<PressableProps, "children"> & {
    title: string;
    variant?: Variant;
    loading?: boolean;
    className?: string;
};

const containerStyles: Record<Variant, string> = {
    primary: "bg-primary active:opacity-80",
    secondary: "border border-primary bg-transparent active:bg-primary/10",
    ghost: "bg-transparent active:opacity-60",
};

const labelStyles: Record<Variant, string> = {
    primary: "text-white",
    secondary: "text-primary",
    ghost: "text-primary",
};

export function Button({
    title,
    variant = "primary",
    loading = false,
    disabled,
    className = "",
    ...rest
}: Props) {
    const isDisabled = disabled || loading;

    return (
        <Pressable
            disabled={isDisabled}
            className={`h-12 flex-row items-center justify-center rounded-xl px-4 ${containerStyles[variant]} ${isDisabled ? "opacity-50" : ""
                } ${className}`}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={variant === "primary" ? "#fff" : "#0038A8"} />
            ) : (
                <Text className={`text-base font-semibold ${labelStyles[variant]}`}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
}