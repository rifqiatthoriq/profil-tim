import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { darkMode, toggleTheme } = useTheme();

  const bg = darkMode ? "#0F172A" : "#F8FAFC";
  const cardBg = darkMode ? "#1E293B" : "#FFFFFF";
  const textColor = darkMode ? "#F8FAFC" : "#0F172A";
  const subTextColor = darkMode ? "#94A3B8" : "#64748B";

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.title, { color: textColor }]}>Pengaturan Tema Aplikasi</Text>
        <Text style={{ color: subTextColor, marginBottom: 20, textAlign: "center" }}>
          Status Tema Saat Ini:{" "}
          <Text style={{ fontWeight: "bold", color: darkMode ? "#818CF8" : "#4F46E5" }}>
            {darkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}
          </Text>
        </Text>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#4F46E5" }]}
          onPress={toggleTheme}
        >
          <Text style={styles.btnText}>Ubah Tema Aplikasi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  card: { padding: 24, borderRadius: 20, alignItems: "center", elevation: 3 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  btn: { width: "100%", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  btnText: { color: "#FFF", fontWeight: "bold", fontSize: 15 },
});