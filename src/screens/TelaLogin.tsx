import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { NavigationProps } from '../../types'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaLogin = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.16.105:3000/login', {
        email,
        password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        navigation.reset({
          index: 0,
          routes: [{ name: 'TelaHome'}],
        });
      } else {
        Alert.alert('Login falhou', 'E-mail ou senha inválidos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Tela de Login</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

export default TelaLogin;
