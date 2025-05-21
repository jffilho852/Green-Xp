import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch(
        'http://192.168.141.14:3000/api/usuarios/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: senha }),
        }
      );

      // lê o body UMA vez como texto
      const text = await response.text();

      // tenta parsear para JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Resposta inesperada:', text);
        Alert.alert('Erro inesperado', 'Resposta inválida do servidor.');
        return;
      }

      if (response.ok) {
        Alert.alert('Sucesso', data.message || 'Login efetuado!');
        navigation.navigate('Main', {
          nome: data.usuario.nome,
          pontos: data.usuario.pontos,
        });
      } else {
        Alert.alert('Erro', data.error || 'Falha no login.');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      Alert.alert(
        'Erro de conexão',
        'Não foi possível conectar ao servidor.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/LOGO.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        textContentType="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Alert.alert('Esqueceu a senha', 'Funcionalidade ainda não implementada.')
        }
      >
        <Text style={styles.link}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: '80%',
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: 12,
    color: '#444',
    fontSize: 14,
    textAlign: 'center',
  },
});
