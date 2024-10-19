import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Header from '../components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View>
          <Text>Carregando</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Header name={nomeUsuario} profile={perfilUsuario} />
          <View>
            <Text>ESTOQUE</Text>
            <Button title="Gerenciar" onPress={handleProducts} />
          </View>
          <View>
            <Text>Usuários</Text>
            <Button title="Gerenciar" onPress={handleUsers} />
          </View>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default TelaHome;
