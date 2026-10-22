import { Text } from "react-native";
import { MapPin } from "lucide-react-native";
import { ListCard, Screen } from "@/components/ui";
import { agencias } from "@/data/mock";

export default function Agencias() {
  return (
    <Screen>
      <Text className="mb-4 text-2xl font-bold text-foreground">Agências</Text>
      {agencias.map((a) => (
        <ListCard key={a.id} icon={MapPin} title={a.nome} description={a.endereco} />
      ))}
    </Screen>
  );
}
