import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getTeamArticles } from "../services/articleService";
import { Article } from "../types/article";
import { useTheme } from "../context/ThemeContext";

export default function ArticlesScreen() {
  const { darkMode } = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bg = darkMode ? "#0F172A" : "#F8FAFC";
  const cardBg = darkMode ? "#1E293B" : "#FFFFFF";
  const textColor = darkMode ? "#F8FAFC" : "#0F172A";
  const subTextColor = darkMode ? "#94A3B8" : "#64748B";

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTeamArticles();
      setArticles(data);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: bg }]}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ color: subTextColor, marginTop: 10 }}>
          Mengambil data dari External API...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: bg }]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadArticles}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.subtitle, { color: subTextColor }]}>
          Total Artikel: {articles.length} (Live API)
        </Text>
        <TouchableOpacity onPress={loadArticles} style={styles.refreshBtn}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
            <Text style={[styles.body, { color: subTextColor }]} numberOfLines={3}>
              {item.body}
            </Text>
            <View style={styles.footerRow}>
              <Text style={styles.tagText}>#{item.tags.join(" #")}</Text>
              <Text style={[styles.viewsText, { color: subTextColor }]}>
                {item.views} views
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subtitle: { fontSize: 13, fontWeight: "600" },
  refreshBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  refreshText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 12 },
  card: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  body: { fontSize: 13, lineHeight: 19, marginBottom: 10 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagText: { fontSize: 12, color: "#4F46E5", fontWeight: "600" },
  viewsText: { fontSize: 12 },
  errorText: { color: "#EF4444", textAlign: "center", marginBottom: 12 },
  retryBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: "#FFFFFF", fontWeight: "bold" },
});
