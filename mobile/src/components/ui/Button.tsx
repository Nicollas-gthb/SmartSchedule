import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type Variant = "primary" | "secondary" | "soft" | "accent" | "ghost";

type Props = Omit<PressableProps, "children"> & {
  title: string;
  variant?: Variant;
  loading?: boolean;
  icon?: LucideIcon;
  className?: string;
};

const containerStyles: Record<Variant, string> = {
  primary: "bg-primary active:opacity-80",
  secondary: "border border-primary bg-transparent active:bg-soft",
  soft: "bg-soft active:opacity-70",
  accent: "bg-accent active:opacity-80",
  ghost: "bg-transparent active:opacity-60",
};

const labelStyles: Record<Variant, string> = {
  primary: "text-on-primary",
  secondary: "text-primary",
  soft: "text-primary",
  accent: "text-on-accent",
  ghost: "text-primary",
};

const contentColor: Record<Variant, "onPrimary" | "primary" | "onAccent"> = {
  primary: "onPrimary",
  secondary: "primary",
  soft: "primary",
  accent: "onAccent",
  ghost: "primary",
};

export function Button({
  title,
  variant = "primary",
  loading = false,
  icon: Icon,
  disabled,
  className = "",
  ...rest
}: Props) {
  const colors = useThemeColors();
  const isDisabled = disabled || loading;
  const color = colors[contentColor[variant]];

  return (
    <Pressable
      disabled={isDisabled}
      className={`h-12 flex-row items-center justify-center rounded-xl px-4 ${containerStyles[variant]} ${
        isDisabled ? "opacity-50" : ""
      } ${className}`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          {Icon ? <Icon size={18} color={color} /> : null}
          <Text className={`text-base font-semibold ${Icon ? "ml-2" : ""} ${labelStyles[variant]}`}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}
