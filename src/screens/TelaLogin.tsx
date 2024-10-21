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
      console.log(response)

      if (response.status === 200) {
        const user = response.data;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        let tela = '';
        if ("admin" === user.profile) {
          tela = 'TelaHome';
        } else if ("filial" === user.profile) {
          tela = 'TelaListagemMovimentacao'
        } else if ("motorista" === user.profile) {
          tela = 'TelaMovimentacaoMotorista'
        }
        navigation.reset({
          index: 0,
          routes: [{ name: tela }],
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
