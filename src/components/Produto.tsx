import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ProdutoProps } from '../../types';


const Produto: React.FC<ProdutoProps> = ({ product_name, image_url, branch_name, quantity, description }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{product_name}</Text>
        <Text style={styles.itemName}>{branch_name}</Text>
        <Text style={styles.itemName}>{description}</Text>
      </View>
      <View style={styles.quantityText}>
        <Text style={styles.quantityText}>{quantity} unidades</Text>
      </View>
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

export default Produto;