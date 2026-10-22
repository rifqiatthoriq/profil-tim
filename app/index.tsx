import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import PageButton from "../components/PageButton";
import { pageStyles } from "../styles";
import { useTheme } from "../context/ThemeContext";

const members = [
  { id: "1", name: "Rifqi", role: "Frontend Developer", color: "#4F46E5" },
  { id: "2", name: "Miqdat", role: "UI/UX Designer", color: "#0EA5E9" },
  { id: "3", name: "Fadhil", role: "QA Engineer", color: "#8B5CF6" },
];

export default function HomePage() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useTheme();

  const bg = darkMode ? "#0F172A" : "#F8FAFC";
  const cardBg = darkMode ? "#1E293B" : "#FFFFFF";
  const textColor = darkMode ? "#F8FAFC" : "#0F172A";
  const subTextColor = darkMode ? "#94A3B8" : "#64748B";

  return (
    <View style={[pageStyles.container, { backgroundColor: bg }]}>
      <Text style={[pageStyles.title, { color: textColor }]}>Page Explorer</Text>
      <Text style={[pageStyles.description, { color: subTextColor }]}>
        Latihan Expo Router & Context API (Dark Mode)
      </Text>

      <TouchableOpacity
        style={[styles.themeToggleBtn, { backgroundColor: darkMode ? "#312E81" : "#EEF2FF" }]}
        onPress={toggleTheme}
      >
        <Text style={{ color: "#4F46E5", fontWeight: "bold" }}>
          {darkMode ? "🌙 Mode Gelap (Aktif)" : "☀️ Mode Terang (Aktif)"} - Klik Ubah Tema
        </Text>
      </TouchableOpacity>

      <View style={{ width: "100%", marginBottom: 16 }}>
        <PageButton
          title="📖 Open Documentation (Codelab 2)"
          onPress={() => router.push("/docs")}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: subTextColor }]}>
        ANGGOTA TIM KELOMPOK
      </Text>

      <FlatList
        data={members}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.card, { backgroundColor: cardBg }]}
            onPress={() => router.push(`/detail/${item.id}`)}
          >
            <View style={[styles.avatar, { backgroundColor: item.color }]}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.name, { color: textColor }]}>{item.name}</Text>
              <Text style={{ color: subTextColor, fontSize: 13 }}>{item.role}</Text>
            </View>
            <Text style={{ fontSize: 18 }}>➡️</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  themeToggleBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
    alignSelf: "flex-start",
    letterSpacing: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  name: { fontSize: 16, fontWeight: "bold" },
});