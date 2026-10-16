import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = TextInputProps & {
    label: string;
    error?: string;
    password?: boolean;
};

export function Input({ label, error, password = false, ...rest }: Props) {
    const [focused, setFocused] = useState(false);
    const [hidden, setHidden] = useState(password);

    const borderColor = error
        ? "border-danger"
        : focused
            ? "border-primary"
            : "border-border";

    return (
        <View className="mb-4">
            <Text className="mb-1 text-sm font-medium text-gray-700">{label}</Text>

            <View
                className={`h-12 flex-row items-center rounded-xl border bg-surface px-3 ${borderColor}`}
            >
                <TextInput
                    className="flex-1 text-base text-gray-900"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={hidden}
                    autoCapitalize="none"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...rest}
                />
                {password && (
                    <Pressable onPress={() => setHidden((h) => !h)} hitSlop={8}>
                        <Ionicons
                            name={hidden ? "eye-outline" : "eye-off-outline"}
                            size={20}
                            color="#6B7280"
                        />
                    </Pressable>
                )}
            </View>

            {error ? <Text className="mt-1 text-sm text-danger">{error}</Text> : null}
        </View>
    );
}