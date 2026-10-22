import { Alert, Platform } from "react-native";

// Alert.alert com botões não funciona no navegador (react-native-web),
// então no web usamos window.confirm.
export function confirmDialog(title: string, message: string, onConfirm: () => void) {
  if (Platform.OS === "web") {
    if (window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: "Não", style: "cancel" },
    { text: "Sim, cancelar", style: "destructive", onPress: onConfirm },
  ]);
}
