import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import PageButton from "../../components/PageButton";
import { pageStyles } from "../../styles";
import { useTheme } from "../../context/ThemeContext";

export default function DocsHome() {
  const router = useRouter();
  const { darkMode } = useTheme();

  const bg = darkMode ? "#0F172A" : "#F8FAFC";
  const textColor = darkMode ? "#F8FAFC" : "#0F172A";
  const subTextColor = darkMode ? "#94A3B8" : "#64748B";

  return (
    <View style={[pageStyles.container, { backgroundColor: bg }]}>
      <Text style={[pageStyles.title, { color: textColor }]}>Documentation Home</Text>
      <Text style={[pageStyles.description, { color: subTextColor }]}>
        Latihan Expo Router & Catch-All Route (Codelab 2)
      </Text>
      <PageButton
        title="Buka Dokumen React Hooks (Catch-All)"
        onPress={() => router.push("/docs/react/hooks/use-state")}
      />
    </View>
  );
}