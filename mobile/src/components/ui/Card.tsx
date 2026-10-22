import { ReactNode } from "react";
import { View } from "react-native";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <View className={`rounded-2xl border border-border bg-surface p-4 ${className}`}>
      {children}
    </View>
  );
}
