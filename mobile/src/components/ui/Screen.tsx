import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    headerTitle?: string | null,
    children: ReactNode,
    className?: string,// estilos extras do conteúdo
};

export function Screen({ headerTitle = null, children, className = "" }: Props) {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                {headerTitle ? (
                    <View className="border-b-2 border-border mb-8 px-6 py-3">
                        <Text className="text-2xl font-bold">
                            {headerTitle}
                        </Text>
                    </View>
                ) : null}
                <ScrollView
                    contentContainerClassName={`flex-grow px-6 py-8 ${className}`}
                    keyboardShouldPersistTaps="handled"
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}