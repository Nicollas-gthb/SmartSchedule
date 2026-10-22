import { ReactNode } from "react";
import { Pressable, View, Text } from "react-native";
import { ChevronRight } from "lucide-react-native";

type Props = {
    classname?: string,
    children?: ReactNode,
    variant?: string,
    title?: string,
    description?: string,
    icon?: ReactNode,
}

export function PressableCard({ classname = "", children, variant = "primary", title, description, icon }: Props) {

    return (
        <Pressable className={`h-36 rounded-xl justify-between p-4 border-2 border-border`}>
            <View className="flex flex-row justify-between">
                {icon}
                <ChevronRight color={"#c1c1c1"}/>
            </View>

            <View>
                <Text className="font-bold text-xl">{title}</Text>
                <Text className="text-muted">{description}</Text>
            </View>
        </Pressable>
    )
}