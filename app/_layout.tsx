import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#4F46E5" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Beranda & Profil Tim" }} />
        <Stack.Screen name="docs/index" options={{ title: "Dokumentasi Codelab 2" }} />
        <Stack.Screen name="docs/[...slug]" options={{ title: "Dokumentasi Detail" }} />
        <Stack.Screen name="detail/[id]" options={{ title: "Detail Profil Anggota" }} />
      </Stack>
    </ThemeProvider>
  );
}