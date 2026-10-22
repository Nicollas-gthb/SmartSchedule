import { useState } from "react";
import { Text, View } from "react-native";
import { Link, router } from "expo-router";
import { Button, Input, Screen } from "@/components/ui";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
    const [loading, setLoading] = useState(false);

    function validate() {
        const next: typeof errors = {};
        if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Informe um e-mail válido";
        if (senha.length < 6) next.senha = "A senha deve ter ao menos 6 caracteres";
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function handleLogin() {
        if (!validate()) return;

        setLoading(true);
        try {
            // TODO: trocar pela chamada real à API (services/auth)
            await new Promise((r) => setTimeout(r, 1000));
            router.replace("/home"); // replace: o usuário não volta ao login com o botão "voltar"
        } finally {
            setLoading(false);
        }
    }

    return (
        <Screen className="justify-center">
            <View className="mb-10 items-center">
                <Text className="text-3xl font-bold text-primary">SmartSchedule</Text>
                <Text className="mt-2 text-base text-muted">
                    Agende seu atendimento sem fila
                </Text>
            </View>

            <Input
                label="E-mail"
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
            />

            <Input
                label="Senha"
                placeholder="••••••"
                password
                value={senha}
                onChangeText={setSenha}
                error={errors.senha}
            />

            <Button title="Entrar" loading={loading} onPress={handleLogin} className="mt-2" />

            <View className="mt-6 flex-row justify-center">
                <Text className="text-muted">Ainda não tem conta? </Text>
                <Link href="/cadastro" className="font-semibold">
                    
                    <Text className="text-primary">Cadastre-se</Text>
                </Link>
            </View>
        </Screen>
    );
}