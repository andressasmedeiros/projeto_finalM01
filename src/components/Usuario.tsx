import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Alert, StyleSheet, Switch } from 'react-native';
import { UsuarioProps } from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';


const Usuario: React.FC<UsuarioProps> = ({ id, profile, name, status }) => {

  const [statusUsuario, setStatusUsuario] = useState(status);


  const toggleStatus = async () => {
    try {
      const response = await axios.patch(`http://192.168.16.105:3000/users/${id}/toggle-status`);
      if (response.status === 200) {
        setStatusUsuario(!statusUsuario);
      } else {
        Alert.alert('Não foi possível alterar o status do usuário');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao alterar o status do usuário');
      console.error(error);
    }
  }

  const mapName = () => {
    if (profile === 'admin') {
      return "user";
    } else if (profile === 'motorista') {
      return "truck";
    } else if (profile === 'filial') {
      return "industry";
    } else {
      return "user";
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Icon name={mapName()} size={30} color="#000" style={styles.icon} />
        <Text style={styles.itemName}>{name}</Text>
      </View>
      {profile !== 'admin' ? (
        <Switch
          trackColor={{ false: '#B0BEC5', true: '#2E7D32' }}
          thumbColor={statusUsuario ? '#2E7D32' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleStatus}
          value={statusUsuario}
        />) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: '48%',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 10,
  },
  itemName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
});

export default Usuario;