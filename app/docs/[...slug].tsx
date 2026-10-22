import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { pageStyles } from "../../styles";
import { useTheme } from "../../context/ThemeContext";

export default function DocsSlug() {
  const { slug } = useLocalSearchParams();
  const { darkMode } = useTheme();
  const path = Array.isArray(slug) ? slug.join(" / ") : slug;

  const bg = darkMode ? "#0F172A" : "#F8FAFC";
  const textColor = darkMode ? "#F8FAFC" : "#0F172A";
  const subTextColor = darkMode ? "#94A3B8" : "#64748B";

  return (
    <View style={[pageStyles.container, { backgroundColor: bg }]}>
      <Text style={[pageStyles.title, { color: textColor }]}>Dokumentasi Detail</Text>
      <Text style={[pageStyles.description, { color: subTextColor }]}>Path URL: {path}</Text>
    </View>
  );
}