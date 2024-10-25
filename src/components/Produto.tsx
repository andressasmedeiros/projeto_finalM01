import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ProdutoProps } from '../../types';


const Produto: React.FC<ProdutoProps> = ({ product_name, image_url, branch_name, quantity, description }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <Text style={styles.itemName}>{product_name}</Text>
      <View style={styles.row}>
        <Text style={styles.storeName}>{branch_name}</Text>
        <Text style={styles.quantityText}>{quantity} unidades</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
  itemContainer: {
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
    width: 150, 
    height: 150, 
    borderRadius: 10,
    marginBottom: 10, 
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5, 
    textAlign: 'center', 
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '70%', 
    marginVertical: 5, 
  },
  storeName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginTop: 5, // Espaço acima da descrição
    textAlign: 'center', // Centraliza a descrição
  },
});

export default Produto;