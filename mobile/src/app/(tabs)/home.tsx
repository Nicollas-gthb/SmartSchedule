import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Bell, CalendarDays, CalendarPlus2, CircleHelp, FileText, Landmark, MapPin } from "lucide-react-native";
import { Button, ShortcutCard } from "@/components/ui";
import { usuario } from "@/data/mock";

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="pb-8">
      {/* Hero: bg-brand é azul nos dois temas */}
      <View className="overflow-hidden bg-brand px-6 pb-8" style={{ paddingTop: insets.top + 16 }}>
        <View className="absolute -right-6 top-24 opacity-15">
          <Landmark size={170} color="#FFFFFF" />
        </View>

        <View className="flex-row items-center">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-accent">
            <Landmark size={24} color="#0D1F54" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-lg font-bold text-white">Olá, {usuario.nome}</Text>
            <Text className="text-sm text-white/80">O que você precisa hoje?</Text>
          </View>
          <Pressable hitSlop={10}>
            <Bell size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        <Text className="mt-10 text-3xl font-bold leading-9 text-white">
          Seu tempo{"\n"}também é{"\n"}importante.
        </Text>
        <Text className="mt-3 max-w-[65%] text-sm text-white/80">
          Agende seu atendimento na agência e evite filas.
        </Text>
        <Button
          title="Agendar atendimento"
          variant="accent"
          icon={CalendarPlus2}
          className="mt-6 self-start px-5"
          onPress={() => router.push("/agendar/servico")}
        />
      </View>

      <View className="mt-6 flex-row flex-wrap justify-between px-6">
        <ShortcutCard
          icon={CalendarDays}
          title="Meus agendamentos"
          description="Consulte, altere ou cancele seus atendimentos."
          onPress={() => router.navigate("/agendamentos")}
        />
        <ShortcutCard
          icon={MapPin}
          title="Agências"
          description="Encontre a agência mais próxima de você."
          onPress={() => router.navigate("/agencias")}
        />
        <ShortcutCard
          icon={FileText}
          title="Serviços"
          description="Veja todos os serviços disponíveis."
          onPress={() => router.push("/agendar/servico")}
        />
        <ShortcutCard
          icon={CircleHelp}
          title="Ajuda"
          description="Dúvidas frequentes e suporte."
        />
      </View>
    </ScrollView>
  );
}
