import { Text, View } from "react-native";
import { Button, Screen, PressableCard } from "@/components/ui";
import { CalendarPlus2, MapPin, ChevronRight } from "lucide-react-native"



export default function Home() {
    return (
        <Screen headerTitle="Olá, USUARIO" className="">
            

            <Button title="Agendar Atendimento" className="" />

            <View className="grid grid-cols-1 gap-4 mt-16">
                <PressableCard
                    icon={<CalendarPlus2 size={32}/>}
                    title="Meus Agendamentos"
                    description="Consulte, altere ou cancele seus atendimentos"
                />

                <PressableCard 
                    icon={<MapPin size={32} />}
                    title="Agencias"
                    description="Encontre a agencia mais próxima de voce"
                />



                

                {/* <PressableCard>
                    <MapPin />
                    <ChevronRight />
                    <Text>Agencias</Text>
                    <Text>Encontre a agencia mais próxima de voce</Text>
                </PressableCard> */}
            </View>
            
        </Screen>
    );
}