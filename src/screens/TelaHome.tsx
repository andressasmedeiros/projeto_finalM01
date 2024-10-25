import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';



type TelaHomeNavigationProp = StackNavigationProp<RootStackParamList, 'TelaHome'>;

interface Props {
  navigation: TelaHomeNavigationProp;
}

const TelaHome: React.FC<Props> = ({ navigation }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [perfilUsuario, setPerfilUsuario] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const checkUserLoggedIn = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        const userData = JSON.parse(user);
        setNomeUsuario(userData.name);
        setPerfilUsuario(userData.profile);
        setIsLoading(false);
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'TelaLogin' }],
        });
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'TelaLogin' }],
    });
  };

  const handleProducts = () => {
    navigation.navigate('TelaListagemProdutos');
  };

  const handleUsers = () => {
    navigation.navigate('TelaListagemUsuarios');
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.Container}>
          <Text>Carregando</Text>
        </View>
      ) : (
        <View style={styles.Container}>
          <Header name={nomeUsuario} />
          <View style={styles.row}>
          <Icon name="truck" size={30} color="#000" style={styles.icon} />
            <Text style={styles.text}>Estoque</Text>
            <TouchableOpacity style={styles.button} onPress={handleProducts}>
              <Text style={styles.buttonText}>Gerenciar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
          <Icon name="users" size={30} color="#000" style={styles.icon} />
            <Text style={styles.text}>Usuários</Text>
            <TouchableOpacity style={styles.button} onPress={handleUsers}>
              <Text style={styles.buttonText}>Gerenciar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
            <Text style={styles.buttonLogoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B0BEC5',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonLogout: {
    marginTop: 20,
  },
  buttonLogoutText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
});

export default TelaHome;
