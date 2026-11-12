import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getPartnersAsync } from "../services/partnerService";
import { PartnerUser } from "../types/partner";
import { useTheme } from "../context/ThemeContext";
import { pageStyles } from "../styles";

export default function PartnersScreen() {
  const [partners, setPartners] = useState<PartnerUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { darkMode } = useTheme();
  const bg = darkMode ? "#0F172A" : "#F8FAFC";
  const cardBg = darkMode ? "#1E293B" : "#FFFFFF";
  const textColor = darkMode ? "#F8FAFC" : "#0F172A";
  const subTextColor = darkMode ? "#94A3B8" : "#64748B";

  const loadPartners = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const data = await getPartnersAsync();
      setPartners(data);
    } catch (error: any) {
      setErrorMsg(String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: bg }]}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ color: subTextColor, marginTop: 10 }}>
          Mengambil data mitra dari External API...
        </Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={[styles.center, { backgroundColor: bg, padding: 20 }]}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadPartners}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[pageStyles.container, { backgroundColor: bg }]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[pageStyles.title, { color: textColor }]}>Mitra & Klien Tim</Text>
          <Text style={{ color: subTextColor, fontSize: 12 }}>
            Data dari External API (dummyjson.com)
          </Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={loadPartners}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={partners}
        style={{ width: "100%", marginTop: 12 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {item.firstName.charAt(0)}
                {item.lastName.charAt(0)}
              </Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.name, { color: textColor }]}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={{ color: "#4F46E5", fontSize: 12, fontWeight: "600" }}>
                {item.company.title} - {item.company.name}
              </Text>
              <Text style={{ color: subTextColor, fontSize: 12, marginTop: 2 }}>
                {item.email}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  refreshBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  refreshText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 12 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
  },
  badge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "#4F46E5", fontWeight: "bold", fontSize: 15 },
  name: { fontSize: 15, fontWeight: "bold" },
  errorText: { color: "#EF4444", textAlign: "center", marginBottom: 12, fontWeight: "600" },
  retryBtn: { backgroundColor: "#4F46E5", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: "#FFFFFF", fontWeight: "bold" },
});
