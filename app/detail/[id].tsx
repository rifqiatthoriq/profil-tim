import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

const memberDetails: Record<
  string,
  { name: string; role: string; email: string; bio: string; skills: string[]; color: string }
> = {
  "1": {
    name: "Rifqi",
    role: "Frontend Developer",
    email: "rifqi@kelompok.id",
    bio: "Bertanggung jawab atas integrasi Expo Router dan penerapan Dark Mode Context.",
    skills: ["React Native", "TypeScript", "Expo Router"],
    color: "#4F46E5",
  },
  "2": {
    name: "Miqdat",
    role: "UI/UX Designer",
    email: "miqdat@kelompok.id",
    bio: "Merancang wireframe, desain sistem, dan alur navigasi antarmuka.",
    skills: ["Figma", "User Research", "Design System"],
    color: "#0EA5E9",
  },
  "3": {
    name: "Fadhil",
    role: "QA Engineer",
    email: "fadhil@kelompok.id",
    bio: "Melakukan pengujian fitur, verifikasi bug, dan optimasi performa.",
    skills: ["Jest", "Cypress", "Automated Testing"],
    color: "#8B5CF6",
  },
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { darkMode } = useTheme();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id]);

  const member = memberDetails[id as string] || {
    name: "Tidak Ditemukan",
    role: "-",
    email: "-",
    bio: "-",
    skills: [],
    color: "#64748B",
  };

  const bg = darkMode ? "#0F172A" : "#F8FAFC";
  const cardBg = darkMode ? "#1E293B" : "#FFFFFF";
  const textColor = darkMode ? "#F8FAFC" : "#0F172A";
  const subTextColor = darkMode ? "#94A3B8" : "#64748B";

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: bg }]}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ color: subTextColor, marginTop: 10 }}>Memuat detail profil...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={{ color: "#4F46E5", fontWeight: "700" }}>⬅️ Kembali ke Daftar</Text>
      </TouchableOpacity>

      <View style={[styles.headerCard, { backgroundColor: cardBg }]}>
        <View style={[styles.avatar, { backgroundColor: member.color }]}>
          <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
        </View>
        <Text style={[styles.name, { color: textColor }]}>{member.name}</Text>
        <Text style={[styles.role, { color: member.color }]}>{member.role}</Text>
        <Text style={{ color: subTextColor, marginTop: 6, fontSize: 13 }}>✉️ {member.email}</Text>
      </View>

      <View style={[styles.bioCard, { backgroundColor: cardBg }]}>
        <Text style={[styles.cardTitle, { color: textColor }]}>Deskripsi Bio</Text>
        <Text style={{ color: subTextColor, lineHeight: 20 }}>{member.bio}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  backButton: { paddingVertical: 10, marginBottom: 10 },
  headerCard: { alignItems: "center", padding: 24, borderRadius: 20, marginBottom: 14 },
  avatar: { width: 72, height: 72, borderRadius: 36, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "#FFF", fontSize: 32, fontWeight: "bold" },
  name: { fontSize: 22, fontWeight: "bold" },
  role: { fontSize: 14, fontWeight: "600", marginTop: 2 },
  bioCard: { padding: 18, borderRadius: 16, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 8 },
});