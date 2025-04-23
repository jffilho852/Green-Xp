import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/LOGO.png')} style={styles.logo} />
      <Text style={styles.title}>GREEN XP</Text>
      <Text style={styles.subtitle}>
        Acompanhe sua jornada de reciclagem, ganhe pontos e troque por recompensas sustentáveis!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Fazer Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#2E7D32',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#2E7D32',
  },
});
