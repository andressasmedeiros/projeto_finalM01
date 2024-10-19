import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Alert, StyleSheet, Switch } from 'react-native';
import { UsuarioProps } from '../../types';


const Usuario: React.FC<UsuarioProps> = ({ id, profile, name, status}) => {

  const [statusUsuario, setStatusUsuario] = useState(status);


  const toggleStatus = async () => {
    try {
      const response = await axios.patch(`http://192.168.16.105:3000/users/${id}/toggle-status`);
      console.log(response)
      if (response.status === 200){
        setStatusUsuario(!statusUsuario);
      } else {
          Alert.alert('Não foi possível alterar o status do usuário');
      }
  } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao alterar o status do usuário');
      console.error(error);
  }
}

  return (
      <View style={styles.infoContainer}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={statusUsuario ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleStatus}
        value={statusUsuario}
      />
        <Text style={styles.itemName}>{profile}</Text>
        <Text style={styles.itemName}>{name}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default Usuario;