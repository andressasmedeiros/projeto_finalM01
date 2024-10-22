import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.Container}>
      <View style={styles.UserImage}>
        <Image source={require('../../assets/logo.jpeg')}
          style={styles.Image} />
      </View>
      <View style={styles.form}>
        <TextInput style={styles.inputEmail}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput style={styles.inputPassword}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin} style={styles.buttonForm} >
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B0BEC5',
  },
  UserImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2E7D32',
    width: 170,
    height: 170,
    borderRadius: 150,
    marginBottom: 50,
  },
  Image: {
    width: 160,
    height: 160,
    borderRadius: 150,
  },
  inputEmail: {
    backgroundColor: '#FFF',
    width: 250,
    height: 35,
    borderRadius: 5,
    padding: 5,
    marginBottom: 0,
  },
  inputPassword: {
    backgroundColor: '#FFF',
    marginTop: 13,
    width: 250,
    height: 35,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  buttonForm: {
    backgroundColor: '#2E7D32',
    width: 100,
    height: 30,
    borderRadius: 5,
    marginTop: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TelaLogin;
