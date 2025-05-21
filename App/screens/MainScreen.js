import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainScreen({ navigation, route }) {
  const { nome, pontos } = route.params || { nome: 'Usuário', pontos: 0 };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo, {nome} 👋</Text>
      <Text style={styles.pontos}>Você tem {pontos} pontos</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Scanner')}
      >
        <Text style={styles.botaoTexto}>📷 Escanear Lixeira</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, styles.secundario]}
        onPress={() => alert('Histórico em construção')}
      >
        <Text style={styles.botaoTexto}>🕒 Ver Histórico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#2E7D32' },
  pontos: { fontSize: 18, marginBottom: 32, color: '#444' },
  botao: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secundario: { backgroundColor: '#555' },
});
