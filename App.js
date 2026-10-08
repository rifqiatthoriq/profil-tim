import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

// 1. Type (Definisi Tipe Data)
type Member = {
  id: number;
  name: string;
  role: string;
  status: string;
};

// 2. Array of Objects
const groupMembers: Member[] = [
  { id: 1, name: 'Rifqi', role: 'Frontend Developer', status: 'Aktif' },
  { id: 2, name: 'Miqdat', role: 'UI/UX Designer', status: 'Aktif' },
  { id: 3, name: 'Fadhil', role: 'QA Engineer', status: 'Non-Aktif' },
];

// 3. Custom Function & Loop
function countActiveMembers(data: Member[]): number {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].status === 'Aktif') {
      count++;
    }
  }
  return count;
}

export default function App() {
  const totalActive = countActiveMembers(groupMembers);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Daftar Profil Kelompok</Text>
      
      {/* Inline Style */}
      <Text style={{ fontSize: 16, color: '#2b2b2b', marginBottom: 15, fontWeight: 'bold' }}>
        Total Anggota Aktif: {totalActive} orang
      </Text>

      {/* Looping Map */}
      {groupMembers.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>Role: {item.role}</Text>
          
          {/* Kombinasi External & Inline Style */}
          <Text style={[styles.status, { color: item.status === 'Aktif' ? 'green' : 'red' }]}>
            Status: {item.status}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

// 4. External Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
});