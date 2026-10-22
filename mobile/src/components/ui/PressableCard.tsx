import { ReactNode } from "react";
import { Pressable, View, Text } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    classname?: string,
    children?: ReactNode,
    variant?: string,
    title?: string,
    description?: string,
    icon?: ReactNode,
}

export function PressableCard({ classname = "", children, variant = "primary", title, description, icon }: Props) {

    const { muted } = useThemeColors()
    return (
        <Pressable className={`h-36 rounded-xl justify-between p-4 border-2 border-border`}>
            <View className="flex flex-row justify-between">
                {icon}
                <ChevronRight color={muted}/>
            </View>

            <View>
                <Text className="font-bold text-xl text-primary">{title}</Text>
                <Text className="text-muted">{description}</Text>
            </View>
        </Pressable>
    )
}